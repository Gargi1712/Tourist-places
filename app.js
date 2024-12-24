import express from "express";
import bodyParser from "body-parser";

const app=express();
const port=3000;



let posts=[
    {
        id: 1,
        title: "Hawa Mahal",
        content: "An iconic palace in Jaipur known for its unique architecture and historical significance."
    },
    {
        id: 2,
        title: "Amber Fort",
        content: "A majestic fort located on a hilltop, offering stunning views and rich history."
    },
    {
        id: 3,
        title: "Jantar Mantar",
        content: "A UNESCO World Heritage site featuring astronomical instruments from the 18th century."
    }
];
let idCounter=posts.length+1;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req,res)=>
{
    res.render("index.ejs", {posts});
});

app.get("/new", (req,res)=>{
    res.render("new.ejs");
});

app.post("/new", (req,res)=>{
    const newPost={
        id: idCounter,
        title: req.body.title,
        content: req.body.content,

    }
    
    posts.push(newPost);
    idCounter++;
    res.redirect("/");

});

app.get("/edit/:id",(req,res)=>{
    const postId = parseInt(req.params.id);
const post = posts.find((p) => p.id === postId);
if(post){
res.render("edit.ejs",{post});}
else {
    res.status(404).send("Post not found");
}
});


app.post("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find((p) => p.id === postId);
    if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
        res.redirect("/");
     } else {
      res.status(404).send("Post not found");
    }
  });
  


  app.post("/delete/:id", (req, res) => {
    const postId = parseInt(req.params.id, 10); // Ensure postId is an integer

if (isNaN(postId)) {                             //The isNaN() function in JavaScript checks whether a value is Not a Number (NaN). If the value  is not a number, it returns true. Otherwise, it returns false.


   res.status(400).send("Invalid post ID");
}

const postExists = posts.some((p) => p.id === postId);
if (!postExists) {
    res.status(404).send("Post not found");
}

posts = posts.filter((p) => p.id !== postId); // Correctly update the posts array
res.redirect("/");

});

app.listen(3000, () => {
    console.log('Server running on port 3000');
  });