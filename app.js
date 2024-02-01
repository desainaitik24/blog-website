//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = `Welcome to Daily Journal – Blog Hub! Where You can write and publish blogs. Explore the world of Blog with us. Dive into expert insights, tips, and engaging narratives. Join our vibrant community, where your voice matters. Quality content, diverse perspectives, and the latest trends – start your Blogging  journey with us.`;
const aboutContent = "Explore a world of knowledge and inspiration at Daily Journal. Discover thought-provoking articles, engaging stories, and insights spanning technology, lifestyle, and culture. Join our community of curious minds on a journey of learning and discovery.";
const contactContent = "Contact Us Thank you for reaching out to Daily Jouranl. We value your feedback, inquiries, and suggestions. Please feel free to contact us using the information below: Email: xyz@gmail.com";
let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
  res.render('home',{
    startingContent: homeStartingContent, posts: posts
  });
})

app.get("/about",(req,res)=>{
  res.render('about',{
    aboutContent: aboutContent
  });
})

app.get("/contact",(req,res)=>{
  res.render('contact',{
    contactContent: contactContent
  });
})

app.get("/compose",(req,res)=>{
  res.render('compose',{});
})

app.post("/compose",(req,res)=>{
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post);
  res.redirect("/");
})

app.get("/posts/:param",(req,res)=>{
  const requestedTitle = _.lowerCase(req.params.param);
  
  posts.forEach(post => {
    const storedTitle = _.lowerCase(post.title);

    if(requestedTitle === storedTitle){
      res.render('post',{
        title: post.title,
        content:post.content
      });
    }
  });

})

app.listen(3000, function() {
  console.log("Server started on PORT 3000");
});