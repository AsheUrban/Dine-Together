# API Integration Design Document

**Created:** 2026-01-15
**Purpose:** Document architectural decisions, data flows, and implementation plans for external API integrations

---

## Table of Contents

- [Overview](#overview)
- [Architecture Decisions](#architecture-decisions)
  - [Decision 1: Separate Service Files](#decision-1-separate-service-files)
  - [Decision 2: Direct REST API](#decision-2-direct-rest-api-places-api-new)
  - [Decision 3: Manual Entry (Deprecated)](#decision-3-manual-entry-deprecated)
  - [Decision 4: Route-Based PlaceProfile](#decision-4-route-based-placeprofile-2026-01-18)
- [Google Places API Integration](#google-places-api-integration)
  - [Service Layer Design](#service-layer-design)
  - [Schema Evolution](#schema-evolution)
  - [Data Flows](#data-flows)
  - [Deduplication Strategy](#deduplication-strategy)
  - [Photo Strategy](#photo-strategy)
  - [Cost Optimization](#cost-optimization)
- [TypeScript Migration Considerations](#typescript-migration-considerations)
  - [Manual Entry Fallback](#manual-entry-fallback)
  - [Combined Search: Restaurants + Users](#combined-search-restaurants--users)
- [Future APIs (Reservations)](#future-apis-reservations)
- [Implementation Phases](#implementation-phases)
  - [Phase 1: Setup & Autocomplete — COMPLETE](#phase-1-setup--autocomplete--complete-2026-01-16)
  - [Phase 2: Place Details & Route Navigation — COMPLETE](#phase-2-place-details--route-navigation--complete-2026-01-18)
  - [Phase 3: Display Google Places Data — COMPLETE](#phase-3-display-google-places-data--complete)
  - [Phase 4: Save Flow — COMPLETE](#phase-4-save-flow--complete)
  - [TypeScript Migration: Future Implementation](#typescript-migration-future-implementation)
- [Future: Map Integration Strategy](#future-map-integration-strategy)

---

## Overview

Dine-Together's JavaScript MVP is complete with Google Places API-powered search. This document captures the design decisions that support the current MVP and the planned TypeScript/Supabase migration.

**Core Principle:** The service layer pattern isolates external API complexity from components. Components call service functions; services handle API calls, data transformation, and Firestore persistence.

---

## Architecture Decisions

### Decision 1: Separate Service Files

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| A. Extend firebaseService.js | Single source of truth | File grows large, mixes concerns |
| B. Create googlePlacesService.js | Clear separation, focused files | Coordination between services |
| C. Full service abstraction | Clean architecture, testable | More upfront work |

**Decision:** Option B for MVP, evolving to Option C in TypeScript.

Create `src/services/googlePlacesService.js` alongside `firebaseService.js`. Services can import and call each other when needed (e.g., after fetching from Google, save to Firestore).

**Rationale:**
- Keeps each service file focused and readable
- Natural separation: Firebase = persistence, Google = external data
- Sets up cleanly for TypeScript modular structure

### Decision 2: Direct REST API (Places API New)

**Original Plan:** `react-google-autocomplete` library with `usePlacesAutocompleteService` hook

**What Happened:** Google deprecated `AutocompleteService` for new customers (March 2025). The library relies on the legacy JavaScript SDK which is unavailable to new Google Cloud projects.

**Pivot Decision:** Use Places API (New) directly via REST calls.

**Implementation:**
- `googlePlacesService.js` makes fetch calls to `https://places.googleapis.com/v1/places:autocomplete`
- `useExploreSearch` hook handles debouncing, geolocation, and state management
- No external library dependencies - cleaner and more maintainable

**Benefits of REST approach:**
- No heavy Google Maps JavaScript SDK to load
- Full control over request/response handling
- Works with Places API (New) which is available to all customers
- Aligns with codebase patterns (custom hooks)
- Easier to test (mock fetch vs mock Google SDK)

### Decision 3: Manual Entry (Deprecated)

Manual restaurant entry is **deprecated**. May revisit as a future feature if there's a clear need (e.g., food trucks, pop-ups not in Google's database), but not actively planned.

**Original Rationale (preserved for context):**
- Essential for restaurants not in Google's database (new, food trucks, pop-ups)
- "Can't find it? Add manually" provides graceful fallback
- Schema supports both sources with `source: 'google' | 'manual'` field

### Decision 4: Route-Based PlaceProfile (2026-01-18)

**Problem Identified:** PlaceProfile currently renders inline (conditional render replaces Feed/UserProfile content). This causes:
- Header navigation blocked while viewing a place
- Browser back button doesn't work
- URLs not shareable
- Inconsistent with standard web patterns

**Decision:** PlaceProfile accessed via `/place/:placeId` route, fetches data by URL param.

**Options Evaluated:**

| Option | Pros | Cons |
|--------|------|------|
| A. Inline render (current) | No route setup | Nav blocked, no shareable URLs, non-standard |
| B. Route with state pass | Fast (no fetch) | Breaks on refresh, not shareable |
| C. Route with URL param fetch | Shareable, refresh works, standard pattern | Extra fetch |

**Decision:** Option C - Route with URL param fetch.

**Values Assessment:**
- **Simplicity:** One code path (always fetch by ID)
- **Testability:** Mock fetch, pass placeId - single scenario
- **Reusability:** Works everywhere: direct links, refresh, shares
- **Consistency:** Matches UserProfile pattern (uses `useParams`, fetches by ID)
- **Efficiency:** Single Firestore doc fetch is fast
- **Modern:** URL as source of truth is standard React Router pattern

**Implementation:**
1. Add `/place/:placeId` route to App.js
2. Create `usePlace(placeId)` hook (subscription pattern, matches `useUser`)
3. PlaceProfile uses `useParams()` to get placeId, calls `usePlace(placeId)`
4. Feed/UserProfile navigate to route instead of setting inline state
5. Remove `usePlaceSelection` hook (no longer needed)

**TypeScript Benefit:** Maps directly to React Query:
```typescript
const { data: place, isLoading } = useQuery(
    ['place', placeId],
    () => getPlaceById(placeId)
);
```

---

## Google Places API Integration

### Service Layer Design

```
src/services/
├── firebaseService.js     (existing - Firebase CRUD & subscriptions)
└── googlePlacesService.js (new - Google Places API operations)
```

**googlePlacesService.js responsibilities:**
1. Autocomplete search (returns predictions)
2. Place details fetch (returns full place data)
3. Photo URL construction
4. Data transformation (Google schema → our schema)

**firebaseService.js additions:**
1. `findPlaceByGoogleId(googlePlaceId)` - Check if place exists
2. `createPlace(placeData)` - Create place document
3. `getPlaceById(placeId)` - Fetch place by Firestore ID

**Orchestration pattern:**
Services do individual operations. Hooks orchestrate and manage state. This matches our established patterns (e.g., `usePlaceSaveState`) and maps cleanly to React Query in TypeScript.

```javascript
// hooks/placeSelect.js - NEW HOOK
import { findPlaceByGoogleId, createPlace } from '../services/firebaseService';
import { fetchPlaceDetails, transformPlaceDetails } from '../services/googlePlacesService';

export const usePlaceSelect = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const selectPlace = async (googlePlaceId) => {
        setLoading(true);
        setError(null);
        try {
            // Check if place already exists in Firestore
            const existing = await findPlaceByGoogleId(googlePlaceId);
            if (existing) return existing;

            // Fetch from Google API
            const googleData = await fetchPlaceDetails(googlePlaceId);

            // Transform and save to Firestore
            const placeData = transformPlaceDetails(googleData);
            return await createPlace(placeData);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { selectPlace, loading, error };
};
```

### Schema Evolution

**Current places schema:**
```javascript
{
    restaurantName: string,
    restaurantAddress: string,
    priceLevel: number,
    rating: number,
    userRatingsTotal: number,
    createdAt: timestamp
}
```

**New places schema:**
```javascript
{
    // Identity
    id: string,                    // Firestore doc ID
    googlePlaceId: string | null,  // Google place_id (null for manual)
    source: 'google' | 'manual',   // Discriminator field

    // Core (from Google or manual entry)
    restaurantName: string,        // Google: displayName.text
    restaurantAddress: string,     // Google: formattedAddress

    // Google API fields (null for manual entries)
    rating: number | null,         // Google: rating
    userRatingsTotal: number | null, // Google: userRatingCount
    priceLevel: string | null,     // Google: priceLevel (enum in new API)
    phone: string | null,          // Google: nationalPhoneNumber
    website: string | null,        // Google: websiteUri
    photoReferences: array | null, // Google: photos[].name
    primaryType: string | null,    // Google: primaryType (not yet fetched/stored — future: filtering, display tags)

    // Metadata
    createdAt: timestamp,
    lastUpdated: timestamp        // Not yet implemented — future: track data freshness
}
```

**Backward Compatibility:**
Existing places don't have `googlePlaceId` or `source`. Use on-read normalization:

```javascript
function normalizePlace(placeDoc) {
    const data = placeDoc.data();
    return {
        ...data,
        source: data.googlePlaceId ? 'google' : 'manual',
        googlePlaceId: data.googlePlaceId || null
    };
}
```

This avoids migration work now; batch migration happens in TypeScript phase.

### Data Flows

#### Flow 1: Search and Add Place (Google)

```
User types in Explore search
        │
        ▼
┌─────────────────────────────┐
│  useExploreSearch hook      │
│  (debounced, geolocation)   │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  Google Autocomplete API    │
│  Returns: predictions[]     │
│  (place_id, description)    │
└─────────────────────────────┘
        │
        ▼
User selects from dropdown
        │
        ▼
┌─────────────────────────────┐
│  usePlaceSelect hook        │
│  .selectPlace(place_id)     │
└─────────────────────────────┘
        │
        ├──► Check Firestore for existing place (by googlePlaceId)
        │           │
        │           ├── Found → Return existing place
        │           │
        │           └── Not found ▼
        │
        ▼
┌─────────────────────────────┐
│  Google Place Details API   │
│  Returns: full place data   │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  Transform to our schema    │
│  (displayName → restaurantName, etc.)
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  Save to Firestore          │
│  (places collection)        │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  Navigate to /place/:id     │
│  (route-based navigation)   │
└─────────────────────────────┘
```

#### Flow 2: View Place Details

```
User clicks place (from Feed, Profile, or search)
        │
        ▼
┌─────────────────────────────┐
│  navigate(`/place/${id}`)   │
│  (route-based navigation)   │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  PlaceProfile               │
│  usePlace(placeId)          │
│  usePlaceSaveState(placeId) │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  PlaceDetail renders data   │
│  ActionBar renders actions  │
│  KebabMenu (if saved)       │
└─────────────────────────────┘
```

### Deduplication Strategy

**Problem:** Without deduplication, the same restaurant gets saved multiple times.

**Solution:** Use `googlePlaceId` as canonical identifier.

Orchestration lives in `usePlaceSelect` hook (services do individual operations, hooks orchestrate):

```javascript
// hooks/placeSelect.js — checks for existing, fetches from Google if new, saves to Firestore
const selectPlace = async (googlePlaceId) => {
    const existing = await findPlaceByGoogleId(googlePlaceId);
    if (existing) return existing;

    const googleData = await fetchPlaceDetails(googlePlaceId);
    const placeData = transformPlaceDetails(googleData);
    return await createPlace(placeData);
};
```

```javascript
// firebaseService.js — dedup query
export const findPlaceByGoogleId = async (googlePlaceId) => {
    const q = query(
        collection(db, 'places'),
        where('googlePlaceId', '==', googlePlaceId),
        limit(1)
    );
    const snapshot = await getDocs(q);
    return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};
```

**Index required:** Create Firestore index on `googlePlaceId` field.

### Photo Strategy

**Decision (2026-01-20): Firebase Cloud Function Proxy**

API key must not be exposed client-side. Security is a baseline requirement.

**Implementation (2026-01-21):**

```javascript
// Firebase Cloud Function (functions/index.js) - uses onRequest for HTTP endpoint
exports.getPlacePhoto = onRequest(
    { cors: true, maxInstances: 10, secrets: [googlePlacesApiKey] },
    async (req, res) => {
        const { photoRef, maxWidth = "400" } = req.query;
        // Fetch from Google Places API, get photoUri, redirect to it
        res.redirect(data.photoUri);
    }
);

// Client-side helper (googlePlacesService.js) - pure URL construction
const CLOUD_FUNCTION_URL = 'https://us-central1-dine-together-2e4b4.cloudfunctions.net/getPlacePhoto';

export const getPhotoUrl = (photoReference, maxWidth = 400) => {
    if (!photoReference) return null;
    const encodedRef = encodeURIComponent(photoReference);
    return `${CLOUD_FUNCTION_URL}?photoRef=${encodedRef}&maxWidth=${maxWidth}`;
};

// Usage in components - URL works directly as img src
<img src={getPhotoUrl(place.photoReferences[0])} />
```

**Why `onRequest` (HTTP endpoint) over `onCall`:**
- Photos are consumed as URLs in `<img>` tags - URL can be the src directly
- Browser handles redirect automatically, no async call needed in component
- Platform-agnostic (just HTTP) - portable to Supabase Edge Functions
- No Firebase SDK dependency on client for photos
- Simpler: pure URL construction vs async callable + loading states

**Key Implementation Details:**
- PhotoRefs must be URL-encoded (slashes → `%2F`)
- Server-side API key stored in Firebase Secrets (separate key with no website restrictions)
- Function validates redirect domain (must be `*.googleusercontent.com`)

**Why Cloud Function Proxy:**
- API key stays server-side (security)
- Simple single function (6/6 on team values)
- No caching complexity needed at MVP scale
- Don't over-invest in Firebase given Supabase decision for TS refactor

**Rejected:** Firebase Storage caching - more complex, unnecessary for MVP.

**TypeScript Target (Supabase):** Edge Function with same HTTP pattern. Only change: update `CLOUD_FUNCTION_URL` constant to Supabase endpoint.

### Cost Optimization

#### Session Tokens (Deferred to TypeScript)

Session tokens group autocomplete keystrokes + place details fetch into one billing "session" for cost optimization.

**Decision:** Defer to TypeScript phase.

**Rationale:**
- Cost optimization, not architectural change
- Free tier sufficient for MVP (10K autocomplete, 5K details/month)
- Adding later is additive - just add `sessionToken` parameter to API calls
- Keeps Chunk 2 focused on core functionality

**Future implementation (TypeScript):**
```javascript
// Generate UUID for session, pass to autocomplete and details calls
const sessionToken = crypto.randomUUID();
// Include in API requests: { sessionToken } in request body
```

#### Field Masks

Request only needed fields to minimize costs:

**MVP:** Single field mask with all needed fields
```javascript
const PLACE_FIELDS = [
    'id',
    'displayName',
    'formattedAddress',
    'rating',
    'userRatingCount',
    'priceLevel',
    'nationalPhoneNumber',
    'websiteUri',
    'photos'
];
```

**TypeScript Target:** Context-specific field masks
```typescript
const AUTOCOMPLETE_FIELDS = ['id', 'displayName', 'formattedAddress'];
const CARD_FIELDS = [...AUTOCOMPLETE_FIELDS, 'rating', 'photos'];
const FULL_FIELDS = [...CARD_FIELDS, 'nationalPhoneNumber', 'websiteUri', 'userRatingCount'];
```

---

## TypeScript Migration Considerations

**Decided Tech Stack (2026-01-20):**
- **Mobile Framework:** Expo + React Native (mobile-first, single codebase)
- **Backend:** Supabase (PostgreSQL for relational social queries)
- **Data Fetching:** TanStack Query
- **Forms:** React Hook Form + Zod

Current service layer pattern translates directly: `firebaseService.js` → `supabaseService.ts`

### Discriminated Union Types

```typescript
interface BasePlace {
    id: string;
    restaurantName: string;
    restaurantAddress: string;
    createdAt: Timestamp;
    lastUpdated: Timestamp;
}

interface GooglePlace extends BasePlace {
    source: 'google';
    googlePlaceId: string;
    rating: number;
    userRatingsTotal: number;
    priceLevel: GooglePriceLevel;
    phone: string | null;
    website: string | null;
    photoReferences: string[];
    primaryType: string;
}

interface ManualPlace extends BasePlace {
    source: 'manual';
    googlePlaceId: null;
    rating: null;
    userRatingsTotal: null;
    priceLevel: null;
    phone: null;
    website: null;
    photoReferences: null;
    primaryType: null;
}

type Place = GooglePlace | ManualPlace;
```

**Benefit:** TypeScript enforces correct handling:
```typescript
function canEditField(place: Place): boolean {
    return place.source === 'manual';  // Only manual places are user-editable
}
```

### Service Layer Modularization

```
src/services/
├── supabase/
│   ├── posts.ts
│   ├── places.ts
│   └── users.ts
├── google/
│   ├── places.ts
│   └── photos.ts
├── types.ts          (shared interfaces)
└── index.ts          (unified exports)
```

### React Query Integration

```typescript
// Current (custom hooks)
const { places, loading } = useExploreSearch(query);
const { selectPlace, loading: selectLoading } = usePlaceSelect();

// TypeScript (React Query)
const { data: places, isLoading } = useQuery(
    ['restaurantSearch', query],
    () => googlePlacesService.search(query),
    { enabled: query.length > 2 }
);

const { mutate: selectPlace, isLoading: selectLoading } = useMutation(
    (googlePlaceId) => placeSelectionService.select(googlePlaceId)
);
```

### Manual Entry Fallback (Deprecated)

Deprecated — not actively planned. May revisit as a possible future feature if there's demand for adding restaurants not in Google's database (see Decision 3).

**Original concept (preserved for context):**
- "Can't find your restaurant? Add it manually" link below search results
- Minimal form: restaurant name (required), address (required)
- Saved with `source: 'manual'`, all Google-specific fields null

### Combined Search: Restaurants + Users

The Explore page will provide unified search across both restaurants (via Google Places API) and users (via Firestore/Supabase).

#### Unified Search Architecture

**Principle:** Design for combined results from the start.

**Why unified:**
- Single search bar, familiar UX
- No mode switching or tabs needed
- Results naturally grouped by type
- Adding user search is "plug in," not "refactor"

#### Result Types

```javascript
// Unified search result type
const SearchResult = {
    type: 'place' | 'user',
    id: string,           // placeId or userId
    data: PlaceResult | UserResult
};

// Place result (from Google Autocomplete)
const PlaceResult = {
    googlePlaceId: string,
    name: string,         // displayName
    address: string,      // formattedAddress
};

// User result (from Firestore)
const UserResult = {
    userId: string,
    username: string,
};
```

#### UI Structure

```
┌─────────────────────────────────────────────┐
│  Search restaurants or people...            │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│  RESTAURANTS                                │
│  ┌─────────────────────────────────────┐   │
│  │ Sushi Paradise                       │   │
│  │    123 Market St, San Francisco      │   │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────────────────────────┐   │
│  │ Sushi House                          │   │
│  │    456 Oak Ave, San Francisco        │   │
│  └─────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│  PEOPLE                                     │
│  ┌─────────────────────────────────────┐   │
│  │ @sushilover42                        │   │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────────────────────────┐   │
│  │ @susan_eats                          │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

**Display rules:**
- Show sections only if results exist (don't show empty "PEOPLE" section)
- Restaurants section appears first (primary use case)
- Minimum 2 characters before searching (prevents noise)
- Minimum 3 characters for user search (privacy consideration)

#### Hook Design

```javascript
// useExploreSearch.js - unified search hook
export const useExploreSearch = (query) => {
    const [places, setPlaces] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState({ places: false, users: false });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query.length < 2) {
            setPlaces([]);
            setUsers([]);
            return;
        }

        setLoading(prev => ({ ...prev, places: true }));
        searchPlaces(query)
            .then(results => {
                setPlaces(results);
                setLoading(prev => ({ ...prev, places: false }));
            });

        if (query.length >= 3) {
            setLoading(prev => ({ ...prev, users: true }));
            searchUsers(query)
                .then(results => {
                    setUsers(results);
                    setLoading(prev => ({ ...prev, users: false }));
                });
        } else {
            setUsers([]);
        }
    }, [query]);

    return {
        places,
        users,
        loading: loading.places || loading.users,
        placesLoading: loading.places,
        usersLoading: loading.users,
        error,
        hasResults: places.length > 0 || users.length > 0
    };
};
```

**Key design decisions:**
- Parallel queries (don't wait for places to finish before searching users)
- Separate loading states (can show partial results)
- Different character thresholds (2 for places, 3 for users)

#### User Search Implementation

```javascript
export const searchUsers = async (query) => {
    const normalizedQuery = query.toLowerCase();
    // Prefix matching for case-insensitive search
    const q = firestoreQuery(
        collection(db, 'users'),
        where('usernameLower', '>=', normalizedQuery),
        where('usernameLower', '<', normalizedQuery + '\uf8ff'),
        limit(5)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        userId: doc.id,
        username: doc.data().username
    }));
};
```

**Schema requirement:** Add `usernameLower` field to users collection for case-insensitive search.

#### Combined Data Flow

```
User types "sushi" in search bar
        │
        ▼
┌─────────────────────────────────────────────┐
│  useExploreSearch('sushi')                  │
└─────────────────────────────────────────────┘
        │
        ├──────────────────────┬──────────────────────┐
        │                      │                      │
        ▼                      ▼                      │
┌───────────────┐    ┌───────────────┐               │
│ Google Places │    │  Firestore    │               │
│ Autocomplete  │    │  Users Query  │               │
│ (debounced)   │    │               │               │
└───────────────┘    └───────────────┘               │
        │                      │                      │
        ▼                      ▼                      │
   predictions[]          users[]                    │
        │                      │                      │
        └──────────┬───────────┘                      │
                   │                                  │
                   ▼                                  │
        ┌─────────────────────┐                      │
        │  Explore.js renders │                      │
        │  - Restaurants      │                      │
        │  - People           │                      │
        └─────────────────────┘                      │
                   │                                  │
        ┌──────────┴──────────┐                      │
        │                     │                      │
        ▼                     ▼                      │
User clicks             User clicks                  │
restaurant              user                         │
        │                     │                      │
        ▼                     ▼                      │
┌───────────────┐    ┌───────────────┐              │
│ Fetch details │    │ Navigate to   │              │
│ Save to DB    │    │ /profile/:id  │              │
│ → PlaceProfile│    │               │              │
└───────────────┘    └───────────────┘              │
```

---

## Future APIs (Reservations)

### Landscape

| API | Access | Notes |
|-----|--------|-------|
| OpenTable | Partnership required | Most established |
| Resy | Partnership required | Growing platform |
| Yelp Reservations | Yelp Fusion API | Requires approval |
| Google Reserve | Limited | Business Profile integration |

### Architecture: Provider Pattern

```typescript
// Common interface all reservation providers implement
interface ReservationProvider {
    searchAvailability(
        placeId: string,
        partySize: number,
        date: Date
    ): Promise<TimeSlot[]>;

    createReservation(params: ReservationParams): Promise<Reservation>;

    cancelReservation(reservationId: string): Promise<void>;
}

// Factory to get the right provider
function getReservationProvider(place: Place): ReservationProvider | null {
    if (place.openTableId) return new OpenTableProvider(place.openTableId);
    if (place.resyVenueId) return new ResyProvider(place.resyVenueId);
    return null;  // No reservation integration for this place
}
```

### Schema Preparation

Add placeholder fields now for future integration:
```javascript
{
    // ... existing fields ...

    // Reservation provider IDs (null until integrated)
    openTableId: string | null,
    resyVenueId: string | null,
    yelpBusinessId: string | null
}
```

### Graceful Degradation

```typescript
function PlaceProfile({ place }) {
    const reservationProvider = getReservationProvider(place);

    return (
        <>
            <PlaceDetail place={place} />
            {reservationProvider ? (
                <ReservationWidget provider={reservationProvider} />
            ) : (
                <ExternalLinkButton url={place.website}>
                    Visit Website to Reserve
                </ExternalLinkButton>
            )}
        </>
    );
}
```

---

## Implementation Phases

### Phase 1: Setup & Autocomplete | COMPLETE (2026-01-16)
1. Google Cloud Console setup (enable APIs, create key, set restrictions)
2. Pivoted from library to REST API (see Decision 2)
3. Create `googlePlacesService.js` with `searchPlaces()` and transform functions
4. Create `useExploreSearch` hook with geolocation and debouncing
5. Update Explore.js with autocomplete UI

### Phase 2: Place Details & Route Navigation | COMPLETE (2026-01-18)

**2a. Route-Based PlaceProfile Architecture**
1. Create `/place/:placeId` route in App.js
2. Create `usePlace` hook - fetches place by Firestore ID (matches `useUser` pattern)
3. Update PlaceProfile to use URL params + `usePlace` hook
4. Refactor Feed.js - navigate to `/place/:id` instead of inline rendering
5. Refactor UserProfile.js - navigate to `/place/:id` instead of inline rendering
6. Remove `usePlaceSelection` hook (no longer needed)

**2b. Google Places Integration**
1. Add `fetchPlaceDetails()` to googlePlacesService.js
2. Add `findPlaceByGoogleId()` to firebaseService.js
3. Add `createPlace()` to firebaseService.js
4. Add `getPlaceById()` to firebaseService.js
5. Create Firestore index on `googlePlaceId` field
6. Create `usePlaceSelect` hook (orchestrates dedup + fetch + create)
7. Wire selection flow in Explore.js → `usePlaceSelect` → navigate to `/place/:id`

### Phase 3: Display Google Places Data | COMPLETE
1. Place cards (Place.js) display photos, rating, price from Google data
2. `getPhotoUrl(photoReference, maxWidth)` helper in googlePlacesService.js
3. Cloud Function photo proxy (`getPlacePhoto`)

### Phase 4: Save Flow | COMPLETE
1. PlaceProfile ActionBar shows "Add" button (if not saved)
2. `usePlaceSaveState` hook manages save state, "Saved by" display
3. Save/remove flow with confirmation dialog

### TypeScript Migration: Future Implementation
Items deferred from MVP to post-migration:

**PlaceDetail Enhancements:**
1. Rating display with star icon + userRatingsTotal (review count)
2. PriceLevel display ($ symbols)
3. Phone (clickable tel: link)
4. Website (clickable external link)
5. Photo display in detail view using photoReferences
6. Static map image showing location

**Location Data:**
1. Add `location` (lat/lng) to PLACE_FIELDS
2. Update `transformPlaceDetails` to include location
3. Store coordinates for future map features

**Combined Search (Restaurants + Users):**
1. Add `searchUsers` to firebaseService
2. Wire user search into `useExploreSearch`
3. Combined results UI in Explore.js

**Post Creation from PlaceProfile:**
1. Add "Create Post" button in PlaceProfile
2. Wire post creation flow

**Manual Entry:**
1. Deprecated — possible future feature (see Decision 3)

**Map Integration:**
1. Enable Maps JavaScript API in Google Cloud Console
2. Map view toggle in Explore (list view vs map view)
3. Nearby Search API for map browse mode
4. Text Search API for "search on map" functionality
5. Full map integration (search results + map sync, saved places on map)

---

## Future: Map Integration Strategy

### Hybrid Search Approach

Explore will offer two search modes, each optimized for its use case:

| Mode | API | User Intent | Returns |
|------|-----|-------------|---------|
| Text search | Autocomplete + Details | "I know the name" | Fast typeahead, details on select |
| Map browse | Nearby Search | "What's around here?" | Full details + coordinates for all |
| Map + text (TS) | Text Search | "Show me 'sushi' on map" | Full details + coordinates for all |

### Why Hybrid?

**Autocomplete** is optimized for typeahead:
- Fast, lightweight responses
- Cheap ($2.83/1K requests)
- But no coordinates until you fetch details

**Nearby Search / Text Search** returns full data:
- Coordinates for all results (enables map pins)
- Ratings, photos available immediately
- But heavier, more expensive ($32/1K requests)

Using both gives best UX for each mode without compromise.

### Implementation Path

1. Store `location` (lat/lng) in schema - sets foundation
2. Static map on PlaceProfile via server-side proxy - quick win
3. Map view in Explore with Nearby Search - visual browsing
4. Text Search for "search on map" - full integration

### Technical Notes

**Nearby Search API (New):**
```javascript
// Request
POST https://places.googleapis.com/v1/places:searchNearby
{
    "includedTypes": ["restaurant"],
    "locationRestriction": {
        "circle": {
            "center": { "latitude": 37.7749, "longitude": -122.4194 },
            "radius": 5000
        }
    }
}
// Returns array of places with full details including location
```

**Static Map for PlaceProfile:**
```javascript
// Server-side proxy (same pattern as getPlacePhoto Cloud Function)
// API key stays server-side, client constructs proxy URL
const STATIC_MAP_FUNCTION_URL = '...'; // Cloud Function / Supabase Edge Function

const getStaticMapUrl = (lat, lng) => {
    return `${STATIC_MAP_FUNCTION_URL}?lat=${lat}&lng=${lng}&zoom=15&size=400x200`;
};
```

---
