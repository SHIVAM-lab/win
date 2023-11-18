
//import client from "../models/client"
const client =  require("../models/client");
const agencyDb = require("../../agency/models/agency");
const {generateToken} = require("../../../middleware/jwt.token"); 

const jwt =  require('jsonwebtoken');
const { Mongoose, default: mongoose } = require("mongoose");
 async function createOrder(data){
     data.forEach(async element => {
        var id = new mongoose.Types.ObjectId();
       
    var dataRecived =   await  new client({
        _id:id,
        total_fee: element?.name,
        services: data?.services
    })?.save()?.catch(error =>{
    return error;
   });
        console.log(dataRecived,`client`);
   
          
     });
    

   if(dataRecived instanceof Error){
    return ({
        'status':0,
        'message':'Failed to send test list!',
        'error': error,
        "data":[]
    })
   }
   return  ({
    'status':1,
    'message':'Failed to send test list!',
    'error': error,
    "data":dataRecived
})
}



async function updateClient(data){


    try {

        const services = data?.services;
        const total_fee = data?.total_fee;
        const id = data?.id
          
          const orderDataValidation = await getOrderUpdateValidity(id)
          
          /**
           * Check weather the order is being updated three prior from now. if Not 
           * then throw an error.
           */

          if(!orderData?.length){
            return ({
                'status':0,
                'message':'Cannot update the order!',
                'error': error,
                "data":{}
            })
          }


        
          var flag1 = false,flag2=false;
          if(total_fee !==null && total_fee !== undefined){
           await client.findByIdAndUpdate({_id:id},{$set:{total_fee:total_fee}}).then(resp=>{
            if(resp?.updateCount == 1){
                 flag1 = true;
            }
           })
          
          }
     
            if(services?.length){
                for(let i = 0; i < services.length; i++){
                     await client.findByIdAndUpdate({_id:id},{
                        $push:{
                            services:services[i]
                        }
                     }).then(resp=>{
                        if(resp?.updateCount == 1){
                             flag2 = true;
                        }
                       })
                }
             }
     
          
           
                if(flag1 && flag2){
                       return ({
                         'status':1,
                         'message':'updated client successfully!',
                         'error': "",
                         "data":resp
                     })
                }else{
                return ({
                 'status':0,
                 'message':'Failed to updated client!',
                 'error': error,
                 "data":{}
             })
            }

    } catch (error) {
        return ({
            'status':0,
            'message':'Failed to updated client!',
            'error': error,
            "data":{}
        })
    }
    

}


 async function getClient(){

    const data =  await client.aggregate([
       
       

        {
            $unwind:{
                path:"$services",
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $lookup:
                {
                    from: "services",
                    localField: 'services._id',
                    foreignField: '_id',
                    as: 'services',
                }
            
        },
        {
            $group:{
                _id: {
                    _id: "$_id",
                  },
                
                  orderData: {
                    $addToSet: "$services",
                  },
            }
        },
      
    ])?.catch(error=>{
        return error;
    })

    if(data?.length == 0){
        return ({
            'status':0,
            'message':'Failed to send test list!',
            'error': data,
            "data":[]
        })
    }else{
        return ({
            'status':1,
            'message':'Successfully   sent test list!',
            'error': "",
            "data":data
        })
    }

}




 async function getClientById(id){
   try{
    console.log(`checking`);
    return await client.aggregate([
        {
            $match:{ _id:new mongoose.Types.ObjectId(id)}
        },
        
    ]);
}catch(error){
    console.log(error);
    return [];
}

}

async function getOrderUpdateValidity(id){
    try{
     console.log(`checking`);
     return await client.aggregate([
         {
             $match:{ _id:new mongoose.Types.ObjectId(id),
                updateAt: {
                $lte: new Date(
                  new Date.SetHours(
                    new Date().getHours()-3
                  )
                )
              }}
         },
         
     ])
 }catch(error){
     console.log(error);
     return [];
 }
 
 }


module.exports = {
    getClient,createOrder,getClientById,updateClient
}
