const Funcionario = require("../models/Funcionario");
const mongoose = require("mongoose")


const createFuncionario = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const { nome, funcao, dataNascimento, email, salario } = req.body;

        const existingEmploying = await Funcionario.findOne({ email }).session(session);
        if (existingEmploying) {
            await session.abortTransaction();
            session.endSession();
            return res.status(409).send("Email já está em uso.");
        }

        const newFuncionario = new Funcionario({
            nome,
            funcao,
            dataNascimento: new Date(dataNascimento),
            email,
            salario
        })

        await newFuncionario.save();

        await session.commitTransaction();
        session.endSession();

        res.status(201).send(newFuncionario);

    } catch (err) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        session.endSession();

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

const updateFuncionario = async (req, res) => {
    try {
        const updates = req.body;

        const email = req.body.email;

        const result = await Funcionario.updateOne({ email },
            {
                $set: updates
            }
        );

        if (result.modifiedCount === 0) {
            res.status(404).json({ message: "Funcionário não encontrado ou dados já estão atualizados" });
        } else {
            res.status(200).json({ message: "Dados do funcionário atualizados com sucesso!" });
        }
    } catch (err) {
        res.status(404).json({ message: `Erro ao atualizar funcionário: ${err}` });
    }
}

const deleteFuncionario = async (req, res) => {
    try {
        const email = req.body.email;

        const result = await Funcionario.deleteOne({ email });

        if (result.deletedCount === 1) {
            res.send(204).json({ message: "Funcionário deletado com sucesso" });
        } else {
            res.status(404).json({ message: "Funcionário não encontrado" });
        }
    } catch (err) {
        res.status(404).json({ message: `Erro ao deletar o funcionário: ${err}` });
    }
}

module.exports = { createFuncionario, getFuncionarios, updateFuncionario, deleteFuncionario };