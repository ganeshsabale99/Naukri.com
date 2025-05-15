const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
// const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Get user profile
router.get('/users/profile', authMiddleware, userController.getUserProfile);

// Get All user profile
router.get('/users',  userController.getAllUserProfile);

// Get All user profile
router.get('/dashboard',  userController.getDashboard);

// Get All user profile
router.get('/users',  userController.getAllUserProfile);

// Update user profile
router.put('/users/profile',  authMiddleware, userController.updateUserProfile);


// Delete user (admin only)
// router.delete('/users/:id',adminMiddleware, authMiddleware, userController.deleteUser);

//add new ledger entry
router.post('/users/addNewEntry/:id', userController.addLedgerEntry);

//update ledger Entry
router.put('/users/:id/ledger/:entryId', userController.updateLedgerEntry);



module.exports = router;
