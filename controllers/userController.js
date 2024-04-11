const User = require("../models/userModel");

/**
 * Get all users
 *
 * @param {*} req
 * @param {*} res
 */
const userGet = (req, res) => {
  // Si se requiere un usuario específico
  if (req.query && req.query.id) {
    // Encuentra al usuario por su ID
    User.findById(req.query.id)
      .then((user) => {
        // Valida si el usuario esta activo
        if (!user.state) {
          res.status(404);
          res.json({ error: "User not found" });
          return;
        }
        res.status(200);
        res.json(user);
      })
      .catch((err) => {
        res.status(500);
        res.json({ error: "Internal server error" });
      });
  } else {
    // Obtener todos los usuarios activos
    User.find({ state: true })
      .then((users) => {
        // const usersfilter = users.filter(user => user.state)
        res.status(200);
        res.json(users);
      })
      .catch((err) => {
        res.status(500);
        res.json({ "Internal server error": err });
      });
  }
};

module.exports = {
  userGet,
};
