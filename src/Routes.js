import React, { Component } from 'react';

import Pocket from './containers/PocketContainer';
import ExchangeContainer from './containers/ExchangeContainer';


export default class App extends Component {
  render() {
    return (
        <div>
          <Pocket position={0} />
          <Pocket position={1} />
          <ExchangeContainer />
      </div>
    );
  }
}
