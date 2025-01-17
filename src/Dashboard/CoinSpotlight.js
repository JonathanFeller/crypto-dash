import React from 'react';
import { Tile } from '../Shared/Tile';
import { AppContext } from '../App/AppProvider';
import CoinImage from '../Shared/CoinImage';
import styled from 'styled-components';

const SpotLightName = styled.h2`
  text-align: center;
`;

export default () => {
  return (
    <AppContext.Consumer>
      {({ currentFavorite, coinList }) =>
        <Tile>
          <SpotLightName>{coinList[currentFavorite].CoinName}</SpotLightName>
          <CoinImage spotlight coin={coinList[currentFavorite]} />
        </Tile>
      }
    </AppContext.Consumer>
  );
}