import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// ✅ Firebase config (use your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyA6bbAqrSFAmlDp249hyXTnC36ZeUqIwhA",
  authDomain: "openbase-db.firebaseapp.com",
  projectId: "openbase-db",
  storageBucket: "openbase-db.appspot.com",
  messagingSenderId: "483985771606",
  appId: "1:483985771606:web:eecbb1dffda20307f0fff7"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🎶 Load tracks from Firestore
async function loadTracks() {
  const querySnapshot = await getDocs(collection(db, "tracks"));
  const trackList = document.getElementById("trackList");
  trackList.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const trackItem = document.createElement("div");
    trackItem.classList.add("track");

    trackItem.innerHTML = `
      <img src="${data.coverURL}" alt="Cover Art" width="200" />
      <h3>${data.title} – ${data.artist}</h3>
      <audio controls src="${data.audioURL}"></audio>
    `;

    trackList.appendChild(trackItem);
  });
}

loadTracks();
