const mongoose = require("mongoose");

const eatAndBitesSchema = new mongoose.Schema({
    menuData: {
        type: Object,
        required: [true, "Please Enter Product Name"]
    },
    info: {
        type: Object,
        required: [true, "Please Enter Discription"]
    },
})

module.exports = mongoose.model("Eatandbites", eatAndBitesSchema);