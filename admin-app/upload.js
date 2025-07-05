 import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc
} from "firebase/firestore";

// 🔐 Firebase config
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
const storage = getStorage(app);
const db = getFirestore(app);

// 🎶 Upload form handling
const form = document.getElementById("uploadForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const artist = document.getElementById("artist").value;
  const audio = document.getElementById("audio").files[0];
  const cover = document.getElementById("cover").files[0];

  if (!audio || !cover) {
    status.innerHTML = `<p>⚠️ Please select both audio and cover files.</p>`;
    return;
  }

  try {
    // Upload cover to Firebase Storage
    const coverRef = ref(storage, `covers/${Date.now()}-${cover.name}`);
    await uploadBytes(coverRef, cover);
    const coverURL = await getDownloadURL(coverRef);

    // Upload audio to Firebase Storage
    const audioRef = ref(storage, `tracks/${Date.now()}-${audio.name}`);
    await uploadBytes(audioRef, audio);
    const audioURL = await getDownloadURL(audioRef);

    // Save metadata to Firestore
    await addDoc(collection(db, "tracks"), {
      title,
      artist,
      coverURL,
      audioURL,
      uploadedAt: new Date()
    });

    status.innerHTML = `
      <p>✅ Upload successful!</p>
      <h3>${title} – ${artist}</h3>
      <audio controls src="${audioURL}"></audio>
    `;
    form.reset();
  } catch (error) {
    console.error("Upload failed:", error);
    status.innerHTML = `<p>❌ Error: ${error.message}</p>`;
  }
});
