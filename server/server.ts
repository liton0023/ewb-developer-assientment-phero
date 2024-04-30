import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

dotenv.config();

process.on("uncaughtException", (error) => {
  console.error(error);
  process.exit(1);
});

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`Dadabase is connected successfully`);
    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("conncet faild to Db", error);
  }
}

main();
