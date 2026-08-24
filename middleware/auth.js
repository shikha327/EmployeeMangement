import jwt from "jsonwebtoken"
const authentication = async(request,response,next)=>{
    try{
        if (request.headers.authorization){
            let token = request.headers.authorization.split(" ")[1]

            if (!token){
                return response.status(401).json({message:"no token provided"})
            }

            let decode = jwt.verify(token)
            request.user=decode

            next()
    }
    }
    catch (err){
        console.log(err)
    }
}