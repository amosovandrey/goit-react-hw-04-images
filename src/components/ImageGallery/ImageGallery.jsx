import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { Loader } from '../Loader/Loader';
import { Gallery } from './ImageGallery.styled';
import { Button } from '../Button/Button';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import axios from 'axios';

const MIN_LOADING_TIME = 300;
const API_KEY = '37648737-76093e0db6038ebde4a82f299';

const APIfetchImages = ({ searchQuery = '', page = 1, perPage = 12 } = {}) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
    .then(response => response.data);
};

export function ImageGallery({ query }) {
  const [images, setImages] = useState([]);
  // const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = () => {
      setIsLoading(true);

      APIfetchImages({ searchQuery: query, page, perPage })
        .then(data => {
          if (data.hits.length === 0) {
            toast.warn(`Looks like there are no images about ${query}`);
          } else {
            setImages(prevImages => [...prevImages, ...data.hits]);
            setLoadMore(page < Math.ceil(data.totalHits / perPage));
          }
        })
        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false));
    };

    fetchImages();
  }, [page, perPage, query]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setPage(prevPage => prevPage + 1);
    setTimeout(() => {
      setLoadingMore(false);
    }, MIN_LOADING_TIME);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {error && <p>{error.message}</p>}
      {isLoading && <Loader />}
      {images.length > 0 && (
        <Gallery>
          {images.map(image => (
            <ImageGalleryItem
              image={image}
              key={image.id}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </Gallery>
      )}
      {selectedImage && (
        <Modal image={selectedImage} onClick={handleCloseModal} />
      )}
      {loadMore && !isLoading && (
        <>
          <Button onClick={handleLoadMore} />
          {loadingMore && <Loader />}
        </>
      )}
    </>
  );
}

ImageGallery.propTypes = { query: PropTypes.string.isRequired };
