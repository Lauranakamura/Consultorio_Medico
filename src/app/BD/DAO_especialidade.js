const sql = require("mssql");
const conectarAoSql = require("../../config/database");

class DAO_especialidade {
  async dadosDasEspecialidadesEJS() {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .query(
          "SELECT ID, NomeEspecialidade FROM Especialidade ORDER BY ID"
        );
      return result.recordset;
    } catch (error) {
      console.error(error);
      throw new Error("Lista de Especialidades FALHOU!");
    }
  }

  async incluirEspecialidadeEJS(especialidade) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("NomeEspecialidade", sql.NVarChar, especialidade)
        .query(
          "INSERT INTO Especialidade (NomeEspecialidade) VALUES (@NomeEspecialidade)"
        );
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Incluir Especialidade FALHOU!");
    }
  }

  async excluirEspecialidade(id) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("ID", sql.Int, id)
        .query("DELETE FROM Especialidade WHERE ID = @ID");
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Excluir Especialidade FALHOU!");
    }
  }

  async buscarEspecialidadePorID(id) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("ID", sql.Int, id)
        .query("SELECT ID, NomeEspecialidade FROM Especialidade WHERE ID = @ID");
      return result.recordset[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async salvarEspecialidadeEJS(especialidade) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("NomeEspecialidade", sql.NVarChar, especialidade.NomeEspecialidade)
        .input("ID", sql.Int, especialidade.ID)
        .query(
          "UPDATE Especialidade SET NomeEspecialidade = @NomeEspecialidade WHERE ID = @ID"
        );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = DAO_especialidade;
