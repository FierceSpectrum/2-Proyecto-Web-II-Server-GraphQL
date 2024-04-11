
const AccountType = `type Account {
  id: ID!
  full_name: String!
  pin: Int!
  avatar: String!
  age: Int!
  user: ID!
  playlists: [String]!
}`
module.exports = AccountType;
