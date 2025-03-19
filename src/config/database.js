const sql = require("mssql");

const config = {
  user: "BD22140",
  password: "Laura170301",
  server: "regulus.cotuca.unicamp.br",
  database: "BD22140",
  options: {
    trustedConnection: true,
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function conectarAoSql() {
  try {
    const pool = await sql.connect(config);
    console.log("CONEXÃO com o BD MSSQL realizada com SUCESSO!");

    return pool;
  } catch (error) {
    console.error(error);

    return null;
  }
}

module.exports = conectarAoSql;
