const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const { signupUser, loginUser, getAllUsers, deleteUser, updateUser } = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

router.use(requireAuth);

// get all users
router.get('/', getAllUsers);

// delete user
router.delete('/:id', deleteUser);

// update user
router.patch('/:id', updateUser);


module.exports = router

