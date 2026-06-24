const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const PORT = process.env.PORT || 8080
const productRoutes = require("./routes/productRoutes")
const app = express()

connectDB()

const corsOptions = { origin: 'https://harmonious-salamander-79fcd8.netlify.app', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'], credentials: true };
app.use(cors(corsOptions)); 
app.use(express.json())
app.use("/api",productRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})