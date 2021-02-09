const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");
const path = require("path");

// HTML Routes

// Routes to the homepage
// router.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

// Routes to the stats page through stats.html
router.get("/stats", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

// Route for exercises.html to create new exercise
router.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

//API Routes

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

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .sort({ day: -1 })
    .limit(7)
    .then((workoutRange) => {
      res.json(workoutRange);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/api/workouts", (req, res) => {
  Workout.create(req.body)
    .then((dbWorkout) => {
      // console.log(JSON.parse(dbWorkout));
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Edits a specific workout by ID
router.put("/api/workouts/:id", (req, res) => {
  let id = req.params.id;
  Workout.findOneAndUpdate({ _id: id }, { $push: { exercises: req.body } })
    .then((updatedWorkout) => {
      res.json(updatedWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Deletes a specific Workout by ID
router.delete("/api/workouts/:id", (req, res) => {
  let idToDel = req.params.id;
  Workout.deleteOne({ _id: idToDel }).then(function (workoutDel) {
    res.json(workoutDel);
  });
});
module.exports = router;
