
import express from "express";
import productManager from "./productManager.js";

const app = express()
app.use(express.urlencoded({extended: true}));

const titulos = new productManager()


app.get("/products", async (req,res) => {
    try{
        const products = await titulos.readProducts();
        console.log(products);
        res.send(products)
    }catch (error) {
        console.error(error);
        res.status(500).send
    }
});

const PORT = 8080;
const server = app.listen(PORT, () =>{
    console.log("Express por Local Host ${server.adress().port}")
})
server.on("error", (error) => console.log("Error del servidor $({error}"))