import express from "express";
import viewsRouter from "./routes/view.router.js"
import productsRouter from "./routes/products.router.js";
import cartRouter  from "./routes/cart.router.js"
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import {Server} from "socket.io"
import "./database.js"
import bodyParser from "body-parser";
import morgan from "morgan"


const app = express();
const messages=[];

app.use(express.json());
app.use( productsRouter);
app.use("/api/carts", cartRouter)

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views",__dirname + "/views")


//middlewares
app.use(express.static(__dirname + "/../public"));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'))


app.use("/", viewsRouter);







const httpServer = app.listen(8080, () => {
    console.log("Server listening on port 8080");
  });
  
  const io = new Server(httpServer);

  
  
  io.on("connection", (socket) => {
    console.log("New client connected!");
  
    socket.on("chat-message", (data) => {
      console.log(data);
      messages.push(data);
  
      
       socket.broadcast.emit("message", messages);
      
    });
  
    socket.on("input-changed", (data) => {
      console.log(data);
      io.emit("input-changed", data);
    });
  
    socket.on("new-message", (data) => {
      messages.push({ socketId: socket.id, mensaje: data });
    });
  
    
  });

  

  
