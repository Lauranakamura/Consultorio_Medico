const bd = require("../../config/database");
const usuario_DAO = require("../BD/DAO_usuario");

class CON_Usuario {
  cadastros() {
    return function (req, res) {
      return res.render("ejs/telaCadastro", { erro: "" });
    };
  }

  login() {
    return function (req, res) {
      return res.render("ejs/telaLogin", { erro: "" });
    };
  }

  cadastrarUsuario() {
    return function (req, res) {
      const { NomeUsuario, email, senha } = req.body;

      const DAO_usuario = new usuario_DAO(bd);
      DAO_usuario.cadastrarUsuario(NomeUsuario, email, senha)
        .then((usuario) => {
          console.log(usuario);
          return res.render("ejs/telaPrincipal", {
            usuario: usuario.recordset[0],
          });
        })
        .catch((erro) => {
          console.log(erro);
          return res.render("ejs/telaCadastro", {
            erro: "Usuario já existente!",
          });
        });
    };
  }

  loginUsuario() {
    return function (req, res) {
      const { email, senha } = req.body;

      const DAO_usuario = new usuario_DAO(bd);
      DAO_usuario.loginUsuario(email, senha)
        .then((usuario) => {
          if (usuario.recordset.length === 0) {
            return res.render("ejs/telaLogin", {
              erro: "Usuario ou senha incorretos!",
            });
          }

          return res.render("ejs/telaPrincipal", {
            usuario: usuario.recordset[0],
          });
        })
        .catch((erro) => console.log(erro));
    };
  }
} // end da classe

module.exports = CON_Usuario;
