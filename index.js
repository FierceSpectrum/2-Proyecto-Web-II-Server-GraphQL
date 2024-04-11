
const jwt = require("jsonwebtoken");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const { buildSchema } = require("graphql");

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb://localhost:27017/graphql_example", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  name: String,
  email: String,
});

// Definir el esquema GraphQL
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    getAllUsers: [User!]!
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
`);

// Definir resolvers
const root = {
  getAllUsers: async () => await User.find(),
  getUser: async ({ id }) => await User.findById(id),
  createUser: async ({ name, email }) => {
    const user = new User({ name, email });
    await user.save();
    return user;
  },
};

// Configurar el servidor Express
const app = express();

// Crear y utilizar el middleware GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
