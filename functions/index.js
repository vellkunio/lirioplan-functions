const { getAllProjects, addProject } = require('./handlers/projects');
const { signup, login } = require('./handlers/users');

const functions = require("firebase-functions");
const app = require('express')();

// const firebase = require('firebase/app');
// const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("@firebase/auth");
// firebase.initializeApp(firebaseConfig);
// const auth = getAuth();

const FBAuth = require('./util/fbAuth');

//Project Routes
app.get('/projects', getAllProjects);
app.post('/addProject', FBAuth, addProject);

//SIGNUP ROUTES
app.post('/signup', signup);
app.post('/login', login);
//ADD app.get('/user', getUserData) //Gets user details

exports.api = functions.https.onRequest(app);