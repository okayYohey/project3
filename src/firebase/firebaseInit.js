import firebase from 'firebase' 

const firebaseConfig = {
    apiKey: "AIzaSyDUFvGfBasBF2jnOG6l4vmuszlHfXU7gGE",
    authDomain: "min-nano-pilates-project2.firebaseapp.com",
    databaseURL: "https://min-nano-pilates-project2.firebaseio.com",
    projectId: "min-nano-pilates-project2",
    storageBucket: "min-nano-pilates-project2.appspot.com",
    messagingSenderId: "243518551368",
    appId: "1:243518551368:web:874a2eda81a82f945cef7d"
    };

firebase.initializeApp(firebaseConfig);

export default firebase