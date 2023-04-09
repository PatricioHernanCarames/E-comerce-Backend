import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    item: String,
    description: String,
    price: Number,
    image: String,
    stock: Number,
    created: { type: Date, default: Date.now }, 
    updated: { type: Date, default: Date.now },
    code:Number
})

const productsModel = mongoose.model("products", productsSchema);

export default productsModel;