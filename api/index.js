const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes =require( './routes/user.routes.js');
const authRoutes = require("./routes/auth.routes.js");
const postRoutes = require("./routes/post.routes.js");
const commentRoutes = require("./routes/comment.routes.js");
import path from "path";


const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());


mongoose
  .connect(
    process.env.MONGO
   )
  .then(() => {
    console.log("Mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();



app.listen(3000, () => {
  console.log("server is running");
});

app.use('/api/user' , userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


app.use((err,req,res,next) => {
    const statusCode =err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
