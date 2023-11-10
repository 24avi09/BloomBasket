const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, autherizeRoles } = require('../middleware/auth');



router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/password/forgot", forgotPassword);

router.put("/password/reset/:token", resetPassword);

router.get("/logout", logout);

router.get("/me", isAuthenticatedUser, getUserDetails);

router.put("/password/update", isAuthenticatedUser, updatePassword);

router.put("/me/update", isAuthenticatedUser, updateProfile);

router.get("/admin/users", isAuthenticatedUser, autherizeRoles("admin"), getAllUser);

router.get("/admin/user/:id", isAuthenticatedUser, autherizeRoles("admin"), getSingleUser);

router.put("/admin/user/:id", isAuthenticatedUser, autherizeRoles("admin"), updateUserRole);

router.delete("/admin/user/:id", isAuthenticatedUser, autherizeRoles("admin"), deleteUser);


module.exports = router;