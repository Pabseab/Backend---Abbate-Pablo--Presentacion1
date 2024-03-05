
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

    //Buscar elementos por ID
//    async getProductById(Id){
//        try{
//            const product = this.products.find(product => product.Id === Id);
//            if(product){
//                  
//                console.log("ID Encontrado");
//            } else{
//                console.log("ID No Encontrado");
//            }
//        }catch(error){
//            console.error("Error ID",error)
//        }
//    }
  
    //Actualizar producto seleccionado
//    async updateProduct(Id, updateProductData){
//
//        const findId = this.products.findIndex(product => product.Id === Id )
//
//        if(findId !== -1){
//            const updateProduct = {
//                ...this.products[findId],
//                ...updateProductData,
//            };   
//            
//            this.products[findId] = updateProduct;
//            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
//            console.log("producto actualizado : ", this.products[findId]);
//        
//        }else{
//            console.log("producto no encontrado")
//        };
//    }
//
//    async deleteProduct(Id){
//
//        try{
//
//            const deleteID = this.products.findIndex(product => product.Id === Id)
//
//            console.log(deleteID);
//
//            if (deleteID===-1){
//            console.error("producto no encontrado");
//            return;
//            };
//
//            this.products.splice(deleteID, 1);
//            console.log(this.products);
//            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
//            console.log("producto eliminado");
//
//        }catch(error){
//            console.error("Error", error);
//        }
//    }

}

//const titulos = new productManager();

//Array vacio
//console.log(titulos);

//titulos.addProduct(
//    "El Señor de los Anillos",
//     "JRR Tolkien", 
//     7500,
//     "no img", 
//     "003", 
//     "15"
//);
//titulos.addProduct(
//    "El Nudo",
//     "Carlos Pagni",
//    4800,
//    "no img",
//    "024",
//    "35"
//);
//titulos.addProduct(
//    "El Nudo",
//    "Carlos Pagni",
//    4800,
//    "no img",
//    "024",
//    "35"
//);//codigo repetido
//titulos.addProduct(
//    "El Hobbit",
//    "JRR Tolkien",
//    6300,
//    "no img",
//    "007",
//    "12"
//);
//
////Array con productos sumados
//console.log(titulos);

//console.log(titulos.getProductById(2))//Producto encontrado por Id
//console.log(titulos.getProductById(5))//Producto no encontrado por Id

//Actualizacion de producto

//async function main(){
//    await titulos.updateProduct(0,{
//            price: 9000,
//        })
//        await titulos.deleteProduct(1)
//}
//
//main()
    
export default productManager;
