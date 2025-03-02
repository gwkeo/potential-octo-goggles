import { Component, createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Task } from './components/task/task';
import { Profile } from './components/profile/profile';

import "./App.module.css"

const App: Component = () => {

  const sections = {
    "profile": Profile,
    "task": Task
  }

  const [section, setSection] = createSignal<string>("task")

  return (
    <div class="main">
      <nav>
          <button onclick={() => setSection("profile")}>Профиль</button>
          <button onclick={() => setSection("task")}>Задачи</button>
      </nav>
      <Dynamic component={sections[section()]}></Dynamic>
    </div>
  );
};

export default App;
