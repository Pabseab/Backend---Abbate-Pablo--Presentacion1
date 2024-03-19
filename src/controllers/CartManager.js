
import {promises as fs, readFile} from "fs"
import {nanoid} from "nanoid"
import ProductManager from "./ProductManager.js";

const productAll = new ProductManager

class CartManager {
    constructor() {
        this.path = "./src/models/carts.json"
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8");
        return JSON.parse (carts);
    };

    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart));
    };

    exist = async (id) =>{
        let carts = await this.readCarts();
        return carts.find (prod => prod.id === id);
    };

    addCarts = async () => {
        let cartsOld = await this.readCarts()
        let id = nanoid()
        let cartsConcat = [{id: id, products : []}, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "Carrito Agregado"
    }

    getCartsById = async (id) => {
        let cartsById = await this.exist (id);
        if(!cartsById) return "Producto no Encontrado"
        return cartsById 
    };

    addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId)
        if(!cartById) return "Carrito no encontrado"

        let productById =await productAll.exist(productId)
        if(!productById) return "Producto no encontrado"
        
        let cartAll = await this.readCarts()
        let cart = cartAll.find(cart => cart.id === cartId);  
        
        let existingProduct = cart.products.find(product => product.id === productId)
            if (existingProduct){
                    existingProduct.quantity++;
            }else{
                cart.products.push({id:productId, quantity: 1})
            }

        await this.writeCarts(cartAll)
        return "Produto Agregado al Carrito"
    }
}


export default CartManager