const Playlist = require("../models/playlistModel");
const User = require("../models/userModel");

/**
 * Get all playlists
 *
 * @param {*} req
 * @param {*} res
 */
const playlistGet = (req, res) => {
  // Verificar si se proporciona un ID de lista de reproducción

  if (req.query && req.query.iduser) {
    User.findById(req.query.iduser)
      .then((user) => {
        if (!user.state) {
          res.status(404);
          res.json({ error: "User doesnt exist" });
          return;
        }
        // Obtener la lista de reproducción por su ID
        Playlist.find({ state: true })
          .then((playlists) => {
            const playlist = playlists.filter(
              (playlist) => playlist.user == req.query.iduser
            );

            res.status(200);
            res.json(playlist);
          })
          .catch((err) => {
            res.status(404);
            res.json({ error: "Playlist not found" });
          });
      })
      .catch((err) => {
        res.status(500);
        res.json({ error: "Internal server error" });
      });
  } else if (req.query && req.query.id) {
    // Obtener la lista de reproducción por su ID
    Playlist.findById(req.query.id)
      .then((playlist) => {
        // Verificar si la lista de reproducción está activa
        if (!playlist.state) {
          res.status(404);
          res.json({ error: "Playlist doesnt exist" });
          return;
        }
        res.status(200);
        res.json(playlist);
      })
      .catch((err) => {
        res.status(404);
        res.json({ error: "Playlist not found" });
      });
  } else {
    // Obtener todas las listas de reproducción activas
    Playlist.find({ state: true })
      .then((playlists) => {
        res.status(200);
        res.json(playlists);
      })
      .catch((err) => {
        res.status(500);
        res.json({ "Internal server error": err });
      });
  }
};

module.exports = {
  playlistGet,
};
