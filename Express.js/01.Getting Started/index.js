const express = require("express");

const app = express();

// console.dir(app);

let port = 3000; // 8080

app.listen(port, () => {
    console.log(`app was listning on port: ${port}`);
});

// Sending request
app.use((req, res) => {
    // console.log(req);
    console.log("Request recived");

    res.send("This is a basic response!");
})