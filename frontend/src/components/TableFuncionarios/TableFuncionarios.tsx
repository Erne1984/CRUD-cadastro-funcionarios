import { useEffect, useState } from 'react';
import './TableFuncionarios.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Funcionario {
    nome: string;
    cpf: string;
    funcao: string;
    dataAdmissao: string;
    setor: string;
    salario: number;
}

export default function TableFuncionarios() {
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:8080/getFuncionarios");
                const funcionarioList = await res.json();
                setFuncionarios(funcionarioList);
            } catch (err) {
                console.log(`Erro ao buscar funcionários: ${err}`);
            }
        };

        fetchData();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Função</th>
                    <th>Setor</th>
                    <th>Data de Admissão</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {funcionarios.map((funcionario) => (
                    <tr key={funcionario.cpf}>
                        <td>{funcionario.nome}</td>
                        <td>{funcionario.cpf}</td>
                        <td>{funcionario.funcao}</td>
                        <td>{funcionario.setor}</td>
                        <td>{new Date(funcionario.dataAdmissao).toLocaleDateString()}</td>
                        <td className='icons'>
                            <FontAwesomeIcon className='edit-icon' icon={faPen} />
                            <FontAwesomeIcon className='delete-icon' icon={faTrash} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
