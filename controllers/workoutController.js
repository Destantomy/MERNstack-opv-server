/* eslint-disable camelcase */
/* eslint-disable max-len */
const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({user_id}).sort({createdAt: -1});
  res.status(200).json(workouts);
};

// get a single workout
const getWorkout = async (req, res) => {
  const {id} = req.params;
  // if data doesnt valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout !'});
  }
  // else
  const workout = await Workout.findById(id);
  // if data workout doesnt exist
  if (!workout) {
    return res.status(404).json({error: 'No such workout !'});
  }
  // else
  res.status(200).json(workout);
};

// create a new workout
const createWorkout = async (req, res) => {
  const {title, reps, load} = req.body;

  // validation if any an error -> then send to frontend
  const emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!load) {
    emptyFields.push('load');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({error: 'please fill in all the fields', emptyFields});
  }

  // insert document into db
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({title, reps, load, user_id});
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};
// delete a workout
const deleteWorkout = async (req, res) => {
  const {id} = req.params;
  // if data doesnt valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout !'});
  }
  // else --> delete method
  const workout = await Workout.findOneAndDelete({_id: id});
  // validate if data not found
  if (!workout) {
    return res.status(400).json({error: 'No such workout !'});
  }
  // else
  return res.status(200).json(workout);
};
// update a workout
const updateWorkout = async (req, res) => {
  const {id} = req.params;
  // if data doesnt valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout !'});
  }
  // else --> update method --> below are using spreading request object body
  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body,
  });
  // validate if data not found
  if (!workout) {
    return res.status(400).json({error: 'No such workout !'});
  }
  // else
  return res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
