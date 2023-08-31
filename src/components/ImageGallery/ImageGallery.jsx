import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { Loader } from '../Loader/Loader';
import { Gallery } from './ImageGallery.styled';
import { Button } from '../Button/Button';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { fetchImages } from 'services/PixabayAPI';

const MIN_LOADING_TIME = 300;

export function ImageGallery({ query }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [prevQuery, setPrevQuery] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }

    if (query === prevQuery) {
      setIsLoading(true);
      fetchImages(query, page)
        .then(data => {
          if (data.hits.length === 0) {
            toast.warn(`Looks like there are no images about ${query}`);
            setLoadMore(false);
          } else {
            setImages(prevImages => [...prevImages, ...data.hits]);
            setLoadMore(page < Math.ceil(data.totalHits / perPage));
          }
        })
        .catch(error => setError(error.message))
        .finally(() =>
          setTimeout(() => {
            setIsLoading(false);
            setLoadingMore(false);
            if (page > 1) {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
              });
            }
          }, MIN_LOADING_TIME)
        );
    } else {
      setPrevQuery(query);
      setImages([]);
      setPage(1);
    }
  }, [page, perPage, prevQuery, query]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {error && toast.warn(`Oops! here is what went wrong: ${error}`)}
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
