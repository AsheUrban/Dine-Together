const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } = require("firebase/firestore");

// Replace with your Firebase project config (Firebase Console > Project Settings > Your apps > Web app)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Replace with Firebase UIDs from your project (Authentication > Users)
const user1Id = "YOUR_USER_1_UID";
const user2Id = "YOUR_USER_2_UID";

const user1Username = "User1";
const user2Username = "User2";

// Replace with Firestore place document IDs from your project (Firestore > places collection)
const places = [
  "YOUR_PLACE_ID_1",
  "YOUR_PLACE_ID_2",
  "YOUR_PLACE_ID_3",
  "YOUR_PLACE_ID_4",
  "YOUR_PLACE_ID_5",
  "YOUR_PLACE_ID_6",
  "YOUR_PLACE_ID_7",
  "YOUR_PLACE_ID_8",
  "YOUR_PLACE_ID_9",
  "YOUR_PLACE_ID_10"
];

const captions = [
  "Finally tried this place - amazing!",
  "Great spot for dinner with friends!",
  "Hidden gem, highly recommend!",
  "Perfect for date night.",
  "The vibes here are unmatched.",
  "Can't stop thinking about this meal.",
  "New favorite spot in town!",
  "Worth the wait, trust me.",
  "Already planning my next visit.",
  "This place never disappoints."
];

async function clearPosts() {
  console.log("Clearing existing posts...");
  const postsSnapshot = await getDocs(collection(db, "posts"));
  const deletePromises = postsSnapshot.docs.map(postDoc =>
    deleteDoc(doc(db, "posts", postDoc.id))
  );
  await Promise.all(deletePromises);
  console.log(`Deleted ${postsSnapshot.size} posts.`);
}

async function addTestData() {
  try {
    await clearPosts();

    console.log("Starting to add test posts...");

    for (let i = 0; i < places.length; i++) {
      const isUser1 = i % 2 === 0;
      const postRef = await addDoc(collection(db, "posts"), {
        userId: isUser1 ? user1Id : user2Id,
        authorUsername: isUser1 ? user1Username : user2Username,
        caption: captions[i],
        placeId: places[i],
        timeOpen: serverTimestamp()
      });
      console.log(`Created ${isUser1 ? user1Username : user2Username}'s post: ${postRef.id}`);
    }

    console.log("\nTest posts added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding test data:", error);
    process.exit(1);
  }
}

addTestData();
