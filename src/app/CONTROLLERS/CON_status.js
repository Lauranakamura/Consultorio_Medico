const bd = require("../../config/database");
const status_DAO = require("../BD/DAO_statusConsulta");

class CON_status {
  exibirStatus() {
    return async function (req, res) {
      const statusDAO = new status_DAO(bd);
      const status = await statusDAO.dadosDosStatusConsultaEJS()

      res.render('ejs/formsStatus', { status })
    }
  }

  incluirStatusEJS() {
    return function (req, res) {
      const { status } = req.body

      const statusDAO = new status_DAO(bd);
      statusDAO
        .incluirStatusConsultaEJS(status)
        .then(() => {
          res.redirect("/status");
        })
        .catch((erro) => console.log(erro));
    };
  }

  alterarStatusEJS() {
    return function (req, res) {
      const { status, id, acao } = req.body;

      const statusDAO = new status_DAO(bd);

      if (acao === 'excluir') {
        statusDAO.excluirStatusConsulta(id)
        .then(() => {
          res.redirect("/status");
        })
        .catch((erro) => console.log(erro));;
      }

      else if (acao === 'alterar') {
        statusDAO.salvarStatusConsultaEJS({
          ID: id,
          NomeStatusConsulta: status
        })
        .then(() => {
          res.redirect("/status");
        })
        .catch((erro) => console.log(erro));;
      }
    }
  }
} // end da classe

module.exports = CON_status;
