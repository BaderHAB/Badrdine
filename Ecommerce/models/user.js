const mongoose =require ('mongoose');
const {Schema}= mongoose;


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, 'Username cannot be blank']
    },
    password:{
        type:String,
        required: [true, 'Password cannot be blank']
    },
    email:{
        type:String,
        required: [true, 'A email is required']
    }
})

module.exports = mongoose.model('User', userSchema);