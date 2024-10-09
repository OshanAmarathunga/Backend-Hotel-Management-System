import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/usersRoute.js";
import mongoose from "mongoose";
import galleryItemRouter from "./routes/galleryItemRoute.js";
import jwt  from "jsonwebtoken";


const app = express();
app.use(bodyParser.json());
const connectionString =
  "mongodb+srv://oshan:1234@cluster0.by9lt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use((req,res,next)=>{
  const token=req.header("Authorization")?.replace("Bearer","")  
  console.log(token);
  
  if(token != null){
    jwt.verify(token,"secret",(err,decoded)=>{
      if(decoded != null){
        req.body.user=decoded
        next()
      }else{
        next()
      }
    })
  }else{
    next()
  }
})


mongoose.connect(connectionString).then(
    ()=>{
        console.log("Connected to databse");
    }
).catch(
    (e)=>{
        console.log("Connection error"); 
    }
)



app.use("/api/users", userRouter);
app.use("/api/gallery",galleryItemRouter);

app.listen(5000, (req, res) => {
  console.log("Server is running on port 5000");
});
