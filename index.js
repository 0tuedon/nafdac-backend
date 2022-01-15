require('dotenv').config();
const   express                 =   require('express'),
        mongoose                =   require('mongoose'),
        bodyparser              =   require('body-parser')
        apiRoute                =    require('./routes'),
        cors                    =   require("cors")
        app                     =   express();
const   crypto                  =   require("crypto")

// Configuration of the NAfDac Project Server for the enDpoints

mongoose.connect(process.env.DATABASE).then(
    ()=>{
        console.log("Connection Succesfully")
    }
).catch(err=>{
    console.log(`${err} occured`)
})

app.set('view engine','ejs')
app.use(bodyparser.json())
app.use("/",apiRoute)
const corsOrigins = {
    origin: ['http://localhost:3000','https://nafdac.netlify.app']
}
app.use(cors(corsOrigins))

app.get("/",(req,res)=>{
    res.render("index")
})
app.listen(process.env.PORT,()=>{
    console.log("Server Started")
})