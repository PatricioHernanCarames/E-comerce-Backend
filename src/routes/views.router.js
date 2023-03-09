import fs from "fs";
import path from "path";
import express from  "express"
import { Router } from "express"





const viewRouter = express.Router();

const router = Router();

viewRouter.get("/", (req, res) => {
  res.render("home");
});

viewRouter.get('/:realTimeProducts', (req, res) => {
    const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al obtener los productos');
      } else {
        const products = JSON.parse(data);
        const source = fs.readFileSync(path.join(__dirname, '..', 'views', 'products.hbs'), 'utf8');
        const template = handlebars.compile(source);
        const html = template({ products });
        res.send(html);
      }
    });
  });

  viewRouter.post('/', (req, res) => {
    const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al obtener los productos');
      } else {
        const products = JSON.parse(data);
        const newProduct = req.body;
        newProduct.id = products.length + 1; // Generar un ID único para el nuevo producto
        products.push(newProduct);
        fs.writeFile(productsFilePath, JSON.stringify(products), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error al agregar el nuevo producto');
          } else {
            res.json(newProduct); // Devolver los datos del nuevo producto en JSON
          }
        });
      }
    });
  });


  viewRouter.delete('/:id', (req, res) => {
    const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');
    fs.readFile(productsFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al obtener los productos');
      } else {
        const products = JSON.parse(data);
        const productId = parseInt(req.params.id);
        const index = products.findIndex(product => product.id === productId);
        if (index === -1) {
          res.status(404).send('Producto no encontrado');
        } else {
          products.splice(index, 1);
          fs.writeFile(productsFilePath, JSON.stringify(products), (err) => {
            if (err) {
              console.error(err);
              res.status(500).send('Error al eliminar el producto');
            } else {
              res.json({ message: 'Producto eliminado con éxito' }); // Devolver un mensaje de éxito en JSON
            }
          });
        }
      }
    });
  });


  





  export default viewRouter;