import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoute from "./Routes/authRoute.js"
import db from "./config/db.js"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()
app.use(cors(
    {
        origin:["http://localhost:3000"],
        methods:["GET","POST"],
        credentials:"true"
    }
))
app.use(cookieParser())
app.use(express.json())

app.use("/auth",authRoute)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(` Server running on port ${PORT}`))