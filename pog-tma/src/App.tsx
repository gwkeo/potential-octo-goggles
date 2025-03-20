import { Component, onMount } from 'solid-js';
import { Router, Route } from '@solidjs/router'

import "./App.module.css"
import Profile from './pages/profile';
import Task from './pages/task';

const App: Component = () => {


  onMount(() => {
    const app = window.Telegram.WebApp
    app.requestFullscreen()
  })

  return (
    <Router base='/potential-octo-goggles'>
      <Route path="/" component={Profile}></Route>
      <Route path="*404" component={Profile}></Route>
      <Route path="/task" component={Task}></Route>
    </Router>
  );
};

export default App;
