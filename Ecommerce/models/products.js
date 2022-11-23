const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Productschema = new Schema({
    title:String,
    price:Number,
    description:String,
    category:{
        type:String,
        enum:['informatica','electronica','alimentación','hogar','entretenimiento','ropa i accesorios'],
        lowercase:true
        
    },
    enOferta:Boolean
})

const Product = mongoose.model('Product', Productschema);

module.exports = Product;