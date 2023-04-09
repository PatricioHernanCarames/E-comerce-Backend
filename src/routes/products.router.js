import __dirname from "../utils.js";
import { Router, json } from "express";
import ProductManager from "../api/ProductManager.js";
import Products from "../models/products.model.js";
import router from "./view.router.js";

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


productsRouter.post("/task/add", async (req, res) => {
  try {
    const newProduct = new Products(req.body);
    console.log(newProduct)
    /*const savedProduct = await newProduct.save();
    res.status(200).send({
      status: "ok",
      payload: savedProduct,
      message: "Product was successfully added",
    });*/
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: "error", payload: error });
  }
});


/*productsRouter.post("/task/add", async (req, res) => {
  //const { item, description, price, image, stock, code } = req.body;
  console.log(req.body)

  try {
    const products = Products(req.body);
    console.log(products);
    
  } catch (e) {
    console.log(e);
  }
});*/

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
