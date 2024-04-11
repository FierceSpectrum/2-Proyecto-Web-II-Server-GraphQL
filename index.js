const jwt = require("jsonwebtoken");

// Configurar el servidor Express
const express = require("express");
const app = express();

// Configurar de GraphQL
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

// Importa las funciones
const UserType = require("./schemas/userSchema");
const AccountType = require("./schemas/accountSchema");
const PlaylistType = require("./schemas/playlistSchema");
const VideoType = require("./schemas/videoSchema");
const AvatarType = require("./schemas/avatarSchema");
// const PlaylistType = require('./playlistType');
const { userResolvers, QueryUser } = require("./Resolvers/userResolver");
const { accountResolvers, QueryAccount } = require("./Resolvers/accountResolver");
const { playlistResolvers, QueryPlaylist } = require("./Resolvers/playlistResolver");
const { videoResolvers, QueryVideo } = require("./Resolvers/videoResolver");
const { avatarResolvers, QueryAvatar } = require("./Resolvers/avatarResolver");
// const playlistResolvers = require('./playlistResolvers');

// Unir tipos GraphQL
const schema = buildSchema(`
  ${UserType}
  ${AccountType}
  ${PlaylistType}
  ${VideoType}
  ${AvatarType}
  
  type Query {
    ${QueryUser}
    ${QueryAccount}
    ${QueryPlaylist}
    ${QueryVideo}
    ${QueryAvatar}
  }
`);

// Combinar resolvers
const root = {
  ...userResolvers,
  ...accountResolvers,
  ...playlistResolvers,
  ...videoResolvers,
  ...avatarResolvers,
};

// Conexión a la base de datos MongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/users2");

const theSecretKey = process.env.JWT_SECRET;

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
const cors = require("cors");

// Middlewares
app.use(bodyParser.json());
// check for cors
app.use(
  cors({
    domains: "*",
    methods: "*",
  })
);

// JWT Authentication middleware
// app.use(function (req, res, next) {
//   if (req.headers["authorization"]) {
//     const authToken = req.headers["authorization"].split(" ")[1];
//     try {
//       jwt.verify(authToken, theSecretKey, (err, decodedToken) => {
//         if (err || !decodedToken) {
//           res.status(401);
//           res.send({
//             error: "Unauthorized",
//           });
//           return;
//         }

//         const currentDate = new Date();
//         const expirationDate = new Date(decodedToken.expiration);

//         if (currentDate.getTime() > expirationDate.getTime()) {
//           res.status(401);
//           res.send({
//             error: "Unauthorized",
//           });
//           return;
//         }
//         next();
//       });
//     } catch (e) {
//       console.error("There was an error", e);
//       res
//         .send({
//           error: "Unauthorized ",
//         })
//         .status(401);
//     }
//   } else {
//     res.status(401);
//     res.send({
//       error: "Unauthorized ",
//     });
//   }
// });

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
app.listen(3006, () => console.log(`Example app listening on port 3002!`));
