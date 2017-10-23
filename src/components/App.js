import React from 'react';
import reactLogo from '../../assets/react-logo.svg';
import styles from '../styles/App.scss';

const App = () => (
  <div className={styles.app}>
    <header className={styles.header}>
      <img src={reactLogo} className={styles.logo} alt="logo" />
      <h1 className={styles.title}>Welcome, friend!</h1>
    </header>
    <p className={styles.intro}>
      This is where all the exciting stuff is going to happen!
    </p>
  </div>
);

export default App;
