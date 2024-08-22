const bcrypt = require('bcrypt');
const saltRounds=10;

//fun to genereatehashPassword

const generateHashPassword=async(normalPassword)=>{
return bcrypt.hashSync(normalPassword,saltRounds)
}


//fun to verifyPassword
const verifyPassword=async(normalPassword,hashPassword)=>{
    return bcrypt.compareSync(normalPassword,hashPassword)
}

module.exports={
    generateHashPassword,
    verifyPassword
}