import { Component, onMount } from 'solid-js';
import { Router, Route } from '@solidjs/router'

import "./App.module.css"
import ProfilePage from './pages/profilePage';
import TaskPage from './pages/taskPage';

const App: Component = () => {


  onMount(() => {
    const app = window.Telegram.WebApp
    app.requestFullscreen()
  })

  return (
    <Router base='/potential-octo-goggles'>
      <Route path="/" component={ProfilePage}></Route>
      <Route path="*404" component={ProfilePage}></Route>
      <Route path="/task" component={TaskPage}></Route>
    </Router>
  );
};

export default App;
