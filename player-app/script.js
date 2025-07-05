 import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

// 🔐 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA6bbAqrSFAmlDp249hyXTnC36ZeUqIwhA",
  authDomain: "openbase-db.firebaseapp.com",
  projectId: "openbase-db",
  storageBucket: "openbase-db.appspot.com",
  messagingSenderId: "483985771606",
  appId: "1:483985771606:web:eecbb1dffda20307f0fff7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🎶 Load tracks from Firestore
let songs = [];
let currentIndex = 0;

async function loadTracks() {
  const q = query(collection(db, "tracks"), orderBy("uploadedAt", "desc"));
  const querySnapshot = await getDocs(q);
  const trackList = document.getElementById("trackList");
  trackList.innerHTML = "";

  songs = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    songs.push({
      title: data.title,
      artist: data.artist,
      audioURL: data.audioURL,
      coverURL: data.coverURL
    });

    const trackItem = document.createElement("div");
    trackItem.classList.add("track");
    trackItem.innerHTML = `
      <img src="${data.coverURL}" alt="Cover Art" width="200" />
      <h3>${data.title} – ${data.artist}</h3>
      <audio controls src="${data.audioURL}"></audio>
    `;
    trackList.appendChild(trackItem);
  });

  loadTrack(currentIndex);
}

function loadTrack(index) {
  if (songs.length === 0) return;
  const song = songs[index];
  document.getElementById("trackTitle").textContent = song.title;
  document.getElementById("albumCover").src = song.coverURL;
  document.getElementById("audioPlayer").src = song.audioURL;
  document.getElementById("downloadLink").href = song.audioURL;
  document.getElementById("downloadLink").title = `Download ${song.title}`;
}

function nextTrack() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadTrack(currentIndex);
}

function prevTrack() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadTrack(currentIndex);
}

loadTracks();
