import { Schema, model } from "mongoose";

const productsSchema = new Schema({
  item: { type: String, required: true },
  description: String,
  price: Number,
  image: String,
  stock: Number,
  code: Number,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

export default model("Products", productsSchema);
