import './TableFuncionarios.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Funcionario from '../../models/Funcionario';

interface TableFuncionariosInterface {
    funcionarios: Funcionario[],
    openDeleteModal: () => void,
    handleClickFuncionario: (funcionario: Funcionario) => void,
}

export default function TableFuncionarios(props: TableFuncionariosInterface) {


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
                {props.funcionarios.map((funcionario) => (
                    <tr key={funcionario.cpf}>
                        <td>{funcionario.nome}</td>
                        <td>{funcionario.cpf}</td>
                        <td>{funcionario.funcao}</td>
                        <td>{funcionario.setor}</td>
                        <td>{new Date(funcionario.dataAdmissao).toLocaleDateString()}</td>
                        <td className='icons'>
                            <FontAwesomeIcon className='edit-icon' icon={faPen} />
                            <FontAwesomeIcon className='delete-icon' icon={faTrash}
                                onClick={() => { props.openDeleteModal(); props.handleClickFuncionario(funcionario); }} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
