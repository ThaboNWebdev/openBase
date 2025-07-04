 import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "openbase-db.firebaseapp.com",
  projectId: "openbase-db",
  storageBucket: "openbase-db.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

// Upload logic
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const audio = document.getElementById("audio").files[0];
  const cover = document.getElementById("cover").files[0];

  try {
    const audioRef = ref(storage, `tracks/${audio.name}`);
    await uploadBytes(audioRef, audio);
    const audioURL = await getDownloadURL(audioRef);

    const coverRef = ref(storage, `covers/${cover.name}`);
    await uploadBytes(coverRef, cover);
    const coverURL = await getDownloadURL(coverRef);

    await addDoc(collection(db, "tracks"), {
      title,
      audioURL,
      coverURL,
      uploadedAt: new Date()
    });

    alert("Upload successful!");
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Something went wrong!");
  }
});
