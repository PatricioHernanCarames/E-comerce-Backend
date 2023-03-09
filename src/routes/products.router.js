import fs from "fs";
import path from "path";
import express from  "express"
const prodRouter = express.Router();

// Endpoint para obtener todos los productos
prodRouter.get('/', (req, res) => {
  const productsPath = path.join(__dirname, 'products.json');
  fs.readFile(productsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener los productos');
    } else {
      const products = JSON.parse(data);
      res.json(products);
    }
  });
});


prodRouter.get('/:id', (req, res) => {
  
  const productId = req.params.id;
  const product = { id: productId, name: `Producto ${productId}` };
  res.json(product);
});


prodRouter.post('/', (req, res) => {
  
  const product = req.body;
  
  if (!product || !product.name) {
    res.status(400).json({ error: 'El nombre del producto es obligatorio' });
  } else {
    
    product.id = Math.floor(Math.random() * 1000) + 1;
    res.status(201).json(product);
  }
});

prodRouter.put('/:id', (req, res) => {
  
  const productId = req.params.id;
  const product = req.body;
  
  if (!product || !product.name) {
    res.status(400).json({ error: 'El nombre del producto es obligatorio' });
  } else {
    
    product.id = productId;
    res.json(product);
  }
});


prodRouter.delete('/:id', (req, res) => {
  
  const productId = req.params.id;
  
  res.sendStatus(204);
});

export default prodRouter;
