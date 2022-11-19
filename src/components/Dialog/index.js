import './index.css';

const Dialog = ({ isOpen, onClickOutside, children }) => {
  if (!isOpen) return null;

  return (
    <div className='container-dialog' onClick={onClickOutside}>
      <div className='dialog' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
