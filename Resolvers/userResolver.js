const User = require("../models/userModel");

const userResolvers = {
  getUser: async ({ id }) => {
    try {
      const user = await User.findById(id);
      if (!user || !user.state) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Internal server error");
    }
  },
  getAllUsers: async () => {
    try {
      const users = await User.find({ state: true });
      return users;
    } catch (error) {
      return {Error: error};
    }
  }
};
const QueryUser = `getAllUsers: [User!]!
getUser(id: ID!): User`;

module.exports = {
  userResolvers,
  QueryUser,
};
