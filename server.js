const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;

mongoose.connect(process.env.mongoDB);

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
