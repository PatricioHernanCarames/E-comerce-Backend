import express from "express";
import ProductManager from "./src/desafioEntregable.js";

const manager = new ProductManager();
const app = express();

app.get("/wellcome", (req, res) => {
  res.send(`<p style style='color:blue'> Wellcome</p>`);
});

app.get("/products", async (req, res) => {
  const limit = parseInt(req.query.limit) || undefined;
  const products = await ProductManager.getProducts(limit);
  res.send(products);
});

app.get("/products/:pid", async (req, res) => {
  const products = await manager.getProductById();
  const id = req.params.id;

  const idIsPresent = products.find(function (product) {
    product.id === id;
  });

  if (idIsPresent) {
    res.send(idIsPresent);
  } else {
    res.status(404).send("Product not found");
  }
});
app.listen(8080, () => {
  console.log("Servidor corriendo en http://localhost:8080/");
});
