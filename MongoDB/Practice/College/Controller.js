
  // controllers/userController.js
  const User = require("../models/User");

  exports.getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.render("user", { user });  // Passing data to the View
    } catch (err) {
      res.status(500).send("Error fetching user");
    }
  };
