const fs = require("fs");

class ProductManager {
  #path = "./products.json";
  #nextId = 0;
  #products = [];

  constructor(path) {
    this.#path = path;
    this.getProducts().then((products) => {
      this.#products = products;
      this.#nextId = products.length;
    });
  }

  

  async addProduct(title, description, price, thumbnail, stock, code) {
    let codeExists = (await this.getProducts()).some((p) => p.code === code);

    if (!codeExists) {
      const newProduct = {
        id: this.#nextId,
        title,
        description,
        price,
        thumbnail,
        stock,
        code,
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
      return [];
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
    
    try{
    await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
    } catch(e) {
      console.log(`Error gusrdando los archivos en  ${this.#path}`);

  }
}
} 

  


const manager = new ProductManager("./products.json");

console.log(manager);

manager.addProduct("Laptop", "Laptop computer", 1000, "this.jpg", "100", 236);
manager.addProduct(  "Gamer PC",  "Desktop computer",  10000,  "this.jpg",  "100",  237);
manager.addProduct("Gamer headset", "Accesories", 70, "this.jpg", "100", 238);

console.log(manager);

let prod = manager.getProductById(0);
console.log(prod);

manager.addProduct("Desktop switch", "ethernet", 20, "this.jpg", "100", 238);

let prods = manager.getProducts();
console.log(prods);

manager.saveProducts()




