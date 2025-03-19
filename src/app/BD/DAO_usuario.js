const sql = require("mssql");
const conectarAoSql = require("../../config/database");

class DAO_usuario {
  async cadastrarUsuario(NomeUsuario, email, senha) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("NomeUsuario", sql.NVarChar, NomeUsuario)
        .input("email", sql.NVarChar, email)
        .input("senha", sql.NVarChar, senha)
        .query(
          "INSERT INTO Usuario (NomeUsuario, email, senha) OUTPUT INSERTED.* VALUES (@NomeUsuario, @email, @senha)"
        );
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Incluir Usuario FALHOU!");
    }
  }

  async loginUsuario(email, senha) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("email", sql.NVarChar, email)
        .input("senha", sql.NVarChar, senha)
        .query("SELECT * FROM Usuario WHERE email = @email AND senha = @senha");
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Login Usuario FALHOU!");
    }
  }
}

module.exports = DAO_usuario;
