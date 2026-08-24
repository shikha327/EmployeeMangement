import bcrypt from "bcrypt"
import { Employee } from "../model/employee.model.js"
import generateToken from "../../utils/generateToken.js"
export const signUp = async (request,response,next)=>{
    try{
        let {password} =request.body
        let saltKey= await bcrypt.genSalt(15)
        password= await bcrypt.hash(password,saltKey)

        request.body.password=password

        await Employee.create(request.body)
        return response.status(201).json({message:"employee created"})
    }
    catch(err){
        console.log(err)
        return response.status(500).json({message:"Internal server error"})

    }

}

export const signIn= async(request,response,next)=>{
    try{
        let {email,password}= request.body

        const res = await Employee.findOne({email})
        if (!res){
            return response.status(404).json({message:"this email user not exist"})
        }
        let status = bcrypt.compare(password,res.password)
        if (!status){
            return response.status(400).json({message:"invalid password"})
        }
        return response.status(200).json({message:"sign in successfully",user:{name:res.name,email:res.email,token:generateToken(res)}})
    }
    catch (err){
        console.log(err)
    }
}