const mongoose = require('mongoose');

const funcionarioSchema = new mongoose.Schema({
    nome: String, 
    funcao: String,
    dataNascimento: Date, 
    email: String, 
    salario: Number
})

const Funcionario = new mongoose.model('Funcionario', funcionarioSchema);

module.exports = Funcionario;