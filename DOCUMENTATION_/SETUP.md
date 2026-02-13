# Dine-Together Setup Guide

Detailed setup instructions for first-time Firebase and Google Cloud users. Allow 30-60 minutes for complete setup.

---

## Prerequisites

- **Node.js 18+** (v20 LTS recommended) — [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** — [Download](https://git-scm.com/)
- **Google account** (for Firebase and Google Cloud Console)

Verify your setup:
```bash
node --version   # Should be v18.x or higher
npm --version    # Should be v9.x or higher
git --version
```

---

## Step 1: Clone and Install Dependencies

```bash
git clone https://github.com/AsheUrban/Dine-Together.git
cd Dine-Together
npm install
```

---

## Step 2: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** (or "Add project")
3. Enter a project name (e.g., `dine-together-dev`)
4. **Google Analytics**: You can disable this (not required)
5. Click **"Create project"** and wait for setup to complete
6. Click **"Continue"** when ready

---

## Step 3: Register a Web App

1. In your Firebase project dashboard, click the **web icon** (`</>`)
   - Look for "Add app" if you don't see it immediately
2. Enter an app nickname (e.g., `dine-together-web`)
3. **DO NOT** check "Also set up Firebase Hosting"
4. Click **"Register app"**
5. You'll see your Firebase configuration values:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`
6. **Save these values** — you'll need them for your `.env.local` file
7. Click **"Continue to console"**

---

## Step 4: Enable Firebase Authentication

1. In the Firebase Console sidebar, click **"Build"** → **"Authentication"**
2. Click **"Get started"**
3. In the **"Sign-in method"** tab, click **"Email/Password"**
4. Toggle **"Enable"** to ON
5. Leave "Email link (passwordless sign-in)" OFF
6. Click **"Save"**

---

## Step 5: Create Firestore Database

1. In the Firebase Console sidebar, click **"Build"** → **"Firestore Database"**
2. Click **"Create database"**
3. Choose a location closest to your users (e.g., `us-central1`)
   - **This cannot be changed later**
4. Select **"Start in test mode"** for now
5. Click **"Create"**

### Configure Security Rules

After creating the database:

1. Click the **"Rules"** tab in Firestore
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;

      // User's saved places subcollection
      match /userPlaces/{placeId} {
        allow read: if request.auth != null;
        allow write: if request.auth != null && request.auth.uid == userId;
      }
    }

    // Posts collection
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null
        && request.auth.uid == resource.data.userId;
    }

    // Places collection (shared restaurant data)
    match /places/{placeId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }

    // Track who saved each place
    match /placeSavedBy/{placeId}/users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"**

---

## Step 6: Set Up Google Places API

The app uses Google Places API for restaurant search. Firebase automatically creates a Google Cloud project with the same name.

### 6a. Access Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click the project dropdown in the top bar
3. Select your Firebase project (same name as your Firebase project)

### 6b. Enable Required APIs

1. Go to **"APIs & Services"** → **"Library"**
2. Search for and enable these APIs (click each one, then click **"Enable"**):
   - **Places API (New)**
   - **Maps JavaScript API** (for future map features)

### 6c. Create Frontend API Key

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** → **"API key"**
3. Click **"Edit API key"** (pencil icon)
4. Rename to `Frontend API Key`
5. Under **"Application restrictions"**:
   - Select **"HTTP referrers (web sites)"**
   - Add: `http://localhost:3000/*`
   - Add: `http://localhost:3001/*`
6. Under **"API restrictions"**:
   - Select **"Restrict key"**
   - Check: Places API (New), Maps JavaScript API
7. Click **"Save"**
8. Copy this key — use as `REACT_APP_GOOGLE_PLACES_API_KEY` in `.env.local`

### 6d. Create Server API Key (for Cloud Function)

1. Click **"+ CREATE CREDENTIALS"** → **"API key"** again
2. Click **"Edit API key"**
3. Rename to `Server API Key`
4. Under **"Application restrictions"**: Leave as **"None"**
5. Under **"API restrictions"**:
   - Select **"Restrict key"**
   - Check: Places API (New)
6. Click **"Save"**
7. Copy this key — you'll use it in Step 8 for Firebase Secrets

---

## Step 7: Create Environment File

Create a file named `.env.local` in the project root (same folder as `package.json`).

Add your Firebase config values from Step 3:

```bash
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_GOOGLE_PLACES_API_KEY=your_frontend_api_key
```

