import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../api';
import { ReactComponent as ArrowLeftIcon } from '../../assets/arrow-left-icon.svg';
import Loading from '../../components/Loading';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const data = '19/19/2019';

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      await api.post(`/products`, {
        name,
        category,
        price,
        date: new Date().toISOString(),
      });

      history.push('/');

      console.log('atualizou');
    } catch (error) {
      // COLOCAR UM DIALOG DE ERRO
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <div className='container-centralized'>
      <Link to='/' className='form-title link'>
        <ArrowLeftIcon className='arrow-left-icon' />
        <h2>Adicionar Produto</h2>
      </Link>
      <form onSubmit={handleSubmit}>
        <label className='label-name'>
          Nome
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Nome...'
            required
          />
        </label>
        <label className='label-category'>
          Categoria
          <input
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder='Categoria...'
            required
          />
        </label>
        <label className='label-price'>
          Preço
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='9.99...'
            required
          />
        </label>
        <button type='submit' className='btn'>
          Salvar
        </button>
      </form>
    </div>
  );
};

export default Create;
