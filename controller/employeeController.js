const employeeService=require('../services/employeeService')
const messages= require('../contstants/messages')
const Response = require('../helper/response')

//createEmployee
const createEmployee = async(req,res)=>{
    try{
        const result = await employeeService.createEmployee(req.body,req.file)
        console.log(result);
        if(result?.isduplicateEmail){
            return Response.failResponse(req,res,null,messages.duplicateEmail,200)
        }
        return Response.successResponse(req,res,result,messages.successResponse,201)
    }catch(error){

        console.log(error);
        return Response.errorResponse(req,res,error)

    }
   
    
}

module.exports={
    createEmployee
}