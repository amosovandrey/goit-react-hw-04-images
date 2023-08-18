import React from 'react';

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
