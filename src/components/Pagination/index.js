import css from './index.module.css';

const Pagination = ({ totalPages, paginate, currentPage }) => {
  const pageNumbers = Array.from({ length: totalPages });

  return (
    <div className={css.pagination}>
      {pageNumbers.map((_, index) => (
        <button
          key={index + 1}
          onClick={() => paginate(index + 1)}
          className={
            currentPage === index + 1
              ? `${css.pageIndex} ${css.selected}`
              : `${css.pageIndex}`
          }
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
