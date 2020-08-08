import React from 'react';
import { SelectableTile } from '../Shared/Tile';
import { fontSize3, fontSizeBig } from '../Shared/Styles';
import styled, { css } from 'styled-components';
import { CoinHeaderGridStyled } from '../Settings/CoinHeaderGrid';

const JustifyRight = styled.div`
  justify-self: right;
`;

const JustifyLeft = styled.div`
  justify-self: left;
`;

const TickerPrice = styled.div`
  ${fontSizeBig};
`;

const ChangePct = styled.div`
  color: green;
  ${props => props.red && css`
    color: red;
  `}
`;

const numberFormat = number => {
  return +(number + '').slice(0, 7);
};

const PriceTileStyled = styled(SelectableTile)`
  ${props => props.compact && css`
    display: grid;
    ${fontSize3}
    grid-gap: 5px;
    grid-template-columns: repeat(3, 1fr);
    justify-items: right;
  `}
`;

const ChangePercent = ({ data }) => (
  <JustifyRight>
    <ChangePct red={data.CHANGEPCT24HOUR < 0}>
      {numberFormat(data.CHANGEPCT24HOUR)}
    </ChangePct>
  </JustifyRight>
);

const PriceTile = ({ sym, data }) => (
  <PriceTileStyled>
    <CoinHeaderGridStyled>
      <div> {sym} </div>
      <ChangePercent data={data} />
    </CoinHeaderGridStyled>
    <TickerPrice>
      ${numberFormat(data.PRICE)}
    </TickerPrice>
  </PriceTileStyled>
);

const PriceTileCompact = ({ sym, data }) => (
  <PriceTileStyled compact>
    <JustifyLeft> {sym} </JustifyLeft>
    <ChangePercent data={data} />
    <div>
      ${numberFormat(data.PRICE)}
    </div>
  </PriceTileStyled>
);

export default ({ price, index }) => {
  const sym = Object.keys(price)[0];
  const data = price[sym]['USD'];
  const TileClass = index < 5 ? PriceTile : PriceTileCompact;
  return (
    <TileClass sym={sym} data={data}>
    </TileClass>
  );
};