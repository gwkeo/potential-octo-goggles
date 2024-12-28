import type { Component } from 'solid-js';
import { createSignal, onMount } from 'solid-js';
import { evaluate } from 'mathjs';
import Chart from 'chart.js/auto'

import styles from './App.module.css'

const App: Component = () => {
  const arrLen = 100
  const [formula, setFormula] = createSignal<string>("")
  
  const tg = window.Telegram.WebApp
  tg.MainButton.setText("Построить")
  tg.MainButton.show()

  let canvasRef: HTMLCanvasElement | undefined; // Ссылка на canvas
  let chartInstance: Chart | null = null; // Хранение экземпляра графика

  // Настройки графика
  const chartOptions = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: "x" } },
      y: { title: { display: true, text: "y" } },
    },
  };

  // Функция для построения графика
  const createChart = () => {
    if (!canvasRef) return;

    const ctx = canvasRef.getContext("2d");
    if (!ctx) return;

    // Если график уже существует, удаляем его
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }

    // Генерация данных
    const xValues = Array.from({ length: 101 }, (_, i) => i - 50); // x от -50 до 50
    let yValues: number[];
    try {
      yValues = xValues.map((x) =>
        evaluate(formula().replace(/x/g, `(${x})`)) // Вычисляем y для каждого x
      );
    } catch (err) {
      alert("Ошибка в формуле! Проверьте синтаксис.");
      return;
    }

    // Создание нового графика
    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: xValues,
        datasets: [
          {
            label: `График: y = ${formula()}`,
            data: yValues,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: chartOptions,
    });
  };

  tg.MainButton.onClick(createChart)

  return (
    <div class={styles.main}>
      <div class={styles.appModule}>
        <h4>y=</h4>
        <input 
          class={styles.functionInput} 
          type="text" 
          placeholder='Пример, x^2'
          onInput={(e) => setFormula(e.currentTarget.value)}
          />
        <button onTouchStart={createChart}>Построить</button>
      </div>
      <canvas ref={canvasRef!}></canvas>
    </div>
  );
};

// function showPopup(tg : any) {
//   
// }

export default App;
