const firebaseConfig = {
    apiKey: "AIzaSyAX_Z-EWHoAHbF-Ay2NwaIg2HGuTk2UhFc",
    authDomain: "loginstreak-53171.firebaseapp.com",
    projectId: "loginstreak-53171",
    storageBucket: "loginstreak-53171.firebasestorage.app",
    messagingSenderId: "851606788548",
    appId: "1:851606788548:web:422d9d1be6ff489693ac91"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
