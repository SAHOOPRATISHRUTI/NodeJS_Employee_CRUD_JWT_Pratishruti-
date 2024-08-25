const jwt = require("jsonwebtoken")
const Response = require('../helper/response')
const messages=require('../contstants/messages')
const employeeService= require('../services/employeeService')


//Function to generate Token for user
const generateUserToken=async(data)=>{
    if(typeof data !== 'object' || data === null){
        throw new Error('Data must be a plain object')
    }
}

/*FUNC TO VERIFY A TOKEN FOR USER*/
const verifyUserToken = async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      console.log("token-->", token);
      if (token.startsWith("Bearer ")) {
        token = token.substring(7, token.length);
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      const userId = decoded.userId;
      const isActiveUser = await employeeService.verifyEmployee(userId);
      console.log("isActiveUser------", isActiveUser);
      if (isActiveUser) {
        req.userId = userId;
        req.userData = isActiveUser;
        next();
      } else {
        console.log("return from jwt verify");
        return Response.failResponse(
          req,
          res,
          { isInValidUser: true },
          messages.invalidUser,
          200
        );
      }
    } catch (error) {
      console.log("Errorrr", error);
      errorLog(error);
      return Response.failResponse(req, res, null, messages.invalidToken, 200);
    }
  };

module.exports={
    generateUserToken,
    verifyUserToken
}