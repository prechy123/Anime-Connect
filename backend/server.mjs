import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
