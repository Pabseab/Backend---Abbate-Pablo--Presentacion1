
import {Router} from "express";
import ProductManager from "../controllers/ProductManager.js";
import { nanoid } from "nanoid";

const ProductRouter = Router()
const product = new ProductManager();

ProductRouter.get("/", async (req, res) => {
    try{
        let limit = parseInt(req.query.limit);
        console.log(limit);
        let allProducts = await product.getproducts();

        if(limit){
            allProducts = allProducts.slice(0, limit);
        }
        res.send(allProducts);
        
    }catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

ProductRouter.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send (await product.getproductsById(id))
})

ProductRouter.post("/", async (req, res) => {
    let newProduct = req.body
    res.send (await product.addProducts(newProduct))
    console.log(req.body)
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