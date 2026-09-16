import {
  IOSRouter,
  presentSheet,
  presentActionSheet,
  showToast,
  refreshIcons
} from '../src/ios.js';

const router = new IOSRouter('#app').start('home');

document.querySelector('#backButton').addEventListener('click', () => router.back());
document.querySelector('#sheetButton').addEventListener('click', () => presentSheet('#demoSheet'));
document.querySelector('#toastButton').addEventListener('click', () => showToast({ title: 'Saved', message: 'Your changes are up to date.' }));
document.querySelector('#actionButton').addEventListener('click', () => {
  presentActionSheet({
    title: 'Choose an action',
    message: 'Use action sheets for contextual choices.',
    actions: [
      { label: 'Duplicate', onSelect: () => showToast({ title: 'Duplicated' }) },
      { label: 'Delete', destructive: true, onSelect: () => showToast({ title: 'Deleted', icon: 'trash-2' }) }
    ]
  });
});

window.addEventListener('load', () => refreshIcons());
