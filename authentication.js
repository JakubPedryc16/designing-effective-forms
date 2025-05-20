  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-analytics.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDluhYP1iTBuhAw8U3bi3qemCe2iRZYW9M",
    authDomain: "tpf-pedryc.firebaseapp.com",
    projectId: "tpf-pedryc",
    storageBucket: "tpf-pedryc.firebasestorage.app",
    messagingSenderId: "897654669066",
    appId: "1:897654669066:web:ac25cd709677c7b5d284f3",
    measurementId: "G-FFNZQ6JMPF"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);


const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const userSignIn = async () => {
   signInWithPopup(auth, provider).then((result) => {
       const user = result.user;
       console.log(user);
   }).catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
   })
}

const userSignOut = async () => {
   signOut(auth).then(() => {
       alert("You have been signed out!")
   }).catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
   })
}

onAuthStateChanged(auth, (user) => {
   if (user) {
        alert("You are authenticated with Google");
        console.log(user);

        const fullName = user.displayName || "";
        const [firstName, lastName] = fullName.split(" ").filter(Boolean);

        document.getElementById("firstName").value = firstName || "";
        document.getElementById("lastName").value = lastName || "";
        document.getElementById("exampleInputEmail1").value = user.email || "";
   }
})

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);