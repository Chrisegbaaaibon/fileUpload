const mongoose = require('mongoose');

exports.db =async ()=>{
   try {
      mongoose.connect(process.env.MONGO_URI)
   } catch (error) {
      console.log(error);
   }
}