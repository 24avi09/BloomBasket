const User = require('../models/userModel');
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require('../middleware/catchAsync');



///=== Creat new Order

newOrder = catchAsyncErrors(async (req, res, next) => {

    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(201).send({ success: true, order })

});


///=== Get single Order 

getSingleOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        next(new ErrorHandler("Order not found with this Id", 404))
    }

    res.status(200).send({ success: true, order })

});


///=== Get loggedIn User Order

myOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id });

    res.status(200).send({ success: true, orders })

});


///=== Get All Order  --> Admin

getAllOrders = catchAsyncErrors(async (req, res, next) => {

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => { totalAmount += order.totalPrice });
    
    res.status(200).send({ success: true, totalAmount, orders })
    
});


///=== Update Order Status  --> Admin

updateOrder = catchAsyncErrors(async (req, res, next) => {
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
        next(new ErrorHandler("Order not found with this Id", 404))
    }
    
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delievered this order", 400))
    }

    order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity);
    });

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).send({ success: true, })

});

async function updateStock(id, quantity) {

    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
}


///=== Delete Order  --> Admin

deleteOrders = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        next(new ErrorHandler("Order not found with this Id", 404))
    }

    await order.remove()

    res.status(200).send({ success: true, })

});


module.exports = { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrders }