const bd = require("../../config/database");
const Pacientes_DAO = require("../BD/DAO_paciente");

class CON_pacientes {
  exibirPacientes() {
    return async function (req, res) {
      const pacienteDAO = new Pacientes_DAO(bd);
      const pacientes = await pacienteDAO.dadosDosPacienteEJS();

      console.log(pacientes);

      res.render("ejs/formsPaciente", { pacientes });
    };
  }

  incluirPacienteEJS() {
    return function (req, res) {
      const { NomePaciente, dataDeNascimento, cpf, email } = req.body;

      const pacienteDAO = new Pacientes_DAO(bd);
      pacienteDAO
        .incluirPacienteEJS({
          cpf,
          NomePaciente,
          DataNascimento: dataDeNascimento,
          email,
        })
        .then(() => {
          res.redirect("/pacientes");
        })
        .catch((erro) => console.log(erro));
    };
  }

  alterarPacienteEJS() {
    return function (req, res) {
      const { id, NomePaciente, acao, dataDeNascimento, cpf, email } = req.body;

      const pacienteDAO = new Pacientes_DAO(bd);

      if (acao === "excluir") {
        pacienteDAO
          .excluirPaciente(email)
          .then(() => {
            res.redirect("/pacientes");
          })
          .catch((erro) => console.log(erro));
      } else if (acao === "alterar") {
        pacienteDAO
          .salvarPacienteEJS({
            id,
            cpf,
            NomePaciente,
            DataNascimento: dataDeNascimento,
            email,
          })
          .then(() => {
            res.redirect("/pacientes");
          })
          .catch((erro) => console.log(erro));
      }
    };
  }
} // end da classe

module.exports = CON_pacientes;
