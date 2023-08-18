import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Loader } from '../Loader/Loader';
import { Gallery } from './ImageGallery.styled';
import { Button } from '../Button/Button';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';

const MIN_LOADING_TIME = 300;

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    loadingMore: false,
    error: null,
    page: 1,
    perPage: 12,
    loadMore: false,
    selectedImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.setState({ loading: true, images: [], page: 1 });
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery } = this.props;
    const { page, perPage } = this.state;

    fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=37648737-76093e0db6038ebde4a82f299&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          new Error(`Oops! Looks like there are no images of ${searchQuery}.`)
        );
      })
      .then(data => {
        if (data.hits.length === 0) {
          toast.warn(`Looks like there are no images about ${searchQuery}`);
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            page: prevState.page + 1,
            loadMore: this.state.page < Math.ceil(data.totalHits / perPage),
          }));
        }
      })
      .catch(error => this.setState({ error: error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleLoadMore = () => {
    this.setState({ loadingMore: true });
    this.fetchImages();
    setTimeout(() => {
      this.setState({ loadingMore: false });
    }, MIN_LOADING_TIME);
  };

  handleImageClick = image => {
    this.setState({ selectedImage: image });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, loading, loadingMore, error, loadMore, selectedImage } =
      this.state;

    return (
      <>
        {error && <p>{error.message}</p>}
        {loading && <Loader />}
        {images.length > 0 && (
          <Gallery>
            {images.map(image => (
              <ImageGalleryItem
                image={image}
                key={image.id}
                onClick={() => this.handleImageClick(image)}
              />
            ))}
          </Gallery>
        )}
        {selectedImage && (
          <Modal image={selectedImage} onClick={this.handleCloseModal} />
        )}
        {loadMore && !loading && (
          <>
            <Button onClick={this.handleLoadMore} />
            {loadingMore && <Loader />}
          </>
        )}
      </>
    );
  }
}
