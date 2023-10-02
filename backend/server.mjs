import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import userRouter from "./routes/userRoutes.mjs";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

console.log("Connecting mongo database")
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
