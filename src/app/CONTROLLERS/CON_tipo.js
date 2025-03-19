const bd = require("../../config/database");
const tipo_DAO = require("../BD/DAO_tipoConsulta");

class CON_Tipo {
  exibirTipo() {
    return async function (req, res) {
      const tipoDAO = new tipo_DAO(bd);
      const tipos = await tipoDAO.dadosDosTiposConsultaEJS()

      res.render('ejs/formsTipodeConsulta', { tipos })
    }
  }

  incluirTipoEJS() {
    return function (req, res) {
      const { tipo } = req.body

      const tipoDAO = new tipo_DAO(bd);
      tipoDAO
        .incluirTipoConsultaEJS(tipo)
        .then(() => {
          res.redirect("/tipos");
        })
        .catch((erro) => console.log(erro));
    };
  }

  alterarTipoEJS() {
    return function (req, res) {
      const { tipo, id, acao } = req.body;

      const tipoDAO = new tipo_DAO(bd);

      if (acao === 'excluir') {
        tipoDAO.excluirTipoConsulta(id)
        .then(() => {
          res.redirect("/tipos");
        })
        .catch((erro) => console.log(erro));;
      }

      else if (acao === 'alterar') {
        tipoDAO.salvarTipoConsultaEJS({
          ID: id,
          NomeTipoConsulta: tipo
        })
        .then(() => {
          res.redirect("/tipos");
        })
        .catch((erro) => console.log(erro));;
      }
    }
  }
} // end da classe

module.exports = CON_Tipo;
