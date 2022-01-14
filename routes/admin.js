const   express     =   require('express'),
        mongoose        =   require('mongoose'),
        Admin           =   require('../models/admins'),
        bcrypt          =    require("bcrypt");
const Manufacturer = require('../models/manufacturer'),
        Router          =   express.Router();
        expressSession = require('express-session');


Router.use(
    expressSession({
        secret: 'jnjrefnj',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60 * 60 * 1000 },
    })
);


// The following are the routes for the admin related issues
Router.post('/create',async (req,res)=>{
    const admin = new Admin(req.body);
    try {
        const foundAdmin = await Admin.findOne({
            email: admin.email,
            username: admin.username,
        });
        if (foundAdmin) {
            res.status(400).json({
                error: true,
                message: 'Username or Email Already Exist',
            });
        } else {
             await admin.save();
                res.status(200).json({
                error: false,
                message: 'User Created Successfully',
            });
        }
    } catch {
        res.status(400).json({ message: 'An Error Occured Try Again' });
    }
})
Router.post('/login', (req, res, next) => {
    const loginAdmin = req.body;
    Admin.findOne(
        loginAdmin['user'].includes('@')
            ? { email: loginAdmin?.user }
            : { username: loginAdmin?.user },
        async (err, found) => {
            if(err)
            {
                res.sendStatus(500).json
                ({error:true, message:"Error Occured Somewhere try again" })
            }
            if (found === null) {
                res.status(400).json({
                    login: false,
                    message: 'Invalid Admin Details',
                });
            } else {
                const validPassword = await bcrypt.compare(
                    loginAdmin.password,
                    found.password
                );

                if (validPassword) {
                    session = req.session;
                    session.user = found;
                    res.status(200).json({
                        login: true,
                        message: 'Successfully Admin Loggedin',
                        userDetails: found
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
// Create a New Manufacturer
Router.post('/manufacturer/create',async (req,res)=>{
    const newManufacturer = new Manufacturer(req.body)
    try {
        const foundManufacturer = await Manufacturer.findOne({
            email: newManufacturer.email});
        if (foundManufacturer) {
            res.status(400).json({
                error: true,
                message: 'Email Already Exist',
            });
        } else {
            await newManufacturer.save();
            res.status(200).json({
                error: false,
                message: 'User Created Successfully',
            });
        }
    } catch {
        res.status(400).json({ message: 'An Error Occured Try Again' });
    }   
})


module.exports = Router