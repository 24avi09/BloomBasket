const express = require('express');
const router = express.Router();
const { getResturentDetails, getAllResturents } = require('../controllers/productController');
const { isAuthenticatedUser, autherizeRoles } = require('../middleware/auth');






router.get("/all/resturent/:location", getAllResturents);

router.get("/resturent/:id", getResturentDetails);






module.exports = router;