const { updateProjectDetails} = require('../util/validators');

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
        isFullyPaid: req.body.isFullyPaid,
        room: req.body.room,
        size: req.body.size,
        
    };

    if(req.user.userStatus === 'admin'){
    db.collection('houseProjects').add(newProject)
    .then(doc => {
        res.json({ message: `document ${doc.id} was successully created!`});
    })
    .catch(err => {
        res.status(500).json({error: 'something went wrong'});
        console.error(err);
    });
    } else {
        return res.status(403).json({ general: "Only administrators are allowed to do so" });
    }
};


//Edit Project on Button "Edit"
//Pass any fields and it will change only columns that you pass.
exports.editProject = (req, res) => {
    const documentRoute = db.collection('houseProjects').doc(req.params.projectId);
    let updatedProjectData = updateProjectDetails(req.body);

    if(req.user.userStatus === 'admin'){
        documentRoute.update(updatedProjectData)
            .then(() => {
                return res.json({ message: "Edited successfully" });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({ error: err.code });
            });
    }
    else {
        return res.status(403).json({ general: "Only administrators are allowed to do so" });
    }

    
}


//Delete project

exports.deleteProject = (req, res) => {
    const document = db.doc(`/houseProjects/${req.params.projectId}`);
    document.get()
    .then(doc => {
        if(!doc.exists){
            return res.status(404).json({ error: 'Project not found' });
        }
        // if(doc.data.userHandle !== req.user.handle){
        if(req.user.userStatus != 'admin'){
            return res.status(403).json({ error: 'Unauthorized'})
        } else {
            return document.delete();
        }
    })
    .then(()=>{
        res.json({ message: 'Project deleted successfully'});
    })
    .catch(err=>{
        console.error(err);
        return res.status(500).json({ error: err.code });
    })
}