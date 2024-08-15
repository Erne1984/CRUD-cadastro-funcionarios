const Funcionario = require("../models/Funcionario");


const createFuncionario = async (req, res) => {
    try {

        const { nome, funcao, dataNascimento, email, salario } = req.body;

        const newFuncionario = new Funcionario({
            nome,
            funcao,
            dataNascimento: new Date(dataNascimento), 
            email,
            salario
        })

        await newFuncionario.save();

        res.status(201).send(newFuncionario);

    } catch (err) {
        console.log(`Erro ao criar funcionário ${err}`);
    }
}

module.exports = { createFuncionario }