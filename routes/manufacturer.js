const express = require("express");
const Router  = express.Router()
const Manufacturer = require("../models/manufacturer");
const bcrypt = require("bcrypt");
const expressSession = require('express-session')
const Product       =   require("../models/products");
const crypto        =   require("crypto")

// Manufacturers Role Endpoint
Router.use(
    expressSession({
        secret: 'fn nm sj',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60 * 60 * 1000 },
    })
);

Router.post("/login",(req,res)=>{
    const data = req.body
       Manufacturer.findOne(
        data['user'].includes('@')
            ? { email: data?.user }: null,
        async (err, found) => {
            if(err)
            {
                res.sendStatus(500).json
                ({error:true, message:"Error Occured Somewhere try again" })
            }
            if (found === null) {
                res.status(400).json({
                    login: false,
                    message: 'Invalid Manufacturer Details',
                });
            } else {
                const validPassword = await bcrypt.compare(
                    data.password,
                    found.password
                );

                if (validPassword) {
                    session = req.session;
                    session.manufacturer = found;
                    res.status(200).json({
                        login: true,
                        message: 'Successfully Manufacturer Loggedin',
                        manufacturer: found
                    });
                } else {
                    res.status(400).json({
                        login: false,
                        message: 'Invalid Password',
                    });
                }
            }
        }
    )
})
// Create a Product

Router.post("/product", async (req,res)=>{
    let currentUser = req.session.manufacturer;
    let newProduct = req.body;

    try {
        const currentManufacturer = await Manufacturer.findOne({
            email: currentUser.email,
        });
        console.log(currentManufacturer)
        if (currentManufacturer) {
            const Nafdac = crypto.randomBytes(4).toString("hex")
            const productCreated = await Product.create({
                ...newProduct,
                owner: currentManufacturer.companyName,
                productNafdac:`NA-${Nafdac}`
            });
            console.log(productCreated)
            if (productCreated) {
                await currentManufacturer.product.push(productCreated);
                await currentManufacturer.save();
                res.status(200).json({
                    error: false,
                    message: 'Product Successfully Created',
                    productCreated,
                    
                });
            }
            else {
                res.status(501).json({ message: `An Error occur there's another `, error: true })
            }
        }
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: `There's another Product with this same NAFDAC Number` })
        }
        res.status(400).json({ message: 'Cannot create new Product' });
    }
})
Router.get("/products",async (req,res)=>{
    const manufacturer = req.session.manufacturer;
    const details = await Manufacturer.findOne({ email: manufacturer.email }).populate("product")
   res.status(200).json({error:false, products:details.product})

})

module.exports = Router 