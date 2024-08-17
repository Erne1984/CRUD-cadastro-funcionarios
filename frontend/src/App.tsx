import './App.css';
import TableFuncionarios from './components/TableFuncionarios/TableFuncionarios';
import Header from './components/Header/Header';
import ModalCreate from './components/ModalCreate/ModalCreate';

import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);


  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>

      <main>

        <Header openModal={onOpenModal} />
        <TableFuncionarios />

      </main>

      <ModalCreate modalShow={open} onClose={onCloseModal} />

    </>
  )
}

export default App
