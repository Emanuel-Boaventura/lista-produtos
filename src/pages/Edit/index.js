import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { ReactComponent as ArrowLeftIcon } from '../../assets/arrow-left-icon.svg';
import Loading from '../../components/Loading';
import api from '../../api';
import currencyMask from '../../utils/currencyMask';

const Edit = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();
  const history = useHistory();
  const [validateErrors, setValidateErrors] = useState({});

  useEffect(() => {
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

    getData();
  }, [productId]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      const numberOfErrors = validate();

      if (numberOfErrors > 0) return;

      await api.patch(`/products/${productId}`, {
        name,
        category,
        price,
      });

      history.push('/');
    } catch (error) {
      // COLOCAR UM DIALOG DE ERRO
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const validate = () => {
    const newValidateErrors = {};
    const parsedPrice = Number(price.replace(/[^\d,]/g, '').replace(',', '.'));

    if (name.trim().length < 3 || name.trim().length > 50) {
      newValidateErrors.name = 'Campo Nome deve ter entre 3 e 50 caracteres';
    }

    if (category.trim().length < 3 || category.trim().length > 250) {
      newValidateErrors.category =
        'Campo Categoria deve ter entre 3 e 50 caracteres';
    }

    if (parsedPrice <= 0) {
      newValidateErrors.price = 'Campo Preço deve ser um valor válido';
    }

    setValidateErrors(newValidateErrors);
    return Object.values(newValidateErrors).length;
  };

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
          <span className='error-span'>{validateErrors.name}</span>
        </label>
        <label className='label-category'>
          Categoria
          <input
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder='Categoria...'
          />
          <span className='error-span'>{validateErrors.category}</span>
        </label>
        <label className='label-price'>
          Preço
          <input
            type='text'
            value={price}
            onChange={(e) => setPrice(currencyMask(e.target.value))}
            placeholder='R$ 9,99...'
            maxLength={24}
          />
          <span className='error-span'>{validateErrors.price}</span>
        </label>
        <button type='submit' className='btn'>
          Salvar
        </button>
      </form>
    </div>
  );
};

export default Edit;
