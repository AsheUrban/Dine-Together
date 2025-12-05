
# **Dine-Together**

### By *Ashe Urban*

---

## **Project Overview**
**Ongoing Independent Project** — React-based web application using Firebase (Auth + Firestore) with a modern, scalable service-layer architecture.

Dine-Together is a prototype React app designed with a single goal in mind: to make planning dinners with friends simple. No more back-and-forth, easily see which restaurants all parties are interested in going to, make a reservation in app, everyone gets notified. Done. While this goal was ambitious and not reached by this project, it continues to be an idea I have yet to see executed well and hope to return to one day!

**Remodel branch** (this branch) is the active development branch where all new work happens. All features are implemented here first. Currently working on KebabMenu and ConfirmDialog integration for post edit/delete functionality.

**Main branch** is a functional snapshot synced with remodel on 2025-12-04. It represents the current state of work and runs without errors, though some features are pending implementation.

| Branch | Status | Focus |
|--------|--------|-------|
| **remodel** | Active Development | All new work developed here. Next: KebabMenu and ConfirmDialog implementation for post edit/delete. |
| **main** | Development Snapshot (2025-12-04) | Synced with remodel. Functional snapshot representing current state of active development. |

---

## **Technologies Used**

| Core | Frontend | APIs / BaaS | Architecture |
|------|----------|-------------|---------|
| JavaScript, JSX | React 18 | Firebase (Auth, Firestore) | Service Layer Pattern |
| CSS | Styled Components | Google Places API *(In Progress)* | Centralized Styling |

---

## **Architecture**

This project uses a **service-layer pattern** to separate concerns and keep components clean:

- **Posts & Places Collections** — Posts (social wrappers with captions) reference Places (restaurant data) by ID. One Place can be referenced by multiple Posts, keeping data normalized and shareable.
- **Service Layer** (`firebaseService.js`) — Centralizes all Firebase operations (auth, CRUD, subscriptions) and joins Post + Place data at the service level, so components receive complete data in props.
- **Custom Hooks** — 11 reusable hooks manage component state (data subscriptions, form handling, edit modes, delete confirmations), promoting code reuse and testability.
- **Styled Components** — Centralized styling system with 8 style files, maintaining consistent theme and visual language across the app.

This architecture scales cleanly: adding Google Places API integration requires changes only to the service layer and firebaseService.js, not to component logic.

### **Service Layer Pattern**

The **service layer** (`firebaseService.js`) sits between components and external services (Firebase, APIs). Instead of components calling Firebase directly, they call service functions.

**Benefits:**
- **Separation of concerns** — Components focus on UI; service layer handles data logic
- **Reusability** — Multiple components can use the same service functions without duplication
- **Testability** — Service logic can be tested independently from UI
- **Flexibility** — Swapping Firebase for a different backend requires changes only in the service layer
- **API Integration** — Adding Google Places API calls happens in the service layer without touching components

**Example:** When Explore.js needs to search restaurants, it calls `firebaseService.searchRestaurants()` instead of directly calling Google Places API. The service layer handles the API call, error handling, and data transformation. Components receive clean data ready to display.

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
│       ├── restaurantName (string)
│       ├── restaurantAddress (string)
│       ├── notes (string) - User observations/details
│       ├── priceLevel (number) - 1-4 price indicator
│       ├── rating (number) - Google Places rating
│       ├── userRatingsTotal (number) - Number of ratings
│       └── createdAt (timestamp) - When place was added to system
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
- Service layer joins Post + Place data when fetching (no N+1 queries)

---

## **Description**
The MVP goal was a React application with:
- User authentication and profile management
- A wishlist/queue of places to eat
- Browser-based API integration (Google Places)

**Current Status:** The **remodel** branch features a complete architectural separation of Posts (social) and Places (restaurants) collections:
- Posts as social wrappers with captions and timestamps
- Places as restaurant data that can be referenced by multiple posts
- Profile page with tabbed interface (Posts | Restaurants)
- Feed displays all posts from all users with place data joined at service layer
- Place edit/update and delete functionality
- Protected routes with centralized authentication
- Username-based user profiles with Firestore integration
- Reusable styled components in a centralized styles directory
- Firebase service layer for database operations
- Ready for Google Places API integration

