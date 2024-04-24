const PlaylistType = `type Playlist {
  id: ID!
  name: String!
  user: ID!
  playlist: [Video]!
}`;
module.exports = PlaylistType;
