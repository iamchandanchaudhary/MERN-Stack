let express = require("express");

let app = express();

let port = 3003;

app.listen(port, () => {
    console.log(`app was listning on port ${port}`);
})

app.get("/", (req, res) => {
    res.send("This is root path.");
})

app.get("/search", (req, res) => {
     let {q} = req.query;

     if(!q) {
        res.send("<h1>Nothing searched.</h1>");
     }

     let htmlCode = `<h1>Your search result: ${q}</h1>`;
     res.send(htmlCode);
})