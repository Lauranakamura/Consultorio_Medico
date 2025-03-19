const sql = require("mssql");
const conectarAoSql = require("../../config/database");

class DAO_tipoConsulta {
  async dadosDosTiposConsultaEJS() {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .query(
          "SELECT ID, NomeTipoConsulta FROM TipoConsulta ORDER BY ID"
        );
      return result.recordset;
    } catch (error) {
      console.error(error);
      throw new Error("Lista de Tipos de Consulta FALHOU!");
    }
  }

  async incluirTipoConsultaEJS(tipoConsulta) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("NomeTipoConsulta", sql.NVarChar, tipoConsulta)
        .query(
          "INSERT INTO TipoConsulta (NomeTipoConsulta) VALUES (@NomeTipoConsulta)"
        );
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Incluir Tipo de Consulta FALHOU!");
    }
  }

  async excluirTipoConsulta(id) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("ID", sql.Int, id)
        .query("DELETE FROM TipoConsulta WHERE ID = @ID");
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Excluir Tipo de Consulta FALHOU!");
    }
  }

  async buscarTipoConsultaPorID(id) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("ID", sql.Int, id)
        .query("SELECT ID, NomeTipoConsulta FROM TipoConsulta WHERE ID = @ID");
      return result.recordset[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async salvarTipoConsultaEJS(tipoConsulta) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("NomeTipoConsulta", sql.NVarChar, tipoConsulta.NomeTipoConsulta)
        .input("ID", sql.Int, tipoConsulta.ID)
        .query(
          "UPDATE TipoConsulta SET NomeTipoConsulta = @NomeTipoConsulta WHERE ID = @ID"
        );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = DAO_tipoConsulta;
