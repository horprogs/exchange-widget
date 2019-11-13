import React, { Component } from 'react';

import Pocket from './components/Pocket/Pocket';

export default class App extends Component {
  render() {
    return (
      <div>
        <Pocket />
        <Pocket />
      </div>
    );
  }
}
