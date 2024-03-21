
import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";

import {engine} from "express-handlebars";
import { __dirname } from "./utils.js";
import * as path from "path"

import {Server} from "socket.io";

const app = express();
const PORT = 8080;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

app.use("/", express.static(__dirname + "/public"))

app.get("/", (req, res) => {
    res.render("home");
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/products", ProductRouter)
app.use("/carts", CartRouter)

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`);
});


const socketServer = new Server(httpServer);

socketServer.on("connection", socket => {
    console.log("Nuevo Cliente Conectado");

    socket.on("message", data => {
        console.log("Recibi el dato: ", data);
    })
});