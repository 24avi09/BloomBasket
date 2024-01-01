const Product = require("../models/productModel");
const EatAndBites = require("../models/eatAndBitesModal");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require('../middleware/catchAsync');
const ApiFeatures = require('../utils/apifeatures')



//create product --> Admin

createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).send({ success: true, product })

})


//get all products

getAllProducts = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeatures.query;

    res.status(200).send({ success: true, products, productsCount, })

});





// get all resturent

getAllResturents = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 8;
    const resturentsCount = await EatAndBites.countDocuments();

    const apiFeatures = new ApiFeatures(EatAndBites.find(), req.query).search().filter().pagination(resultPerPage);
    const resturents = await apiFeatures.query;

    res.status(200).send({ success: true, resturents, resturentsCount, })

});



//get resturent details

getResturentDetails = catchAsyncErrors(async (req, res, next) => {

    let resturent = await EatAndBites.findById(req.params.id);

    if (!resturent) {
        return next(new ErrorHandler("Resturent not found", 404));
    }

    return res.status(200).send({ success: true, resturent });

});







//get product details

getProductDetails = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    return res.status(200).send({ success: true, product });

});



//Update products --> Admin

updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    return res.status(200).send({ success: true, product });

})



//Update products --> Admin

deleteProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.remove();

    return res.status(200).send({ success: true, message: "Product Deleted Successfully" });

});



//Update products --> Admin

createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviewed = await product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {

        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                (rev.rating = rating), (rev.comment = comment);
            }

        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach(rev => { avg += rev.rating });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false })

    res.status(200).send({ success: true })

})


///===  Get All reviews of a product

getProductReviews = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).send({ success: true, reviews: product.reviews })
})


///===  Delete reviews of a product

deleteReviews = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

    let avg = 0;

    reviews.forEach(rev => { avg += rev.rating })

    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })


    res.status(200).send({ success: true })
})


module.exports = { createProduct, getAllProducts, getProductDetails, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReviews,getAllResturents,getResturentDetails }