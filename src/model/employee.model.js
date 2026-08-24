import mongoose, { model } from "mongoose";

const employeeSchema= new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    designation:{
        type:String,
        require:true
    },
    department:{
        type:String,
        require:true
    },
    dateOfJoining:{
        type:Date,
        default:Date.now
    },
    managerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employees",
        default:null
    }
})


export const Employee = mongoose.model("employees",employeeSchema)