
# **Dine-Together**

### By *Ashe Urban*

---

## Table of Contents

- [Project Overview](#project-overview)
- [Documentation](#documentation)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
  - [Service Layer Pattern](#service-layer-pattern)
  - [Firestore Schema](#firestore-schema)
- [Goals & Problems Solved](#goals--problems-solved)
- [Diagrams & Design](#diagrams--design)
- [Known Bugs](#known-bugs)
- [Setup / Installation](#setup--installation)
- [Project Structure](#project-structure)
- [Development Roadmap](#development-roadmap)
- [License](#license)

---

## **Project Overview**

Dine Together is a full-stack React application exploring how social restaurant discovery and shared dining experiences can live in one place. Users create and share restaurant posts, save places they want to try, and explore dining recommendations through a community-driven feed.

The JavaScript MVP is complete with core social functionality, Google Places API integration (autocomplete search, place details, photo display via Cloud Function proxy), Firebase Authentication, Firestore data modeling, protected routes, and a service-layer architecture that separates UI concerns from data access.

The project will be migrated to TypeScript with Expo/React Native and Supabase to support mobile-first development, relational social features, and deeper dining coordination. See [VALUES.md](./DOCUMENTATION_/VALUES.md) for the principles guiding the migration.

---

**Current Status:** Firebase MVP complete. Google Places API fully integrated. Next: TypeScript/Supabase/React Native migration.

---

**Main branch** is the primary branch containing the completed Firebase MVP.

| Branch | Status | Focus |
|--------|--------|-------|
| **main** | Complete MVP | Firebase MVP with Google Places integration. |
| **wip-design** | Archive | V1 design exploration. |
| **legacyBranch** | Archive | For memories, capstone project. |

---

## **Documentation**

| Document | Description |
|----------|-------------|
| [DESIGN_DOC.md](./DOCUMENTATION_/DESIGN_DOC.md) | Component architecture, routes, user flows, visual standards |
| [API_DESIGN.md](./DOCUMENTATION_/API_DESIGN.md) | Google Places API integration decisions and data flows |
| [CODEBASE_REFERENCE.md](./DOCUMENTATION_/CODEBASE_REFERENCE.md) | File structure, schema, service functions, Firebase config |
| [FUTURE_DESIGN.md](./DOCUMENTATION_/FUTURE_DESIGN.md) | Explore and PlaceProfile wireframes and design targets |
| [VALUES.md](./DOCUMENTATION_/VALUES.md) | Project values and migration principles |
| [DEV_ROADMAP.md](./DOCUMENTATION_/DEV_ROADMAP.md) | Development roadmap and process disclaimer |
| [SETUP.md](./DOCUMENTATION_/SETUP.md) | Detailed setup instructions with Firestore rules and troubleshooting |

---

## **Technologies Used**

| Core | Frontend | APIs / BaaS | Architecture |
|------|----------|-------------|---------|
| JavaScript, JSX | React 18 | Firebase (Auth, Firestore) | Service Layer Pattern |
| CSS | Styled Components | Google Places API | Centralized Styling |

---

## **Architecture**

This project uses a **service-layer pattern** to separate concerns and keep components clean:

- **Posts & Places Collections** — Posts (social wrappers with captions) reference Places (restaurant data) by ID. One Place can be referenced by multiple Posts, keeping data normalized and shareable.
- **Service Layer** (`firebaseService.js`, `googlePlacesService.js`) — Centralizes all Firebase operations and external API calls. Components receive clean data in props without direct API coupling.
- **Custom Hooks** — 10 reusable hooks manage component state (data subscriptions, form handling, edit modes, search, place selection), promoting code reuse and testability.
- **Styled Components** — Centralized styling system with 9 style files and a shared theme, maintaining consistent visual language across the app.

This architecture scales cleanly: Google Places API integration required changes only to the service layer, not to component logic. The same pattern will carry into the Supabase migration.

### **Service Layer Pattern**

The **service layer** (`firebaseService.js`) sits between components and external services (Firebase, APIs). Instead of components calling Firebase directly, they call service functions.

**Benefits:**
- **Separation of concerns** — Components focus on UI; service layer handles data logic
- **Reusability** — Multiple components can use the same service functions without duplication
- **Testability** — Service logic can be tested independently from UI
- **Flexibility** — Swapping Firebase for a different backend requires changes only in the service layer
- **API Integration** — Google Places API calls live in the service layer without touching components

**Example:** When Explore.js needs to search restaurants, it calls `googlePlacesService.searchPlaces()`. The service layer handles the API call, error handling, and data transformation. Components receive clean data ready to display.

### **Firestore Schema**

```
firestore/
├── posts/
│   └── {postId}
│       ├── userId (string) - Author's Firebase UID
│       ├── authorUsername (string) - Denormalized for Feed display
│       ├── caption (string) - Optional social sharing text
│       ├── placeId (string) - Reference to places collection
│       └── timeOpen (timestamp) - When post was created
│
├── places/
│   └── {placeId}
│       ├── googlePlaceId (string) - Google's place ID
│       ├── restaurantName (string)
│       ├── restaurantAddress (string)
│       ├── priceLevel (string) - e.g. "PRICE_LEVEL_MODERATE"
│       ├── rating (number) - Google Places rating
│       ├── userRatingsTotal (number) - Number of ratings
│       ├── phone (string) - Restaurant phone number
│       ├── website (string) - Restaurant website URL
│       ├── photoReferences (array) - Google photo references
│       ├── source (string) - 'google'
│       └── createdAt (timestamp) - When place was added to system
│
├── placeSavedBy/{placeId}/
│   └── users/{userId}
│       └── timeAdded (timestamp) - When user saved this place
│
└── users/{userId}/
    ├── username (string)
    ├── email (string)
    ├── bio (object) - User profile bio fields
    │   ├── bestMeal (string) - Best meal of my life (~75 chars)
    │   ├── goToMeals (string) - My go-to meals (~75 chars)
    │   └── aboutMe (string) - About me (~150 chars)
    └── userPlaces/ (subcollection)
        └── {placeId}
            └── timeAdded (timestamp) - When user saved this place
```

**Key Points:**
- Posts reference Places by ID (one Place can be referenced by multiple Posts)
- userPlaces subcollection links users to their saved restaurants
- Service layer joins Post + Place data when fetching (username denormalized to avoid N+1)
- Place data fetched in parallel with Promise.all

---

## **Goals & Problems Solved**

| Goal | Problem Solved |
|------|----------------|
| Make coordinating dinners easy | Centralize choices and preferences |
| Support local restaurant exposure | Organize by location and interest |
| Explore scalable backends | Firebase for login and data persistence |

---

## **Diagrams & Design**
The inspiration for the aesthetic of this project is restaurant menus. Using this app should feel a bit like browsing for a favorite dish.

## Inspiration
![plot](src/img/vintageMenu2.png)
![plot](src/img/vintageMenu1.png)

## Wireframes
Wireframes were designed with the support of Claude AI.
### Feed
![plot](src/img/feed.png)
### User Profile
![plot](src/img/user-profile.png)
### Place Profile
![plot](src/img/place-profile.png)
### Sign Up
![plot](src/img/sign-up.png)
### Sign In
![plot](src/img/sign-in.png)

---

## **Known Bugs**
- **Global Notes:** Notes are stored on the global `places` collection, not per-user. When any user edits notes, it changes for all users. Deprecated — replaced by Place Attributes concept for TS migration. Free-form thoughts captured in post captions.

---
 ## **Setup / Installation**

 ### Prerequisites
 - Node.js 18+ ([download](https://nodejs.org/))
 - Google account for Firebase/Google Cloud

 ### 1. Clone and Install
 ```bash
 git clone https://github.com/AsheUrban/Dine-Together.git
 cd Dine-Together
 npm install
 ```

 ### 2. Firebase Project Setup
 1. Go to [Firebase Console](https://console.firebase.google.com/) → Create project
 2. Add a Web App → Copy the config values to use in .env file (see step 4)
 3. Build → Authentication → Get started → Enable Email/Password
 4. Build → Firestore Database → Create database → Start in test mode

 ### 3. Google Places API Setup
 1. Go to [Google Cloud Console](https://console.cloud.google.com/) → Select your Firebase project
 2. APIs & Services → Library → Enable **Places API (New)**
 3. APIs & Services → Credentials → Create Credentials → API Key
 4. Create two keys:
    - **Frontend key**: Restrict to `http://localhost:3000/*`
    - **Server key**: No application restrictions (for Cloud Function)

 ### 4. Environment File
 Create `.env.local` in project root. Find these values in Firebase Console → Project Settings → Your apps → Web app (refer back to step 2):

 ```bash
 REACT_APP_FIREBASE_API_KEY=your_api_key
 REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
 REACT_APP_FIREBASE_PROJECT_ID=your-project-id
 REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
 REACT_APP_FIREBASE_SENDER_ID=your_sender_id
 REACT_APP_FIREBASE_APP_ID=your_app_id
 REACT_APP_GOOGLE_PLACES_API_KEY=your_frontend_api_key
 ```

 ### 5. Deploy Cloud Function (required for photos)
 ```bash
 npm install -g firebase-tools
 firebase login
 firebase use --add          # Select your project, alias: default
 firebase functions:secrets:set GOOGLE_PLACES_API_KEY   # Paste server API key
 cd functions && npm install && cd ..
 firebase deploy --only functions
 ```
 Update `PHOTO_FUNCTION_URL` in `src/services/googlePlacesService.js` with your deployed URL.

 ### 6. Run
 ```bash
 npm start
 ```
 Open [http://localhost:3000](http://localhost:3000)

 ### 7. Populate Test Data (optional)
 ```bash
 node DOCUMENTATION_/addTestData.js
 ```
 > **Note:** The [test data script](./DOCUMENTATION_/addTestData.js) is a template with placeholder values. To use it with your Firebase project:
 > 1. Create users via the Sign Up flow
 > 2. Save some places via Explore
 > 3. Update the script with your Firebase config, user IDs, and place IDs

 ---

 #### See [SETUP.md](./DOCUMENTATION_/SETUP.md) for step-by-step, in depth instructions with Firestore security rules and troubleshooting.
---

## **Project Structure**

```
src/
├── components/ (28 files)
│   ├── ActionBar.js           (Floating action buttons above footer nav)
│   ├── App.js                 (Main app with routing & auth state)
│   ├── Avatar.js              (User avatar component)
│   ├── ConfirmDialog.js       (Modal confirmation for delete operations)
│   ├── EditPlaceForm.js       (Edit place information)
│   ├── EditPostForm.js        (Edit post caption)
│   ├── EditUserProfileForm.js (Edit user profile bio)
│   ├── Explore.js             (Search restaurants via Google Places)
│   ├── Feed.js                (Display all posts from all users)
│   ├── Footer.js              (Bottom navigation - FEED, EXPLORE, PROFILE)
│   ├── Header.js              (Branding only)
│   ├── KebabMenu.js           (Reusable dropdown menu for actions)
│   ├── NewPostForm.js         (Create new post)
│   ├── NewProfileForm.js      (New user profile setup)
│   ├── Place.js               (Individual place card component)
│   ├── PlaceDetail.js         (Restaurant info display - purely presentational)
│   ├── PlaceGrid.js           (Grid display of places)
│   ├── PlaceProfile.js        (Feature container for viewing/interacting with a place)
│   ├── Post.js                (Individual social post component with ownership)
│   ├── PostList.js            (List display of posts)
│   ├── ProtectedRoute.js      (Auth-gated route wrapper)
│   ├── ReusablePlaceForm.js   (Reusable form component for places)
│   ├── ReusablePostForm.js    (Reusable form component for posts)
│   ├── ReusableProfileForm.js (Reusable form component for profiles)
│   ├── SignIn.js              (Sign in page)
│   ├── SignUp.js              (Sign up page)
│   ├── UserDetails.js         (User bio section)
│   └── UserProfile.js         (User profile with Posts and Restaurants tabs)
├── hooks/ (10 files)
│   ├── allPosts.js            (Subscribe to all posts for Feed)
│   ├── editMode.js            (Toggle edit/view state)
│   ├── exploreSearch.js       (Restaurant search with geolocation)
│   ├── formSubmit.js          (Form submission with loading/error states)
│   ├── place.js               (Subscribe to place by Firestore ID)
│   ├── placeSaveState.js      (Manage saved place state & "saved by" display)
│   ├── placeSelect.js         (Orchestrate place selection flow)
│   ├── user.js                (Current user state with subscription pattern)
│   ├── userPosts.js           (Subscribe to user's posts)
│   └── userPlaces.js          (Subscribe to user's saved places)
├── services/
│   ├── firebaseService.js     (Firebase CRUD and real-time subscriptions)
│   └── googlePlacesService.js (Google Places API REST calls)
├── styles/ (9 files)
│   ├── formStyles.js          (Form & input styled components)
│   ├── globalStyles.js        (Global theme & typography)
│   ├── postStyles.js          (Post card styled components)
│   ├── placeStyles.js         (Place card styled components)
│   ├── profileStyles.js       (Profile page styled components)
│   ├── avatarStyles.js        (Avatar styled components)
│   ├── feedStyles.js          (Feed page styled components)
│   ├── index.js               (Centralized style exports)
│   └── theme.js               (Design tokens - colors, fonts)
├── utils/
│   ├── textFormatters.js      (Format display text - addresses, price levels)
│   └── validators/
│       ├── authValidator.js   (Email/password validation)
│       ├── index.js           (Validator exports)
│       └── placeValidator.js  (Place form validation)
├── firebase.js                (Firebase configuration)
└── mood/                      (UI/UX design reference images)
``` 

## **Development Roadmap**

See [DEV_ROADMAP.md](./DOCUMENTATION_/DEV_ROADMAP.md) for development roadmap and process disclaimer.
See [FUTURE_DESIGN.md](./DOCUMENTATION_/FUTURE_DESIGN.md) for PlaceProfile V2 and Explore V2 design targets.
See [API_DESIGN.md](./DOCUMENTATION_/API_DESIGN.md) for migration considerations and deferred features.

---

## **License**

**All Rights Reserved** — This project is proprietary software.

Unauthorized use, reproduction, modification, or distribution is prohibited without explicit written permission from the author.

For inquiries regarding licensing or commercial use, contact: [theasheurban@gmail.com](mailto:theasheurban@gmail.com)

Copyright © 2026
*Ashe Urban*
