
import express from "express";
import productManager from "./productManager.js";

const app = express()
app.use(express.urlencoded({extended: true}));

const titulos = new productManager("/products.json")

app.get("/products.json", async (req, res) => {
    try{
        let limit = req.query.limit;
        console.log(limit);
        let allProducts = await titulos.getProducts();

        if(limit){
            allProducts = allProducts.slice(0, limit);
        }
        res.send(allProducts);
        
    }catch (error) {
        console.log(error);
        res.status(500).send([]);
    }
});


app.get("/products/:pid" , async (req, res) =>{
    try{
        const pid = parseInt(req.params.pid);
        const prod = await titulos.getProducts();
        const idFind = prod.find(prod => prod.id === pid);

        if(idFind) return res.send(idFind);
    } catch (error){
        console.log(error, "No se encontro el producto");

        return;
}})

const PORT = 8080;
const server = app.listen(PORT, () =>{
    console.log(`Express por Local Host ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error del servidor ${error}`))