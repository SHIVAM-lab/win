//import {IJob} from './i.jobs';
const  mongoose =  require('mongoose');
//import {DBCollectionName} from '../../../../constant/app.constant';



const serviceSchema = new mongoose.Schema({
  
    _id :    mongoose.Types.ObjectId,
     name  : {
        type:String,
        required:true
    }
    
  },
  {
    timestamps: true,
  },
);

module.exports =  mongoose.model("services", serviceSchema);
