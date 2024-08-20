import './TableFuncionarios.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Funcionario from '../../models/Funcionario';
import EmptyFuncionario from '../EmptyFuncionarios/EmptyFuncionarios';

interface TableFuncionariosInterface {
    funcionarios: Funcionario[],
    openDeleteModal: () => void,
    openUpdateModal: () => void,
    handleClickFuncionario: (funcionario: Funcionario) => void,
}

export default function TableFuncionarios(props: TableFuncionariosInterface) {

    if (props.funcionarios.length === 0) {
        return <EmptyFuncionario />
    }

    function formatCPF(cpf: string): string {
        const onlyNumbers = cpf.replace(/\D/g, '');
        return onlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Função</th>
                    <th>Setor</th>
                    <th>Salário</th>
                    <th>Data de Admissão</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {props.funcionarios.map((funcionario) => (
                    <tr key={funcionario.cpf}>
                        <td data-cell="Nome">{funcionario.nome}</td>
                        <td data-cell="CPF">{formatCPF(funcionario.cpf)}</td>
                        <td data-cell="Função">{funcionario.funcao}</td>
                        <td data-cell="Setor">{funcionario.setor}</td>
                        <td data-cell="Salário">R$ {funcionario.salario}</td>
                        <td data-cell="Data de Admissão">{new Date(funcionario.dataAdmissao).toLocaleDateString()}</td>
                        <td data-cell="Ações" className='icons'>
                            <FontAwesomeIcon className='edit-icon icon' icon={faPen}
                                onClick={() => { props.openUpdateModal(); props.handleClickFuncionario(funcionario); }}
                            />
                            <FontAwesomeIcon className='delete-icon icon' icon={faTrash}
                                onClick={() => { props.openDeleteModal(); props.handleClickFuncionario(funcionario); }}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
