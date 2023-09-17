const express = require("express");
app = express();

const port = 8080;
//import route functions
const router = require("./routes/router");
//all route middleware
//start

//pass json data
app.use(express.json());

//pass form data
app.use(express.urlencoded({ extended: true }));
//routes
app.use("/", router);
//end

//start server
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server Running on Port: ${port}`);
  }
});
