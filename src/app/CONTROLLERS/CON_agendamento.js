const bd = require("../../config/database");
const consultaMedica_DAO = require("../BD/DAO_consultaMedica");
const paciente_DAO = require("../BD/DAO_paciente");
const medico_DAO = require("../BD/DAO_medicos");
const status_DAO = require("../BD/DAO_statusConsulta");
const tipo_DAO = require("../BD/DAO_tipoConsulta");
const nodemailer = require('nodemailer');

//CODIGO PARA MANDAR EMAIL
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'lauranakamuraml@gmail.com',
//     pass: 'L@ura170301',
//   },
// });

class CON_agendamento {
  exibirAgendamentos() {
    return async function (req, res) {
      const agendamentoDao = new consultaMedica_DAO(bd);
      const pacienteDao = new paciente_DAO(bd);
      const medicoDao = new medico_DAO(bd);
      const statusDao = new status_DAO(bd);
      const tipoDao = new tipo_DAO(bd);

      const agendamentos = await agendamentoDao.dadosDasConsultasMedicasEJS();
      const pacientes = await pacienteDao.dadosDosPacienteEJS();
      const medicos = await medicoDao.dadosDosMedicosEJS();
      const status = await statusDao.dadosDosStatusConsultaEJS();
      const tipos = await tipoDao.dadosDosTiposConsultaEJS();

      res.render("ejs/telaAgendamento", {
        agendamentos,
        pacientes,
        medicos,
        status,
        tipos,
      });
    };
  }


  criarAgendamentoEJS() {
    return function (req, res) {


      const agendamentoDao = new consultaMedica_DAO(bd);
      agendamentoDao
        .incluirConsultaMedicaEJS(req.body)
        .then(() => {
          res.redirect("/agendamento");
        })
        .catch((erro) => console.log(erro));

        //CODIGO FEITO PARA MANDAR O EMAIL
    //   const { DataConsulta, HoraConsulta, MedicoID, PacienteID, TipoConsultaID, StatusConsultaID, DestinatarioEmail } = req.body;

    // const mailOptions = {
    //   from: 'lauranakamuraml@gmail.com',
    //   to: DestinatarioEmail,
    //   subject: 'Novo Agendamento de Consulta Médica',
    //   text: `
    //     Data da Consulta: ${DataConsulta}
    //     Hora da Consulta: ${HoraConsulta}
    //     Médico ID: ${MedicoID}
    //     Paciente ID: ${PacienteID}
    //     Tipo de Consulta ID: ${TipoConsultaID}
    //     Status de Consulta ID: ${StatusConsultaID}
    //   `,
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.error(error);
    //     res.status(500).send('Erro ao enviar o e-mail');
    //   } else {
    //     console.log('E-mail enviado: ' + info.response);

    //     const agendamentoDao = new consultaMedica_DAO(bd);
    //     agendamentoDao
    //       .incluirConsultaMedicaEJS(req.body)
    //       .then(() => {
    //         res.redirect("/agendamento");
    //       })
    //       .catch((erro) => console.log(erro));c
    //   }
  };
}

  alterarAgendamentoEJS() {
    return function (req, res) {
      const agendamentoDao = new consultaMedica_DAO(bd);

      const { acao } = req.body;

      if (acao === "excluir") {
        agendamentoDao
          .excluirConsultaMedica(req.body.id)
          .then(() => {
            res.redirect("/agendamento");
          })
          .catch((erro) => console.log(erro));
      } else if (acao === "alterar") {
        agendamentoDao
          .salvarConsultaMedicaEJS(req.body)
          .then(() => {
            res.redirect("/agendamento");
          })
          .catch((erro) => console.log(erro));
      }
    };
  }
} // end da classe

module.exports = CON_agendamento;
