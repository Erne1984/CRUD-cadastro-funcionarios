import { useEffect, useRef } from 'react';
import './ModalDelete.css';
import Funcionario from '../../models/Funcionario';


interface ModalDelete {
    funcionario: Funcionario | null,
    modalShow: boolean,
    onCloseDelete: () => void;
}



export default function ModalDelete(props: ModalDelete) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (props.modalShow) {
            dialog?.showModal();
        } else {
            dialog?.close();
        }

        const handleDialogClose = () => {
            props.onCloseDelete();
        };

        dialog?.addEventListener("close", handleDialogClose);

        return () => {
            dialog?.removeEventListener("close", handleDialogClose);
        };
    }, [props.modalShow, props.onCloseDelete]);


    if (!props.funcionario) {
        return null;
    }

    async function handleDelete() {
        const data = { cpf: props.funcionario!.cpf };
    
        try {
            const response = await fetch('https://crud-cadastro-funcionarios.onrender.com/deleteFuncionario', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                props.onCloseDelete();
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error('Erro:', errorData.message);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }


    return (
        <dialog ref={dialogRef} className="modal-delete">

            <h3>Tem certeza que deseja remover o funcionário {props.funcionario.nome} ?</h3>

            <div className="btns-modal">
                <button type="submit" className="btn-confirm" onClick={handleDelete}>Sim</button>
                <button className='btn-delete' onClick={props.onCloseDelete}>Cancelar</button>
            </div>

        </dialog>
    )
}