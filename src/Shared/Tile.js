import styled from 'styled-components';
import { subtleBoxShadow, lightBlueBackground, greenBoxShadow } from './Styles';

export const Tile = styled.div`
  ${subtleBoxShadow}
  ${lightBlueBackground}
  padding: 10px;
`;

export const SelectableTyle = styled(Tile)`
  &:hover {
    cursor: pointer;
    ${greenBoxShadow}
  }
`;