const mongoose = require("mongoose");

// mongoose.connect('mongodb://127.0.0.1:27017/students');

main()
    .then(() => {
    console.log("Connection Successeful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/students');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}