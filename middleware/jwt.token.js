const jwt =  require('jsonwebtoken');

//import UserCrudMethods from '../modules/users/common/controller/user';
const  { getClientById } =  require('../modules/client/controllers/client');
const clientDb= require("../modules/client/models/client");
  //jwtSecretKey = "radicle-job-app-super-user-token";

  async function generateToken(
    user_id,
    user_type,
  ) {
    try {
      let data = {
        time: Date(),
        user_id: user_id,
        user_type_id: user_type,
      };
      jwtSecretKey = "radicle-job-app-super-user-token";
      if (jwtSecretKey !== undefined) {
        return jwt.sign(data,jwtSecretKey);
      } else {
        throw new Error('Undefined JwtSecretKey Found While Generating Token');
      }
    } catch (ex) {
      return ex ;
    }
  }

  async function verifyToken(req, res, next) {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(token);
    if (!token) {
      return res.status(403).send('A token is required for authentication');
    }
    try {
      if ("radicle-job-app-super-user-token" !== undefined) {
        const jwtDecodedData = jwt.verify(token, "radicle-job-app-super-user-token");
        console.log(jwtDecodedData);
        if (jwtDecodedData.user_id) {
          //console.log(jwtDecodedData.user_id);
         return  await clientDb.findById({_id:jwtDecodedData?.user_id}) .then(user => {
            console.log(user,user?.length);
            if (!user) {
             return res.status(200).json({message:"User Doesn't exist"});
           // return 0;
            } else {
              console.log(`hihsd`,user);

              req.user = user._id;
              next();
            }
          })
          ?.catch(e => {
            console.log(e);
            // res.status(401).send('Something went wrong');
             return 
          });
          
        }
      } else {
        //return res.status(401).send('Invalid Secret key');
        return 0;

      }
    } catch (err) {
      console.log(err);
      //return res.status(401).send('Invalid Token');
    }
    return next();
  }



  module.exports = {
    generateToken, verifyToken
  }

  

