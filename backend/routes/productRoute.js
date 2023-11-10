const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductDetails, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReviews } = require('../controllers/productController');
const { isAuthenticatedUser, autherizeRoles } = require('../middleware/auth');




router.post("/admin/products/new", isAuthenticatedUser, autherizeRoles("admin"), createProduct);

router.get("/products", getAllProducts);

router.get("/product/:id", getProductDetails);

router.put("/admin/products/:id", isAuthenticatedUser, autherizeRoles("admin"), updateProduct);

router.delete("/admin/products/:id", isAuthenticatedUser, autherizeRoles("admin"), deleteProduct);

router.put("/review", isAuthenticatedUser, createProductReview);

router.get("/review", getProductReviews);

router.delete("/review", isAuthenticatedUser, deleteReviews);




module.exports = router;