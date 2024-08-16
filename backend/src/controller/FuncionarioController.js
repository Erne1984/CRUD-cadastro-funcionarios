const Funcionario = require("../models/Funcionario");
const mongoose = require("mongoose")


const createFuncionario = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const { nome, cpf, funcao, dataAdmissao, setor, salario } = req.body;

        const existingEmploying = await Funcionario.findOne({ cpf }).session(session);
        if (existingEmploying) {
            await session.abortTransaction();
            session.endSession();
            return res.status(409).send("CPF já está em uso.");
        }

        const newFuncionario = new Funcionario({
            nome,
            cpf,
            funcao,
            dataAdmissao: new Date(dataAdmissao),
            setor,
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

        const cpf = req.body.cpf;

        const result = await Funcionario.updateOne({ cpf },
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
        const cpf = req.body.cpf;

        const result = await Funcionario.deleteOne({ cpf });

        if (result.deletedCount === 1) {
            res.sendStatus(204); 
        } else {
            res.status(404).json({ message: "Funcionário não encontrado" });
        }
    } catch (err) {
        res.status(404).json({ message: `Erro ao deletar o funcionário: ${err}` });
    }
}

module.exports = { createFuncionario, getFuncionarios, updateFuncionario, deleteFuncionario };