const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },

    quantity: {
        type: Number,
        required: true,
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    orderItem: {
        type: [orderItemSchema],
    },

    address: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ["PENDING", "CANCELLED", "DELEVERED"],
        default: "PENDING",
    },
})

const orderSchema = new mongoose.Schema({
    orderPrice: {
        type: Number,
        required: true,
    },


}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);