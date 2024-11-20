import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  padding: 0rem 1.25rem;
  gap: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};

  ${(props) => props.theme.breakpoints.min} {
    background-color: ${({ theme }) => theme.colors.gray25};
    padding: 3.25rem 4.75rem 0rem;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0rem 0.25rem;
  color: ${({ theme }) => theme.colors.gray900};
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 135%;

  ${(props) => props.theme.breakpoints.min} {
    font-size: 1.75rem;
    line-height: 140%;
  }
`;

// 바뀔 부분
export const Div = styled.div`
  width: 3.6875rem;
  height: 3.6875rem;
  background-color: ${({ theme }) => theme.colors.blue50};
`;

export const TabBar = styled.div`
  display: flex;
  margin-top: 1rem;
  width: 100%;
`;

export const Item = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.gray700 : '#767676')};
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 140%;
  padding: 0.5rem 0rem;
  border-bottom: ${({ $isSelected, theme }) =>
    $isSelected ? `2px solid ${theme.colors.gray700}` : 'none'};

  ${(props) => props.theme.breakpoints.min} {
    font-size: 1.25rem;
    line-height: 135%;
  }
`;
