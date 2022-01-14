const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  productName:{
      type:String,
      unique:true
  },
  productNafdac:
  {
      type:String,
      unique:true,
      required:false
  },
  productCategory:
  {
      type:String,
  },
  productType:
  {
    type:String
  },
  owner: {
      type:String
  },
  dateofRegistration:
  {type:Date, default:Date.now()}
})

const productModel = mongoose.model('Product', ProductSchema)

module.exports = productModel;