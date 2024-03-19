
import {promises as fs, readFile} from "fs"
import {nanoid} from "nanoid"

class ProductManager {
    constructor() {
        this.path = "./src/models/products.json"
        this.products = [];
        this.id = 1; 
    };

    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8");
        return JSON.parse (products);
    };

    writeProducts = async (products) => {
        await fs.writeFile(this.path, JSON.stringify(products));
    };

    exist = async (id) =>{
        let products = await this.readProducts();
        return products.find (prod => prod.id === id);
    };

    addProducts = async ({title, description, price, thumbnail, code, stock}) => {
        
            let allProducts = await this.readProducts()
  
        
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                return "Todos los campos son obligatorios";
            }

            const codeExist = allProducts.some(product => product.code === code);
            if (codeExist) {
                return `Ya existe un producto con el código ${code}`;
            }

            const id = nanoid();

            const productToAdd = {
                id: id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock

            };

            allProducts.push(productToAdd);
            console.log(allProducts)
            

            await this.writeProducts(allProducts)
            return "Producto Agregado Exitosamente"
            

    };
   
    getproducts = async (Limit) => {
        let products = await this.readProducts();
        if (Limit) {
            return products.filter(product => product.price <= priceLimit)
        }else{
            return products;
        }
    };

    getproductsById = async (id) => {
        let productById = await this.exist (id);
        if(!productById) return "Producto no Encontrado"
        return productById 
    };

    updateProducts = async (id, productOld) => {
        let productIndex = this.products.findIndex(product => product.id === id);
        if(productIndex === -1) {
        return "Producto no Encontrado"
        }
        this.products[productIndex] = {
            ...this.products[productIndex],
            ...productOld
        }

        await this.writeProducts()
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

