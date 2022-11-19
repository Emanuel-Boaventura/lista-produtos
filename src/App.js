import './App.css';
import api from './api';
import { useState, useEffect } from 'react';
import Loading from './pages/Loading';

function App() {
  const [data, setData] = useState('');

  async function getData() {
    try {
      const { data } = await api.get('/produtos');
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (!data) return <Loading />;

  return (
    <div className='App'>
      <header>
        <h1>Produtos</h1>

        <button>Adicionar Produto</button>
      </header>

      <div className='list'>
        <div className='head-list container'>
          <span className='name'>Nome</span>
          <span className='category'>Categorias</span>
          <span className='price'>Preço</span>
          <span className='date'>Data de Criação</span>
          <span className='actions'>Ações</span>
        </div>

        {data.map((itens) => (
          <div className='products container' key={itens.id}>
            <span className='name'>{itens.name}</span>
            <span className='category'>{itens.category}</span>
            <span className='price'>{itens.price}</span>
            <span className='date'>{itens.date}</span>
            <span className='actions'>Editar / Deletar</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
