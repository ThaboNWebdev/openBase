 import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA6bbAqrSFAmlDp249hyXTnC36ZeUqIwhA",
  authDomain: "openbase-db.firebaseapp.com",
  projectId: "openbase-db",
  storageBucket: "openbase-db.appspot.com",
  messagingSenderId: "483985771606",
  appId: "1:483985771606:web:eecbb1dffda20307f0fff7"
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

axios.post("https://openbase-backend.onrender.com/api/upload", formData)
fetch('https://openbase-backend.onrender.com/api/upload/', ...)

const form = document.getElementById('uploadForm');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  try {
    const response = await fetch('https://openbase-backend.onrender.com/api/upload/', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (response.ok) {
      status.innerHTML = `<p>✅ Upload successful!</p><audio controls src="${result.url}"></audio>`;
    } else {
      status.innerHTML = `<p>❌ Error: ${result.error}</p>`;
    }
  } catch (error) {
    status.innerHTML = `<p>⚠️ Network error: ${error.message}</p>`;
  }
});
  import axios from "axios";

const form = document.getElementById('uploadForm');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  try {
    const response = await axios.post("https://openbase-backend.onrender.com/api/upload", formData);
    const result = response.data;

    status.innerHTML = `<p>✅ Upload successful!</p><audio controls src="${result.url}"></audio>`;
  } catch (error) {
    status.innerHTML = `<p>❌ Error: ${error.message}</p>`;
  }
});