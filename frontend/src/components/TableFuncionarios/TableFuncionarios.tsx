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
                        <td>{funcionario.nome}</td>
                        <td>{funcionario.cpf}</td>
                        <td>{funcionario.funcao}</td>
                        <td>{funcionario.setor}</td>
                        <td>R$ {funcionario.salario}</td>
                        <td>{new Date(funcionario.dataAdmissao).toLocaleDateString()}</td>
                        <td className='icons'>
                            <FontAwesomeIcon className='edit-icon' icon={faPen}
                                onClick={() => { props.openUpdateModal(); props.handleClickFuncionario(funcionario); }}
                            />
                            <FontAwesomeIcon className='delete-icon' icon={faTrash}
                                onClick={() => { props.openDeleteModal(); props.handleClickFuncionario(funcionario); }}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}