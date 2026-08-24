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
        return response.status(500).json({message:"Internal server error"})
    }
}

export const getEmployees= async(request,response,next)=>{
    try{
        let employees =await Employee.find()
        return response.status(200).json({message:"employees fetched successfully", employees})
    }
    catch(err){
        console.log(err)
        return response.status(500).json({message:"Internal server error"})
    }
}

export const createEmployee = async (request,response,next)=>{
    try{
       let employee=await Employee.create(request.body)
       response.status(201).json({message:"employee created successfully",employee:{name:employee.name,email:employee.email}})
    }
    catch (err){
        console.log(err)
        return response.status(500).json({message:"Internal server error"})

    }
}

export const getEmployeeById = async(request,response,next)=>{
    try{
        let {id}=request.params
        let employee =await Employee.findById(id)
        if (!employee){
            return response.status(404).json({message:"User not found"})
        }
        return response.status(200).json({message:"employee fetched successfully"})
    }
    catch(err){
        console.log(err)
        return response.status(500).json({message:"Internal server error"})
    }
}

export const updateEmployee = async (request,response,next)=>{
    try{
        let {id} = request.params
        let employee =await Employee.findById(id)
        if (!employee){
            return response.status(404).json({message:"User not found"})
        }
        await Employee.findByIdAndUpdate(id,request.body,{ new: true, runValidators: true })

        return response.status(200).json({message:"employee updated successfully"})
    
    }
    catch (err){
        console.log(err)
        return response.status(500).json({message:"Internal server error"})

    }
}

export const deleteEmployee = async (request,response,next)=>{
    try{
        let {id} = request.params
        let employee =await Employee.findById(id)
        if (!employee){
            return response.status(404).json({message:"User not found"})
        }
        
        await Employee.findByIdAndDelete(id)
        return response.status(200).json({message:"employee deleted successfully"})

    }
    catch (err){
        console.log(err)
        return response.status(500).json({message:"Internal server error"})

    }

}

export const findHierarchy= async(request,response,next)=>{
    try{
        let {id}=request.params

        let employee= await Employee.findById(id).select("-password")
        if (!employee)
            return response.status(404).json({message:"employee not found"})

        const buildHierarchy= async(employee)=>{
            const reports= await Employee.find({managerId:employee._id}).select("-password")
            const result = {
                id: employee._id,
                name: employee.name,
                email: employee.email,
                designation: employee.designation,
                department: employee.department,
                dateOfJoining: employee.dateOfJoining,
                managerId: employee.managerId,
                reports: []
            };
            for (const report of reports) {

                const child = await buildHierarchy(report);

                result.reports.push(child);
            }

            return result;
        }
        const hierarchy = await buildHierarchy(employee);

        return response.status(200).json({
            message: "Hierarchy fetched successfully",
            hierarchy
        });
    }
    catch (err){
        console.log(err)
        return response.status(500).json({message:"Internal server error"})

    }
}