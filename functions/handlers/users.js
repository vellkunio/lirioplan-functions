const { db } = require('../util/admin');

const config = require('../util/config');

const firebase = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("@firebase/auth");
firebase.initializeApp(config);
const auth = getAuth();

const { validateSignupData, validateLoginData } = require('../util/validators');

exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };

    const { valid, errors } = validateSignupData(newUser);

    if(!valid) return res.status(400).json(errors);
    
    let token, userId;
    db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
        if(doc.exists){
            return res.status(400).json({ handle: 'This handle is already taken'});
        } else {
            return createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
        }
    })
    .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then((idToken) => {
        token = idToken;
        // return res.status(201).json({ token});
        const userCredentials = {
            handle: newUser.handle,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            userId //short way of userId: userId |||||| Because variables have same name
        };
        return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
        return res.status(201).json({ token });
    })
    .catch((err) => {
        console.error(err);
        if(err.code === 'auth/email-already-in-use') {
            return res.status(400).json({ email: 'Email is already in use'});
        } else {
            return res.status(500).json({ general: 'Something went wrong, please try again' });
        }
    });
};

exports.login = (req,res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { valid, errors } = validateLoginData(user);

    if(!valid) return res.status(400).json(errors);
    

    signInWithEmailAndPassword(auth, user.email, user.password)
    .then(data => {
        return data.user.getIdToken();
    })
    .then(token => {
        return res.json({token});
    })
    .catch(err => {
        console.error(err);
        if(err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found'){
            return res.status(403).json({ general: 'Wrong Email or Password. Please, try again'});
        } else return res.status(500).json({ error: err.code });
    });
    

}