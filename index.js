const express = require('express');
const app = express();
const path=require('path');
const port=8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id:uuidv4(),
        username:"Abhishek",
        content:"Student"
    },
    {
        id:uuidv4(),
        username:"Kajol",
        content:"SQE"
    },
    {
        id:uuidv4(),
        username:"Ramesh",
        content:"Farmer"
    },
    {
        id:uuidv4(),
        username:"Anita",
        content:"Housewife"
    }
]

app.get("/posts",(req,res)=>{
    res.render('index.ejs',{posts});
    // res.send("Server is working");
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

// app.get("/posts/:id",(req,res)=>{
//     let {id} = req.params;
//     // finding post using find function of array to find post
//     let post=posts.find((p)=>id===p.id);
//     // let post = posts.find((p) => id === p.id);
//     console.log(post);
//     res.render("show.ejs",{post});
// });

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    
    if (post) {
        res.render("edit.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
    // res.redirect("/posts");
});


// Royte for display list of post on main page

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    // console.log(req.body);
    res.redirect("/posts");
    res.send("Post request working");
});

// Route for show post

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    console.log(id);
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
    res.send("Patch req working");
})

app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);

    if (post) {
        res.render('show.ejs', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");  // Redirect to the posts page after deletion
});


// Route for edit post

// app.get("posts/:id/edit",(req,res)=>{
//     let {id} = req.params;
//     let post=posts.find((p)=>id===p.id);
//     res.render("edit.ejs",{post});
// });

app.listen(port,()=>{
    console.log(`Server listning on port:${port}`);
});


// Implementation GET/posts
// GET      /posts      to get data for all posts
// POST     /posts      to add new post
// show route 
// GET      /posts/:id  to get one post
// PATCH    /posts/:id  to update specific post         we can use post request
// Edit route
// GET      /posts/:id/edit serve the edit form
// DELETE   /POSTS/:id      to delete specific post

// Create id for posts
// UUID --> Universally unique identifier
// npm install uuid

// Method override
// Change request type
// POST --> PATCH  /  DELETE  /PUT