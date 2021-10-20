const express = require('express');
const router = express.Router();
const { isAuthenticated, authorizedRoles } = require('../middlewares/auth')

const { registerUser,
     loginUser,
      logoutUser,
    getUserProfile,
    updateProfile,
    allUsers,
    getUserDetails } = require('../controllers/AuthController')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/me').get(isAuthenticated, getUserProfile)
router.route('/me/update').put(isAuthenticated, updateProfile)
router.route('/admin/users').get(isAuthenticated, authorizedRoles('admin'), allUsers)
router.route('/admin/user/:id').get(isAuthenticated, authorizedRoles('admin'), getUserDetails)



module.exports = router;