class ProductManager {
    nextId = 0;
    products = [];
  
    addProduct(title, description, price, thumbnail, stock, code) {

        let codeExists = this.products.some((p) => p.code === code);
  
      if (!codeExists) {
        
        const newProduct = {
            id: this.nextId,
            title,
            description,
            price,
            thumbnail,
            stock,
            code,
          };
      
          this.products = [...this.products, newProduct];
      
          
      
          this.nextId++;
          
        
      } else {
        console.log(`El producto con código ${code} ya existe`);
      }



      
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      let idIsPresent = this.products.find(function (product) {
        return product.id === id;
      });
  
      if (idIsPresent) {
        return idIsPresent;
      } else {
        console.log("Product not found");
      }
    }
  }
  
  const manager = new ProductManager();
  
  console.log(manager);
  
  manager.addProduct("Laptop", "Laptop computer", 1000, "this.jpg", "100", 236);
  manager.addProduct("Gamer PC", "Desktop computer", 10000, "this.jpg", "100", 237);
  manager.addProduct("Gamer headset", "Accesories", 70, "this.jpg", "100", 238);

  console.log(manager);

 
let prod = manager.getProductById(0);
 console.log(prod);

 manager.addProduct("Desktop switch", "ethernet", 20, "this.jpg", "100", 238);  
  

let prods = manager.getProducts();
 console.log(prods);