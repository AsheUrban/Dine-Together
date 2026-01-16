const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, setDoc, doc, serverTimestamp, writeBatch } = require("firebase/firestore");
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

const user1Id = "ddz79YeTaOWLFwTlR9ds01sHJt12";
const user2Id = "dhBX6TBMxGXcTRgVeYpeTYDW17p2";

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

    // Add saved places for user 1 (both placeSavedBy and userPlaces)
    console.log("\nAdding saved places for User 1...");
    for (const placeId of user1PlaceIds) {
      const batch = writeBatch(db);

      const placeSavedByRef = doc(db, "placeSavedBy", placeId, "users", user1Id);
      batch.set(placeSavedByRef, {
        timeAdded: serverTimestamp()
      });

      const userPlaceRef = doc(db, "users", user1Id, "userPlaces", placeId);
      batch.set(userPlaceRef, {
        timeAdded: serverTimestamp()
      });

      await batch.commit();
      console.log(`  Linked place ${placeId} to user 1 (both placeSavedBy and userPlaces)`);
    }

    // Add saved places for user 2 (both placeSavedBy and userPlaces)
    console.log("\nAdding saved places for User 2...");
    for (const placeId of user2PlaceIds) {
      const batch = writeBatch(db);

      const placeSavedByRef = doc(db, "placeSavedBy", placeId, "users", user2Id);
      batch.set(placeSavedByRef, {
        timeAdded: serverTimestamp()
      });

      const userPlaceRef = doc(db, "users", user2Id, "userPlaces", placeId);
      batch.set(userPlaceRef, {
        timeAdded: serverTimestamp()
      });

      await batch.commit();
      console.log(`  Linked place ${placeId} to user 2 (both placeSavedBy and userPlaces)`);
    }

    // Cross-save: User 1 saves one of User 2's places
    console.log("\nAdding cross-saves between users...");
    const crossSavePlace = user2PlaceIds[0]; // User 1 saves Sushi Paradise
    {
      const batch = writeBatch(db);

      const placeSavedByRef = doc(db, "placeSavedBy", crossSavePlace, "users", user1Id);
      batch.set(placeSavedByRef, {
        timeAdded: serverTimestamp()
      });

      const userPlaceRef = doc(db, "users", user1Id, "userPlaces", crossSavePlace);
      batch.set(userPlaceRef, {
        timeAdded: serverTimestamp()
      });

      await batch.commit();
      console.log(`  User 1 saved User 2's place: ${crossSavePlace}`);
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
