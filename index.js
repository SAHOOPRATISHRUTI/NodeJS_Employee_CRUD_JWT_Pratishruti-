require('dotenv').config();
const express = require('express');
const cors = require ('cors');
const app = express();
const bodyparser = require('body-parser')
const port = process.env.PORT || 1111 
const {connectDB} = require('./dbConnection/connection')
const mainRouter=require('./routers/index')


app.use(express.json())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}));

const corsOptions={
    origin:'*',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders :['Content-Type','Authorization']
}

app.use(cors(corsOptions))

connectDB()

app.get('/',(req,res)=>{
    res.send('Hyyy its niluuuu')
});

app.use('/api', mainRouter);

app.listen(port,(error)=>{
    if(error) throw error;
    console.log(`Server is runing on ${port}`);
    
})