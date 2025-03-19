const app = require("./src/config/express");
app.set('view engine', 'ejs');

// inicialização do servidor
app.listen(3000, function () {
  console.log("Servidor NODEJS rodando na porta 3000");
});
