import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeftIcon } from '../../assets/arrow-left-icon.svg';
import Loading from '../../components/Loading';
import api from '../../api';

const Edit = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();

  async function getData() {
    try {
      setLoading(true);
      const {
        data: { name, category, price },
      } = await api.get(`/products/${productId}`);

      setName(name);
      setCategory(category);
      setPrice(price);
    } catch (error) {
      // COLOCAR UM DIALOG DE ERRO
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
  }

  if (loading) return <Loading />;

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
