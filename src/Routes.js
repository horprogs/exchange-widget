import React, { Component } from 'react';

import Pocket from './containers/PocketContainer';

export default class App extends Component {
  render() {
    return (
      <div>
        <Pocket position={0} />
        <Pocket position={1} />
      </div>
    );
  }
}
