import { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { InputTeX } from './components/InputTeX/InputTeX';

const App: Component = () => {
  const [input, setInput] = createSignal("")

  return (
    <div>

      <InputTeX value={input()} onInput={setInput}/>

      <button onclick={() => {console.log(JSON.stringify({input: input()}))}}>Отправить</button>
    </div>
  );
};

export default App;
