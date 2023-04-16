import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  thumbnail: { type: [], default: [] },
  stock: { type: Number, required: true },
  code: { type: Number, required: true, unique: true },
  status: { Type: Boolean },
  category: { type: String, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const productsModel = mongoose.model("products", productSchema);

export default productsModel;
