const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const app = express();

//Conncting to SERVER and MONGODB
mongoose
  .connect("mongodb://localhost/icecream-recipes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((connected) => {
    console.log("Connected to MONGODB");
    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Setting up Static Folders
app.use(express.static("public"));

//Use JSON parser and URLencoded Bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//Setting Up View ENgine
app.set("view engine", "ejs");

//Base Middleware Routes
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/smoothies", (req, res) => {
  res.render("smoothies");
});
//Routes
app.use("/", authRoutes);

//Cookies

//Handle other Errors from Mongoose and other URL NOT FOUND Errors
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
