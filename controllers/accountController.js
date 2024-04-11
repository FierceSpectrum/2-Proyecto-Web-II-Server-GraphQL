const Account = require("../models/accountModel");
const User = require("../models/userModel");
/**
 * Get all accounts
 *
 * @param {*} req
 * @param {*} res
 */
const accountGet = async (req, res) => {
  try {
    // Si se requieren todas las cuentas de un usuario específico por ID de usuario
    if (req.query && req.query.iduser) {
      const user = await User.findById(req.query.iduser);

      if (!user.state) {
        res.status(404);
        res.json({ error: "User not found" });
        return;
      }

      Account.find({ user: req.query.iduser, state: true })
        .then((accounts) => {
          res.status(200);
          res.json(accounts);
        })
        .catch((err) => {
          res.status(404);
          res.json({ error: "Account not found" });
        });
    } else {
      // Si se requiere una cuenta específica por ID
      if (req.query && req.query.id) {
        Account.findById(req.query.id)
          .then((account) => {
            // Verificar si la cuenta  está activa
            if (!account.state) {
              res.status(404);
              res.json({ error: "Account not found" });
              return;
            }
            res.status(200);
            res.json(account);
          })
          .catch((err) => {
            res.status(404);
            res.json({ error: "Account not found" });
          });
      } else {
        // Si no se proporciona ningún parámetro, devolver todas las cuentas activas
        Account.find({ state: true })
          .then((data) => {
            res.status(200);
            res.json(data);
          })
          .catch((err) => {
            res.status(500);
            res.json({ error: "Internal server error" });
          });
      }
    }
  } catch (error) {
    res.status(500);
    res.json({ error: "Internal server error" });
  }
};

module.exports = {
  accountGet,
};
