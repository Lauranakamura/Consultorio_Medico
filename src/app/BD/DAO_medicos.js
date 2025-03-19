const sql = require("mssql");
const conectarAoSql = require("../../config/database");

class DAO_medico {
  async dadosDosMedicosEJS() {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .query(
          "SELECT ID, NomeMedico, EspecialidadeID FROM Medico ORDER BY ID"
        );
      return result.recordset;
    } catch (error) {
      console.error(error);
      throw new Error("Lista de Médicos FALHOU!");
    }
  }

  async incluirMedicoEJS(medico, id) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("NomeMedico", sql.NVarChar, medico)
        .input("EspecialidadeID", sql.Int, id)
        .query(
          "INSERT INTO Medico (NomeMedico, EspecialidadeID) VALUES (@NomeMedico, @EspecialidadeID)"
        );
      return result;
    } catch (error) {
      console.log(medico);
      console.error(error);
      throw new Error("Incluir Médico FALHOU!");
    }
  }

  async excluirMedico(NomeMedico) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("NomeMedico", sql.NVarChar, NomeMedico)
        .query("DELETE FROM Medico WHERE NomeMedico = @NomeMedico");
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Excluir Médico FALHOU!");
    }
  }

  async buscarMedicoPorID(id) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("ID", sql.Int, id)
        .query(
          "SELECT ID, NomeMedico, EspecialidadeID FROM Medico WHERE ID = @ID"
        );
      return result.recordset[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async salvarMedicoEJS(idMedico, NomeMedico, EspecialidadeID) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("ID", sql.Int, idMedico)
        .input("NomeMedico", sql.NVarChar, NomeMedico)
        .input("EspecialidadeID", sql.Int, EspecialidadeID)
        .query(
          "UPDATE Medico SET NomeMedico = @NomeMedico, EspecialidadeID = @EspecialidadeID WHERE ID = @ID"
        );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = DAO_medico;
