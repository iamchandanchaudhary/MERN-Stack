const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

// Home page route
router.get("/", gameController.home);

// Insert game route
router.post("/add-game", gameController.addGame);

module.exports = router;