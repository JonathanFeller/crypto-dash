import highchartsConfig from './HighchartsConfig';
import React from 'react';
import { AppContext } from '../App/AppProvider';
import ReactHighcharts from 'react-highcharts';
import { Tile } from '../Shared/Tile';
import HighchartsTheme from './HighchartsTheme';
ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

export default () => (
  <AppContext.Consumer>
    {() =>
      <Tile>
        <ReactHighcharts config={highchartsConfig} />
      </Tile>
    }
  </AppContext.Consumer>
);