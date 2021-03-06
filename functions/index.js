
const { getAllProjects,
        addProject,
        editProject,
        deleteProject
     } = require('./handlers/projects');

const { 
    signup,
    login,
    getAuthenticatedUser
} = require('./handlers/users');

const {
    addMaterial,
    getAllMaterials,
    editMaterial,
    deleteMaterial
} = require('./handlers/materials');

const functions = require("firebase-functions");
const app = require('express')();

// const firebase = require('firebase/app');
// const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("@firebase/auth");
// firebase.initializeApp(firebaseConfig);
// const auth = getAuth();

const FBAuth = require('./util/fbAuth');

const cors = require('cors');
app.use(cors());

//Project Routes
app.get('/projects', getAllProjects);
app.post('/addProject', FBAuth, addProject);
app.post('/editProject/:projectId', FBAuth, editProject);
app.delete('/project/:projectId', FBAuth, deleteProject);

//Materials Routes
app.post('/addMaterial', FBAuth, addMaterial);
app.get('/materials', FBAuth, getAllMaterials);
app.post('/editMaterial/:materialId', FBAuth, editMaterial);
app.delete('/material/:materialId', FBAuth, deleteMaterial);

//SIGNUP ROUTES
app.post('/signup', signup);
app.post('/login', login);
// app.post('/user', FBAuth, addUserDetails); //maybe for future use
app.get('/user', FBAuth, getAuthenticatedUser);
// app.get('/user/:handle', getUserDetails);

exports.api = functions.https.onRequest(app);