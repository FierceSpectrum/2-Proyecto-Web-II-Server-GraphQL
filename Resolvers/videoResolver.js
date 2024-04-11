const Playlist = require("../models/playlistModel");

const videoResolvers = {
  getVideo: async ({ id }) => {
    try {
      // Obtiene todas las lista de reproducciones
      const playlists = await Playlist.find({ state: true });
      // Bisca dentro de las lista de reproduciones el video en espesifico
      const video = playlists.map((playlist) => {
        playlist.playlist.map((videos) => {
          videos._id == id;
        });
      });

      if (!video) {
        throw new Error("Video not found");
      }
      return video;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getAllVideos: async () => {
    try {
      // Si no se proporciona un ID de lista de reproducción, devolver todos los videos de todas las listas de reproducción activas
      const playlists = await Playlist.find({ state: true });
      const videos = playlists.map((playlist) => playlist.playlist).flat();
      return videos;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getVideoInPlaylist: async ({ id, idplaylist }) => {
    try {
      // Buscar la lista de reproducción por su ID
      const playlist = await Playlist.findById(idplaylist);
      // Verificar si la lista de reproducción está activa
      if (!playlist || !playlist.state) {
        throw new Error("Playlist not found");
      }
      // Buscar el video en la lista de reproducción por su ID
      const video = playlist.playlist.find((video) => video._id == id);
      if (!video) {
        throw new Error("Video not found in playlist");
      }
      return video;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getAllVideosInPlaylist: async ({ idplaylist }) => {
    try {
      // Buscar la lista de reproducción por su ID
      const playlist = await Playlist.findById(idplaylist);
      // Verificar si la lista de reproducción está activa
      if (!playlist.state) {
        throw new Error("Playlist not found");
      }
      return playlist.playlist;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
const QueryVideo = `getAllVideos: [Video!]!
getVideo(id: ID!): Video
getVideoInPlaylist(id: ID!, idplaylist: ID!): Video
getAllVideosInPlaylist(idplaylist: ID!): Video`;

module.exports = {
  videoResolvers,
  QueryVideo,
};
