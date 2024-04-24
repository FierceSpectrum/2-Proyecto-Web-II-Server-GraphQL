const Playlist = require("../models/playlistModel");
const User = require("../models/userModel");

const playlistResolvers = {
  getPlaylist: async ({ id }) => {
    try {
      const playlist = await Playlist.findById(id);
      if (!playlist.state) {
        throw new Error("User not found");
      }
      let playlistvideos = playlist.playlist.map((video) => {
        video.id = video._id;
      });
      return playlist;
    } catch (error) {
      throw new Error("Internal server error");
    }
  },
  getAllPlaylists: async () => {
    try {
      const playlists = await Playlist.find({ state: true });
      let playlistvideos = playlists.map((playlist) => {
        playlist.playlist.map((video) => {
          video.id = video._id;
        });
      });
      return playlists;
    } catch (error) {
      throw new Error("Internal server error");
    }
  },
  getPlaylistUser: async ({ id, iduser }) => {
    try {
      const user = await User.findById(iduser);
      if (!user.state) {
        throw new Error("User doesn't exist");
      }

      // Obtener las listas de reproducción del usuario
      const playlist = await Playlist.findById(id);
      if (!playlist.state) {
        throw new Error("Playlist not found");
      }

      if (playlist.user != iduser) {
        throw new Error("User's playlist not found");
      }

      let playlistvideos = playlist.playlist.map((video) => {
        video.id = video._id;
      });

      return playlist;
    } catch (error) {
      throw new Error(error);
    }
  },
  getAllPlaylistsUser: async ({ iduser }) => {
    try {
      const user = await User.findById(iduser);
      if (!user.state) {
        throw new Error("User doesn't exist");
      }

      // Obtener las listas de reproducción del usuario
      const playlists = await Playlist.find({ user: iduser, state: true });
      let playlistvideo = playlists.map((playlist) => {
        playlist.playlist.map((video) => {
          video.id = video._id;
        });
      });
      return playlists;
    } catch (error) {
      throw new Error(error);
    }
  },
};
const QueryPlaylist = `getAllPlaylists: [Playlist!]!
getPlaylist(id: ID!): Playlist
getPlaylistUser(id: ID!, iduser: ID!): Playlist
getAllPlaylistsUser(iduser: ID!): [Playlist!]!`;

module.exports = {
  playlistResolvers,
  QueryPlaylist,
};
