const express = require("express");
const routes = express.Router();

const FuncionarioController = require("../controller/FuncionarioController");

routes.get("/", (req, res) => {
    res.send("Olá Mundo");
});
 
routes.get("/getFuncionarios", FuncionarioController.getFuncionarios);
routes.post("/createFuncionario", FuncionarioController.createFuncionario);
routes.put("/updateFuncionario", FuncionarioController.updateFuncionario);
routes.delete("/deleteFuncionario", FuncionarioController.deleteFuncionario);

module.exports = routes; 