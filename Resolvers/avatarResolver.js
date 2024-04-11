const Avatar = require("../models/avatarModel");

const avatarResolvers = {
  getAvatar: async ({ id }) => {
    try {
      const avatar = await Avatar.findById(id);
      if (!avatar || !avatar.state) {
        throw new Error("Avatar not found");
      }
      return avatar;
    } catch (error) {
      throw new Error("Internal server error");
    }
  },
  getAllAvatars: async () => {
    try {
      const avatars = await Avatar.find();
      return avatars;
    } catch (error) {
      throw new Error("Internal server error");
    }
  }
};
const QueryAvatar = `getAllAvatars: [Avatar!]!
getAvatar(id: ID!): Avatar`;

module.exports = {
  avatarResolvers,
  QueryAvatar,
};

