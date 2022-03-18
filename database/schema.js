const mongoose = require('mongoose');
const schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const { array } = require('../controller/multer');

const folder  = new schema({
   load:{
      type: Object,
   },
},{
   timestamps: true
})

module.exports = mongoose.model("folder", folder);