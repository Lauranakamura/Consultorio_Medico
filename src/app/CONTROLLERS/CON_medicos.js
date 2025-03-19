const bd = require("../../config/database");
const medicos_DAO = require("../BD/DAO_medicos");
const especialidade_DAO = require("../BD/DAO_especialidade");

class CON_medicos {
  exibirMedicos() {
    return async function (req, res) {
      const medicosDAO = new medicos_DAO(bd);
      const medicos = await medicosDAO.dadosDosMedicosEJS();
      const espDAO = new especialidade_DAO(bd);
      const especialidades = await espDAO.dadosDasEspecialidadesEJS();

      res.render("ejs/formsMedico", { medicos, especialidades });
    };
  }

  incluirMedicoEJS() {
    return function (req, res) {
      const { NomeMedico, EspecialidadeID } = req.body;

      const medicosDAO = new medicos_DAO(bd);
      medicosDAO
        .incluirMedicoEJS(NomeMedico, EspecialidadeID)
        .then(() => {
          res.redirect("/medicos");
        })
        .catch((erro) => console.log(erro));
    };
  }

  alterarMedicoEJS() {
    return function (req, res) {
      const { id, NomeMedico, EspecialidadeID, acao } = req.body;

      const medicosDAO = new medicos_DAO(bd);

      if (acao === "excluir") {
        medicosDAO
          .excluirMedico(NomeMedico)
          .then(() => {
            res.redirect("/medicos");
          })
          .catch((erro) => console.log(erro));
      } else if (acao === "alterar") {
        medicosDAO
          .salvarMedicoEJS(id, NomeMedico, EspecialidadeID)
          .then(() => {
            res.redirect("/medicos");
          })
          .catch((erro) => console.log(erro));
      }
    };
  }
} // end da classe

module.exports = CON_medicos;
