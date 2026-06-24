const Product = require("../models/Product")
const getProducts = async(req,res)=>{
    try{
        const { category, cursor } = req.query
        let query ={}
        if(category){
            query.category = category
        }
        // Cursor pagination
         if (cursor) {
            const decodedCursor = JSON.parse(
                Buffer.from(cursor, "base64").toString()
            );

            query = {
                $and: [
                    category ? { category } : {},
                    {
                        $or: [
                            {
                                updatedAt: {
                                    $lt: new Date(decodedCursor.updatedAt)
                                }
                            },
                            {
                                updatedAt: new Date(decodedCursor.updatedAt),
                                productId: {
                                    $lt: decodedCursor.productId
                                }
                            }
                        ]
                    }
                ]
            };
        }

    
    const products = await Product.find(query).sort({
            updatedAt: -1,
            productId : -1
        }).limit(20)

        let nextCursor = null;

        if(products.length > 0){
            const lastProduct = products[products.length - 1]

            nextCursor = Buffer.from(
                JSON.stringify({
                    updatedAt: lastProduct.updatedAt,
                    productId: lastProduct.productId
                })
            ).toString("base64")
        }

        res.status(200).json({
            products,
            nextCursor
        })

    }catch(error){
        console.error(error);
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { getProducts }