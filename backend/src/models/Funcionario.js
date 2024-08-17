const mongoose = require('mongoose');

const funcionarioSchema = new mongoose.Schema({
    nome: String, 
    cpf: String,
    funcao: String,
    dataAdmissao: { type: Date, required: true },
    setor: String,
    salario: Number
})

const Funcionario = new mongoose.model('Funcionario', funcionarioSchema);

module.exports = Funcionario;