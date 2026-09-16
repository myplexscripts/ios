import { renderSymbols } from '../src/ios.js';

const ready = () => {
  renderSymbols(document);

  const deleteButton = document.querySelector('#demoDelete');
  deleteButton?.addEventListener('click', () => {
    const row = deleteButton.closest('.ios-swipe-row');
    row?.animate([{ opacity: 1, height: `${row.offsetHeight}px` }, { opacity: 0, height: '0px' }], {
      duration: 220,
      easing: 'ease-out',
      fill: 'forwards'
    }).finished.then(() => row.remove());
  });
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
else ready();
