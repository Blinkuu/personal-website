const mongoose = require("mongoose");

const informationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
      }
  });
  
const Information = mongoose.model("Information", informationSchema);

module.exports = Information;