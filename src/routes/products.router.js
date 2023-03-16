import { Router, json } from "express";
import ProductManager from "../ProductManager.js";


let manager = new ProductManager("./src/api/products.json");



const productsRouter = Router();

productsRouter.use(json()); 



productsRouter.get('/:prod', async (req, res) => {

    const products =await manager.getProducts();

    

    res.render("realTimeProducts", {products});

    

});

export default productsRouter;