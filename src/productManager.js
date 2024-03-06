
import fs from "fs";

class productManager {

    
    constructor(){
       
        this.id = 0;
        this.path = "./src/products.json"
        try{
            const Id = fs.readFileSync(this.path, "utf8");
            this.products = JSON.parse(Id);
        }catch (error) {
            console.error("Error al leer el archivo:", error);
            this.products = [];
        };
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        //Validar existencia de producto con igual codigo
        const codeexiste = this.products.some(product => product.code === code);

        if (!codeexiste) {
            const productData = {
                Id: this.id++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };

            this.products.push(productData);
            
        }else {
            console.log("Producto con ${code} existe");
        }

    }

    async getProduct(){
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(data);
          } catch (error) {
            console.error("Error al obtener productos:", error);
            return [];
          }
 
    }
}
    
export default productManager;
