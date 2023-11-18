//import {IJob} from './i.jobs';
const  mongoose = require('mongoose');
//import {DBCollectionName} from '../../../../constant/app.constant';



const ordersSchema = new mongoose.Schema({
    _id:  mongoose.Types.ObjectId, 
    total_fee: {
        type:Number,
        required:true
    },
    services:[{
        _id:{
            type:mongoose.Types.ObjectId,
            ref:"services"
        }
    }]
    
    
  },
  {
    timestamps: true,
  },
);


module.exports =  mongoose.model("orders", ordersSchema);
