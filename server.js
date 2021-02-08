const express = require("express");
const mongoose = require("mongoose");
const Workout = require("./models/Workout");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/savedworkouts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(require("./controllers/WorkoutController"));

app.listen(PORT, () => {
  console.log("App running on http://localhost:" + PORT);
});
