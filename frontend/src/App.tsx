import './App.css';
import TableFuncionarios from './components/TableFuncionarios/TableFuncionarios';
import Header from './components/Header/Header';
import ModalCreate from './components/ModalCreate/ModalCreate';
import ModalDelete from './components/ModalDelete/ModalDelete';
import Funcionario from './models/Funcionario';

import { useEffect, useState } from 'react';
import ModalUpdate from './components/ModalUpdate/ModalUpdate';

function App() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<Funcionario | null>(null);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalUpdate] = useState(false);


  const handleClickFuncionario = (funcionario: Funcionario) => {
    setFuncionarioSelecionado(funcionario)
  }

  const onOpenModalCreate = () => setOpenModalCreate(true);
  const onCloseModalCreate = () => setOpenModalCreate(false);

  const onOpenModalDelete = () => setOpenModalDelete(true);
  const onCloseModalDelete = () => setOpenModalDelete(false);

  const onOpenModalUpdate = () => setOpenModalUpdate(true);
  const onCloseModalUpdate = () => setOpenModalUpdate(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://crud-cadastro-funcionarios.onrender.com/getFuncionarios");
        const funcionarioList = await res.json();
        setFuncionarios(funcionarioList);
      } catch (err) {
        console.log(`Erro ao buscar funcionários: ${err}`);
      }
    };

    fetchData();
  }, []);

  return (
    <>

      <main>

        <Header openModal={onOpenModalCreate} />
        <TableFuncionarios funcionarios={funcionarios} openUpdateModal={onOpenModalUpdate} openDeleteModal={onOpenModalDelete} handleClickFuncionario={handleClickFuncionario} />

      </main>

      <ModalCreate modalShow={openModalCreate} onClose={onCloseModalCreate} />

      <ModalDelete modalShow={openModalDelete} onCloseDelete={onCloseModalDelete} funcionario={funcionarioSelecionado} />

      <ModalUpdate modalState={openModalEdit}  onCloseUpdate={onCloseModalUpdate} funcionario={funcionarioSelecionado}/>

    </>
  )
}

export default App