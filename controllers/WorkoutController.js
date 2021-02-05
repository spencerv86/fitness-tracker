const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

// This route fetches all of the workout data.
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});



module.exports = router;
