import express, { urlencoded } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()

import employeeRouter from "./src/router/employee.router.js"

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/auth",employeeRouter)

mongoose.connect("mongodb://localhost:27017/EmployeeManagement")
.then(()=>{
    console.log("Database connected")
    const PORT=process.env.PORT || 3001
    app.listen(PORT,()=>{
        console.log("Server started")
    })
})
.catch(err=>{
    console.log(err)
})

