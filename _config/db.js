
const mongoose = require("mongoose");
// ///const {MONGO_URI,MONGO_LOCAL} = require("../config");


// mongoose.connect( process.env.MONGO_LOCAL ,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// })
// .then(()=>console.log("Mongo DB connected now."))
// .catch(err=> console.log(err));


const connectDB = async () => {
//let MongoURL=process.env.LOCAL_CONNECTION_STRING;
let MongoURL="mongodb://gift:s4DlvGiPqlKuCu1R@cluster0-shard-00-00.qwh5f.mongodb.net:27017,cluster0-shard-00-01.qwh5f.mongodb.net:27017,cluster0-shard-00-02.qwh5f.mongodb.net:27017/AzureDB?ssl=true&replicaSet=atlas-lc221h-shard-0&authSource=admin&retryWrites=true&w=majority";

    try {
      const conn = await mongoose.connect(MongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
  
      console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }
  
  module.exports = connectDB