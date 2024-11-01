import { Chip } from '../common/chip/Chip';
import * as S from './KeywordListStyle';

interface KeywordListProps {
  chip: string;
  title: string;
  description: string;
  date: string;
  onClick: () => void;
}

export const KeywordList = ({ chip, title, description, date, onClick }: KeywordListProps) => {
  return (
    <S.KeywordList onClick={onClick}>
      <S.Icon src="/icons/ShortCirclesIcon.svg" alt="circle" />
      <S.Content>
        <Chip color={true}>{chip}</Chip>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.Date>{date}</S.Date>
      </S.Content>
    </S.KeywordList>
  );
};