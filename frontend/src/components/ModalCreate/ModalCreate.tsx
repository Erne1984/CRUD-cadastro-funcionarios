import { useEffect, useRef } from "react";

import './ModalCreate.css';

interface ModalCreateProps {
    modalShow: boolean;
    onClose: () => void;
}

export default function ModalCreate({ modalShow, onClose }: ModalCreateProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (modalShow) {
            dialog?.showModal();
        } else {
            dialog?.close();
        }

        const handleDialogClose = () => {
            onClose();
        };

        dialog?.addEventListener("close", handleDialogClose);

        return () => {
            dialog?.removeEventListener("close", handleDialogClose);
        };
    }, [modalShow, onClose]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:8080/createFuncionario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                onClose();
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error('Erro:', errorData.message);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    return (
        <dialog className="modal-create" ref={dialogRef}>
            <h3>Cadastrar Funcionário</h3>

            <form onSubmit={handleSubmit}>

                <div className="input-box">
                    <label>Nome</label>
                    <input type="text" name="nome" required />
                </div>

                <div className="input-box">
                    <label>CPF</label>
                    <input type="text" name="cpf" required />
                </div>

                <div className="input-box">
                    <label>Função</label>
                    <input type="text" name="funcao" required />
                </div>

                <div className="input-box">
                    <label>Setor</label>
                    <input type="text" name="setor" required />
                </div>

                <div className="input-box">
                    <label>Data de Admissão</label>
                    <input className="date" type="date" name="dataAdmissao" required />
                </div>

                <div className="input-box">
                    <label>Salário</label>
                    <input type="text" name="salario" required />
                </div>

                <div className="btns-modal">
                    <button type="submit" className="btn-confirm">Criar</button>
                    <button type="button" className="btn-delete" onClick={onClose}>Fechar</button>
                </div>

            </form>
        </dialog>
    );
}