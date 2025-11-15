const Game = require("../models/Game");

// Display home page with list of games
exports.home = async (req, res) => {
    const games = await Game.find();
    res.render("index", { games });
};

// Add a new game
exports.addGame = async (req, res) => {
    const game = new Game({
        name: req.body.name,
        rating: req.body.rating
    });

    await game.save();
    res.redirect("/");
};