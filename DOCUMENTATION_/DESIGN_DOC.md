# Dine-Together Design Document

**Last Updated:** 2026-02-10
**Status:** Firebase MVP complete. TS/Supabase/React Native migration next.

---

## Table of Contents

- [Component Architecture](#component-architecture)
- [Routes](#routes)
- [User Flows](#user-flows)
- [Design & Visual Standards](#design--visual-standards)
- [Component Specifications](#component-specifications)

---

## Component Architecture

### Place-Related Component Hierarchy

```
Feed.js / UserProfile.js (Route-level containers - manage state, hooks, navigation)
│
├── PostList / PlaceGrid (list rendering)
│   └── Post / Place (PlaceCard) (compact preview - presentational)
│
└── navigate(`/place/${placeId}`) → Route-based navigation
    │
    PlaceProfile (Feature-level container - /place/:placeId)
    ├── PlaceDetail (restaurant info - purely presentational)
    ├── KebabMenu (Remove - owner actions)
    └── ActionBar (fixed bottom)
        ├── Back button
        ├── "Saved by" info
        └── Add (+) button (when not saved)
```

### Component Definitions

**PlaceCard (Place.js)** — Compact summary view
- Used in: Post.js (embedded), PlaceGrid (Profile Restaurants tab)
- Purely presentational
- Shows: name, address, price, rating, photo
- Clickable → navigates to `/place/${placeId}`

**PlaceDetail** — Restaurant data display
- Purely presentational (receives props only, no hooks, no Firebase)
- Shows: name, address
- NOT editable by users (data comes from Google API)
- Receives `place` prop, renders UI
- Rating, price, phone, website, photos deferred to PlaceProfile (TS migration)

**PlaceProfile** — Feature-level container
- Route: `/place/:placeId`
- Uses: `usePlace(placeId)`, `usePlaceSaveState(placeId)`
- Composes: PlaceDetail + KebabMenu + ActionBar
- Manages: save state, remove confirmation
- Navigates to user profiles via "Saved by" links

**ActionBar** — Fixed bottom action container
- Purely presentational (receives children)
- Fixed positioning above footer nav (`bottom: 70px`)

### Key Architectural Principles

1. **PlaceDetail is read-only:** Place data comes from Google API. Users cannot edit restaurant information.

2. **Containers compute permissions:** Feed/UserProfile compute `isOwner`, pass as props. No auth coupling in presentational components.

3. **Route-based navigation:** All place/profile views are routes (`/place/:placeId`, `/profile/:userId`). No inline rendering or selection state.

4. **Layered containers:**
   - Route containers (Feed/UserProfile) decide *what* to show
   - Feature container (PlaceProfile) manages *how* to interact
   - Presentational components (PlaceDetail, ActionBar) just render props

---

## Routes

| Path | Component | Auth | Purpose |
|------|-----------|------|---------|
| `/` | Feed | Required | Home feed, all posts |
| `/profile/:userId` | UserProfile | Required | User profile (own or others) |
| `/place/:placeId` | PlaceProfile | Required | Place detail view |
| `/search` | Explore | Required | Restaurant search |
| `/sign-up` | SignUp | Public | Registration |
| `/sign-in` | SignIn | Public | Login |

---

## User Flows

### Feed — View Posts

```
User navigates to /
    → Feed.js renders
    → useAllPosts() subscribes to all posts (real-time)
    → Posts display with ownership computed per post
    → Click post card → navigate(`/place/${place.id}`)
    → Click avatar/username → navigate(`/profile/${userId}`)
```

### Feed — Edit/Delete Post via KebabMenu

```
Owner sees KebabMenu on their posts
    → "Edit Post" → EditPostForm renders (edit caption)
        → Save → updatePostCaption(postId, caption)
    → "Delete Post" → ConfirmDialog renders
        → Confirm → deletePost(postId)
        → Post removed, place persists
```

### Profile — Restaurants Tab (Default)

```
User navigates to /profile/:userId
    → UserProfile.js uses useParams() for userId
    → isOwnProfile = userId === auth.currentUser.uid
    → useUserPlaces(userId) subscribes to saved places
    → PlaceGrid renders place cards
    → Click place → navigate(`/place/${id}`)
```

### Profile — Posts Tab

```
User clicks "Posts" tab
    → useUserPosts(userId) subscribes to user's posts
    → PostList renders with ownership (KebabMenu on own posts)
    → Click post → navigate(`/place/${place.id}`)
```

### Profile — View Other Users

```
Click avatar/username in Feed → navigate(`/profile/${userId}`)
    → UserProfile renders with isOwnProfile = false
    → No edit link on bio
    → No KebabMenu on posts
    → Saved places visible (public for social discovery)
    → Click place → navigate(`/place/${placeId}`)
```

### Explore — Search and Select

```
User navigates to /search
    → Explore.js renders search input
    → useExploreSearch(query) with geolocation + 300ms debounce
    → Google Places API autocomplete returns results
    → Click result → usePlaceSelect orchestrates:
        1. findPlaceByGoogleId() — dedup check
        2. fetchPlaceDetails() — Google API call (if new)
        3. createPlace() — save to Firestore (if new)
        4. navigate(`/place/${placeId}`)
```

### PlaceProfile — View and Save

```
User arrives at /place/:placeId
    → PlaceProfile.js uses usePlace(placeId) + usePlaceSaveState(placeId)
    → PlaceDetail renders restaurant info
    → ActionBar renders:
        - Back button (navigate(-1))
        - "Saved by" info with clickable usernames
        - Add (+) button if not saved
    → Click Add → addToSavedPlaces(userId, placeId)
    → Click "Saved by" username → navigate(`/profile/${userId}`)
```

### PlaceProfile — Remove (Owner Actions)

```
If user has saved this place:
    → KebabMenu shows "Remove"
    → "Remove" → ConfirmDialog
        → Confirm → removeFromSavedPlaces(userId, placeId)
        → navigate(-1)
        → Place persists for other users
```

---

## Design & Visual Standards

### Menu Style

Menu-inspired design — clean interface that evokes ordering off of a menu.

**Color Scheme:**
- Background: White `#FFFFFF`
- Text: Black `#000000`
- Muted: `rgba(0, 0, 0, 0.6)`
- Input Background: `#fafafa`

**Typography:**
- All text: Courier, monospace
- Sizes: 18px (headers), 14px (username), 13px (body), 12px (nav/labels), 11px (muted)

**Borders & Dividers:**
- 2px solid: Header bottom, footer top
- 1px solid: Cards, containers, inputs
- 1px dotted: Menu-style row dividers

**Navigation:**
- Header: Branding only ("DINE TOGETHER")
- Footer: Fixed bottom nav (FEED, EXPLORE, PROFILE)
- Active state: [BRACKETS] + bold + 100% opacity
- Inactive state: No brackets + 50% opacity

**ActionBar:** Floating circular buttons at `bottom: 70px`, left-aligned, above footer nav

---

## Component Specifications

### Feed Post Card Layout
- **Social metadata (top):** Avatar + username (left), KebabMenu (right, owner only)
- **Caption:** Optional post text
- **Place card (embedded):** Restaurant name (H3, Courier monospace), image (100x100px), details (address, rating, price level)
- **"Saved by" display:** 3 or fewer names shown, 4+ shows count with "View all"
- **Posted date (below):** Relative time switching to absolute date
- **Clickable:** Whole card except KebabMenu navigates to PlaceProfile

### PlaceDetail Layout
- **Header:** Restaurant name (H4Centered)
- **Address:** Restaurant address (H6Centered)
- **Buttons (conditional):** If saved: KebabMenu (Remove). If not saved: Add button in ActionBar.
- Photos, rating, price, phone, website, map deferred to PlaceProfile (TS migration)

### Profile Page
- **Restaurants Tab (default):** 2-column PlaceGrid, click navigates to PlaceProfile
- **Posts Tab:** PostList of user's posts, same layout as Feed
- **Bio Section:** Avatar (56px), username, three bio fields (bestMeal, goToMeals, aboutMe), KebabMenu with Edit Profile / Sign Out (own profile only)

### Image Specifications
- Feed post cards: 100% width, 160px height (post variant)
- Profile place cards: 100% width, 100px height (grid variant)
- PlaceDetail: No photo display (deferred to PlaceProfile)
- All photos via Cloud Function proxy (`getPlacePhoto`)
