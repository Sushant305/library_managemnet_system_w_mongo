const mongoose = require("mongoose");

function Dbconnection() {
  const DB_URL = process.env.MONGO_URL;

  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("DB Connected...");
    })
    .catch((error) => {
      console.log("Connection Error:", error);
    });
}

module.exports = Dbconnection;