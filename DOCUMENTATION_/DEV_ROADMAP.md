## **Development Roadmap**

### **JavaScript MVP** | COMPLETE

- Posts/Places architectural separation (two Firestore collections)
- Profile page with tabbed interface (Posts | Restaurants)
- Place save/remove functionality
- 10 custom hooks for scalable state management
- Menu-style aesthetic with centralized styling
- KebabMenu integration across Feed, Profile, and PlaceProfile
- ConfirmDialog for delete confirmations
- Post edit/delete functionality
- View other users' profiles
- PlaceProfile architecture (PlaceDetail purely presentational, PlaceProfile as feature container)
- ActionBar component for floating action buttons
- Google Places Autocomplete in Explore (using Places API New via REST)
- Google Places Details API for full restaurant data
- Save flow with deduplication (findPlaceByGoogleId checks before creating)
- Route-based PlaceProfile (`/place/:placeId` with usePlace hook)
- Firebase Cloud Function proxy for secure photo fetching
- Place.js displays Google Places photos with error fallback
- Footer navigation, ActionBar, SignIn/SignUp redesign
- PlaceProfile and Explore wireframes complete
- Save flow with "Saved by" display and confirmation dialogs

## **TypeScript Migration (Post-MVP)**

Mobile-first rebuild with decided tech stack:
- **Framework:** Expo + React Native (single codebase for iOS/Android/web)
- **Backend:** Supabase (PostgreSQL for relational social queries - friends, groups, shared wishlists)
- **Data Fetching:** TanStack Query
- **Forms:** React Hook Form + Zod
- **Navigation:** React Navigation
- Build foundation for social features (friends, connections, reservation coordination with OpenTable/Resy)

See [FUTURE_DESIGN.md](./FUTURE_DESIGN.md) for PlaceProfile and Explore design targets.
See [API_DESIGN.md](./API_DESIGN.md) for migration considerations and deferred features.

---

## **Development Process Disclaimer**

This project was designed and developed by Ashe Urban with the support of Claude AI.

---