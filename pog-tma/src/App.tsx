import { Component, onMount } from 'solid-js';
import { Router, Route } from '@solidjs/router'

import "./App.module.css"
import Profile from './pages/profile';
import Task from './pages/task';
import NotFound from './pages/notFound'
import Home from './pages/home'

const App: Component = () => {


  onMount(() => {
    const app = window.Telegram.WebApp
    app.requestFullscreen()
  })

  return (
    <Router>
      <Route path="/" component={Home}></Route>
      <Route path="/profile" component={Profile}></Route>
      <Route path="/task" component={Task}></Route>
      <Route path="*404" component={NotFound}></Route>
    </Router>
  );
};

export default App;
