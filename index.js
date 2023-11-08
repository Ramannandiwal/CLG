const express = require("express");
const app = express();
const port = 8080;
const path =require("path")
const mongoose = require("mongoose");
app.set("views",path.join(__dirname,"/views"))

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")))

mongoose.connect("mongodb://127.0.0.1:27017/test", {

});

const userschema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", userschema);

app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({ email, password });
  newUser.save()
    .then(() => {
      console.log(newUser)
      res.send("User signed up successfully!");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});
app.get("/home",(req,res)=>{
  res.render("homepage2")
})
app.get("/login",(req,res)=>{
  res.render("login")
})

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email, password })
    .then((user) => {
      if (user) {
        console.log(user)
             res.render("index.ejs",{user})
      } else {
        res.status(401).send("Unauthorized: Incorrect email or password");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
