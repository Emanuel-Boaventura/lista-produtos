import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeftIcon } from '../../assets/arrow-left-icon.svg';

const Edit = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className='container-centralized'>
      <Link to='/' className='form-title link'>
        <ArrowLeftIcon className='arrow-left-icon' />
        <h2>Editar Produto</h2>
      </Link>
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
        <button type='submit' className='btn'>
          Salvar
        </button>
      </form>
    </div>
  );
};

export default Edit;
