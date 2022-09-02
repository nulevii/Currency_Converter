import React from 'react';

import styles from './style.module.css';

function index() {
  return (
    <section className={styles.loading}>
      <h3 className={styles['loading-sign']}>Loading</h3>
      <p className={styles.spinner} />
    </section>
  );
}

export default index;
