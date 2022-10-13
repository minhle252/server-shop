const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // await mongoose.connect(
    //   "mongodb+srv://minhle:Trung@2020@shop-fullstack.etsrc.mongodb.net/shop-fullstack?retryWrites=true&w=majority",
    //   {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }
    // );
    console.log(`connected to database `);
  } catch (error) {
    console.log("failed to connect");
  }
};

module.exports = { connect };
