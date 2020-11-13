
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
let MongoURL=process.env.REMOTE_CONNECTION_STRING;
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