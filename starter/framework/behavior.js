function compactLargeTitleThreshold(scroll, panel) {
  const title = panel?.querySelector('.ios-content > .ios-large-title:first-child');
  if (!title) return 28;

  const scrollPaddingTop = Number.parseFloat(getComputedStyle(scroll).paddingTop) || 0;
  const titleTop = title.offsetTop;
  const titleHeight = title.offsetHeight || 41;
  return Math.max(52, scrollPaddingTop + titleTop + titleHeight - 8);
}

function syncNavigationState(scroll) {
  const panel = scroll.closest('[data-ios-tab-panel], [data-ios-screen]');
  const bar = panel?.querySelector(':scope > .ios-navigation-bar');
  if (!bar) return;

  const isCompactTab = panel.matches?.('[data-ios-tab-panel]') &&
    (window.matchMedia('(max-width: 759px)').matches || window.matchMedia('(max-height: 599px)').matches);
  const threshold = isCompactTab ? compactLargeTitleThreshold(scroll, panel) : 28;
  bar.classList.toggle('is-scrolled', scroll.scrollTop >= threshold);
}

function closeTransientMenus(root) {
  const app = root.__iosApp;
  if (app?.closeMenus) {
    app.closeMenus();
    return;
  }

  document.querySelectorAll('.ios-menu.is-open').forEach(menu => {
    menu.classList.remove('is-open');
    menu.hidden = true;
    menu.style.left = '';
    menu.style.top = '';
  });
}

export function initIOSBehaviorRefinements(root = document.querySelector('[data-ios-app]')) {
  if (!root || root.dataset.iosBehaviorRefinements === 'true') return root;
  root.dataset.iosBehaviorRefinements = 'true';

  root.querySelectorAll('.ios-scroll').forEach(scroll => {
    const onScroll = () => {
      syncNavigationState(scroll);
      if (document.querySelector('.ios-menu.is-open')) closeTransientMenus(root);
    };
    scroll.addEventListener('scroll', onScroll, { passive: true });
    syncNavigationState(scroll);
  });

  const closeForViewportChange = () => closeTransientMenus(root);
  window.addEventListener('resize', closeForViewportChange, { passive: true });
  window.addEventListener('orientationchange', closeForViewportChange, { passive: true });

  return root;
}

function autoInit() {
  document.querySelectorAll('[data-ios-app]').forEach(root => initIOSBehaviorRefinements(root));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoInit, { once: true });
else autoInit();
