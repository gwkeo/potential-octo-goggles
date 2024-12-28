import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';

import styles from './App.module.css'

const App: Component = () => {
  const [formula, setFormula] = createSignal<string>("")
  
  const tg = window.Telegram.WebApp
  tg.MainButton.setText("Закрыть")
  tg.MainButton.show()
  tg.MainButton.onClick(() => {tg.close()})

  const canvas = document.querySelector("#idChart") as HTMLElement;
  if (!canvas) console.log("canvas not found")

  // const ctx = canvas.getContext("2d")


  return (
    <div class={styles.main}>
      <div class={styles.appModule}>
        <input 
          class={styles.functionInput} 
          type="text" 
          placeholder='Пример, y=x^2'
          onInput={(e) => setFormula(e.currentTarget.value)}
        />
        <button onTouchStart={() => alert(`формула: ${formula()}`)}>Подтвердить</button>
      </div>
    </div>
  );
};

// function showPopup(tg : any) {
//   tg.showPopup({
//     title: 'Формула введена неверно',
//     message: 'Исправьте ошибки в формуле',
//     buttons: [
//       {id: 'ok', type: 'default', text: 'Ок'},
//     ]}, () => {});
// }

export default App;
