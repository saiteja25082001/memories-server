import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from  './routes/posts.js'
import userRoutes from  './routes/user.js'
import dotenv from 'dotenv'

dotenv.config();
const app=express();  

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(
    cors({
      origin: 'http://localhost:3000', // Allow requests from your frontend's URL
      methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Explicitly allow PATCH
      allowedHeaders: ['Content-Type', 'Authorization'], // Include required headers
    })
  );
// app.options('*', cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
// }));

app.use('/posts',postRoutes);
app.use('/user',userRoutes);

const CONNECTION_URL=process.env.CONNECTION_URL;
const PORT=process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>{console.log(`server runnning on port ${PORT}`)}))
.catch((error)=>{console.log(error.message)})


