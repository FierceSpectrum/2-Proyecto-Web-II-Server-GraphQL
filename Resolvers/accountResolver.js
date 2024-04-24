const Account = require("../models/accountModel");
const User = require("../models/userModel");

const accountResolvers = {
  getAccount: async ({ id }) => {
    try {
      const account = await Account.findById(id);
      if (!account.state) {
        throw new Error("Account not found");
      }
      return account;
    } catch (error) {
      throw new Error(error);
    }
  },
  getAllAccounts: async () => {
    try {
      const accounts = await Account.find({ state: true });
      return accounts;
    } catch (error) {
      throw new Error(error);
    }
  },
  getAccountUser: async ({ id, iduser }) => {
    try {
      const user = await User.findById(iduser);
      if (!user.state) {
        throw new Error("User not found");
      }
      const account = await Account.findById(id);
      if (!account.state) {
        throw new Error("Account not found");
      }
      if (account.user != iduser) {
        throw new Error("User's account not found");
      }
      return account;
    } catch (error) {
      throw new Error(error);
    }
  },
  getAllAccountsUser: async ({ iduser }) => {
    try {
      const user = await User.findById(iduser);
      if (!user.state) {
        throw new Error("User not found");
      }
      const accounts = await Account.find({ state: true, user: iduser });
      return accounts;
    } catch (error) {
      throw new Error(error);
    }
  },
};
const QueryAccount = `getAllAccounts: [Account!]!
getAccount(id: ID!): Account
getAccountUser(id: ID!, iduser: ID!): Account
getAllAccountsUser(iduser: ID!): [Account!]!
`;

module.exports = {
  accountResolvers,
  QueryAccount,
};
