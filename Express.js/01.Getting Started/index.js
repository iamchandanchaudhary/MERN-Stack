const express = require("express");

const app = express();

// console.dir(app);

let port = 3000; // 8080

app.listen(port, () => {
    console.log(`app was listning on port: ${port}`);
});