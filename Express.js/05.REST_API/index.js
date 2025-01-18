const express = require("express");
const app = express();
let path = require("path");

const port = 3015;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [ {
    username: "Chandan Chaudhary",
    content: "Hello, from chandan_chaudhary.",
    },
    {
    username: "Aman Agrawal",
    content: "Hii, this is aman_agrawal.",
    },
    {
    username: "Vishal Verma",
    content: "Hello, my name is vishal.",
    }, 
];

app.listen(port, () => {
    console.log(`App was listen on Port: ${port}.`);
})

app.get("/", (req, res) => {
    res.send("Home Page.");
})

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

app.get("/posts/new", (req, res) => {
    res.render("newForm.ejs", { posts });
})

app.post("/posts", (req, res) => {
    let { username, content } = (req.body);
    posts.push({ username, content });
    // res.send("Post wirking properly.");

    res.redirect("/posts");
})