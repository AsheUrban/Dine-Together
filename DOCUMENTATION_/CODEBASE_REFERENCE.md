# Dine-Together Codebase Reference

Snapshot of the Firebase MVP codebase. Reference material for understanding the current state of the project.

**Last Updated:** 2026-02-10

---

## Table of Contents

- [File Structure](#file-structure)
- [Firestore Schema](#firestore-schema)
- [Component Architecture](#component-architecture)
- [Service Functions](#service-functions)
- [Firebase Setup & Configuration](#firebase-setup--configuration)

---

## File Structure

```
src/
├── components/ (25 files)
│   ├── ActionBar.js              # Floating action buttons (above footer nav)
│   ├── App.js                    # Main app with routing & auth state
│   ├── Avatar.js                 # User avatar (context-dependent sizing/colors)
│   ├── ConfirmDialog.js          # Confirmation dialog for delete actions
│   ├── EditPostForm.js           # Edit post caption
│   ├── EditUserProfileForm.js    # Edit user profile
│   ├── Explore.js                # Search/explore restaurants
│   ├── Feed.js                   # Home feed (all posts)
│   ├── Footer.js                 # Bottom navigation (FEED, EXPLORE, PROFILE)
│   ├── Header.js                 # Branding only ("DINE TOGETHER")
│   ├── KebabMenu.js              # Dropdown menu for edit/delete actions
│   ├── NewPostForm.js            # Create new post
│   ├── NewProfileForm.js         # New user profile setup
│   ├── Place.js                  # Individual place card (PlaceCard)
│   ├── PlaceDetail.js            # Restaurant info display (purely presentational)
│   ├── PlaceGrid.js              # Grid of places (Profile Restaurants tab)
│   ├── PlaceProfile.js           # Feature container for place viewing/interaction
│   ├── Post.js                   # Individual post (social wrapper + place)
│   ├── PostList.js               # List of posts
│   ├── ProtectedRoute.js         # Auth-gated route wrapper
│   ├── ReusablePostForm.js       # Form for post creation/editing
│   ├── ReusableProfileForm.js    # Form for profile creation/editing
│   ├── SignIn.js                 # Sign in page
│   ├── SignUp.js                 # Sign up page
│   ├── UserDetails.js            # User bio section
│   └── UserProfile.js            # User profile page
├── hooks/ (10 files)
│   ├── allPosts.js               # Subscribe to all posts real-time
│   ├── editMode.js               # Edit mode toggle state
│   ├── exploreSearch.js          # Restaurant search with geolocation + debouncing
│   ├── formSubmit.js             # Form submission state
│   ├── place.js                  # Subscribe to place by Firestore ID
│   ├── placeSaveState.js         # Check if user saved a place, handle save
│   ├── placeSelect.js            # Orchestrate place selection flow
│   ├── user.js                   # Current user state (subscription pattern)
│   ├── userPlaces.js             # Subscribe to user's saved places
│   └── userPosts.js              # Subscribe to user's posts
├── services/
│   ├── firebaseService.js        # Firebase CRUD & real-time listeners
│   └── googlePlacesService.js    # Google Places API (New) REST calls
├── styles/ (9 files)
│   ├── avatarStyles.js           # Avatar component styles
│   ├── feedStyles.js             # Feed component styles
│   ├── formStyles.js             # Form component styles
│   ├── globalStyles.js           # Global reusable styled components
│   ├── index.js                  # Exports all styles
│   ├── placeStyles.js            # Place component styles
│   ├── postStyles.js             # Post component styles
│   ├── profileStyles.js          # Profile component styles
│   └── theme.js                  # Centralized design tokens (colors, fonts)
├── utils/
│   ├── textFormatters.js         # Format display text (addresses, price levels)
│   └── validators/
│       ├── authValidator.js      # Email/password validation
│       └── index.js              # Validator exports
├── firebase.js                   # Firebase config & initialization
├── index.js                      # React entry point
└── index.css                     # Global CSS
```

---

## Firestore Schema

**Collections:**
- `users` — User profiles (username, email, bio fields)
- `users/{userId}/userPlaces` — Subcollection linking users to saved places (placeId, timeAdded)
- `posts` — All posts (userId, authorUsername, caption, placeId, timeOpen)
- `places` — All restaurants (restaurantName, restaurantAddress, rating, priceLevel, photoReferences, website, phone, googlePlaceId, source, createdAt)
- `placeSavedBy/{placeId}/users/{userId}` — Presence-only markers tracking which users saved a place ({ timeAdded })

**Key principles:**
- Places are NEVER deleted — only dereferenced from users' saved lists
- Multiple posts can reference the same place
- Multiple users can save the same place
- Deleting a post does NOT delete the place
- placeSavedBy documents are immutable — created or deleted, never updated

**Security Rules** (deployed 2026-02-10):

| Collection | Read | Create | Update | Delete |
|------------|------|--------|--------|--------|
| `users/{userId}` | Any authenticated | Owner only | Owner only | Never |
| `users/{userId}/userPlaces/{placeId}` | Any authenticated | Owner only | Owner only | Owner only |
| `posts/{postId}` | Any authenticated | Author only | Author only | Author only |
| `places/{placeId}` | Any authenticated | Any authenticated | Any authenticated | Never |
| `placeSavedBy/{placeId}/users/{userId}` | Any authenticated | Owner only | Never | Owner only |

---

## Component Architecture

| Component | Purpose | Pattern |
|-----------|---------|---------|
| **Feed** | Home page showing all posts | Container |
| **UserProfile** | User profile with Posts/Restaurants tabs | Container |
| **PlaceProfile** | Feature container for place viewing/interaction | Container |
| **Explore** | Search/explore restaurants | Container |
| **Post** | Social wrapper (avatar + caption + place + KebabMenu) | Presentational |
| **Place** | Restaurant card (name + address + details) | Presentational |
| **PlaceDetail** | Restaurant info display | Presentational |
| **UserDetails** | User bio section | Presentational |
| **PostList** | Renders array of posts | Presentational |
| **PlaceGrid** | Renders array of places as grid | Presentational |
| **ActionBar** | Floating action buttons above footer nav | Presentational |
| **KebabMenu** | Edit/delete menu (Post, PlaceDetail) | Presentational |
| **ConfirmDialog** | Delete confirmation dialogs | Presentational |
| **Header** | Branding only ("DINE TOGETHER") | Presentational |
| **Footer** | Bottom navigation (FEED, EXPLORE, PROFILE) | Presentational |
| **Avatar** | User avatar (context-dependent sizing/colors) | Presentational |

---

## Service Functions

### firebaseService.js

**Subscriptions:**
- `subscribeToAllPosts(onPostsUpdate, onError)` — Real-time feed of all posts
- `subscribeToUserPosts(userId, onPostsUpdate, onError)` — Real-time user's posts
- `subscribeToUserPlaces(userId, onPlacesUpdate, onError)` — Real-time user's saved places

**Posts:**
- `createPost(postData)` — Create new post + save place
- `updatePostCaption(postId, caption)` — Edit post caption
- `deletePost(postId, removeFromSavedPlaces)` — Delete post

**Places:**
- `findPlaceByGoogleId(googlePlaceId)` — Dedup check
- `getPlaceById(placeId)` — Single place fetch
- `createPlace(placeData)` — Create new place doc

**Save State:**
- `addToSavedPlaces(userId, placeId)` — Save place to user's list
- `removeFromSavedPlaces(userId, placeId)` — Remove from saved
- `checkIfPlaceSaved(userId, placeId)` — Check save status
- `getPlaceSavedByUsers(placeId)` — Get users who saved a place

**Users:**
- `updateUserBio(userId, bioData)` — Update bio fields
- `createUserProfile(userId, profileData)` — Create new profile
- `getUsernamesFromIds(userIds)` — Batch username lookup

**Utility:**
- `updateElapsedWaitTime(timestamps)` — Calculate elapsed time for display

### googlePlacesService.js

- `searchPlaces(input, coordinates)` — Autocomplete search via Places API (New)
- `fetchPlaceDetails(googlePlaceId)` — Full place details
- `getPhotoUrl(photoReference, maxWidth)` — Photo URL via Cloud Function
- `transformPrediction(suggestion)` — Transform search result
- `transformPlaceDetails(placeDetails)` — Transform detail response

---

## Firebase Setup & Configuration

**Project ID:** `dine-together-2e4b4`
**Authentication:** Email/Password
**Database:** Cloud Firestore

**Cloud Functions:**
- `getPlacePhoto` — HTTP endpoint for secure photo fetching
  - Endpoint: `https://us-central1-dine-together-2e4b4.cloudfunctions.net/getPlacePhoto`
  - API key stored in Firebase Secrets (server-side key, no website restrictions)

**API Keys (verified 2026-02-10):**
- Client-side (`.env`): HTTP referrer restricted (localhost + production), API restricted to Places API (New) + Maps JavaScript API
- Server-side (Firebase Secrets): No application restrictions, API restricted to Places API (New) only
