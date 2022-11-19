import './index.css';
import { useState } from 'react';

const Edit = () => {
  const [name, setName] = useState('');
  // const [category, setCategory] = useState('');
  // const [price, setPrice] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className='App'>
      <h2>Eitar Produto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Nome...'
          />
        </label>
      </form>
    </div>
  );
};

export default Edit;