**Important:**
- The file must be named exactly `.env.local` (with the leading dot)
- No spaces around the `=` signs
- No quotes around values
- This file is gitignored — never commit it

---

## Step 8: Deploy Cloud Function

The app uses a Cloud Function to securely fetch restaurant photos (keeps the API key hidden from browsers).

### 8a. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 8b. Log in to Firebase

```bash
firebase login
```
This opens a browser — log in with the same Google account you used for Firebase.

### 8c. Link Your Project

```bash
firebase use --add
```
- Select your Firebase project from the list
- When asked for an alias, type `default`

### 8d. Set the API Key Secret

```bash
firebase functions:secrets:set GOOGLE_PLACES_API_KEY
```
- Paste your **Server API Key** from Step 6d
- Press Enter

### 8e. Install Function Dependencies

```bash
cd functions
npm install
cd ..
```

### 8f. Deploy

```bash
firebase deploy --only functions
```

After deployment, you'll see output like:
```
Function URL (getPlacePhoto): https://us-central1-YOUR-PROJECT.cloudfunctions.net/getPlacePhoto
```

### 8g. Update Function URL in Code

Open `src/services/googlePlacesService.js` and update line 5 with your function URL:

```javascript
const PHOTO_FUNCTION_URL = 'https://us-central1-YOUR-PROJECT.cloudfunctions.net/getPlacePhoto';
```

---

## Step 9: Run the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

### First Steps in the App

1. Click **"SIGN UP"** to create an account
2. After signing up, you'll see the Feed (empty initially)
3. Click **"EXPLORE"** to search for restaurants
4. Search for a restaurant, click a result to view details
5. Click **"+"** to save it to your list
6. Go to **"PROFILE"** to see your saved places

---

## Step 10: Populate Test Data (Optional)

```bash
node addTestData.js
```

**Note:** This script uses hardcoded IDs from the development database. To use with your project:
1. Create users via Sign Up
2. Save places via Explore
3. Get user IDs from Firestore Console (users collection)
4. Get place IDs from Firestore Console (places collection)
5. Update `addTestData.js` with your IDs

---

## Troubleshooting

### Authentication Errors

**"Firebase: Error (auth/configuration-not-found)"**
- Double-check `.env.local` values match Firebase Console exactly
- Restart the dev server after creating/editing `.env.local`

**"Firebase: Error (auth/invalid-api-key)"**
- Your `REACT_APP_FIREBASE_API_KEY` is incorrect
- Copy it again from Firebase Console → Project Settings

### Firestore Errors

**"Permission denied" or "Missing or insufficient permissions"**
- Check Firestore Security Rules (Step 5)
- Make sure you're signed in (app requires authentication)
- Verify rules were published (not just saved)

**"Could not reach Cloud Firestore backend"**
- Check your internet connection
- Verify `REACT_APP_FIREBASE_PROJECT_ID` is correct

### Photos Not Loading

**Photos show placeholder or fail to load**
- Verify Cloud Function deployed successfully (Step 8)
- Check `PHOTO_FUNCTION_URL` in `googlePlacesService.js` matches your deployed URL
- Check Cloud Function logs: `firebase functions:log`

**"Failed to fetch photo" in console**
- Verify Firebase Secret was set correctly (Step 8d)
- Check that Places API (New) is enabled in Google Cloud

### Search Not Working

**"Places API error" or no search results**
- Verify Places API (New) is enabled in Google Cloud Console
- Check that your Frontend API Key has correct referrer restrictions
- Make sure `http://localhost:3000/*` is in allowed referrers

**"This API key is not authorized"**
- You're using the wrong API key
- Frontend key should have referrer restrictions
- Check API restrictions include Places API (New)

### General Issues

**App shows "Loading..." forever**
- Check browser console (F12) for errors
- Verify all `.env.local` values are correct
- Try signing out and back in

**Changes to `.env.local` not taking effect**
- Stop the dev server (Ctrl+C)
- Run `npm start` again (env vars only load at startup)

**"Module not found" errors**
- Run `npm install` in project root
- For function errors, run `npm install` in `/functions` folder

---

## Getting Help

If you're still stuck:
1. Check browser console (F12 → Console tab) for specific errors
2. Check Firebase Console → Firestore for data issues
3. Check Google Cloud Console → APIs for API issues
4. Review Cloud Function logs: `firebase functions:log`
