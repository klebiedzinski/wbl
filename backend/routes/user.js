const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const { signupUser, loginUser, verifyUser, getAllUsers, deleteUser, updateUser, getUserByEmail } = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// verify user
router.get('/verifyUser/:id', verifyUser);

// middleware to check if user is logged in
router.use(requireAuth);

// get all users
router.get('/', getAllUsers);

// get user by email
router.get('/:email', getUserByEmail);

// delete user
router.delete('/:id', deleteUser);

// update user
router.patch('/:id', updateUser);


module.exports = router

