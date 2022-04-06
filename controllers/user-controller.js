import people from './users.js';
let users = people;

const userController = (app) => {
 app.get('/api/users', findAllUsers);
 app.get('/api/users/:uid', findUserById);
 app.post('/api/users', createUser);
 app.delete('/api/users/:uid', deleteUser);
 app.put('/api/users/:uid', updateUser);
}


const updateUser = (req, res) => {
 const userId = req.params['uid'];
 const updatedUser = req.body;
 updatedUser.username = req.query.username;
 updatedUser.type = req.query.type;
 updatedUser.tenured = req.query.tenured;
 updatedUser.office = req.query.office;
 updatedUser._id = req.query._id;
 users = users.map(usr =>
   usr._id === userId ?
   updatedUser :
   usr);
 res.sendStatus(200);
}

const deleteUser = (req, res) => {
 const userId = req.params['uid'];
 users = users.filter(usr =>
   usr._id !== userId);
 res.sendStatus(200);
}

const createUser = (req, res) => {
 const newUser = req.body;
 newUser.username = req.query.username;
 newUser.type = req.query.type;
 newUser._id = (new Date()).getTime() + '';
 users.push(newUser);
 res.json(newUser);
}


const findUserById = (req, res) => {
 const userId = req.params.uid;
 const user = users.find(u => u._id === userId);
 res.json(user);
}


const findUsersByType = (type) => {
    return users.filter(user => user.type == type).map(user => user.username);
}

const findAllUsers = (req, res) => {
 const type = req.query.type;
 if(type) {
   res.json(findUsersByType(type));
   return;
 }
 res.json(users);
}

export default userController;