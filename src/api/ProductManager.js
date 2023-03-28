import fs from "fs";
import __dirname from "../utils.js";

class ProductManager {
  #path = __dirname +"/products.json";
  #nextId = 0;
  #products = [];

  constructor(path) {
    this.#path = path;
    this.getProducts().then((products) => {
      this.#products = products;
      this.#nextId = products.length;
    });
  }

  async addProduct(productData) {
    const { name, description, price, quantity, thumbnail, code  } = productData;
    
    
    let codeExists = (await this.getProducts()).some((p) => p.code === code);

    if (!codeExists) {
      const newProduct = {
        id: this.#nextId,
        name,
        description,
        price,
        quantity,
        thumbnail,
        code
      };

      this.#products = [...(await this.getProducts()), newProduct];
      this.#nextId++;
      
    } else {
      console.log(`El producto con código ${code} ya existe`);
    }
  }

  

  async getProducts() {
    try {
      const products = await fs.promises.readFile(this.#path);
      return JSON.parse(products);
    } catch (error) {
      return Promise.reject(error); 
    }
  }
  

  async getProductById(id) {
    let idIsPresent = (await this.getProducts()).find(function (product) {
      return product.id === id;
    });

    if (idIsPresent) {
      return idIsPresent;
    } else {
      console.log("Product not found");
    }
  }

  async updateProducts(id, name, price) {
    let products = await this.getProducts();
    let product = products.find((p) => p.id == id);

    if (product) {
      product.title = name;
      product.price = price;
      await fs.promises.writeFile(this.#path, JSON.stringify(products));
    } else {
      console.log(`Producto con id ${id} no encontrado`);
    }
  }

  async deleteProduct(productId) {
    let products = await this.getProducts();
    let product = products.find((p) => p.id === productId);
    let index = products.indexOf(product);

    if (index !== -1) {
      products.splice(index, 1);
      await fs.promises.writeFile(this.#path, JSON.stringify(products));
    } else {
      console.log(`Producto con id ${productId} no encontrado`);
    }
  }

  async saveProducts() {
    try {
      await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
    } catch (e) {
      console.log(`Error guardando los archivos en  ${this.#path}`);
    }
  }
}

export default ProductManager;
