const express = require("express");

const app = express();

// console.dir(app);

let port = 3001; // 8080

app.listen(port, () => {
    console.log(`app was listning on port: ${port}`);
});

let htmlCode = "<h1>Fruits List</h1> <ul> <li>Mango</li> <li>Apple</li></ul>"

// Sending request
app.use((req, res) => {
    // console.log(req);
    console.log("Request recived");

    // res.send("This is a basic response!");
    res.send( {
        name: "Chandan Chaudhary",
        age: 18,
        course: "BCA"
    })

    // res.send(htmlCode);
})