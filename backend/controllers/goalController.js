const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.json(goals);
});

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.goal) {
    res.status(400);
    throw new Error("No goal provided");
  }

  const goal = new Goal({
    goal: req.body.goal,
    user: req.user.id,
  });

  const createdGoal = await goal.save();

  res.status(201).json(createdGoal);
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  const user = await User.findById(req.user.id);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  goal.goal = req.body.goal || goal.goal;

  const updatedGoal = await goal.save();

  res.json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  const user = await User.findById(req.user.id);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await goal.deleteOne();

  res.json({ message: `delete goal ${req.params.id}` });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
