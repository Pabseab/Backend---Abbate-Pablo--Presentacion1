
class productManager {

    constructor(){
        this.products = [];
        this.id = 0;
    }

    addProduct(title, description, price, code, stock) {
        //Validar existencia de producto con igual codigo
        const codeexiste = this.products.some(product => product.code === code);
        
        if (!codeexiste) {
        const Id = this.id++
        this.products.push({title, description, price, code, stock, Id});
        }else {
            console.log("Producto con ${code} existe");
        }
        
    }

    getProduct(){
        return this.products;   
    }
    //Buscar elementos por ID
    getProductById(Id){
        if (!this.products.find(product => product.Id === Id)) {
            console.log("Not Found");
        } else{
            console.log("found")
        }

    }
    
}

const titulos = new productManager();

//Array vacio
console.log(titulos);

titulos.addProduct("El Señor de los Anillos", "JRR Tolkien", 7500, "003", 15);
titulos.addProduct("El Nudo", "Carlos Pagni", 4800, "024", 35);
titulos.addProduct("El Nudo", "Carlos Pagni", 4800, "024", 35);//codigo repetido
titulos.addProduct("El Hobbit", "JRR Tolkien", 6300, "007", 12);

//Array con productos sumados
console.log(titulos);

console.log(titulos.getProductById(2))//Producto encontrado por Id
console.log(titulos.getProductById(5))//Producto no encontrado por Id






    

