# Dine-Together Design Document

**Last Updated:** 2026-01-20
**Status:** ACTIVE - Phase 3 planning complete (photos via Cloud Function, PlaceDetail design)

---

## Table of Contents

- [Component Architecture](#component-architecture)
- [Feed Flows](#feed-flows)
- [Profile Flows](#profile-flows)
- [Explore Flows](#explore-flows)
- [PlaceProfile Flows](#placeprofile-flows)
- [Implementation Priority](#implementation-priority)
- [Data Integrity & Photo Strategy](#data-integrity--photo-strategy)

---

## Component Architecture

### Place-Related Component Hierarchy

```
Feed.js / UserProfile.js (Route-level containers - manage state, hooks, navigation)
│
├── PostList / PlaceGrid (list rendering)
│   └── Post / Place (PlaceCard) (compact preview - presentational)
│
└── PlaceProfile (Feature-level container - place viewing/interaction)
    ├── PlaceDetail (restaurant info - purely presentational)
    ├── NotesSection (FUTURE - after API integration)
    │   └── KebabMenu (Edit Notes, Remove)
    └── ActionBar (fixed bottom)
        ├── Back button (left)
        ├── "Saved by" info (center) - DONE
        └── Add (+) button (right, when not saved)
```

**Current State:** PlaceProfile contains PlaceDetail + ActionBar. KebabMenu is temporarily positioned top-right of PlaceProfile. NotesSection will be designed after Google Places API integration provides real data/photos to inform layout decisions.

### Component Definitions

**PlaceCard (Place.js)** - Compact summary view
- Used in: Post.js (embedded), PlaceGrid (Profile Restaurants tab)
- Purely presentational
- Shows: name, address, price, rating
- Clickable → opens PlaceProfile

**PlaceDetail** - Restaurant data display
- Purely presentational (receives props only, no hooks, no Firebase)
- Shows: name, address, photos, rating, price (from Google API or manual entry)
- NOT editable by users (data comes from API or original creator)
- Receives `place` prop, renders UI

**PlaceProfile** - Feature-level container for viewing/interacting with a place
- Composes: PlaceDetail + NotesSection + ActionBar
- Manages: edit mode state, remove confirmation, action handlers
- Makes Firebase calls: updatePlace (for notes), removeFromSavedPlaces
- Rendered by Feed.js / UserProfile.js when a place is selected

**NotesSection** - User's personal notes layer (FUTURE - after API integration)
- Will show user's notes for this place (from userPlaces subcollection)
- Two fields:
  - `generalNote` - public, shown when others view your saved list
  - `privateNote` - private, only you see it
- Will contain KebabMenu for Edit Notes / Remove actions
- Only appears when user has saved the place
- Design deferred until Google Places API provides real data/photos to inform layout

**ActionBar** - Fixed bottom action container
- Purely presentational (receives children)
- Fixed positioning at bottom of screen
- Contains: Back button, "Saved by" info, Add button (conditional)

### Key Architectural Principles

1. **PlaceDetail is read-only:** Place data (name, address, rating) comes from Google API or original creator. Users cannot edit this data.

2. **Notes are per-user:** Each user's notes live in their `userPlaces` subcollection, not on the global `places` document.

3. **KebabMenu edits notes, not place data:** The Edit action in KebabMenu opens a form to edit the user's generalNote/privateNote, not the restaurant information.

4. **Layered containers:**
   - Route containers (Feed/UserProfile) decide *what* to show
   - Feature container (PlaceProfile) manages *how* to interact
   - Presentational components (PlaceDetail, ActionBar) just render props

---

## Feed Flows

### User Flow: Feed - View Posts and Navigate to PlaceProfile

**Status: WORKING**

```
User navigates to /feed
    ↓
Feed.js renders
    ↓
useAllPosts() // Hook: Real-time subscription to all posts
    ↓
subscribeToAllPosts(callback) // firebaseService.js line 52
    ↓
Firestore: onSnapshot(collection('posts'), orderBy('timeOpen', 'desc'))
    ↓
For each post doc: await getDoc(doc(db, 'places', placeId))
    ↓
callback(posts) // Array with post + place data merged
    ↓
Feed.js: const { posts, error } = useAllPosts()
    ↓
Posts display correctly with all data (avatar, username, caption, place, "Saved by")
    ↓
const { selectedPlace, handleSelectPlace, handleBackToList } = usePlaceSelection();
    ↓
const handleChangingSelectedPlace = (postId, place, authorId) => {
    handleSelectPlace(place);
};
    ↓
Conditional render based on selectedPlace
    ↓
if (selectedPlace) → <PlaceProfile place={selectedPlace} onBack={handleBackToList} isSaved={isSaved} onAdd={savePlace} />
    ↓
else:
<PostList postList={posts} onPostSelection={handleChangingSelectedPlace} />
    ↓
PostList.js: Maps posts array
    ↓
posts.map(post => <Post {...postData} onPostClick={props.onPostSelection} />)
    ↓
Post.js: Renders PostCard with onClick
    ↓
<PostCard onClick={handleClick}>
    ↓
handleClick = () => { onPostClick(postId, place, authorId); }
    ↓
onPostClick → handleChangingSelectedPlace(postId, place, authorId)
    ↓
handleSelectPlace(place) // usePlaceSelection hook
    ↓
setSelectedPlace(place)
    ↓
Feed re-renders with selectedPlace
    ↓
<PlaceProfile place={selectedPlace} onBack={handleBackToList} isSaved={isSaved} onAdd={savePlace} />
    ↓
PlaceProfile renders:
├── PlaceDetail (restaurant info)
├── NotesSection (if user saved this place)
│   └── KebabMenu (Edit Notes, Remove)
└── ActionBar
    ├── Back button
    ├── "Saved by" info
    └── Add (+) button (if not saved)
```

---

### User Flow: Feed - Edit/Delete Post via KebabMenu

**Status: WORKING**

```
Feed.js: State management
const [editingPostId, setEditingPostId] = useState(null);
const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, message: '', postId: null });
    ↓
Feed.js: Handler functions
const handleEditPost = (postId) => {
    setEditingPostId(postId);
};

const handleDeletePost = (postId) => {
    setConfirmDialog({
        isOpen: true,
        message: 'Are you sure you want to delete this post?',
        postId: postId
    });
};

const confirmDeletePost = async () => {
    await deletePost(confirmDialog.postId);
    setConfirmDialog({ isOpen: false, message: '', postId: null });
};

const handleSaveEditPost = async (postData) => {
    await updatePostCaption(postData.id, postData.caption);
    setEditingPostId(null);
};
    ↓
Feed.js: Compute ownership for each post (Container handles logic)
const postsWithOwnership = posts.map(post => ({
    ...post,
    isOwner: post.userId === auth.currentUser.uid
}));
    ↓
Feed.js: Pass enhanced posts to PostList
<PostList
    postList={postsWithOwnership}
    onPostSelection={handleChangingSelectedPlace}
    onEditPost={handleEditPost}
    onDeletePost={handleDeletePost}
/>
    ↓
PostList.js: Pass ownership through to Post (Presentational - no logic)
<Post
    {...existingProps}
    isOwner={post.isOwner}
    onEditPost={props.onEditPost}
    onDeletePost={props.onDeletePost}
/>
    ↓
Post.js: Component structure
import { PostCard, PostHeader, PostHeaderLeft, Username, PostCaption, PostWrapper, PlacedDate, LinkStyle } from '../styles';
import KebabMenu from './KebabMenu';

function Post({ postId, authorId, username, caption, place, timeOpen, onPostClick, isOwner, onEditPost, onDeletePost }) {
    const handleMenuItemClick = (item) => {
        if (item.id === 'edit') {
            onEditPost(postId);
        } else if (item.id === 'delete') {
            onDeletePost(postId);
        }
    };

    return (
        <PostCard onClick={handleClick}>
            <PostHeader>
                <PostHeaderLeft>
                    <Avatar displayName={username} variant="profile"/>
                    <Username>{username}</Username>
                </PostHeaderLeft>
                {isOwner && (
                    <KebabMenu
                        items={[
                            { id: 'edit', label: 'Edit Post' },
                            { id: 'delete', label: 'Delete Post' }
                        ]}
                        onItemClick={handleMenuItemClick}
                    />
                )}
            </PostHeader>
            {/* ... rest of post */}
        </PostCard>
    );
}
    ↓
User clicks KebabMenu → "Delete Post"
    ↓
KebabMenu: handleItemClick → onItemClick(item)
    ↓
Post: handleMenuItemClick(item) → onDeletePost(postId)
    ↓
Feed: handleDeletePost(postId) → setConfirmDialog state
    ↓
Feed.js: Render ConfirmDialog
{confirmDialog.isOpen && (
    <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        message={confirmDialog.message}
        onConfirm={confirmDeletePost}
        onCancel={() => setConfirmDialog({ isOpen: false, message: '', postId: null })}
    />
)}
    ↓
User clicks "Confirm" button
    ↓
ConfirmDialog: onConfirm() → confirmDeletePost()
    ↓
firebaseService: deletePost(postId)
    ↓
Firestore: Post document deleted
    ↓
onSnapshot callback fires
    ↓
Feed re-renders without deleted post
```

---

### User Flow: Feed - Edit Post via KebabMenu

**Status: WORKING**

```
User clicks KebabMenu → "Edit Post"
    ↓
KebabMenu: handleItemClick → onItemClick(item)
    ↓
Post: handleMenuItemClick(item) → onEditPost(postId)
    ↓
Feed: handleEditPost(postId) → setEditingPostId(postId)
    ↓
Feed.js: Conditional render EditPostForm
{editingPostId && (
    <EditPostForm
        post={posts.find(p => p.id === editingPostId)}
        onEditPost={handleSaveEditPost}
        onBack={() => setEditingPostId(null)}
        onDelete={handleDeletePost}
    />
)}
    ↓
EditPostForm.js renders
<ReusablePostForm caption={post.caption} onSubmit={handleSubmit} />
    ↓
User edits caption, clicks "Save"
    ↓
EditPostForm: handleSubmit(postData) → onEditPost({ ...postData, id: post.id })
    ↓
Feed: handleSaveEditPost(postData)
await updatePostCaption(postData.id, postData.caption)
setEditingPostId(null)
    ↓
firebaseService: updateDoc(postRef, { caption })
    ↓
Firestore: Post document updated
    ↓
onSnapshot fires → posts array updates
    ↓
Feed re-renders with updated caption
```

---

### User Flow: Feed - Save Place from Someone Else's Post

**Status: WORKING (via PlaceProfile)**

**Core Principle:** User can save places to wishlist WITHOUT creating posts (decoupled social from wishlist).

```
User browsing Feed sees interesting post
    ↓
Clicks post card → PlaceProfile opens
    ↓
PlaceProfile renders with place data
    ↓
Feed.js passes: isSaved, isLoading, savePlace (from usePlaceSaveState hook)
    ↓
PlaceProfile renders ActionBar with conditional Add button
    ↓
If NOT saved:
    ActionBar contains: Back button + "Saved by" info + Add (+) button
    ↓
User clicks Add (+) button
    ↓
PlaceProfile: onAdd() → Feed.js: savePlace()
    ↓
usePlaceSaveState.js: savePlace() function
    ↓
setIsLoading(true)
    ↓
firebaseService.js: savePlace(auth.currentUser.uid, place)
    ↓
Batch writes:
  1. users/{userId}/userPlaces/{placeId} - { placeId, timeAdded }
  2. placeSavedBy/{placeId}/users/{userId} - { userId, timeAdded }
await batch.commit()
    ↓
Firestore: Place linked to user's wishlist
    ↓
usePlaceSaveState: setIsSaved(true)
    ↓
PlaceProfile re-renders:
  - Add button disappears from ActionBar
  - NotesSection appears (user can now add notes)
  - KebabMenu appears in NotesSection (Edit Notes, Remove)
    ↓
Place now appears in user's Profile → Restaurants tab
    ↓
Post's "Saved by" count updates to include current user
```

**Key Point:** Saving someone else's place does NOT create a post. User can LATER create a post if they want to share.

---

## Profile Flows

### User Flow: Profile - Restaurants Tab (Click Place)

**Status: WORKING**

```
User navigates to /profile
    ↓
Profile.js renders
    ↓
const { username, userBio, loading, error } = useUser(auth.currentUser.uid)
    ↓
useEffect: subscribeToUserPlaces(auth.currentUser.uid, callback)
    ↓
firebaseService.js: subscribeToUserPlaces
    ↓
Firestore: onSnapshot(collection(db, 'users', userId, 'userPlaces'), orderBy('timeAdded', 'desc'))
    ↓
For each userPlace doc: await getDoc(doc(db, 'places', placeId))
    ↓
callback(places) → setMainPlaceList(places)
    ↓
const { selectedPlace, handleSelectPlace, handleBackToList } = usePlaceSelection()
    ↓
activeTab === 'places' // DEFAULT
    ↓
<PlaceGrid placeList={mainPlaceList} onPlaceSelection={handleChangingSelectedPlace} />
    ↓
PlaceGrid.js: Maps places array
    ↓
places.map(place => <Place {...placeData} whenPlaceClicked={onPlaceSelection} />)
    ↓
Place.js: Renders clickable card
    ↓
<PlaceItem onClick={() => props.whenPlaceClicked(props.id)}>
    ↓
User clicks place card
    ↓
whenPlaceClicked(props.id) called
    ↓
PlaceGrid.onPlaceSelection(placeId) called
    ↓
Profile.js: handleChangingSelectedPlace(id)
const selection = mainPlaceList.filter(place => place.id === id)[0]
handleSelectPlace(selection)
    ↓
usePlaceSelection: setSelectedPlace(selection)
    ↓
UserProfile.js: selectedPlace state updated
    ↓
Conditional render:
if (selectedPlace) → <PlaceProfile place={selectedPlace} onBack={handleBackToList} isSaved={isSaved} onAdd={savePlace} onPlaceUpdate={handlePlaceUpdate} />
    ↓
PlaceProfile renders:
├── PlaceDetail (restaurant info - read-only)
├── NotesSection (user's notes - since viewing own saved list)
│   ├── generalNote display
│   ├── privateNote display
│   └── KebabMenu (Edit Notes, Remove)
└── ActionBar
    ├── Back button
    └── "Saved by" info (shows who else saved this place)
```

---

### User Flow: Profile - Posts Tab (Click Post)

**Status: WORKING**

```
Profile.js: User clicks "Posts" tab
    ↓
setActiveTab('posts')
    ↓
useEffect: subscribeToUserPosts(auth.currentUser.uid, callback)
    ↓
firebaseService.js: subscribeToUserPosts(userId, callback)
    ↓
Firestore: onSnapshot(query(collection('posts'), where('userId', '==', userId), orderBy('timeOpen', 'desc')))
    ↓
For each post: await getDoc(doc(db, 'places', placeId))
    ↓
callback(posts) → setUserPosts(posts)
    ↓
Posts display correctly with all data (avatar, username, caption, place, "Saved by")
    ↓
Conditional render:
activeTab === 'posts':
    ↓
Profile.js: Add handleChangingSelectedPostPlace function
const handleChangingSelectedPostPlace = (postId, place, authorId) => {
    handleSelectPlace(place);
};
    ↓
Profile.js: Add edit/delete state and handlers (same pattern as Feed.js)
const [editingPostId, setEditingPostId] = useState(null);
const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, message: '', postId: null });

const handleEditPost = (postId) => { setEditingPostId(postId); };
const handleDeletePost = (postId) => {
    setConfirmDialog({ isOpen: true, message: 'Are you sure...?', postId });
};
const confirmDeletePost = async () => {
    await deletePost(confirmDialog.postId);
    setConfirmDialog({ isOpen: false, message: '', postId: null });
};
const handleSaveEditPost = async (postData) => {
    await updatePostCaption(postData.id, postData.caption);
    setEditingPostId(null);
};
    ↓
Profile.js: Compute ownership for each post (Container handles logic)
const userPostsWithOwnership = userPosts.map(post => ({
    ...post,
    isOwner: post.userId === auth.currentUser.uid  // Always true for user's own posts
}));
    ↓
<PostList
    postList={userPostsWithOwnership}
    onPostSelection={handleChangingSelectedPostPlace}
    onEditPost={handleEditPost}
    onDeletePost={handleDeletePost}
/>
    ↓
User clicks post card → selectPlaceFromPost(postId, place, authorId)
    ↓
handleSelectPlace(place)
    ↓
setSelectedPlace(place)
    ↓
UserProfile re-renders with selectedPlace
    ↓
<PlaceProfile place={selectedPlace} onBack={handleBackToList} isSaved={isSaved} onAdd={savePlace} onPlaceUpdate={handlePlaceUpdate} />
```

---

### User Flow: View Other User's Profile

**Status: PLANNED - Priority #1**

**Entry Points:**
1. Post header (avatar or username) in Feed
2. "Saved by" username links in Post.js
3. People search results in Explore

```
User clicks on another user's avatar/username
    ↓
Post.js: handleProfileClick calls onUserClick(userId) with stopPropagation
    ↓
Parent (Feed.js or Profile.js): onUserClick handler navigates to /profile/{userId}
    ↓
Profile.js renders
    ↓
const { userId } = useParams() // Get userId from URL
    ↓
const isOwnProfile = userId === auth.currentUser.uid
    ↓
const { username, userBio, loading, error } = useUser(userId)
    ↓
Error handling: if user not found → Show "User not found" message
    ↓
useEffect: subscribeToUserPosts(userId, callback)
useEffect: subscribeToUserPlaces(userId, callback)
    ↓
Conditional rendering based on isOwnProfile:

┌─────────────────────────────────────────┐
│ OWN PROFILE (isOwnProfile = true)       │
├─────────────────────────────────────────┤
│ - ProfileDetails: edit link visible     │
│ - KebabMenu on posts (edit/delete)      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ OTHER'S PROFILE (isOwnProfile = false)  │
├─────────────────────────────────────────┤
│ - ProfileDetails: no edit link          │
│ - No KebabMenu on posts                 │
└─────────────────────────────────────────┘
    ↓
User browses other user's posts and saved restaurants
    ↓
Click on a place → PlaceProfile
    ↓
PlaceProfile behavior based on YOUR saved state (not profile owner's):
├── PlaceDetail (restaurant info - always shown)
├── NotesSection visibility:
│   - If viewing from THEIR saved list: shows THEIR generalNote (not privateNote)
│   - If YOU saved this place: shows YOUR notes with KebabMenu (Edit Notes, Remove)
│   - If YOU didn't save it: NotesSection hidden
└── ActionBar:
    - Back button (always)
    - "Saved by" info (always)
    - Add (+) button (if YOU haven't saved it)
```

**Key Points:**
- Callback pattern: Post.js emits `onUserClick(userId)`, parent handles navigation
- UserProfile component checks: `userId === auth.currentUser.uid` to show/hide edit controls
- UserDetails receives `isOwnProfile` prop to conditionally render edit link
- PlaceProfile shows content based on current user's saved state AND access path
- NotesSection shows other user's generalNote (public) but never their privateNote
- Other users' saved lists are public (social discovery)
- Enables finding restaurants through trusted friends
- useUser hook subscription pattern supports this (designed for it)
- Avatar and username must use stopPropagation to prevent PostCard click
- Error handling for non-existent users (invalid userId in URL)

**Implementation:**

Post.js:
- Add `onUserClick` prop (callback)
- `handleProfileClick(event, userId)` → `stopPropagation()` + `onUserClick(userId)`
- Wrap Avatar/Username in clickable element with onClick
- Make "Saved by" usernames clickable with same pattern

PostList.js:
- Accept and pass through `onUserClick` prop to Post

Feed.js:
- Add `handleUserClick(userId)` → `navigate(/profile/${userId})`
- Pass to PostList as `onUserClick`

UserProfile.js:
- Import `useParams` from react-router-dom
- `const { userId } = useParams()`
- `const isOwnProfile = userId === auth.currentUser.uid`
- Use `userId` (not `auth.currentUser.uid`) for useUser and subscriptions
- Handle error state for non-existent users
- Pass `isOwnProfile` to UserDetails
- Add `handleUserClick` and pass to PostList

UserDetails.js:
- Add `isOwnProfile` prop
- Conditionally render edit link: `{isOwnProfile && <EditProfileLink>...}`

---

## Explore Flows

**Core Principle:** Users can save places to wishlist WITHOUT creating posts (decoupled social from wishlist).

### User Flow: Explore - Combined Search (Restaurants + People)

**Status: PLANNED - Priority #3**

**Design Decision (2026-01-11):** Single search bar queries both Google Places API (restaurants) and Firestore (users). Results displayed in two sections with restaurants first (primary use case).

```
User navigates to /explore
    ↓
Explore.js renders with single search input
    ↓
User types search query (e.g., "mike")
    ↓
On input change (debounced):
    ↓
Two parallel queries execute:
  1. Google Places API: Autocomplete for restaurants matching query
  2. Firestore: Query users where username contains query
    ↓
Results displayed in two sections (restaurants first):

┌─────────────────────────────────┐
│  🔍 "mike"                      │
├─────────────────────────────────┤
│  RESTAURANTS                    │
│  ┌─────────────────────────┐    │
│  │ 🍽️ Mike's Diner          │    │
│  │ 🍽️ Mike's Pizza Palace   │    │
│  └─────────────────────────┘    │
│                                 │
│  PEOPLE                         │
│  ┌─────────────────────────┐    │
│  │ 👤 mike_eats             │    │
│  │ 👤 mikey123              │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
    ↓
User clicks on a RESTAURANT result:
    → Fetch full place details via Google Places Details API
    → Show PlacePreview with restaurant data
    → Options: "Add to Wishlist" / "Create Post"
    ↓
User clicks on a PERSON result (avatar + username):
    → Navigate to /profile/{userId}
    → View that user's profile (read-only)
```

**Key Decisions:**
- Restaurants appear above People (primary use case is restaurant discovery)
- User search queries `username` field only
- User results show avatar + username only (no bio snippet)
- Avatars use initials (user-selected photos deferred to TS refactor)

**Why Combined Search:**
- Better UX than tabs (no upfront decision required)
- Better UX than prefix-based (no hidden syntax to learn)
- Discoverable — user might find friends they weren't specifically looking for
- Clean for TS refactor (discriminated union type for results)

**New Service Function Required:**

```javascript
// firebaseService.js - USER SEARCH

/**
 * Search users by username (case-insensitive partial match)
 * @param {string} searchTerm - The search query
 * @param {number} limit - Max results to return (default 10)
 * @returns {Promise<Array<{userId: string, username: string}>>}
 */
export const searchUsersByUsername = async (searchTerm, limit = 10) => {
    // Firestore doesn't support native "contains" search
    // Options:
    //   1. Range query: username >= searchTerm && username < searchTerm + 'z'
    //      - Only matches start of username (prefix search)
    //   2. Store lowercase username field for case-insensitive search
    //   3. Use Algolia/ElasticSearch for full-text (future enhancement)
    //
    // MVP approach: Prefix search with lowercase comparison

    const searchLower = searchTerm.toLowerCase();
    const endTerm = searchLower + '\uf8ff'; // Unicode high char for range end

    const usersRef = collection(db, 'users');
    const q = query(
        usersRef,
        where('usernameLower', '>=', searchLower),
        where('usernameLower', '<', endTerm),
        orderBy('usernameLower'),
        limit(limit)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        userId: doc.id,
        username: doc.data().username
    }));
};
```

**Firestore Schema Update Required:**
- Add `usernameLower` field to users collection (lowercase copy of username)
- Update SignUp.js to store both `username` and `usernameLower`
- One-time migration for existing users (or handle missing field gracefully)

---

### User Flow: Explore - Restaurant Selection from Search

**Status: PLANNED - Priority #3**

```
User clicks on a RESTAURANT result from search
    ↓
Fetch full place details via Google Places Details API:
{
  place_id,
  name, // restaurantName
  formatted_address, // restaurantAddress
  photos: [ { photo_reference, height, width } ], // Fetch via Photo API
  rating,
  price_level,
  user_ratings_total,
  website,
  formatted_phone_number
}
    ↓
Show PlacePreview (inline or modal) with:
  - Restaurant photo (from Google Photos API)
  - Name, address, rating, price level
  - Website, phone
  - "Add to Wishlist" button
  - "Create Post" button (separate action)
    ↓
User clicks "Add to Wishlist"
    ↓
Check if place already exists in Firestore:
  queryByGooglePlaceId(place_id)
    ↓
If NOT exists: firebaseService.addNewPlace(apiPlaceData)
  Batch write:
    1. places/{placeId} - Store all Google data + photo references
    2. users/{userId}/userPlaces/{placeId}
    3. placeSavedBy/{placeId}/users/{userId}
    ↓
If exists: firebaseService.savePlace(userId, existingPlace)
  Batch write:
    1. users/{userId}/userPlaces/{placeId}
    2. placeSavedBy/{placeId}/users/{userId}
    ↓
Firestore: Place linked to user's wishlist
    ↓
Place appears in Profile → Restaurants (with Google photo!)
NO POST CREATED
    ↓
User can LATER click place → "Create Post" if they want to share
```

**Key Points:**
- All restaurants verified via Google (prevents fake entries)
- Photos included from Google Places Photos API
- Save to wishlist is separate from posting (no forced social)
- Place document stores photo references (not URLs - they expire)

---

### User Flow: Explore - Manual Restaurant Entry (Fallback)

**Status: PLANNED - Priority #4**

**When to show:** If user searches via Google API and doesn't find their restaurant

```
User searches "New Pop-up Restaurant Seattle"
    ↓
Google Places API returns no results OR user doesn't see what they want
    ↓
Show fallback message:
"Can't find your restaurant? Add it manually"
[Add Manually] button appears
    ↓
User clicks "Add Manually"
    ↓
NewPlaceForm appears
    ↓
User enters:
  - restaurantName (required)
  - restaurantAddress (required)
  - notes (optional)
  - NO photo upload (deferred to TS refactor)
    ↓
User clicks "Create"
    ↓
Validation: validatePlaceName, validatePlaceNotes, validatePlaceAddress
    ↓
If valid: onNewPlaceCreation(placeData)
    ↓
Explore.js: handleAddingNewPlace(placeData)
    ↓
firebaseService.addNewPlace(placeData) // Creates place document
Batch write:
  1. places/{placeId} - { restaurantName, restaurantAddress, notes, createdAt }
  2. users/{userId}/userPlaces/{placeId} - { placeId, timeAdded }
  3. placeSavedBy/{placeId}/users/{userId} - { userId, timeAdded }
    ↓
Firestore: Place created AND saved to user's wishlist
    ↓
Navigate to PlaceDetail OR back to Explore
    ↓
Place appears in Profile → Restaurants tab
NO POST CREATED (decoupled!)
```

**Key Points:**
- Manual add is FALLBACK, not primary path (reduces fake entries)
- Only appears when Google API doesn't have the restaurant
- User adds place to personal wishlist
- No social sharing required
- No photo upload in MVP (manual entry only has name/address/notes)

**UX Flow:**
1. User searches first (Google API - verified restaurants)
2. If not found → "Can't find it? Add manually" option appears
3. Most users won't need manual entry (Google has most restaurants)

---

### User Flow: Explore - Direct Post Creation from Search (Hybrid)

**Status: PLANNED - Priority #3**

```
User searches via Google Places Autocomplete
    ↓
Selects restaurant → PlacePreview appears
    ↓
User clicks "Create Post" (wants to share immediately)
    ↓
NewPostForm appears with place pre-filled
{
    placeId: place.id OR null (if new),
    userId: auth.currentUser.uid,
    caption: "" // User writes this
}
    ↓
User writes caption
    ↓
User clicks "Create Post"
    ↓
Check if place exists in Firestore
    ↓
If NOT exists: addNewPlace(apiPlaceData) first
    ↓
savePlace(userId, place) // Save to user's wishlist
    ↓
addNewPost({ userId, authorUsername, caption, placeId, timeOpen })
    ↓
Firestore:
  - Place document created (with Google photos)
  - Place saved to user's wishlist
  - Post created
    ↓
Post appears in Feed
Place appears in Profile → Restaurants
```

**Key Points:**
- User CAN post immediately if they want (not forced, but available)
- Place still gets saved to their wishlist (automatic)
- Post is deliberate social action (requires caption)
- Combines convenience with intentionality

---

### User Flow: PlaceDetail - Create Post from Saved Place

**Status: PLANNED - Priority #5**

```
User has saved place (via Explore OR from Feed)
    ↓
Navigates to Profile → Restaurants → Clicks place
    ↓
PlaceDetail shows:
  - Restaurant details
  - "Edit" button
  - "Remove" button
  - "Create Post" button (NEW - future feature)
    ↓
User clicks "Create Post"
    ↓
NewPostForm appears with place pre-filled
{
    placeId: place.id,
    userId: auth.currentUser.uid,
    caption: "" // User writes this
}
    ↓
User writes caption (optional but encouraged)
    ↓
User clicks "Create Post"
    ↓
firebaseService.addNewPost({ userId, authorUsername, caption, placeId, timeOpen })
    ↓
Firestore: posts/{postId} created
    ↓
Post appears in Feed (social sharing)
Place already in user's wishlist (no duplication)
    ↓
Other users see post, can save same place to their wishlists
```

**Key Points:**
- Posting is OPTIONAL and INTENTIONAL
- User has already saved place (personal curation)
- Post is public social sharing (requires deliberate action)
- Decouples wishlist management from social features

---

## PlaceProfile Flows

### User Flow: PlaceProfile - Edit User Notes

**Status: PLANNED (Notes architecture not yet implemented)**

```
User in PlaceProfile (from Profile → Restaurants or Feed → Post click)
    ↓
PlaceProfile.js renders
    ↓
const { isEditing, enterEditMode, exitEditMode } = useEditMode()
    ↓
User sees NotesSection with their notes (if they saved this place)
    ↓
NotesSection contains KebabMenu with "Edit Notes" option
    ↓
User clicks KebabMenu → "Edit Notes"
    ↓
handleKebabAction('edit') → enterEditMode()
    ↓
useEditMode: setIsEditing(true)
    ↓
PlaceProfile conditional render:
if (isEditing) → <EditNotesForm ... />
    ↓
EditNotesForm.js renders (NEW COMPONENT)
    ↓
<ReusableNotesForm
    generalNote={userNotes.generalNote}
    privateNote={userNotes.privateNote}
    onSubmit={handleSubmit}
    backButton={<CircularButton onClick={exitEditMode}>↩</CircularButton>}
/>
    ↓
User edits notes:
  - generalNote: "Tell everyone why you're adding this!" (public)
  - privateNote: "Just for you" (private)
    ↓
User clicks "Save"
    ↓
EditNotesForm: handleSubmit(notesData)
onEditNotes({ generalNote, privateNote })
    ↓
PlaceProfile: handleEditingNotes(notesData)
await updateUserPlaceNotes(userId, placeId, notesData)
    ↓
firebaseService.js: updateUserPlaceNotes(userId, placeId, notesData)
updateDoc(doc(db, 'users', userId, 'userPlaces', placeId), notesData)
    ↓
Firestore: userPlaces document updated (NOT global places doc)
    ↓
exitEditMode()
    ↓
PlaceProfile re-renders with updated notes in view mode
```

**Key Difference from Previous Architecture:**
- Notes are stored in `users/{userId}/userPlaces/{placeId}`, NOT in global `places` collection
- Each user has their own notes for a place
- Editing notes does NOT affect other users

---

### User Flow: PlaceProfile - Remove Place from Wishlist

**Status: WORKING**

```
User in PlaceProfile (from Profile → Restaurants)
    ↓
PlaceProfile.js renders
    ↓
User sees NotesSection with KebabMenu (since they saved this place)
    ↓
User clicks KebabMenu → "Remove"
    ↓
PlaceProfile: handleRemove()
setRemoveConfirmation({
    isOpen: true,
    message: 'Are you sure you want to remove this restaurant from your saved list?'
});
    ↓
ConfirmDialog renders
{removeConfirmation.isOpen && (
    <ConfirmDialog
        isOpen={removeConfirmation.isOpen}
        message={removeConfirmation.message}
        onConfirm={confirmRemovePlace}
        onCancel={() => setRemoveConfirmation({ isOpen: false, message: '' })}
        isLoading={isLoading}
    />
)}
    ↓
User clicks "Confirm" in ConfirmDialog
    ↓
ConfirmDialog: onConfirm() → confirmRemovePlace()
    ↓
firebaseService.js: removeFromSavedPlaces(userId, placeId)
Batch delete:
  1. doc(db, 'placeSavedBy', placeId, 'users', userId)
  2. doc(db, 'users', userId, 'userPlaces', placeId)
await batch.commit()
    ↓
Firestore: userPlace link deleted (place doc persists for other users)
    ↓
onSnapshot fires in subscribeToUserPlaces
    ↓
UserProfile: setMainPlaceList updates (removed place filtered out)
    ↓
onBack() called // PlaceProfile unmounts
    ↓
UserProfile re-renders → PlaceGrid shows updated list without removed place
```

---

### User Flow: PlaceProfile - Add Place to Wishlist (from Feed)

**Status: WORKING** (see "Feed - Save Place from Someone Else's Post" above)

---

## Implementation Priority

### Completed

1. **View Other Users' Profiles** - DONE
   - Click username/avatar from Feed post → navigate to /profile/{userId}
   - UserProfile.js accepts userId from route params
   - Conditional rendering: `isOwnProfile = userId === auth.currentUser.uid`
   - Hide edit/delete controls when viewing others
   - Public saved lists (social discovery)

2. **PlaceProfile Architecture** - DONE
   - PlaceProfile wrapper component created
   - PlaceDetail made purely presentational
   - ActionBar component created (fixed bottom positioning)
   - Feed.js and UserProfile.js render PlaceProfile when place selected

3. **"Saved by" Info Display** - DONE (2026-01-15)
   - "Saved by" renders in ActionBar in PlaceProfile
   - Clickable usernames → navigate to user profile

4. **ActionBar Consistency** - DONE
   - Back button uses ActionBar pattern
   - Fixed-bottom positioning consistent

### Current Sprint

5. **Google Places API Integration** - IN PROGRESS
   - COMPLETE | Chunk 1: Autocomplete search (Places API New via REST) 
   - WIP | Chunk 2: Place details fetch, save to Firestore
   - See API_DESIGN.md for full implementation details

### Next (After API Integration)

6. **Combined Search: Restaurants + People**
   - Single search bar queries both sources
   - Firestore users query for people search
   - Results in two sections: Restaurants first, People second
   - Restaurant click → PlacePreview with save/post options
   - People click → Navigate to /profile/{userId}

7. **Manual Entry as Fallback**
   - Show "Can't find it? Add manually" when Google API returns no results
   - Wire NewPlaceForm
   - No photo upload in MVP (deferred to TS refactor)

### After API Integration (Design with Real Data)

8. **NotesSection Component**
   - Design with actual photos/data to inform layout
   - Create NotesSection wrapper for user's notes
   - Move KebabMenu into NotesSection (Edit Notes, Remove)
   - generalNote (public) + privateNote (private) fields

9. **Notes Schema Update**
   - Add generalNote and privateNote to userPlaces subcollection
   - Create updateUserPlaceNotes service function
   - Migrate from global notes bug

10. **PlaceProfile "Create Post" Button**
    - Add to ActionBar or NotesSection (decide with real layout)
    - Opens NewPostForm with place pre-filled
    - Completes decoupled save/post workflow

11. **Form Validation & Error Handling**
    - Add validation to all forms (posts, places, profile, notes)
    - Improve user feedback on failures

### Future (TypeScript Refactor/Rebuild - Enhanced Version)

**Goal:** Full TypeScript rewrite with proper typing, schema validation (Zod/Yup), modern patterns, and social features foundation.

#### Photo & Validation Enhancements
1. **User photo uploads** - Manual entries REQUIRE photo (Firebase Storage)
2. **Posts with user photos** - Share dining experiences with personal photos
3. **Validated manual entry** - Require Google Maps URL OR address geocoding validation
4. **Community moderation** - Report/flag system, admin dashboard

#### Code Quality & Modern Patterns
5. **Modern data fetching** - React Query or SWR for caching/batching, Suspense for async data
6. **useFormValidation hook** - Extract errors/setErrors/clearErrors pattern (duplicated across SignUp, SignIn, forms)
7. **Type safety throughout** - Full TypeScript coverage with strict mode
8. **Schema validation** - Zod or Yup for runtime validation

#### Social Features (Core Long-term Vision)
9. **Friends/Connections System**
   - Send/accept friend requests
   - View friends' posts and wishlists
   - Friends-only post visibility options

10. **Shared Wishlists for Groups**
    - Create private groups
    - Collaborative restaurant wishlists
    - Group voting on where to eat

11. **Real-time Notifications**
    - Friend requests, group invitations
    - Comments on posts
    - Reservation updates

12. **Reservation Coordination**
    - Coordinate dining times with friends
    - RSVP system for group dinners
    - In-app reservation booking (via OpenTable/Resy API)

13. **Enhanced User Profiles**
    - Activity feed (recent posts, saves, reviews)
    - Dining statistics (restaurants visited, favorite cuisines)
    - Badges/achievements

#### Cleanup
14. **Delete unused hooks** - Remove useProfileData and useProfileBioForm (not imported/used anywhere)

---

## Data Integrity & Photo Strategy

### Overview

This section documents our approach to preventing fake/non-existent restaurants and handling photos across manual entry and API integration.

### Photo Handling

#### **Google Places API (Primary Source - CURRENT MVP)**

```javascript
Google Places API Response:
{
  place_id,
  name, // restaurantName
  formatted_address, // restaurantAddress
  photos: [
    {
      photo_reference: "Aaw_Eck...", // Store this, not URL
      height: 400,
      width: 600
    }
  ],
  rating,
  price_level,
  user_ratings_total,
  website,
  formatted_phone_number
}
```

**Photo Display:**
- Store `photo_reference` in Firestore (URLs expire, references don't)
- Fetch actual images via Google Places Photo API when displaying
- Cache photos client-side for performance

#### **Manual Entry Photos**

**Current MVP (JavaScript):** No photos for manual entries (simplicity, basic validation only)

**Future TS Refactor (Enhanced):**
```javascript
// NewPlaceForm with REQUIRED photo upload
{
  restaurantName: string,
  restaurantAddress: string,
  notes: string,
  userUploadedPhoto: File // REQUIRED (not optional)
}
↓
Upload to Firebase Storage
↓
Store in Firestore:
{
  ...placeData,
  photoUrl: "gs://bucket/path/photo.jpg",
  photoSource: "user_upload" // vs "google_places"
}
```

**Why require photos for manual entries:**
- Makes fake entries higher effort (need photo)
- Visual proof restaurant exists
- Consistent UX (all places have photos)

#### **User Photos in Posts (Future TS Refactor)**

```javascript
// Post with user's dining photo
{
  postId,
  userId,
  authorUsername,
  caption: "Amazing ramen!",
  placeId, // Links to restaurant
  userPhoto: "gs://bucket/user_photos/photo123.jpg", // Optional
  timeOpen
}
```

**Use case:** Personal dining experiences, food photography, visual reviews

---

### Data Integrity: Preventing Fake Restaurants

#### **Current MVP (JavaScript) - Google API Primary + Trust-Based Fallback**

**Primary Defense: Google Places API**
- User searches → Google returns verified restaurants
- Restaurant guaranteed to exist (Google verified)
- Prevents 95% of fake entries
- Includes photos, ratings, verified data

**Fallback: Manual Entry (Basic Validation)**
```javascript
// Only appears when Google API returns no results
validatePlaceName(restaurantName) // Min 2 chars, max 50
validatePlaceNotes(notes) // Optional, max length
validatePlaceAddress(address) // Basic format

// Acceptable for: Edge cases, brand new restaurants, pop-ups
```

**Why this works for MVP:**
- Most users find place via Google first (verified data)
- Manual add is last resort (reduces fake entries)
- Trust-based for small user base (portfolio demo)

#### **Future TS Refactor - Enhanced Validation**

**Option A: Require Google Maps URL** (Recommended)
```javascript
{
  restaurantName,
  restaurantAddress,
  googleMapsUrl: "https://maps.google.com/..." // REQUIRED
}
↓
Extract place_id from URL
↓
Verify via Google Places API
↓
If valid: Use Google-verified data
If invalid: Reject
```

**Option B: Address Geocoding**
```javascript
{
  restaurantName,
  restaurantAddress
}
↓
Google Geocoding API: Validate address exists
↓
Check place_types includes: "restaurant", "food", "cafe"
↓
Accept if valid, reject if not
```

**Option C: Photo Requirement**
```javascript
// REQUIRED photo for manual entries
{
  restaurantName,
  restaurantAddress,
  userUploadedPhoto: File // REQUIRED
}
```

**Recommended: Combine A + C** (Google Maps URL + Photo)

#### **Long-term: Community Moderation (Future Enhancement)**

- Report/flag system for fake entries
- Admin dashboard for review
- Places with 3+ reports hidden pending review
- User reputation system (trusted vs new accounts)

---

**End of Design Document**
