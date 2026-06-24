const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const PORT = process.env.PORT || 8080
const productRoutes = require("./routes/productRoutes")
const app = express()

connectDB()


app.use(cors())
app.use(express.json())
app.use("/api",productRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})