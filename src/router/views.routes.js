
import { Router } from "express";
import CartManager from "../controllers/CartManager.js";
import ProductManager from "../controllers/ProductManager.js";

const ViewsRouter = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

ViewsRouter.get("/", async (req, res) => {
    try {
        const products = await productManager.getproducts();
        res.render(
            "home",
            {
                title: "Home",
                style: "styles.css",
                products 
            });
    } catch (error) {
        res.status(500).send({error: "Error interno del servidor"});
    }    
});

//ViewsRouter.get("/products", async (req, res) => {
//    try {
//        const products = await productManager.getproducts();
//        res.render(
//            "products",
//        {
//            title: "products",
//            style: "styles.css",
//            products
//        }
//        );
//    } catch (error) {
//        res.status(500).send(error.message);
//    }    
//});

//ViewsRouter.get("/carts", async (req, res) => {
//    try {
//        const carts = await cartManager.readCarts();
//        res.render(
//            "carts",
//        {
//            title: "carts",
//            style: "styles.css",
//            carts
//        }
//        );
//    } catch (error) {
//        res.status(500).send(error.message);
//    }    
//});














//ViewsRouter.get("/", (req, res) => {
//    res.render("home", {
//        products
//    })
//})


export default ViewsRouter