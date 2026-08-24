import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const generateToken= (dbEmp)=>{
    let token =jwt.sign({id:dbEmp.id,email:dbEmp.email,designation:dbEmp.designation},process.env.SECRET_KEY)
    return token
}

export default generateToken