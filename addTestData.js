const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, serverTimestamp } = require("firebase/firestore");

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

// Existing saved places (from Google Places API)
const ashePlace = "1ErUK60UxbIpi7BauDvF";
const blerpPlace = "7bT4AiFBnk4QmOy3cTFN";

async function addTestData() {
  try {
    console.log("Starting to add test posts...");

    // Add post for Ashe
    const ashePostRef = await addDoc(collection(db, "posts"), {
      userId: user1Id,
      authorUsername: user1Username,
      caption: "Finally tried this place - amazing!",
      placeId: ashePlace,
      timeOpen: serverTimestamp()
    });
    console.log(`Created Ashe's post: ${ashePostRef.id}`);

    // Add post for Blerp
    const blerpPostRef = await addDoc(collection(db, "posts"), {
      userId: user2Id,
      authorUsername: user2Username,
      caption: "Great spot for dinner with friends!",
      placeId: blerpPlace,
      timeOpen: serverTimestamp()
    });
    console.log(`Created Blerp's post: ${blerpPostRef.id}`);

    console.log("\n✅ Test posts added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding test data:", error);
    process.exit(1);
  }
}

addTestData();
