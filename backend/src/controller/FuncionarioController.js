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
        res.status(404)
        console.log(`Erro ao criar funcionário ${err}`);
    }
}

const getFuncionarios = async (req, res) => {
    try {

        const functionarioList = await Funcionario.find();

        res.status(200).json(functionarioList);
    } catch (err) {
        res.status(404).json({ message: `Erro ao buscar funcionários: ${err}` });
        console.log(`Erro ao buscar funcionários: ${err}`);
    }
}


module.exports = { createFuncionario, getFuncionarios }