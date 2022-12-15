const mongoose =require ('mongoose');
const { use } = require('passport');
const {Schema}= mongoose;
const passportLocalMongoose = require('passport-local-mongoose')


const userSchema = new Schema({
    /* username:{
        type:String,
        required: [true, 'Username cannot be blank']
    },
    password:{
        type:String,
        required: [true, 'Password cannot be blank']
    }, */
    email:{
        type:String,
        require: true,
        unique: true
    }
});
userSchema.plugin(passportLocalMongoose)


module.exports = mongoose.model('User', userSchema);