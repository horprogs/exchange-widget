// @flow

import React, { useEffect } from 'react';

import Pocket from '../../containers/PocketContainer';
import ExchangeContainer from '../../containers/ExchangeContainer';
import NotificationContainer from '../../containers/NotificationContainer';

import styles from './Main.css';

type Props = {
  initRates: () => void,
}

export default function Main(props: Props) {
  const { initRates } = props;

  useEffect(() => {
    initRates();
  }, []);

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.pockets}>
          <div className={styles.pocket}>
            <Pocket position={0} />
          </div>

          <div className={styles.pocket}>
            <Pocket position={1} />
          </div>
        </div>

        <div className={styles.exchange}>
          <ExchangeContainer />
        </div>
      </div>

      <NotificationContainer />
    </>
  );
}
