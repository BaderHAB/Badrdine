const mongoose =require ('mongoose');
const {Schema}= mongoose;
const Product = require('./product');


const storeSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Stores must have a name!']
    },
    owner:{
        type:String,
        required: [true, 'Your full name is required']
    },
    location:{
        type:String
    },
    email: {
        type:String,
        required:[true, 'A contact email is necessary']
    },
    products:[
        {
            type:Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

const Store = mongoose.model('Store', storeSchema);


storeSchema.post('findOneAndDelete', async function(store){
        if(store.products.length){
        await Product.deleteMany({_id:{in:store.products}})
    }
}) 



module.exports= Store;