---

## **Goals & Problems Solved**

| Goal | Problem Solved |
|------|----------------|
| Make coordinating dinners easy | Centralize choices and preferences |
| Support local restaurant exposure | Organize by location and interest |
| Explore scalable backends | Firebase for login and data persistence |

---

## **Diagrams & Design**
The inspiration for the aesthetic of this project is vintage menus. Colors were selected that provide a sense of nostalgia and warmth. Using this app should feel a bit like browswer an old menu for a favorite dish.
![plot](src/img/colorPalette.png)
![plot](src/img/vintageMenu3.png)
![plot](src/img/vintageMenu2.png)
![plot](src/img/vintageMenu1.png)

---

## **Challenges Encountered & Solutions**
- **CORS Limitations:** Google Places API has browser-based CORS restrictions. Solution: Using `@react-google-maps/api` library which handles this properly.
- **Architecture Scalability:** Original monolithic component structure made it difficult to add new features cleanly. Solution: Refactored to service-layer architecture with reusable styled components.
- **State Machine Complexity:** Feed component had multiple overlapping states (form visibility, editing, selected post). Solution: Simplified to use custom hooks and moved form handling to appropriate components (Explore for add, PostDetail for edit).
- **Post Author Data Fetching:** Displaying posts required fetching author usernames, creating potential N+1 request problem. Solution: Denormalized `authorUsername` into post documents for simplicity. Tradeoff: If username changes are implemented, will require batch migration of post documents. This pragmatic choice optimizes for current MVP scale; future TypeScript rebuild can use modern patterns (React Query, Suspense) if needed.
---

## **Known Bugs**
- Google Places integration is **in progress** (ready for development).
---

## **Setup / Installation (Main Branch)**
> You need a Firebase project and a local environment file to run the app.

1. **Clone and install**
   ```bash
   git clone https://github.com/AsheUrban/Dine-Together.git
   cd Dine-Together
   npm install
   ```

