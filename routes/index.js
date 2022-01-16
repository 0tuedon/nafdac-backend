const   express         =   require('express'),
        Router          =   express.Router(),
        adminRoute      =   require("./admin"),
        manufacturer    =   require('./manufacturer'),
        Product         =   require('../models/products')

Router.use("/api/admin",adminRoute)
Router.use("/api/manufacturer",manufacturer)

Router.get("/product", async (req,res)=>{
    try{    
        const found = Product.findOne({ productNafdac: req.params.Nafdac })
        res.status(200).json({error:false, product:found})
    }
    catch
    {
        res.status(400).json({error:true, message:"Product not found"})
    }
    
})
Router.get("/products", async (req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    try
    {
        const foundProduct = await Product.find({})
        if (foundProduct) {
            res.status(200).json({ error: false, product: foundProduct, message:"Products Shown below" })
        }
    }
   
    catch
    {
        res.status(401).json({error:true, message:"Could not get the products"})
    }
})
module.exports = Router;
        