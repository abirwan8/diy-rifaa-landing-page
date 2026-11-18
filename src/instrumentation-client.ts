document.documentElement.classList.add('js');
setTimeout(() => {
  const root = document.documentElement;
  if (!root.classList.contains('aos-ready')) root.classList.add('no-reveal');
}, 5000);
