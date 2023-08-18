import { styled } from 'styled-components';

export const ButtonEl = styled.button`
  padding: 8px 16px;
  margin: 0 auto;
  border-radius: 8px;
  color: var(--color-1);
  background-color: var(--color-3);
  transition: var(--transition);
  text-align: center;
  display: inline-block;

  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  max-width: 240px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover,
  &:focus {
    color: var(--color-3);
    background-color: var(--color-1);
  }
`;
