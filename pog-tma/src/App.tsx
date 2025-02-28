import { Component, onMount } from 'solid-js';
import { createSignal } from 'solid-js';
import { Task } from './components/task/task';

const App: Component = () => {

  return (
    <div>
      <Task/>
    </div>
  );
};

export default App;
