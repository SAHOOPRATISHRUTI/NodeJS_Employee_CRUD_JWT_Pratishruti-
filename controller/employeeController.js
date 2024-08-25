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

const viewSinglEmployee= async(req,res)=>{
    try{
        const result= await employeeService.viewSingleEmployee(req.params.id)
        console.log(result);
        if(!result){
            return Response.failResponse(req,res,null,messages.recordsFound,200)
        }
        return Response.successResponse(req,res,result,messages.successResponse,201)
        
    }catch(error){
        return Response.errorResponse(req,res,error)
    }
}

const editEmployee = async(req,res)=>{
    try{
        const result = await employeeService.editEmployee(req.params.id,req.body)
        console.log(result);
        if(!result){
            return Response.failResponse(req,res,null,messages.failResponse,200)
        }
        if(result?.isduplicateEmail){
            return Response.failResponse(req,res,null,messages.duplicateEmail,201)
        }
        return Response.successResponse(req,res,result,messages.successResponse,201)
    }catch(error){
        return Response.errorResponse(req,res,error)
    }
}

const deleteEmployee = async(req,res)=>{
    try{
        const result = await employeeService.deleteEmployee(req.params.id)
        console.log(result);
        if(!result){
            return Response.failResponse(req,res,null,messages.deleteFailedRecordNotFound,200)
        }
        return Response.successResponse(req,res,result,messages.deleteSuccess,201)
        
    }catch(error){
        return Response.errorResponse(req,res,error)
    }
    
}

 /**FUNC- TO SHOW LIST OF EMPLOYEES **/
 const listEmployee = async (req, res) => {
    try {
      const result = await employeeService.listEmployee(req.body, req.query);
      console.log(result);
      if (result.totalCount === 0) {
        return Responses.failResponse(req, res, null, messages.recordsNotFound, 200);
      }
      return Responses.successResponse(req, res, result, messages.recordsFound, 200);
    } catch (error) {
      console.log(error);
      return Responses.errorResponse(req, res, error);
    }
  };

module.exports={
    createEmployee,
    viewSinglEmployee,
    editEmployee,
    deleteEmployee,
    listEmployee
}
