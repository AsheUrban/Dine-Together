const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAjVs1eF9S5RdLpJfELZ1GUOz-lHJfgRpE",
  authDomain: "dine-together-2e4b4.firebaseapp.com",
  projectId: "dine-together-2e4b4",
  storageBucket: "dine-together-2e4b4.appspot.com",
  messagingSenderId: "1034395435646",
  appId: "1:1034395435646:web:7f5c6d8e9f0a1b2c3d4e5f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const user1Id = "ddz79YeTaOWLFwTlR9ds01sHJt12";
const user2Id = "dhBX6TBMxGXcTRgVeYpeTYDW17p2";

const user1Username = "Ashe";
const user2Username = "Blerp";

// All saved places (from Google Places API)
const places = [
  "1ErUK60UxbIpi7BauDvF",
  "7bT4AiFBnk4QmOy3cTFN",
  "C7rbhEZqcQTBPtxlBSu9",
  "COzTfaSDF4reKE6o011M",
  "GHkpUSxzhzdRDhhjH9FI",
  "Gk19jJhUyAwzczgqqhDC",
  "JCNEvkmy27Pv9Tec8sVJ",
  "RinZIe9tBmK6yN5gt7Xd",
  "ZpUY5KZ94EEjRQu28Lyq",
  "lFl1SETdLoJ4GakOouoI"
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
      const isAshe = i % 2 === 0;
      const postRef = await addDoc(collection(db, "posts"), {
        userId: isAshe ? user1Id : user2Id,
        authorUsername: isAshe ? user1Username : user2Username,
        caption: captions[i],
        placeId: places[i],
        timeOpen: serverTimestamp()
      });
      console.log(`Created ${isAshe ? "Ashe" : "Blerp"}'s post: ${postRef.id}`);
    }

    console.log("\n✅ Test posts added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding test data:", error);
    process.exit(1);
  }
}

addTestData();
