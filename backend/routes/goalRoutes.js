const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");
const protect = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Get user's goals
 *     description: Retrieve the list of goals for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized access
 */
router.route("/").get(protect, getGoals);

/**
 * @swagger
 * /api/goals:
 *   post:
 *     summary: Create a new goal
 *     description: Create a new goal for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               goal:
 *                 type: string
 *                 description: The goal description.
 *                 example: "Learn Swagger documentation."
 *     responses:
 *       201:
 *         description: Goal created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 */
router.route("/").post(protect, setGoal);

/**
 * @swagger
 * /api/goals/{id}:
 *   put:
 *     summary: Update a goal
 *     description: Update an existing goal for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the goal to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               goal:
 *                 type: string
 *                 description: The updated goal description.
 *                 example: "Master Swagger documentation."
 *     responses:
 *       200:
 *         description: Goal updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 */
router.route("/:id").put(protect, updateGoal);

/**
 * @swagger
 * /api/goals/{id}:
 *   delete:
 *     summary: Delete a goal
 *     description: Delete an existing goal for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the goal to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Goal deleted successfully
 *       401:
 *         description: Unauthorized access
 */
router.route("/:id").delete(protect, deleteGoal);

module.exports = router;
