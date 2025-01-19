const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');


const port = 3015;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [ {
    id: uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    username: "chandan_chaudhary",
    content: "Hello, from chandan_chaudhary.",
    },
    {
    id: uuidv4(),
    username: "aman_agrawal",
    content: "Hii, this is aman_agrawal.",
    },
    {
    id: uuidv4(),
    username: "vishal_verma",
    content: "Hello, my name is vishal.",
    }, 
];

app.listen(port, () => {
    console.log(`App was listen on Port: ${port}.`);
})

app.get("/", (req, res) => {
    let htmlCode = `<h2>Home Page.</h2> <br> <a href="http://localhost:3015/posts">See All Posts</a>`;
    res.send(htmlCode);
})

app.get("/posts", (req, res) => {
    let { id } = req.params;
    // let post = posts.find((p) => id === p.id);

    res.render("index.ejs", { posts });
})

app.get("/posts/new", (req, res) => {
    res.render("newForm.ejs", { posts });
})

app.post("/posts", (req, res) => {
    let { username, content } = (req.body);
    let id = uuidv4();
    posts.push({ id, username, content });
    // res.send("Post wirking properly.");

    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    // console.log(post);
    // res.send(`Request working properly <br> ${post.content}`);

    res.render("show.ejs", { post });
})

app.get("/posts/:*", (req, res) => {
    res.send("No such content found");
})