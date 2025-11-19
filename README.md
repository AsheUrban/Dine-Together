
# **Dine-Together**

### By *Ashe Urban*

---

## **Project Overview**
**Ongoing Independent Project** — React-based web application using Firebase (Auth + Firestore) with a modern, scalable service-layer architecture.

Dine-Together is a prototype React app designed with a single goal in mind: to make planning dinners with friends simple. No more back-and-forth, easily see which restaurants all parties are interested in going to, make a reservation in app, everyone gets notified. Done. While this goal was ambitious and not reached by this project, it continues to be an idea I have yet to see executed well and hope to return to one day!

The main branch features auth-gated UI, username profiles, protected routes, and a real-time post/queue experience backed by Firebase. The codebase has been refactored with a clean service-layer architecture to support future API integrations (Google Places API).

The remodel banch features major UI/UX updates and restyling of the app.
---

## **Technologies Used**

| Core | Frontend | APIs / BaaS | Architecture |
|------|----------|-------------|---------|
| JavaScript, JSX | React 18 | Firebase (Auth, Firestore) | Service Layer Pattern |
| CSS | Styled Components | Google Places API *(In Progress)* | Centralized Styling |

---

## **Description**
The MVP goal was a React application with:
- User authentication and profile management
- A wishlist/queue of places to eat
- Browser-based API integration (Google Places)

**Current Status:** The codebase has been significantly refactored with a clean service-layer architecture. The **main** branch now features:
- Protected routes with centralized authentication
- Username-based user profiles with Firestore integration
- Separate sign-up and sign-in pages
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
│   ├── Feed.js                (Display all restaurants - main feed view)
│   ├── Profile.js             (User profile - view own restaurants)
│   ├── Explore.js             (Search restaurants & manual add)
│   ├── PostDetail.js          (Detail view with edit/delete - manages own state)
│   ├── PostList.js            (Reusable list component)
│   ├── ProtectedRoute.js      (Auth-gated route wrapper)
│   ├── NewPostForm.js         (Create new restaurant)
│   └── EditPostForm.js        (Edit restaurant details)
├── hooks/
│   └── postSelection.js       (Custom hook for post selection state)
├── services/
│   ├── firebaseService.js     (Firebase CRUD operations)
│   └── validators/            (Input validation utilities)
├── styles/
│   ├── formStyles.js          (Form & input styled components)
│   ├── globalStyles.js        (Global theme & typography)
│   ├── postStyles.js          (Post card styled components)
│   ├── profileStyles.js       (Profile page styled components)
│   ├── feedStyles.js          (Feed page styled components)
│   └── index.js               (Centralized style exports)
└── firebase.js                (Firebase configuration)
```

---

## **Next Steps**

**Remodel Branch (In Progress):**
- Complete vintage aesthetic UI redesign
- Implement Google Places API integration for restaurant search
- Build out Explore page with API results and manual fallback

**Main Branch (Post-Remodel):**
The codebase is ready for Google Places API integration:

1. Install `@react-google-maps/api` package
2. Implement restaurant search in Explore component
3. Add autocomplete and restaurant details to forms
4. Integrate real restaurant photos from API
5. Polish and test end-to-end workflows

---

## **License**
*Educational Use Only* — created as part of a software development curriculum.  

Copyright © 2022  
*Ashe Urban*  

**Contact:** [theasheurban@gmail.com](mailto:theasheurban@gmail.com)

> Reference: [Create React App docs](https://create-react-app.dev/)