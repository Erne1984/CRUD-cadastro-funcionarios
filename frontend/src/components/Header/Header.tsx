 
import './Header.css';
 
interface HeaderInterface{
    openModal: () => void
}

export default function Header(props: HeaderInterface) {


    return (
        <header>

            <h1>Funcionários</h1>

            <button type="button" onClick={props.openModal}>Cadastrar Funcionário</button>



        </header>
    )
}