const bd = require("../../config/database");
const especialidade_DAO = require("../BD/DAO_especialidade");

class CON_especialidade {
  exibirEspecialidades() {
    return async function (req, res) {
      const espDAO = new especialidade_DAO(bd);
      const especialidades = await espDAO.dadosDasEspecialidadesEJS()

      res.render('ejs/formsEspecialidade', { especialidades })
    }
  }

  incluirEspecialidadeEJS() {
    return function (req, res) {
      const { especialidade } = req.body

      const espDAO = new especialidade_DAO(bd);
      espDAO
        .incluirEspecialidadeEJS(especialidade)
        .then(() => {
          res.redirect("/especialidades");
        })
        .catch((erro) => console.log(erro));
    };
  }

  alterarEspecialidadeEJS() {
    return function (req, res) {
      const { especialidade, id, acao } = req.body;

      const espDAO = new especialidade_DAO(bd);

      if (acao === 'excluir') {
        espDAO.excluirEspecialidade(id)
        .then(() => {
          res.redirect("/especialidades");
        })
        .catch((erro) => console.log(erro));;
      }

      else if (acao === 'alterar') {
        espDAO.salvarEspecialidadeEJS({
          ID: id,
          NomeEspecialidade: especialidade
        })
        .then(() => {
          res.redirect("/especialidades");
        })
        .catch((erro) => console.log(erro));;
      }
    }
  }
} // end da classe

module.exports = CON_especialidade;
