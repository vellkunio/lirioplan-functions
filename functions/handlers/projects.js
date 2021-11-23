const { updateUserDetails} = require('../util/validators');

const { db } = require('../util/admin');

exports.getAllProjects = (req, res) => {
    db
    .collection('houseProjects')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
        let houseProjects = [];
        data.forEach(doc => {
            houseProjects.push({
                projectId: doc.id,
                ...doc.data()
            });
        });
        return res.json(houseProjects);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
    });
};

exports.addProject = (req, res) => {
   
    const newProject = {
        // createdAt: admin.firestore.Timestamp.now(), //Will show date in seconds like "_seconds": 1634864349, "_nanoseconds": 420000000
        address: req.body.address,
        createdAt: new Date().toISOString(),
        bossCompany: req.body.bossCompany,
        userHandle: req.user.handle,
        makeMoney: req.body.makeMoney,
        spendMoney: req.body.spendMoney,
        isStarted: req.body.isStarted,
        isFinished: req.body.isFinished,
        isFullyPaid: req.body.isFullyPaid
    };

    db.collection('houseProjects').add(newProject)
    .then(doc => {
        res.json({ message: `document ${doc.id} was successully created!`});
    })
    .catch(err => {
        res.status(500).json({error: 'something went wrong'});
        console.error(err);
    });
};


//Edit Project on Button "Edit"
//Pass any fields and it will change only columns that you pass.
exports.editProject = (req, res) => {
    const documentRoute = db.collection('houseProjects').doc(req.params.projectId);
    let updatedUserData = updateUserDetails(req.body);

    documentRoute.update(updatedUserData)
    .then(() => {
        return res.json({ message: "Edited successfully" });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
}