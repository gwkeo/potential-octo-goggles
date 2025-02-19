import type { Component } from 'solid-js';

import { createSignal, For } from 'solid-js';
import { InputTeX } from './components/InputTeX/InputTeX';

import styles from './App.module.css'

const App: Component = () => {
  return (
    <div>
      <InputTeX/>
      <button>Отправить</button>
    </div>
  );
};

export default App;
