const mongoose = require('mongoose');
const bcrypt   = require('bcrypt')

const ManufacturerSchema = new mongoose.Schema({
    companyName:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    manufacturerName:
    {
        type:String,
        unique:false
    },
    officeAddress:{
        type:String,
        unique:false,
        minlength:5
    },
    websiteAddress:{
        type:String,
        unique:true,
        minlength:5
    },
    numberofStaff:
    {
        type:Number,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    telephoneno:{
        type:String,
        required:true
    },
    certificateno:{
        type:Number
    },
    owner:{
        type:Object
    },
    product:[
       {type: mongoose.Schema.Types.ObjectId, ref:"Product" }
    ]
})
ManufacturerSchema.pre('save', async function () {
    if (!this.password || !this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

ManufacturerSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const manufacturerModel = mongoose.model('Manufacturer', ManufacturerSchema);
module.exports = manufacturerModel 