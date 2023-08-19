import React from 'react';
import PropTypes from 'prop-types';

import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, tags },
  onClick,
}) => (
  <GalleryItem>
    <GalleryItemImage
      src={webformatURL}
      alt={tags}
      onClick={onClick}
      style={{ cursor: 'zoom-in' }}
    />
  </GalleryItem>
);

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
