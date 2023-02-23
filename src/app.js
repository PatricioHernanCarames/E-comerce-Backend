import express from "express";
import ProductManager from "./desafioEntregable.js";

const manager = new ProductManager();
const app = express();

app.get("/wellcome", (req, res) => {
  res.send(`<p style style='color:blue'> Wellcome</p>`);
});

app.get("/products", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = await manager.getProducts();
  
  if(limit){
    return products.slice(0, limit)
  }else{
    return products;
  }
  
  
});

app.get("/products/:pid", async (req, res) => {
  const id = req.params.pid;
  const products = await manager.getProductById(id);
    
  res.send(products);

  
});
app.listen(8080, () => {
  console.log("Servidor corriendo en http://localhost:8080/");
});
