const express=require('express');
const path=require('path');
const userRoutes=require("./routes/user");
const blogRoutes=require("./routes/blog");
const mongoose=require('mongoose');
const app=express();
const cookieparser=require("cookie-parser");
const { checkForAuthCookie } = require('./middleware/authentication');
const Blog=require("./models/blog");
const { log } = require('console');
//const check=require("./middleware/authentication");


const PORT=process.env.PORT || 8000;
console.log(process.env.MONGO_URL);

mongoose.connect("mongodb://localhost:27017/blog").then(e=> console.log("mongoDB connected"));

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
//app.use(checkForAuthCookie("token"));
app.use(checkForAuthCookie("token"));
app.use(express.static(path.resolve("./public")));



app.get("/",async(req,res)=>{
    const allBlogs=await Blog.find({});
    res.render("home",{user: req.user,blogs:allBlogs});
})

app.use("/user",userRoutes);
app.use("/blog",blogRoutes);
app.listen(PORT,()=> console.log(`Server started ${PORT}`));

