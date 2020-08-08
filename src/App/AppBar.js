import React from 'react';
import styled, { css } from 'styled-components';

const Logo = styled.div`
  font-size: 1.5em;
`;

const Bar = styled.div`
  display: grid;
  margin-bottom: 40px;
  grid-template-columns: 180px auto 100px 100px;
`;

const ControlBurronElem = styled.div`
  cursor: pointer;
  ${props => props.active && css`
    text-shadow: 0px 0px 60px #03ff03;
  `}
`;

const toProperCase = (lower) => {
  return lower.charAt(0).toUpperCase() + lower.substring(1);
}

const ControlButton = ({ name, active }) => {
  return (
    <ControlBurronElem active={active}>
      {toProperCase(name)}
    </ControlBurronElem>
  );
}

const AppBar = () => {
  return (
    <Bar>
      <Logo> CryptoDash </Logo>
      <div></div>
      <ControlButton active name="dashboard" />
      <ControlButton name="settings" />
    </Bar>
  );
}

export default AppBar;