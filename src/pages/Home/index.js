import { ReactComponent as TrashIcon } from '../../assets/trash-icon.svg';
import { ReactComponent as PencilIcon } from '../../assets/pencil-icon.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import Pagination from '../../components/Pagination';
import './index.css';
import Dialog from '../../components/Dialog';
import api from '../../api';

const Home = ({
  data,
  dataPerPage,
  totalData,
  paginate,
  currentPage,
  reload,
}) => {
  const [dialog, setDialog] = useState(false);
  const [index, setIndex] = useState();
  const [error, setError] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async () => {
    try {
      setError(false);
      setLoadingDelete(true);
      await api.delete(`/products/${index}`);

      setDialog(false);
      reload();
    } catch (e) {
      setError(true);
      setLoadingDelete(false);
      console.log(e);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <div className='App'>
        <header className='header'>
          <h1>Produtos</h1>

          <Link to='/create'>
            <button className='btn'>Adicionar Produto</button>
          </Link>
        </header>

        <table>
          <thead>
            <tr>
              <th className='align-left'>Nome</th>
              <th className='category-item align-left'>Categoria</th>
              <th>Preço</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((itens) => (
              <tr key={itens.id}>
                <td className='align-left'>{itens.name}</td>
                <td className='align-left'>{itens.category}</td>
                <td className='align-right'>R${itens.price}</td>
                <td className='align-right'>{itens.date}</td>
                <td className='actions'>
                  <button
                    className='btn-del'
                    onClick={() => {
                      setDialog(true);
                      setIndex(itens.id);
                    }}
                  >
                    <TrashIcon className='delete-icon' />
                  </button>
                  <Link to='/edit'>
                    <PencilIcon className='edit-icon link' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalPages={Math.ceil(totalData / dataPerPage)}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <Dialog
        isOpen={dialog}
        onClickOutside={() => {
          setDialog(false);
          setError(false);
        }}
      >
        <h2 className='delete-title'>Excluir produto</h2>
        <p>Tem certeza que deseja excluir este produto?</p>
        {error && <span className='error-msg'>Erro ao deletar</span>}
        <div className='div-btn'>
          <button
            onClick={() => {
              setDialog(false);
              setError(false);
            }}
            className='btn cancel'
          >
            Cacelar
          </button>
          <button
            disabled={loadingDelete}
            onClick={() => handleDelete()}
            className='btn'
          >
            Excluir
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default Home;
