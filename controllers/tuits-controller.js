import posts from "./tuits.js";
let tuits = posts;

const createTuit = (req, res) => {
 const newTuit = req.body;
 if(req.query.postedBy) {
    newTuit.postedBy.username = req.query.postedBy.username;
 }
 newTuit._id = (new Date()).getTime()+'';
 newTuit.likes = 0;
 newTuit.tuit = req.query.tuit;
 tuits.push(newTuit);
 res.json(newTuit);
}

const findAllTuits = (req, res) => res.json(tuits);

const updateTuit = (req, res) => {
 const tuitdIdToUpdate = req.params.tid;
 const updatedTuit = req.body;
 const currentTuit = tuits.find(tuit => tuit._id === tuitdIdToUpdate);
 updatedTuit.tuit = req.query.tuit;
 updatedTuit._id = tuitdIdToUpdate;
 updatedTuit.likes = currentTuit.likes;
 if(currentTuit.postedBy) {
    updatedTuit.postedBy = currentTuit.postedBy;
 }

 tuits = tuits.map(t => t._id === tuitdIdToUpdate ? updatedTuit : t);
 res.sendStatus(200);
}

const deleteTuit = (req, res) => {
 const tuitdIdToDelete = req.params.tid;
 tuits = tuits.filter(t => t._id !== tuitdIdToDelete);
 res.sendStatus(200);
}

const findTuitById = (req, res) => {
 const tuitId = req.params.tid;
 const tuit = tuits.find(u => u._id === tuitId);
 res.json(tuit);
}


const tuitsController = (app) => {
 app.post('/api/tuits', createTuit);
 app.get('/api/tuits', findAllTuits);
 app.put('/api/tuits/:tid', updateTuit);
 app.delete('/api/tuits/:tid', deleteTuit);
 app.get('/api/tuits/:tid', findTuitById);
}


export default tuitsController;