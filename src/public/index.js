import mongoose from "mongoose";
import ProductManager from "../api/ProductManager.js";
const socket = io();

socket.emit("message", "Mensaje desde frontend!");

socket.on("message", (data) => {
  console.log(data);
});

socket.on("input-changed", (data) => {
  const receivedTextInput = document.getElementById("received-text-input");
  receivedTextInput.innerHTML = data;
});

const textInput = document.getElementById("text-input");
textInput.addEventListener("input", (ev) => {
  socket.emit("input-changed", ev.target.value);
});

const newProduct = document.getElementById("newProd");
newProduct.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const code = document.getElementById("code").value;

  const productData = { name, description, price, quantity, thumbnail, code };
  ProductManager.addProduct(productData);
  ProductManager.saveProducts();
});




