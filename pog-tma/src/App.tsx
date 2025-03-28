import { Component, onMount } from 'solid-js';
import { Router, Route } from '@solidjs/router'

import "./App.module.css"
import ProfilePage from './pages/profile/profilePage';
import TaskPage from './pages/task/taskPage';

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
