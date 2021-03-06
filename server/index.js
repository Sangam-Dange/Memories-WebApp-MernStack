import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"

const app = express();
dotenv.config()

//routes imports
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/userRoutes.js";

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


//routes 
app.use("/posts", postRoutes); 
app.use("/user",userRoutes)

 
// const CONNECTION_URL = `mongodb+srv://sangamdange:sangamdange123@cluster0.5bwdt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 4000;
  

mongoose 
  .connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    }); 
  }) 
  .catch((error) => {
    console.log(error.message);  
  });   

 
    