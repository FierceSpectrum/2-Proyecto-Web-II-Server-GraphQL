const Playlist = require("../models/playlistModel");

/**
 * Get all playlists
 *
 * @param {*} req
 * @param {*} res
 */

const videoGet = (req, res) => {
  // Verificar si se proporciona un ID de lista de reproducción y del video
  if (req.query && req.query.id && req.query.idvideo) {
    // Buscar la lista de reproducción por su ID
    Playlist.findById(req.query.id)
      .then((playlist) => {
        // Verificar si la lista de reproducción está activa
        if (!playlist.state) {
          res.status(404);
          res.json({ error: "Playlist not found" });
          return;
        }
        // Buscar el video en la lista de reproducción por su ID
        const video = playlist.playlist.find(
          (playlist) => playlist._id == req.query.idvideo
        );
        res.status(200);
        res.json(video);
      })
      .catch((err) => {
        res.status(404);
        res.json({ error: "Playlist doesnt exist" });
      });
  } else {
    // Verificar si se proporciona un ID de video
    if (req.query && req.query.id) {
      // Buscar la lista de reproducción por su ID
      Playlist.findById(req.query.id)
        .then((playlist) => {
          // Verificar si la lista de reproducción está activa
          if (!playlist.state) {
            res.status(404);
            res.json({ error: "Playlist not found" });
            return;
          }
          res.status(200);
          res.json(playlist.playlist);
        })
        .catch((err) => {
          res.status(404);
          res.json({ error: "Playlist not found" });
        });
    } else {
      // Si no se proporciona un ID de lista de reproducción, devolver todos los videos de todas las listas de reproducción activas
      Playlist.find({ state: true })
        .then((playlists) => {
          const playlistArray = playlists.map((playlist) => playlist.playlist);
          res.status(200);
          res.json(playlistArray);
        })
        .catch((err) => {
          res.status(500);
          res.json({ "Internal server error": err });
        });
    }
  }
};

module.exports = {
  videoGet,
};
