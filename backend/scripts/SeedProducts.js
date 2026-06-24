const mongoose = require("mongoose")
require("dotenv").config()
const connectDB = require("../config/db")
const Product = require("../models/Product")

const categories = ["Electronics",
 "Fashion",
 "Books",
 "Sports",
 "Beauty",
 "Furniture"]

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 10000;

async function SeedProducts(){
    try{
        await connectDB()
        //generate batches
        await Product.deleteMany({});

        let productId = 1;
        for(let batch = 0; batch<TOTAL_PRODUCTS/BATCH_SIZE; batch++){
            const products = []
            for(let i = 0; i < BATCH_SIZE; i++){
                products.push(
                    generateProduct(productId++)
                )
            }

            await Product.insertMany(products)
            console.log(`Inserted batch ${batch + 1} of ${TOTAL_PRODUCTS / BATCH_SIZE}`);

        }
        


        // insert batches 

        console.log("Seeding Complete")

        const count = await Product.countDocuments();
        console.log(`Total products in DB: ${count}`);

        await mongoose.connection.close()
    }
    catch(error){
        console.error(error)
    }


    
}

    const generateProduct=(productId)=>{
        const category = categories[Math.floor(Math.random()*categories.length)]

        const price = Math.floor(Math.random() *5000) + 100

        const createdAt = new Date( Date.now()-
            Math.floor(Math.random()* 365 * 24 * 60 * 60 * 1000)
        )
        const updatedAt = new Date( createdAt.getTime() + Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
        )

        return {
            productId,
            name:`Product ${productId}`,
            category,
            price,
            createdAt,
            updatedAt
        }
    }

SeedProducts()