const sql = require("mssql");
const conectarAoSql = require("../../config/database");

class DAO_paciente {
  // Renomeado para DAO_paciente
  async dadosDosPacienteEJS() {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .query(
          "SELECT ID, CPF, NomePaciente, DataNascimento, email FROM Paciente ORDER BY ID"
        );
      return result.recordset;
    } catch (error) {
      console.error(error);
      throw new Error("Lista de Pacientes FALHOU!");
    }
  }

  async incluirPacienteEJS(paciente) {
    // Corrigido o nome do parâmetro
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("CPF", sql.NVarChar, paciente.cpf) // Usando parâmetros
        .input("NomePaciente", sql.NVarChar, paciente.NomePaciente) // Usando parâmetros
        .input("DataNascimento", sql.NVarChar, paciente.DataNascimento) // Usando parâmetros
        .input("email", sql.NVarChar, paciente.email) // Usando parâmetros
        .query(
          "INSERT INTO Paciente (CPF, NomePaciente, DataNascimento, email) VALUES (@CPF, @NomePaciente, @DataNascimento, @email)"
        );
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Incluir Paciente FALHOU!");
    }
  }

  async excluirPaciente(email) {
    // Renomeado para excluirPaciente
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("email", sql.NVarChar, email) // Usando parâmetros
        .query("DELETE FROM Paciente WHERE email = @email");
      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Excluir Paciente FALHOU!");
    }
  }

  async buscarPacientePorID(id) {
    // Renomeado para buscarPacientePorID
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("ID", sql.Int, id) // Usando parâmetros
        .query(
          "SELECT ID, CPF, NomePaciente, FORMAT(DataNascimento, 'dd/MM/yyyy') as DataNiverPaciente FROM Paciente WHERE ID = @ID"
        );
      return result.recordset[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async salvarPacienteEJS(paciente) {
    try {
      const pool = await conectarAoSql();
      const result = await pool
        .request()
        .input("CPF", sql.NVarChar, paciente.cpf) // Usando parâmetros
        .input("NomePaciente", sql.NVarChar, paciente.NomePaciente) // Usando parâmetros
        .input("DataNascimento", sql.NVarChar, paciente.DataNascimento) // Usando parâmetros
        .input("email", sql.NVarChar, paciente.email) // Usando parâmetros
        .input("ID", sql.Int, paciente.id) // Usando parâmetros
        .query(
          "UPDATE Paciente SET CPF = @CPF, NomePaciente = @NomePaciente, email = @email, DataNascimento = @DataNascimento WHERE ID = @ID"
        );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = DAO_paciente;
