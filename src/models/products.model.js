import mongoose from "mongoose";

/*const productsSchema = new mongoose.Schema({
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

export default productsModel;*/

const productSchema = new mongoose.Schema({
  item: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  stock: { type: Number, required: true },
  code: { type: Number, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const productsModel = mongoose.model("products", productSchema);

export default productsModel;