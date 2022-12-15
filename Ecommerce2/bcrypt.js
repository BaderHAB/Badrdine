const bcrypt = require('bcryptjs');


const hashPassword = async(pw)=>{
    const salt = await bcrypt.genSalt(12);
    const hash= await bcrypt.hash(pw,salt)
    console.log(salt)
}

const hashPassword2 = async(pw)=>{
    const hash= await bcrypt.hash(pw,12)
    console.log(salt)
}

const login = async (pw, hashedPw)=>{
    const result = await bcrypt.compare(pw, hashPassword);
    if(result){
        console.log('LOGGED')
    }else{
        console.log('Try again')
    }
}


hashPassword();