const generateOTP = ()=>{
    const otpLength = 4;
    let otp ='';
    for(let i= 0;i<otpLength;i++){
        otp+=Math.floor(Math.random()*10);
    }
    return otp
};

module.exports={generateOTP}