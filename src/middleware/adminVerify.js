export const admin= async(request,response,next)=>{
    if (request.employee.designation != "manager"){
        return response.status(403).json({
            message: "Admin access required"
        });
    }
    next()
}