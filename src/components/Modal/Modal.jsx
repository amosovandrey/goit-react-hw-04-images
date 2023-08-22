import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Overlay, ModalEl } from './Modal.styled';

export const Modal = ({ image, onClick }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClick]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClick();
    }
  };

  const imageUrl = image ? image.largeImageURL : null;
  const alt = image ? image.tags : '';

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalEl className="modal">
        {imageUrl && <img src={imageUrl} alt={alt} />}
      </ModalEl>
    </Overlay>
  );
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
