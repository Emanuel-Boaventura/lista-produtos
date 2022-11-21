import { ReactComponent as TrashIcon } from '../../assets/trash-icon.svg';
import { ReactComponent as PencilIcon } from '../../assets/pencil-icon.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Pagination from '../../components/Pagination';
import './index.css';
import Dialog from '../../components/Dialog';
import api from '../../api';
import Loading from '../../components/Loading';

const Home = () => {
  const [dialog, setDialog] = useState(false);
  const [index, setIndex] = useState();
  const [error, setError] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(16);

  async function getData() {
    try {
      setLoading(true);

      const { data } = await api.get('/products');
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // Get current data
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Loading />;

  const handleDelete = async () => {
    try {
      setError(false);
      setLoadingDelete(true);
      await api.delete(`/products/${index}`);

      setDialog(false);
      getData();
      toast.success('Produto excluido.');
    } catch (e) {
      setError(true);
      setLoadingDelete(false);
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
            {currentData.map((itens) => (
              <tr key={itens._id}>
                <td className='align-left'>{itens.name}</td>
                <td className='align-left'>{itens.category}</td>
                <td className='align-right'>{itens.price}</td>
                <td className='align-right'>
                  {Intl.DateTimeFormat('pt-BR').format(
                    new Date(itens.createdAt)
                  )}
                </td>
                <td className='actions'>
                  <button
                    className='btn-del'
                    onClick={() => {
                      setDialog(true);
                      setIndex(itens._id);
                    }}
                  >
                    <TrashIcon className='delete-icon' />
                  </button>
                  <Link to={`/edit/${itens._id}`}>
                    <PencilIcon className='edit-icon link' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalPages={Math.ceil(data.length / dataPerPage)}
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
