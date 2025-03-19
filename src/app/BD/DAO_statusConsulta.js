const sql = require("mssql");
const conectarAoSql = require("../../config/database");

class DAO_statusConsulta {
  async dadosDosStatusConsultaEJS() {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .query(
          "SELECT ID, NomeStatusConsulta FROM StatusConsulta ORDER BY ID"
        );
      return result.recordset;
    } catch (error) {
      console.error(error);
      throw new Error("Lista de Status de Consulta FALHOU!");
    }
  }

  async incluirStatusConsultaEJS(statusConsulta) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("NomeStatusConsulta", sql.NVarChar, statusConsulta)
        .query(
          "INSERT INTO StatusConsulta (NomeStatusConsulta) VALUES (@NomeStatusConsulta)"
        );
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Incluir Status de Consulta FALHOU!");
    }
  }

  async excluirStatusConsulta(id) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("ID", sql.Int, id)
        .query("DELETE FROM StatusConsulta WHERE ID = @ID");
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Excluir Status de Consulta FALHOU!");
    }
  }

  async buscarStatusConsultaPorID(id) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("ID", sql.Int, id)
        .query("SELECT ID, NomeStatusConsulta FROM StatusConsulta WHERE ID = @ID");
      return result.recordset[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async salvarStatusConsultaEJS(statusConsulta) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("NomeStatusConsulta", sql.NVarChar, statusConsulta.NomeStatusConsulta)
        .input("ID", sql.Int, statusConsulta.ID)
        .query(
          "UPDATE StatusConsulta SET NomeStatusConsulta = @NomeStatusConsulta WHERE ID = @ID"
        );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = DAO_statusConsulta;
