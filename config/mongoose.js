const mongoose = require("mongoose");

mongoose.connection.on("connected", () => {
  console.log("Mongoose connection established.");
});

mongoose.connection.on("error", err => {
  console.log(`Couldn't establish connection with MongoDB. Error: ${err}`);
});

exports.connect = () => {
  return mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_ADDRESS}/websiteDB?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
};
