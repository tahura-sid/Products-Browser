const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productId:{
        type:Number,
        required:true,
        unique:true  
    },
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true 
    },
    price:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        required:true 
    },
    updatedAt:{
        type:Date,
        required:true
    }
});

productSchema.index({
    updatedAt: -1,
    productId: -1
});

productSchema.index({
    category: 1,
    updatedAt: -1,
    productId: -1
});

module.exports = mongoose.model("Product",productSchema)