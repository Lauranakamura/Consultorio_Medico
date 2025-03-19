const sql = require("mssql");
const conectarAoSql = require("../../config/database");

class DAO_agendamento {
  async dadosDosAgendamentosEJS() {
    try {
      const pool = await conectarAoSql();
      const result = await pool.request().query("SELECT * FROM Agendamento");
      return result.recordset;
    } catch (error) {
      console.error(error);
      throw new Error("Lista de Agendamentos FALHOU!");
    }
  }

  async incluiragenDAO_agendamentoEJS(agenDAO_agendamento) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("DataConsulta", sql.Date, agenDAO_agendamento.DataConsulta)
        .input("HoraConsulta", sql.Time, agenDAO_agendamento.HoraConsulta)
        .input("MédicoID", sql.Int, agenDAO_agendamento.MédicoID)
        .input("PacienteID", sql.Int, agenDAO_agendamento.PacienteID)
        .input("TipoConsultaID", sql.Int, agenDAO_agendamento.TipoConsultaID)
        .input(
          "StatusConsultaID",
          sql.Int,
          agenDAO_agendamento.StatusConsultaID
        )
        .query(
          "INSERT INTO ConsultaMédica (DataConsulta, HoraConsulta, MédicoID, PacienteID, TipoConsultaID, StatusConsultaID) VALUES (@DataConsulta, @HoraConsulta, @MédicoID, @PacienteID, @TipoConsultaID, @StatusConsultaID)"
        );
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Incluir Consulta Médica FALHOU!");
    }
  }

  async excluiragenDAO_agendamento(id) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("ID", sql.Int, id)
        .query("DELETE FROM ConsultaMédica WHERE ID = @ID");
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Excluir Consulta Médica FALHOU!");
    }
  }

  async buscaragenDAO_agendamentoPorID(id) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("ID", sql.Int, id)
        .query(
          "SELECT ID, DataConsulta, HoraConsulta, MédicoID, PacienteID, TipoConsultaID, StatusConsultaID FROM ConsultaMédica WHERE ID = @ID"
        );
      return result.recordset[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async salvaragenDAO_agendamentoEJS(agenDAO_agendamento) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("DataConsulta", sql.Date, agenDAO_agendamento.DataConsulta)
        .input("HoraConsulta", sql.Time, agenDAO_agendamento.HoraConsulta)
        .input("MédicoID", sql.Int, agenDAO_agendamento.MédicoID)
        .input("PacienteID", sql.Int, agenDAO_agendamento.PacienteID)
        .input("TipoConsultaID", sql.Int, agenDAO_agendamento.TipoConsultaID)
        .input(
          "StatusConsultaID",
          sql.Int,
          agenDAO_agendamento.StatusConsultaID
        )
        .input("ID", sql.Int, agenDAO_agendamento.ID)
        .query(
          "UPDATE ConsultaMédica SET DataConsulta = @DataConsulta, HoraConsulta = @HoraConsulta, MédicoID = @MédicoID, PacienteID = @PacienteID, TipoConsultaID = @TipoConsultaID, StatusConsultaID = @StatusConsultaID WHERE ID = @ID"
        );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = DAO_agendamento;
