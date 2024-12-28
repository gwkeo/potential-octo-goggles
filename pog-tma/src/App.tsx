import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';

import styles from './App.module.css'

const App: Component = () => {
  const [count, setCount] = createSignal(0);
  const tg = window.Telegram.WebApp

  tg.MainButton.setText("Закрыть")
  tg.MainButton.show()
  tg.MainButton.onClick(() => {tg.close()})
  
  return (
    <div class={styles.appModule}>
      <h1>POG: {count()}</h1>
      <div class={styles.buttons}>
        <button class={styles.appButton} onPointerDown={() => setCount(count() + 1)}>Addddd</button>
        <button class={styles.appButton} onPointerDown={() => setCount(0)}>Refreshhh</button>
      </div>
    </div>
  );
};

export default App;
