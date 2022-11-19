import './index.css';

const Loading = (isLoading) => {
  if (!isLoading) return <></>;

  return (
    <div className='loading'>
      <h1>Carregando...</h1>
      <p>Aguarde um momento.</p>
    </div>
  );
};

export default Loading;
