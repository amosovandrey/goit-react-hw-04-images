import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { StyledBiSearchAlt } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.warn('Please type something in search');
    } else {
      onSubmit(query);
      setQuery('');
    }
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <StyledBiSearchAlt />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleSearchChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
