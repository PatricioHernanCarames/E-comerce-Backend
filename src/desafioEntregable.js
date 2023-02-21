import fs from "fs";

class ProductManager {
  #path = "./src/products.json";
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
    try {
      await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
    } catch (e) {
      console.log(`Error gusrdando los archivos en  ${this.#path}`);
    }
  }
}

export default ProductManager;
