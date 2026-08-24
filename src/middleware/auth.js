import jwt from "jsonwebtoken"
import dotenv from "dotenv"
const auth = async(request,response,next)=>{
    try{
        if (request.headers.authorization){
            let token = request.headers.authorization.split(" ")[1]
            let decode = jwt.verify(token,process.env.SECRET_KEY)
            request.employee=decode

            next()
        }
        else{
            return response.status(401).json({ message: "No token provided" });
        }

    }
    catch (err){
        console.log(err)
    }
}
export default auth