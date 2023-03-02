class CartManager {
    #path = "./carts.json";
    #carts = [];
  
    constructor(path) {
      this.#path = path;
      this.getCarts().then((carts) => {
        this.#carts = carts;
      });
    }
  
    async getCarts() {
      try {
        const carts = await fs.promises.readFile(this.#path);
        return JSON.parse(carts);
      } catch (error) {
        return [];
      }
    }
  
    async addCart(cart) {
      this.#carts = [...(await this.getCarts()), cart];
      await this.saveCarts();
    }
  
    async saveCarts() {
      try {
        await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts));
      } catch (e) {
        console.log(`Error guardando los archivos en  ${this.#path}`);
      }
    }
  
    getNextId() {
      return this.#carts.length + 1;
    }
  }
  
  export default CartManager;
  