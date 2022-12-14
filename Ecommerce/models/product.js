const mongoose = require ('mongoose');
const {Schema}= mongoose;
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true,
        min:0
    },
    category:{
        type: String,
        enum:['general','house','electronic'],
        lowercase: true
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'Store'
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;