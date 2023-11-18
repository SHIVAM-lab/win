const express = require("express");
const cors = require('cors');
const {verifyToken}   = require("./middleware/jwt.token"); 
const {crateAgencyAndClient} =   require("./modules/agency/controlllers/agnecy");
const { default: agency } = require("./modules/agency/models/agency");
const {getClient, updateClient} = require("./modules/client/controllers/client")
const router = express();
//router.use(express.bodyParser()) 
var bodyParser = require('body-parser')
router.use(bodyParser.json())
//router.use(cors());

const mongoose = require("mongoose");
const  startServer = ()=>{
  /** Connection with the mongodb cloud */
    mongoose
    .connect("mongodb+srv://shivamLab:shivamhero@cluster0.kmrvu4t.mongodb.net/zerozilla?retryWrites=true&w=majority", {retryWrites: true, w: 'majority'})
   .then(() => {
      console.log('successfully connected to DB');
    })
    .catch(error => {
    console.log('Error: Unable to connect to DB');
      console.log(error);
    });


    mongoose.set('strictQuery', false)
 





router.post('/createClientAndAgency', async function (req, res) {
  
    console.log(req.body.data);
    const responseData = await crateAgencyAndClient(req.body?.data);
    if(responseData.status){
        res.send(responseData).status(200);
        return 0;
    }else{
        res.send(responseData).status(404);
    }
    
});


router.get('/getAllOrders', async function (req, res) {
  
     console.log(req?.user,`sever`)
  const responseData = await getClient();
    console.log(responseData,`line 52`);
  if(responseData.status){
      res.send(responseData).status(200);
      return 0;
  }else{
      res.send(responseData).status(404);
  }
  
});


router.post('/updateOrder', async function (req, res) {
  
     
  const responseData = await updateClient(req.body);
   
  if(responseData?.status){
      res.send(responseData).status(200);
      return 0;
  }else{
      res.send(responseData).status(404);
  }
  
});




// app.use(errorHandler);

//   // middle ware for handle not found resource error
//   app.use(notFoundHandler);


router.listen(3000, () => {
    //console.log (AppConstant.GRAPHQL_END_POINT_LIVE_JOBS);
  console.log(
      `Server is running at localhost 3000`,
    );
  });
};

startServer();