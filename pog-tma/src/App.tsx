import type { Component } from 'solid-js';
import { createSignal, onMount } from 'solid-js';
import { evaluate } from 'mathjs';
import Chart from 'chart.js/auto'

import styles from './App.module.css'

const App: Component = () => {
  const [formula, setFormula] = createSignal<string>("")
  
  const tg = window.Telegram.WebApp
  tg.MainButton.setText("Закрыть")
  tg.MainButton.show()
  tg.MainButton.onClick(() => {tg.close()})

  let canvasRef: HTMLCanvasElement | undefined
  let chartInstance: Chart | null = null

  const chartData = {
    labels: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь"],
    datasets: [
      {
        label: "Продажи",
        data: [12, 14, 3, 5, 2, 3],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 3,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Месяцы",
        },
      },
      y: {
        title: {
          display: true,
          text: "Количество",
        },
        beginAtZero: true,
      },
    },
  };

  const createChart = () => {
    if (canvasRef) {
      const ctx = canvasRef.getContext("2d");
      if (ctx) {
        chartInstance = new Chart(ctx, {
          type: "line", // Тип графика (линейный)
          data: chartData,
          options: chartOptions,
        })
      }
    }
  }

  const destroyChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  };

  return (
    <div class={styles.main}>
      <div class={styles.appModule}>
        <input 
          class={styles.functionInput} 
          type="text" 
          placeholder='Пример, y=x^2'
          onInput={(e) => setFormula(e.currentTarget.value)}
          />
        <button onTouchStart={createChart}>Подтвердить</button>
        <button onTouchStart={destroyChart}>Очистить</button>
      </div>
      <canvas ref={canvasRef!}></canvas>
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
