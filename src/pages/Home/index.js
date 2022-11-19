import { ReactComponent as TrashIcon } from '../../assets/trash-icon.svg';
import { ReactComponent as PencilIcon } from '../../assets/pencil-icon.svg';

import Pagination from '../../components/Pagination';
import './index.css';

const Home = ({ data, dataPerPage, totalData, paginate, currentPage }) => {
  return (
    <div className='App'>
      <header className='header'>
        <h1>Produtos</h1>

        <button>Adicionar Produto</button>
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
                <TrashIcon className='delete-icon' />
                <PencilIcon className='edit-icon' />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <Pagination
            dataPerPage={dataPerPage}
            totalData={totalData}
            paginate={paginate}
            currentPage={currentPage}
          />
        </tfoot>
      </table>
    </div>
  );
};

export default Home;
