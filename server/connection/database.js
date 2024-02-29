const mongoose = require("mongoose");
require("dotenv").config();

const dbconnection =  () => {
  try {
    main().catch((err) => console.log(err));

    async function main() {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("DB connected");
    }
  } catch(err) {
    console.log(err)
  }
}

module.exports=dbconnection
