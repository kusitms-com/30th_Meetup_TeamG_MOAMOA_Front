import styled, { css } from 'styled-components';

export const List = styled.section<{ $type: 'folder' | 'plus' }>`
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6.25rem;
  color: ${({ theme }) => theme.colors.gray800};

  ${({ $type, theme }) =>
    $type === 'folder'
      ? css`
          background-color: ${theme.colors.blue50};
          box-shadow: 0px 0px 10px 0px rgba(62, 91, 255, 0.2) inset;
        `
      : css`
          cursor: pointer;
          background-color: ${theme.colors.blue100};
          box-shadow: 0px 0px 10px 0px rgba(62, 91, 255, 0.2) inset;
        `}
`;