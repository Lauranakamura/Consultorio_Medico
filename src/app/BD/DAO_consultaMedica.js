const sql = require("mssql");
const conectarAoSql = require("../../config/database");

class DAO_consultaMedica {
  async dadosDasConsultasMedicasEJS() {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .query(
          "SELECT ID, DataConsulta, HoraConsulta, MedicoID, PacienteID, TipoConsultaID, StatusConsultaID FROM ConsultaMedica ORDER BY ID"
        );
      return result.recordset;
    } catch (error) {
      console.error(error);
      throw new Error("Lista de Consultas Medicas FALHOU!");
    }
  }

  async incluirConsultaMedicaEJS(consultaMedica) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("DataConsulta", sql.Date, consultaMedica.DataConsulta)
        .input("HoraConsulta", sql.VarChar, consultaMedica.HoraConsulta)
        .input("MedicoID", sql.Int, Number(consultaMedica.MedicoID))
        .input("PacienteID", sql.Int, Number(consultaMedica.PacienteID))
        .input("TipoConsultaID", sql.Int, Number(consultaMedica.TipoConsultaID))
        .input(
          "StatusConsultaID",
          sql.Int,
          Number(consultaMedica.StatusConsultaID)
        )
        .query(
          "INSERT INTO ConsultaMedica (DataConsulta, HoraConsulta, MedicoID, PacienteID, TipoConsultaID, StatusConsultaID) VALUES (@DataConsulta, @HoraConsulta, @MedicoID, @PacienteID, @TipoConsultaID, @StatusConsultaID)"
        );
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Incluir Consulta Medica FALHOU!");
    }
  }

  async excluirConsultaMedica(id) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("ID", sql.Int, Number(id))
        .query("DELETE FROM ConsultaMedica WHERE ID = @ID");
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Excluir Consulta Medica FALHOU!");
    }
  }

  async buscarConsultaMedicaPorID(id) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("ID", sql.Int, Number(id))
        .query(
          "SELECT ID, DataConsulta, HoraConsulta, MedicoID, PacienteID, TipoConsultaID, StatusConsultaID FROM ConsultaMedica WHERE ID = @ID"
        );
      return result.recordset[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async salvarConsultaMedicaEJS(consultaMedica) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("DataConsulta", sql.Date, consultaMedica.DataConsulta)
        .input("HoraConsulta", sql.VarChar, consultaMedica.HoraConsulta)
        .input("MedicoID", sql.Int, Number(consultaMedica.MedicoID))
        .input("PacienteID", sql.Int, Number(consultaMedica.PacienteID))
        .input("TipoConsultaID", sql.Int, Number(consultaMedica.TipoConsultaID))
        .input(
          "StatusConsultaID",
          sql.Int,
          Number(consultaMedica.StatusConsultaID)
        )
        .input("ID", sql.Int, Number(consultaMedica.id))
        .query(
          "UPDATE ConsultaMedica SET DataConsulta = @DataConsulta, HoraConsulta = @HoraConsulta, MedicoID = @MedicoID, PacienteID = @PacienteID, TipoConsultaID = @TipoConsultaID, StatusConsultaID = @StatusConsultaID WHERE ID = @ID"
        );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = DAO_consultaMedica;
