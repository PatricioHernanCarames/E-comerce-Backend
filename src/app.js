import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter  from "./routes/cart.router.js"
import {engine} from "express-handlebars";
import __dirname from "./utils.js";
import {Server} from "socket.io"
import mongoose from "mongoose";


const app = express();

app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter)

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views",__dirname + "/views")

app.get("/",
(req, res) => {
    res.render("home");
    
});




const httpServer = app.listen(8080, () => {
    console.log("Server listening on port 8080");
  });
  
  const socketServer = new Server(httpServer);
  
  socketServer.on("connection", (socket) => {
    console.log("New client connected!");
  
    socket.on("message", (data) => {
      console.log(data);
  
      //socket.emit("message", "Mensaje enviado desde el servidor!");
       socket.broadcast.emit("message", "Mensaje broadcasteado!");
      // socketServer.emit("message", "Mensaje global!");
    });
  
    socket.on("input-changed", (data) => {
      console.log(data);
      socketServer.emit("input-changed", data);
    });
  
    socket.on("new-message", (data) => {
      messages.push({ socketId: socket.id, mensaje: data });
    });
  
    // setInterval(() => {
    //   socket.emit("message", "Información actualizada");
    // }, 1000);
  });

  mongoose
  .connect("mongodb+srv://PatricioHCarames:Back1234@backende-commerce.8rpdxkg.mongodb.net/?retryWrites=true&w=majority")
  .then((conn)=>{
    console.log("Connected to MongoDB");
  });

  
