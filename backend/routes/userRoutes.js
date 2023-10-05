const express = require("express");
const router = express.Router();
const { getUsers, login, register } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile information of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized access
 */
router.route("/").get(protect, getUsers);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate and log in a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 */
router.route("/login").post(login);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: User registration
 *     description: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username.
 *                 example: "newuser"
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: "newuser@example.com"
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: "newpassword123"
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Bad request
 */
router.route("/register").post(register);

module.exports = router;
