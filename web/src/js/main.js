document.addEventListener('DOMContentLoaded', async () => {
  if (document.getElementById('user-info')) {
    await initMainPage();
  }
});