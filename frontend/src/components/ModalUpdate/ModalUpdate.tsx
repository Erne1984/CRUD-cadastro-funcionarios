import { useEffect, useRef, useState } from 'react';
import './ModalUpdate.css';
import Funcionario from '../../models/Funcionario';
import formatDate from '../../utils/formatDate';

interface ModalUpdateProps {
    funcionario: Funcionario | null,
    modalState: boolean,
    onCloseUpdate: () => void,
}

export default function ModalUpdate(props: ModalUpdateProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [formValues, setFormValues] = useState({
        nome: '',
        funcao: '',
        setor: '',
        dataAdmissao: '',
        salario: ''
    });

    useEffect(() => {
        const dialog = dialogRef.current;

        if (props.modalState) {
            dialog?.showModal();
        } else {
            dialog?.close();
        }

        const handleDialogClose = () => {
            props.onCloseUpdate();
        };

        dialog?.addEventListener("close", handleDialogClose);

        return () => {
            dialog?.removeEventListener("close", handleDialogClose);
        };
    }, [props.modalState, props.onCloseUpdate]);

    useEffect(() => {
        if (props.funcionario) {
            setFormValues({
                nome: props.funcionario.nome,
                funcao: props.funcionario.funcao,
                setor: props.funcionario.setor,
                dataAdmissao: formatDate(props.funcionario.dataAdmissao),
                salario: props.funcionario.salario.toString(),
            });
        }
    }, [props.funcionario]);

    async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const payload = {
            ...formValues,
            cpf: props.funcionario?.cpf,
        };

        try {
            const response = await fetch('https://crud-cadastro-funcionarios.onrender.com/updateFuncionario', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                props.onCloseUpdate();
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error('Erro:', errorData.message);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    }

    return (
        <dialog ref={dialogRef} className="modal-update">

            <h3>Editar Funcionário</h3>

            <form onSubmit={handleUpdate}>

                <div className="input-box">
                    <label>Nome</label>
                    <input
                        type="text"
                        name="nome"
                        value={formValues.nome}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="input-box">
                    <label>Função</label>
                    <input
                        type="text"
                        name="funcao"
                        value={formValues.funcao}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="input-box">
                    <label>Setor</label>
                    <input
                        type="text"
                        name="setor"
                        value={formValues.setor}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="input-box">
                    <label>Data de Admissão</label>
                    <input
                        className="date"
                        type="date"
                        name="dataAdmissao"
                        value={formValues.dataAdmissao}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="input-box">
                    <label>Salário</label>
                    <input
                        type="text"
                        name="salario"
                        value={formValues.salario}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="btns-modal">
                    <button type="submit" className="btn-confirm">Sim</button>
                    <button type='button' className='btn-delete' onClick={props.onCloseUpdate}>Cancelar</button>
                </div>

            </form>

        </dialog>
    );
}