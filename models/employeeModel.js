const { required } = require('joi')
const mongoose = require('mongoose')
const validator = require('validator')

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
        trim:true
    },
    email: {
        type: String,
        // validate:{
        //     validator: validator.isEmail,
        //     message: '{VALUE} is not a valid email. Please enter a valid email'
        // },
        required: true,
        default: null,
        unique: true,
        index: true 
    },
    password:{
        type: String,
        required: true,
    } ,
    otp:{
        type: String
    },
    otpExpiry:{
        type: Date
    },
    designation:{
        type: String,
        default: null
    },
    profileImage: {
        type: String,
        default: null,
    },
    department: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive : {
        type: Boolean,
        default: true,
        index: true,
    }  
},{timestamps:true})

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
