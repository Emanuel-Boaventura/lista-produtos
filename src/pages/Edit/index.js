import { useState } from 'react';
import { ReactComponent as ArrowLeftIcon } from '../../assets/arrow-left-icon.svg';
import './index.css';

const Edit = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className='container-centralized'>
      <h2 className='header-title'>
        <ArrowLeftIcon className='arrow-left-icon' />
        Editar Produto
      </h2>
      <form onSubmit={handleSubmit}>
        <label className='label-name'>
          Nome
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Nome...'
          />
        </label>
        <label className='label-category'>
          Categoria
          <input
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder='Categoria...'
          />
        </label>
        <label className='label-price'>
          Preço
          <input
            type='text'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='9.99...'
          />
        </label>
        <button type='submit'>Salvar</button>
      </form>
    </div>
  );
};

export default Edit;
