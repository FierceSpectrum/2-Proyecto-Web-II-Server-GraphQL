const Avatar = require("../models/avatarModel");

/**
 * Get all avatars
 *
 * @param {*} req
 * @param {*} res
 */
const avatarGet = (req, res) => {
  // Si se requiere una imagen en específico
  if (req.query && req.query.id) {
    // Encuentra la imagen por su ID
    Avatar.findById(req.query.id)
      .then((avatar) => {
        // Valida si hay una imagen
        if (!avatar) {
          res.status(404);
          res.json({ error: "avatar not found" });
          return;
        }
        res.status(200);
        res.json(avatar);
      })
      .catch((err) => {
        res.status(500);
        res.json({ error: "Internal server error" });
      });
  } else {
    // Obtener todos las imagenes
    Avatar.find()
      .then((avatars) => {
        res.status(200);
        res.json(avatars);
      })
      .catch((err) => {
        res.status(500);
        res.json({ "Internal server error": err });
      });
  }
};

module.exports = {
  avatarGet,
};
