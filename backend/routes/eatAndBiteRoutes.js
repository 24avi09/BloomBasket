const express = require('express');
const router = express.Router();
const { getResturentDetails, getAllResturents } = require('../controllers/productController');



router.get("/all/resturent/:location", getAllResturents);

router.get("/resturent/:id", getResturentDetails);




module.exports = router;