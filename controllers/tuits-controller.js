import * as tuitsDao from "../tuits-dao.js";
//import posts from "./tuits.js";
//let tuits = posts;

const createTuit = async (req, res) => {
 const newTuit = req.body;
 if(req.query.postedBy) {
    newTuit.postedBy.username = req.query.postedBy.username;
 }
 //newTuit._id = (new Date()).getTime()+'';
 //newTuit.tuit = "test!";
 //newTuit.tuit = req.query.tuit;

 newTuit.topic = "Web Development";
 newTuit.liked = false;
 newTuit.disliked = false;
 newTuit.verified = false;
 newTuit.handle = "Java";
 newTuit.title = "";
 newTuit.logoImage = "../java.png";
 newTuit.avatarImage = "../java.png";
 newTuit.time = "Now";
 newTuit.stats = {"comments": 0, "retuits": 0, "likes": 0, "dislikes": 0};
 newTuit.postedBy = {"username": "java"}
 //tuits.push(newTuit);
 const insertedTuit = await tuitsDao.createTuit(newTuit);
 res.json(insertedTuit);
}

const findAllTuits = async (req, res) => {
  const tuits = await tuitsDao.findAllTuits()
  res.json(tuits);
}

const updateTuit = (req, res) => {
 const tuitdIdToUpdate = req.params['tid'];
 const updatedTuit = req.body;
 const status = await tuitsDao.updateTuit(tuitdIdToUpdate, updatedTuit);
 //tuits = tuits.map(t => t._id === tuitdIdToUpdate ? updatedTuit : t);
 res.send(status);
}

const deleteTuit = async (req, res) => {
 const tuitdIdToDelete = req.params.tid;
 const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
 //tuits = tuits.filter(t => t._id !== tuitdIdToDelete);
 res.send(status);
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