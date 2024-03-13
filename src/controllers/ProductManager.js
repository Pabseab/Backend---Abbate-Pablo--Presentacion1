
import {promises as fs, readFile} from "fs"
import {nanoid} from "nanoid"

class ProductManager {
    constructor() {
        this.path = "./src/models/products.json"
    };

    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8");
        return JSON.parse (products);
    };

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product));
    };

    exist = async (id) =>{
        let products = await this.readProducts();
        return products.find (prod => prod.id === id);
    };

    addProducts = async (product) => {
        product.id = nanoid()
        let productAll = [product];
        await this.writeProducts(productAll);
        return "producto Agregado";
    };
   
    getproducts = async () => {
        return await this.readProducts() 
    };

    getproductsById = async (id) => {
        let productById = await this.exist (id);
        if(!productById) return "Producto no Encontrado"
        return productById 
    };

    updateProducts = async (id, product) => {
        let productById = await this.exist (id);
        if(!productById) return "Producto no Encontrado"
        await this.deleteProducts(id)
        let productOld = await this.readProducts()
        let products = [{...product, id : id, ...productOld}]
        await this.writeProducts(products)
        return "Producto Actualizado"
    };

    deleteProducts = async (id) => {
        let products = await this.readProducts();
        let existProducts = products.some(prod => prod.id ===id);
        if (existProducts){
            let filterProducts = products.filter (prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return "Producto Eliminado"
        }  
        return "El Producto a Eliminar no Existe"
    }

    
}

export default ProductManager

