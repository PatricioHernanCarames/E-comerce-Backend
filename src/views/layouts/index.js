const socket = io();

let customerName;

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "ingresa tu nombre",
  inputValidator: (value) => {
    return !value && "es obligatorio ingresar tu nombre";
  },
  allowOutsideClick: false,
}).then((result) => {

  customerName = result.value;
});

const chatInput = document.getElementById("chat-input");
chatInput.addEventListener("keyup", (ev) => {
  if (ev.key === "Enter") {
    const inputMessage = chatInput.value;

    if (inputMessage.trim().length > 0) {
      socket.emit("chat-message", { customerName, message: inputMessage });
      chatInput.value = "";
    }

    console.log("tecla levantada");
  }
});

socket.emit("message", "Mensaje desde frontend!");

socket.on("message", (data) => {
  console.log(data);
});

socket.on("input-changed", (data) => {
  const receivedTextInput = document.getElementById("received-text-input");
  receivedTextInput.innerHTML = data;
});

const messagesPanel = document.getElementById("messages-panel");
socket.on("messages", (data) => {
  console.log(data);
  let messages = "";
  data.forEach((m) => {
    messages += `<b>${m.customerName}:</b> ${m.message}</br>`;
  });

  messagesPannel.innerHTML = messages;
});

socket.on("new-user", (username) => {
  Swal.fire({
    title: `${username} se ha unido al chat`,
    toast: true,
    position: "top-end",
  });
});

/*const textInput = document.getElementById("text-input");
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
});*/
