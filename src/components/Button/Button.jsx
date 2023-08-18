import React from 'react';
import { ButtonEl } from './Button.styled';
export const Button = ({ onClick }) => (
  <ButtonEl type="button" onClick={onClick}>
    Load more
  </ButtonEl>
);
