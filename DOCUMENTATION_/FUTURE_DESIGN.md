# Dine-Together Future Design

Design targets for the TS/Supabase/React Native migration. Wireframes exist but details are being refined.

**Last Updated:** 2026-02-10

---

## Table of Contents

- [Explore](#explore)
- [PlaceProfile](#placeprofile)

---

## Explore

**Wireframe:** `src/img/explore.png`

### Two Browse Modes

Explore has two ways to find restaurants in a single view. They don't compete — the search bar is a shortcut, the map is for browsing.

**Text Search Mode:**
- Search bar at top with autocomplete (proven in Firebase MVP)
- User types → autocomplete list appears over the map
- Select a result → navigate to PlaceProfile
- Map is unaffected by search — stays showing nearby pins

**Map Browse Mode:**
- User touches/drags the map → search bar collapses (doesn't disappear)
- Nearby Search API populates pins based on visible map area
- Pins update as user pans/zooms
- Tap a pin → preview card appears

### Preview Card (on pin tap)

Appears as an overlay when a pin is tapped on the map.

**Content:** Restaurant name, location, price level, rating

**Actions:**
- **Tap card** → navigate to PlaceProfile
- **Save button** → quick save (addToSavedPlaces, no navigation)
- **Go button** → open directions in Google Maps

### Map Component

Shared reusable `<Map>` component used by both Explore and PlaceProfile.
- **Explore:** Multiple pins, pan/zoom to browse nearby
- **PlaceProfile:** Single pin, centered on restaurant location
- **Dependency:** Google Maps JavaScript SDK (`@react-google-maps/api`)
- API key already restricted to include Maps JavaScript API (verified 2026-02-10)

### Filter Chips (Ideas)

**TOP RATED** — Client-side sort of nearby results by rating. Trivial to implement.

**FRIENDS' PICKS** — Highlights places saved by people you follow on the map. Depends on the follow system being built first.

**NEARBY** — Core functionality. Nearby Search API provides pins as user browses the map. Different endpoint from the autocomplete search.

### Dependencies

- Nearby Search API (different endpoint from autocomplete)
- Google Maps JavaScript SDK
- Follow system (for FRIENDS' PICKS filter only)

---

## PlaceProfile

**Wireframe:** `src/img/place-profile-v2.png`

**Status:** Needs detailed discussion before implementation. Wireframe is aspirational — specific sections and data requirements need to be talked through.

### Layout (from wireframe, not yet confirmed)

```
┌─────────────────────────────────────┐
│ Restaurant Header                   │
│   Name                    ★ Rating  │
│   Type | Price                      │
├─────────────────────────────────────┤
│ Hero Photo                          │
│                                     │
├─────────────────────────────────────┤
│ Photo Thumbnails (gallery)          │
│ [1] [2] [3] [4] [5]                │
├─────────────────────────────────────┤
│ SAVED BY X FRIENDS                  │
│ (avatar circles)                    │
├─────────────────────────────────────┤
│ Map Card                            │
│ ┌─────────────────────────────────┐ │
│ │         (interactive map)       │ │
│ │                                 │ │
│ ├─────────────────────────────────┤ │
│ │ Street Address                  │ │
│ │ City, State ZIP                 │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Details Card                        │
│ ┌─────────────────────────────────┐ │
│ │ HOURS      Tue-Sat 5pm-10pm    │ │
│ │ PHONE      (503) 544-2100      │ │
│ │ WEBSITE    canardpdx.com       │ │
│ │ REVIEWS    847 on Google       │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ WHAT FRIENDS SAY (X)                │
│ ┌─────────────────────────────────┐ │
│ │ (B) Username        2 hours ago│ │
│ │ "Caption text here"            │ │
│ ├─────────────────────────────────┤ │
│ │ (F) Username          1 week ago│ │
│ │ "Caption text here"            │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ - END -                             │
└─────────────────────────────────────┘

ActionBar (fixed bottom-left):
[←] [+] [share] [navigate]
```

**ActionBar Buttons:**
1. **Back** — Navigate back
2. **Save (+)** — Add to wishlist (hidden if already saved)
3. **Share** — Create post about this place (triggers create post flow)
4. **Navigate** — Open directions in Google Maps

**Responsive ActionBar Behavior:**
- **Web (>480px):** All 4 buttons displayed inline horizontally
- **Mobile (≤480px):** Collapsed to single expandable FAB (speed dial pattern)

**New Data Requirements:**
- `location` (lat/lng) — Required for map display and navigate button
- `currentOpeningHours` — For HOURS display
- `primaryType` — For "French, Wine Bar" subtitle

**New Query Required:**
- `subscribeToPostsByPlace(placeId)` — For "What Friends Say" section
