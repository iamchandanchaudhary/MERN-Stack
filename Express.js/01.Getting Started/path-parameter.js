let express = require("express");

let app = express();

let port = 3002;

app.listen(port, () => {
    console.log(`app was listning on port: ${port}`);
})

app.get("/", (req, res) => {
    res.send("This is root path.");
})

app.get("/:username", (req, res) => {
    let {username, id} = req.params;

    let htmlCode = `<h1>Hello & welcome @${username}.</h1>`;
    res.send(htmlCode);
})