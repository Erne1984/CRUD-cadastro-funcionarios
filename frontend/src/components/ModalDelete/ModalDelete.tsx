import { useEffect, useRef } from 'react';
import './ModalDelete.css';
import Funcionario from '../../models/Funcionario';


interface ModalDelete {
 
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

    function handleDelete(){

    }

    return (
        <dialog ref={dialogRef} className="modal-delete">

            <h3>Tem certeza que deseja remover o funcionário  ?</h3>

            <div className="btns-modal">
                <button type="submit" className="btn-confirm">Sim</button>
                <button className='btn-delete' onClick={props.onCloseDelete}>Cancelar</button>
            </div>

        </dialog>
    )
}