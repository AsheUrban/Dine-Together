
# **Dine-Together**

### By *Ashe Urban*

---

## **Project Overview**
**Capstone Project** — React-based web application using **Firebase** (Auth + Firestore). An alternate branch begins to explore the **Google Places API** approach and remains a WIP.

Dine-Together is a prototype React app designed with a single goal in mind: to make planning dinners with friends simple.  No more back-and-forth, easily see which restuarants all parties are interested in going to, make a reservation in app, everyone get's notified. Done. While this goal was ambitious and not reached by this project, it contintues to be an idea I have yet to see executed well and hope to return to one day!

The main branch focuses on auth-gated UI and a real-time post/queue experience backed by Firebase.

---

## **Technologies Used**

| Core | Frontend | APIs / BaaS | Tooling |
|------|----------|-------------|---------|
| JavaScript, JSX | React | **Firebase** (Auth, Firestore) | npm, Webpack, Babel |
| CSS | Styled Components | **Google Places API** *(AltApproach branch)* | Markdown |

---

## **Description**
The MVP goal was a React application with:
- User authentication and profile management
- A wishlist/queue of places to eat
- Browser-based API integration (OpenTable or Google Places)

Due to browser/API limitations, the Places integration moved to an alternate branch. The **main** branch demonstrates modern React structure with Firebase authentication and a real-time UI pattern.

---

## **Goals & Problems Solved**

| Goal | Problem Solved |
|------|----------------|
| Make coordinating dinners easy | Centralize choices and preferences |
| Support local restaurant exposure | Organize by location and interest |
| Explore scalable backends | Firebase for login and data persistence |

---

## **Diagrams & Design**
* ![plot](src/img/capstone.png) - _Mock up of branding and colors_
* ![plot](src/img/capstonecolorpalette.png) - _Color palette (HEX)_
* ![plot](src/img/capstoneflow1.jpg) - _System & component diagram_
* ![plot](src/img/capstoneflow2.jpg) - _Additional planning notes_

---

## **Challenges Encountered**
- Google places API doesn't have an endpoint for use in the browser.
- Google API documentation is difficult to understand and navigate.
- Could not address access-control-allow-orgin header required error. See AltApproach branch.
- CORs extention would allow me to "access" the API but then blocked firebase -- Google wants CORs enabled!
- By time I discovered the React Google Places API, I was out of time for this project.

---

## **Known Bugs**
- No exception handling for submitting empty form fields.
- Google Places integration is **not** wired on the main branch (see AltApproach).

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

## **AltApproach Branch (Google Places API)**
This branch attempts integration with the **Google Places API**.

```bash
git checkout AltApproach
```

1. Obtain a **Google API Key**.  
2. Create `.env.local` and add your key:  

   ```bash
   REACT_APP_GOOGLE_PLACES_API_KEY=YOUR_KEY
   ```
3. Restart the development server after adding environment variables.
4. Keep `.env.local` out of source control.
---

## **License**
*Educational Use Only* — created as part of a software development curriculum.  

Copyright © 2022  
*Ashe Urban*  

**Contact:** [theasheurban@gmail.com](mailto:theasheurban@gmail.com)

> Reference: [Create React App docs](https://create-react-app.dev/)