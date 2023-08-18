import React from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <MagnifyingGlass />
    </LoaderWrapper>
  );
};
