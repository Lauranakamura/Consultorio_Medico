const CON_especialidade = require("../CONTROLLERS/CON_especialidade");
const CON_status = require("../CONTROLLERS/CON_status");
const CON_tipo = require("../CONTROLLERS/CON_tipo");
const CON_medico = require("../CONTROLLERS/CON_medicos");
const CON_pacientes = require("../CONTROLLERS/CON_pacientes");
const CON_Usuario = require("../CONTROLLERS/CON_usuario");

const path = require("path");
const CON_agendamento = require("../CONTROLLERS/CON_agendamento");

module.exports = (app) => {
  // Evitar problemas com os CORS
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  const pacienteController = new CON_pacientes();

  app.get("/pacientes", pacienteController.exibirPacientes());
  app.post("/criar-paciente", pacienteController.incluirPacienteEJS());
  app.post("/alterar-paciente", pacienteController.alterarPacienteEJS());

  const especialidadeController = new CON_especialidade();

  app.get("/especialidades", especialidadeController.exibirEspecialidades());
  app.post(
    "/criar-especialidade",
    especialidadeController.incluirEspecialidadeEJS()
  );
  app.post(
    "/alterar-especialidade",
    especialidadeController.alterarEspecialidadeEJS()
  );

  const statusController = new CON_status();

  app.get("/status", statusController.exibirStatus());
  app.post("/criar-status", statusController.incluirStatusEJS());
  app.post("/alterar-status", statusController.alterarStatusEJS());

  const tipoController = new CON_tipo();

  app.get("/tipos", tipoController.exibirTipo());
  app.post("/criar-tipo", tipoController.incluirTipoEJS());
  app.post("/alterar-tipo", tipoController.alterarTipoEJS());

  const medicoController = new CON_medico();

  app.get("/medicos", medicoController.exibirMedicos());
  app.post("/cadastrar-medico", medicoController.incluirMedicoEJS());
  app.post("/alterar-medico", medicoController.alterarMedicoEJS());

  app.get("/principal", (req, res) => {
    res.render(path.join(__dirname, "../../../views/ejs/telaPrincipal.ejs"), {
      usuario: "",
    });
  });

  const usuarioController = new CON_Usuario();

  app.get("/", usuarioController.cadastros());
  app.post("/cadastrar-usuario", usuarioController.cadastrarUsuario());

  app.get("/login", usuarioController.login());
  app.post("/logar-usuario", usuarioController.loginUsuario());

  const agendamentoController = new CON_agendamento();

  app.get("/agendamento", agendamentoController.exibirAgendamentos());
  app.post("/criar-agendamento", agendamentoController.criarAgendamentoEJS());
  app.post(
    "/alterar-agendamento",
    agendamentoController.alterarAgendamentoEJS()
  );
  
};
