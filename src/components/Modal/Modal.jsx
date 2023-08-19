import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Overlay, ModalEl } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClick();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClick();
    }
  };

  render() {
    const { image } = this.props;
    const imageUrl = image ? image.largeImageURL : null;
    const alt = image ? image.tags : '';

    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalEl className="modal">
          {imageUrl && <img src={imageUrl} alt={alt} />}
        </ModalEl>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
