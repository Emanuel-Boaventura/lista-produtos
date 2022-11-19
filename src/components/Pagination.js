import './Pagination.css';

const Pagination = ({ dataPerPage, totalData, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination'>
      {pageNumbers.map((number) => (
        <span
          key={number}
          onClick={() => paginate(number)}
          className='page-index'
        >
          {number}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
