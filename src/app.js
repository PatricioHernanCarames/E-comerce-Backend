/*import express from "express";
import ProductManager from "./desafioEntregable.js";
import router from "./routes/cart.router.js";




  agregarProducto(producto) {
    this.productos.push(producto);
  }



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

app.post('/POST', (req, res) => {
  const product = req.body;

  
  if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
    res.status(400).json({ error: 'Todos los campos son obligatorios' });
    return;
  }

  
  const newProduct = productManager.addProduct({
    title: product.title,
    description: product.description,
    code: product.code,
    price: product.price,
    status: product.status || true,
    stock: product.stock,
    category: product.category,
    thumbnails: product.thumbnails || []
  });

  
  res.status(201).json(newProduct);
});

app.post('/cart', (req, res) => {
  const newCart = new Cart();
  
  res.status(201).json(newCart);
});



app.listen(8080, () => {
  console.log("Servidor corriendo en http://localhost:8080/");
});*/

import express from "express";
import router from "./routes/cart.router.js";
import __dirname from "./utils.js";


const app = express();

app.use(express.static(__dirname + "/../public"));

app.use("/api/users", router);


app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

