const express = require('express');
const router = express.Router();
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrders } = require('../controllers/orderController');
const { isAuthenticatedUser, autherizeRoles } = require('../middleware/auth');

router.post("/order/new", isAuthenticatedUser, newOrder)

router.get("/order/:id", isAuthenticatedUser, getSingleOrder)

router.get("/orders/me", isAuthenticatedUser, myOrders)

router.get("/admin/orders", isAuthenticatedUser, autherizeRoles("admin"), getAllOrders)

router.put("/admin/order/:id", isAuthenticatedUser, autherizeRoles("admin"), updateOrder)

router.delete("/admin/order/:id", isAuthenticatedUser, autherizeRoles("admin"), deleteOrders)

module.exports = router;
