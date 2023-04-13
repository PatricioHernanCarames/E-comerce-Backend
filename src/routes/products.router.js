import __dirname from "../utils.js";
import { Router, json } from "express";
import ProductManager from "../api/ProductManager.js";
import productsModel from "../models/products.model.js";

let manager = new ProductManager(__dirname + "/api/products.json");

const productsRouter = Router();

productsRouter.use(json());

productsRouter.get("/", async (req, res) => {
  try {
    const products = await productsModel.find();

    res.send(products);

    /*res.render({ status: "ok", payload: products });*/
  } catch (error) {
    res.status(500).send({ status: "error", payload: error });
  }
});



productsRouter.post("/task/add",async (req, res) => {
  try {
    const task = productsModel(req.body);
    console.log(task);

    res.status(201).send(task);
    await task.save();
  } catch (e) {
    res.status(500).send({ status: "error", payload: e.message });
  }
});

productsRouter.put("/:prodId", async (req, res) => {
  const { prodId } = req.params;

  const pdatedProdData = req.body;

  const updatedProd = await userModel.findOneAndUpdate(
    { _id: prodId },
    pdatedProdData,
    { new: true }
  );

  res.status(200).send({ status: "ok", payload: updatedProd });
});

productsRouter.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  const result = await userModel.deleteOne({ _id: userId });

  res.status(200).send({ status: "ok", payload: result });
});

export default productsRouter;