2. **Create a Firebase project**
   - Go to [Firebase Console](https://console.firebase.google.com) and create a new project.
   - Add a **Web App** to retrieve your Firebase config (API key, project ID, etc.).
   - Enable **Authentication** (Email/Password or Google Sign-In) under *Build → Authentication*.
   - Create a **Cloud Firestore** database (test or production mode is fine).

3. **Create `.env.local` (required)**
   - In the project root, create a file named `.env.local`
   - Add your Firebase config variables exactly as they appear in your Firebase console:  
     ```bash
     REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
     REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
     REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
     REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
     REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
     ```
   - Add `.env.local` to `.gitignore` and **do not commit** this file.

4. **Run the app**
   ```bash
   npm run build
   npm start
   ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:**  
> - If Firestore reads/writes fail, check your **Firebase Rules** and confirm authentication is enabled.  
> - The app checks `auth.currentUser` to gate access. You must log in before creating or viewing posts.

---

## **Project Structure**

```
src/
├── components/
│   ├── App.js                 (Main app with routing & auth state)
│   ├── SignIn.js              (Sign in page)
│   ├── SignUp.js              (Sign up page)
│   ├── Header.js              (Navigation header with user info)
│   ├── Feed.js                (Display all posts from all users)
│   ├── Profile.js             (User profile with Posts and Restaurants tabs)
│   ├── Explore.js             (Search restaurants & manual add - WIP)
│   ├── PlaceDetail.js         (View/edit saved place details)
│   ├── EditPlaceForm.js       (Edit place information)
│   ├── ReusablePlaceForm.js   (Reusable form component for places)
│   ├── Post.js                (Individual social post component with ownership)
│   ├── PostList.js            (List display of posts)
│   ├── PlaceList.js           (List display of places)
│   ├── PlaceGrid.js           (Grid display of places)
│   ├── ProfileDetails.js      (User bio section)
│   ├── ProtectedRoute.js      (Auth-gated route wrapper)
│   ├── KebabMenu.js           (Reusable dropdown menu for Post/Place actions)
│   ├── ConfirmDialog.js       (Modal confirmation for delete operations)
│   └── ReusablePostForm.js    (Reusable form component for posts)
├── hooks/
│   ├── useEditMode.js         (Toggle edit/view state)
│   ├── useFormSubmit.js       (Form submission with loading/error states)
│   ├── usePlaceSelection.js   (Track selected place)
│   ├── useUserPosts.js        (Subscribe to current user's posts)
│   ├── useUserPlaces.js       (Subscribe to current user's saved places)
│   ├── useAllPosts.js         (Subscribe to all posts for Feed)
│   ├── usePostUpdate.js       (Handle post update logic)
│   ├── usePlaceUpdate.js      (Handle place update logic)
│   └── usePlaceSaveState.js   (Manage saved place state & "saved by" display)
├── services/
│   └── firebaseService.js     (Firebase CRUD and real-time subscriptions)
├── styles/
│   ├── formStyles.js          (Form & input styled components)
│   ├── globalStyles.js        (Global theme & typography)
│   ├── postStyles.js          (Post card styled components)
│   ├── placeStyles.js         (Place card styled components)
│   ├── profileStyles.js       (Profile page styled components)
│   ├── avatarStyles.js        (Avatar styled components)
│   ├── FeedStyles.js          (Feed page styled components)
│   └── index.js               (Centralized style exports)
├── firebase.js                (Firebase configuration)
└── mood/                      (UI/UX design reference images)
```

---

## **Development Roadmap**

### **Phase 1: JavaScript MVP (Current - Remodel Branch)**

**Completed:**
- Posts/Places architectural separation (two Firestore collections)
- Profile page with tabbed interface (Posts | Restaurants)
- Place edit/update and delete functionality
- 11 custom hooks for scalable state management
- Vintage menu aesthetic with centralized styling

**In Progress:**
- KebabMenu component integration (menu built, wiring to Post.js and callbacks in progress)
- ConfirmDialog component for delete confirmations (built, integration pending)
- Post edit/delete functionality via KebabMenu and ConfirmDialog
- Feed and Profile callback handling for post actions
- Responsive design refinements

**Pending Before API Integration:**
- Complete KebabMenu wiring into Post.js, Feed.js, and Profile.js
- Test end-to-end post edit/delete workflows
- Form validation and error handling
- PlaceDetail refactor to use KebabMenu + ConfirmDialog for consistency
- Responsive design polishing

### **Phase 2: Google Places API Integration**

1. Install `@react-google-maps/api` package
2. Implement restaurant search in Explore component
3. Add autocomplete functionality to forms
4. Display real restaurant photos from API
5. Integrate API data into place creation flow
6. Test end-to-end workflows and polish UX

### **Phase 3: TypeScript Refactor (Post-MVP)**

After the JavaScript version is polished and deployed:
- Migrate codebase to TypeScript
- Introduce React Query for advanced state management
- Add Zod/Yup for schema validation
- Implement Suspense for async boundaries
- Build foundation for social features (friends, connections, reservations)

---

## **Development Process**

This is an independent educational project owned and developed by Ashe Urban. Claude (Anthropic's AI assistant) is used as a development tool to provide guidance, suggestions, and explanations.

**Ownership & Workflow:**
- Ashe maintains full ownership of all code and makes all implementation decisions
- All commits are authored by Ashe
- Claude provides direction → Ashe implements → Review together
- This ensures deep learning through hands-on problem-solving while leveraging AI assistance for guidance and architectural discussion

**Collaboration Approach:**
- Claude always reads code first before making recommendations
- Architectural decisions are discussed before implementation
- Code changes are explained with reasoning (the "why", not just the "what")
- Each step is deliberate and traceable
- Questions are treated as learning opportunities, not direction changes
- Forward momentum is maintained with clear next steps

**Code Presentation (Claude → Ashe):**
- Changes are presented in diff format with color-coded additions/removals
- Complete files are provided, never just snippets
- Inline comments explain the "why" behind changes
- Related changes are grouped together logically
- Code is mentally tested for syntax and indentation before presentation

---

## **License**

**All Rights Reserved** — This project is proprietary software.

Unauthorized use, reproduction, modification, or distribution is prohibited without explicit written permission from the author.

For inquiries regarding licensing or commercial use, contact: [theasheurban@gmail.com](mailto:theasheurban@gmail.com)

Copyright © 2025
*Ashe Urban*

> Reference: [Create React App docs](https://create-react-app.dev/)