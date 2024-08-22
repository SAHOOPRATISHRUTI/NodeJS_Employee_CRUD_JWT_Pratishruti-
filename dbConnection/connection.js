const mongoose = require('mongoose');

const dbURL = `${process.env.DATABASE_LOCAL_URL}/${process.env.DB_NAME}`

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(dbURL)
        console.log(`MonoDB Connected: ${conn.connection.host}`);
        
    }catch(error)
    {
        console.log(`Error while connecting to DB,${error}`);
        process.exit(1)
    }
}
module.exports={
    connectDB
}