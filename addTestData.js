const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, setDoc, doc, serverTimestamp } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");

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

const user1Id = "RnZ0d0mOZfXG44xhwdB0T5F12yI3";
const user2Id = "D9dgtRmZSpTW6ovFs1DSoJaZDq32";

const user1Username = "Ashe";
const user2Username = "Blerp";

// Test places
const testPlaces = [
  {
    restaurantName: "The Golden Fork",
    restaurantAddress: "123 Main St, Portland, OR",
    notes: "Amazing pasta, cozy atmosphere"
  },
  {
    restaurantName: "Sushi Paradise",
    restaurantAddress: "456 Oak Ave, Portland, OR",
    notes: "Fresh fish, great presentation"
  },
  {
    restaurantName: "La Bella Italia",
    restaurantAddress: "789 Pine Rd, Portland, OR",
    notes: "Family-owned, authentic Italian"
  },
  {
    restaurantName: "The Burger Spot",
    restaurantAddress: "321 Elm St, Portland, OR",
    notes: "Craft burgers, hand-cut fries"
  }
];

async function addTestData() {
  try {
    console.log("Starting to add test data...");

    // Add places for user 1
    console.log("\nAdding places for User 1...");
    const user1PlaceIds = [];
    for (let i = 0; i < 2; i++) {
      const placeRef = await addDoc(collection(db, "places"), {
        ...testPlaces[i],
        createdAt: serverTimestamp()
      });
      user1PlaceIds.push(placeRef.id);
      console.log(`  Created place: ${testPlaces[i].restaurantName} (${placeRef.id})`);
    }

    // Add places for user 2
    console.log("\nAdding places for User 2...");
    const user2PlaceIds = [];
    for (let i = 2; i < 4; i++) {
      const placeRef = await addDoc(collection(db, "places"), {
        ...testPlaces[i],
        createdAt: serverTimestamp()
      });
      user2PlaceIds.push(placeRef.id);
      console.log(`  Created place: ${testPlaces[i].restaurantName} (${placeRef.id})`);
    }

    // Add userPlaces links for user 1
    console.log("\nAdding userPlaces links for User 1...");
    for (const placeId of user1PlaceIds) {
      await setDoc(doc(db, "users", user1Id, "userPlaces", placeId), {
        timeAdded: serverTimestamp()
      });
      console.log(`  Linked place ${placeId} to user 1`);
    }

    // Add userPlaces links for user 2
    console.log("\nAdding userPlaces links for User 2...");
    for (const placeId of user2PlaceIds) {
      await setDoc(doc(db, "users", user2Id, "userPlaces", placeId), {
        timeAdded: serverTimestamp()
      });
      console.log(`  Linked place ${placeId} to user 2`);
    }

    // Add posts for user 1
    console.log("\nAdding posts for User 1...");
    const user1PostCaptions = [
      "Just had the best pasta at The Golden Fork! Definitely coming back.",
      "The atmosphere at The Golden Fork is so cozy, perfect for a date night."
    ];

    for (let i = 0; i < user1PostCaptions.length; i++) {
      const postRef = await addDoc(collection(db, "posts"), {
        userId: user1Id,
        authorUsername: user1Username,
        caption: user1PostCaptions[i],
        placeId: user1PlaceIds[i],
        timeOpen: serverTimestamp()
      });
      console.log(`  Created post: "${user1PostCaptions[i]}" (${postRef.id})`);
    }

    // Add posts for user 2
    console.log("\nAdding posts for User 2...");
    const user2PostCaptions = [
      "Sushi Paradise lived up to the name - incredible fresh fish!",
      "The Burger Spot has the best craft burgers in town. Highly recommend!"
    ];

    for (let i = 0; i < user2PostCaptions.length; i++) {
      const postRef = await addDoc(collection(db, "posts"), {
        userId: user2Id,
        authorUsername: user2Username,
        caption: user2PostCaptions[i],
        placeId: user2PlaceIds[i],
        timeOpen: serverTimestamp()
      });
      console.log(`  Created post: "${user2PostCaptions[i]}" (${postRef.id})`);
    }

    console.log("\n✅ All test data added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding test data:", error);
    process.exit(1);
  }
}

addTestData();
