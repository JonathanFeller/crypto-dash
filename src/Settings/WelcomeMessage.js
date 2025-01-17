import React from 'react';
import { AppContext } from '../App/AppProvider';

const Welcome = ({ firstVisit }) => {
  return (
    <AppContext.Consumer>
      {({ firstVisit }) => firstVisit &&
        <div>
          Welcome to CryptoDash, please select your favorite coins to begin. {' '}
        </div>
      }
    </AppContext.Consumer>
  );
};

export default Welcome;