import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';

import styles from './App.module.css'

const App: Component = () => {
  const [count, setCount] = createSignal(0);

  const tg = window.Telegram.WebApp
  tg.MainButton.show()
  return (
    <div background-color={tg.themeParams} class={styles.appModule}>
      <h1>POG: {count()}</h1>
      <button class={styles.appButton} onClick={() => setCount(count() + 1)}>Addddd</button>
      <button class={styles.appButton} onClick={() => setCount(0)}>Refreshhh</button>
    </div>
  );
};

export default App;
