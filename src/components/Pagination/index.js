import './index.css';

const Pagination = ({ dataPerPage, totalData, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return pageNumbers.map((number) => (
    <span
      key={number}
      onClick={() => paginate(number)}
      className={currentPage === number ? 'page-index selected' : 'page-index'}
    >
      {number}
    </span>
  ));
};

export default Pagination;
