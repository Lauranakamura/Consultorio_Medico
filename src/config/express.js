const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
const expressLayout = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.use(expressLayout);

// habilitar o body-Parser a receber os dados em JSON
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const rotas = require("../app/ROTAS/rotas");
rotas(app);





module.exports = app;