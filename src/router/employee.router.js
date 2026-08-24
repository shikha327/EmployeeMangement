import express from "express"
import { createEmployee, deleteEmployee, findHierarchy, getEmployeeById, getEmployees, signIn, signUp, updateEmployee } from "../controller/employee.controller.js"
import auth from "../middleware/auth.js"
import { admin } from "../middleware/adminVerify.js"

const router=express.Router()

router.post("/signup",signUp)
router.post("/signin",signIn)
router.get("/",auth,admin,getEmployees)
router.post("/",auth,admin,createEmployee)
router.get("/:id",auth,admin,getEmployeeById)
router.put("/:id",auth,admin,updateEmployee)
router.get("/:id/hierarchy",findHierarchy)

export default router