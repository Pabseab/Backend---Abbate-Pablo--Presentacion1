
import {Router} from "express";
import ProductManager from "../controllers/ProductManager.js";
import { nanoid } from "nanoid";

const ProductRouter = Router()
const product = new ProductManager();

ProductRouter.get("/", async (req, res) => {
    res.send (await product.getproducts())
})

ProductRouter.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send (await product.getproductsById(id))
})

ProductRouter.post("/", async (req, res) => {
    let newProduct = { 
    id: nanoid(),
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: true,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails
    }
    res.send (await product.addProducts(newProduct))
})

ProductRouter.put("/:id", async (req, res) => {
    let id = req.params.id;
    let updateProduct = req.body;
    res.send (await product.updateProducts(id, updateProduct))
})

ProductRouter.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.send (await product.deleteProducts(id))
})

export default ProductRouter