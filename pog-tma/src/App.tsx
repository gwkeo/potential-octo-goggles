import { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { Task } from './components/task/task';

const App: Component = () => {
  const [input, setInput] = createSignal("")

  let clicked = () => {
    console.log(JSON.stringify({input: input()}))
  }

  return (
    <div>
      <Task/>
    </div>
  );
};

export default App;
