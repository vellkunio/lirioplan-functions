const { db } = require('../util/admin');
const { updateMaterialDetails} = require('../util/validators');

exports.addMaterial = (req, res) => {
   
    const newMaterial = {
        // createdAt: admin.firestore.Timestamp.now(), //Will show date in seconds like "_seconds": 1634864349, "_nanoseconds": 420000000
        materialType: req.body.materialType,
        createdAt: new Date().toISOString(),
        materialExactName: req.body.materialExactName,
        userHandle: req.user.handle,
        uniqueCode: req.body.uniqueCode,
        manufacturer: req.body.manufacturer,
        quantityInBox: req.body.quantityInBox,
        length: req.body.length,
        width: req.body.width,
        height: req.body.height,
        sqftPerTile: req.body.sqftPerTile,
        sqftPerBox: req.body.sqftPerBox,
        price: req.body.price
    };

    // if(req.user.isAdmin){
    db.collection('materials').add(newMaterial)
    .then(doc => {
        res.json({ message: `document ${doc.id} was successully created!`});
    })
    .catch(err => {
        res.status(500).json({error: 'something went wrong'});
        console.error(err);
    });
    // } else {
    //     return res.status(403).json({ general: "Only administrators are allowed to do so" });
    // }
};

exports.getAllMaterials = (req, res) => {
    db
    .collection('materials')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
        let materials = [];
        data.forEach(doc => {
            materials.push({
                materialId: doc.id,
                ...doc.data()
            });
        });
        return res.json(materials);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
    });
};

//Edit Project on Button "Edit"
//Pass any fields and it will change only columns that you pass.
exports.editMaterial = (req, res) => {
    const documentRoute = db.collection('materials').doc(req.params.materialId);
    let updatedMaterialData = updateMaterialDetails(req.body);

    // if(req.user.isAdmin){
        documentRoute.update(updatedMaterialData)
            .then(() => {
                return res.json({ message: "Edited successfully" });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({ error: err.code });
            });
    // }
    // else {
    //     return res.status(403).json({ general: "Only administrators are allowed to do so" });
    // }

    
}

//Delete project

exports.deleteMaterial = (req, res) => {
    const document = db.doc(`/materials/${req.params.materialId}`);
    document.get()
    .then(doc => {
        if(!doc.exists){
            return res.status(404).json({ error: 'Material not found' });
        }
        // if(!req.user.isAdmin){
        //     return res.status(403).json({ error: 'Unauthorized'})
        // } else {
            return document.delete();
        // }
    })
    .then(()=>{
        res.json({ message: 'Material deleted successfully'});
    })
    .catch(err=>{
        console.error(err);
        return res.status(500).json({ error: err.code });
    })
}