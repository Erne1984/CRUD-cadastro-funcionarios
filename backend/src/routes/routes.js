const express = require("express");
const routes = express.Router();

const FuncionarioController = require("../controller/FuncionarioController");

routes.get("/", (req, res) => {
    res.send("Olá Mundo");
});
 
routes.post("/createFuncionario", FuncionarioController.createFuncionario);

module.exports = routes; 