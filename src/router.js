function normalisePath(input = '/') {
  let path = String(input || '/').trim();
  if (path.startsWith('#')) path = path.slice(1);
  if (!path.startsWith('/')) path = `/${path}`;
  const [pathname, search = ''] = path.split('?');
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
  return search ? `${clean}?${search}` : clean;
}

function splitPath(path) {
  const normalised = normalisePath(path);
  const [pathname, search = ''] = normalised.split('?');
  return { pathname, search, query: Object.fromEntries(new URLSearchParams(search)) };
}

function compileRoute(path) {
  if (path === '*') return { regex: /^.*$/, keys: [] };
  const keys = [];
  const segments = normalisePath(path).split('?')[0].split('/').filter(Boolean);
  const pattern = segments.map(segment => {
    if (segment.startsWith(':')) {
      keys.push(segment.slice(1));
      return '([^/]+)';
    }
    return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }).join('/');
  return {
    regex: new RegExp(`^/${pattern}${segments.length ? '' : ''}/?$`),
    keys
  };
}

function buildPath(pattern, params = {}) {
  if (!pattern || pattern === '*') return '/';
  return normalisePath(pattern.replace(/:([A-Za-z0-9_]+)/g, (_, key) => {
    if (params[key] == null) throw new Error(`Missing route parameter: ${key}`);
    return encodeURIComponent(String(params[key]));
  }));
}

export class GlassKitRouter {
  constructor(app, options = {}) {
    this.app = app;
    this.routes = (options.routes || []).map(route => ({ ...route, _compiled: compileRoute(route.path) }));
    this.mode = options.mode || 'hash';
    this.defaultRoute = options.defaultRoute || this.routes.find(route => route.path !== '*')?.path || '/';
    this.current = null;
    this.ready = false;
    this.applying = false;
    this.boundPopState = () => this.syncFromLocation({ direction: 'back' });
    this.boundClick = event => this.handleLinkClick(event);
  }

  init() {
    if (this.ready) return this;
    this.ready = true;
    this.app.root.addEventListener('click', this.boundClick);
    window.addEventListener('popstate', this.boundPopState);
    const path = this.pathFromLocation();
    const resolved = this.match(path) ? path : this.defaultRoute;
    this.writeHistory(resolved, { replace: true, silent: true });
    this.apply(resolved, { direction: 'replace' });
    return this;
  }

  destroy() {
    this.app.root.removeEventListener('click', this.boundClick);
    window.removeEventListener('popstate', this.boundPopState);
    this.ready = false;
  }

  pathFromLocation() {
    if (this.mode === 'history') return normalisePath(`${location.pathname}${location.search}`);
    const hash = location.hash.replace(/^#/, '');
    return normalisePath(hash || this.defaultRoute);
  }

  href(path, params = {}) {
    const built = buildPath(path, params);
    return this.mode === 'history' ? built : `#${built}`;
  }

  match(path) {
    const { pathname, query } = splitPath(path);
    for (const route of this.routes) {
      if (route.path === '*') continue;
      const match = pathname.match(route._compiled.regex);
      if (!match) continue;
      const params = {};
      route._compiled.keys.forEach((key, index) => {
        params[key] = decodeURIComponent(match[index + 1]);
      });
      return { route, params, query, path: normalisePath(path) };
    }
    const fallback = this.routes.find(route => route.path === '*');
    return fallback ? { route: fallback, params: {}, query, path: normalisePath(path) } : null;
  }

  findByTab(tab) {
    return this.routes.find(route => route.tab === tab && !route.screen);
  }

  findByScreen(screen) {
    return this.routes.find(route => route.screen === screen && !route.path.includes(':'));
  }

  navigate(path, options = {}) {
    const target = normalisePath(path);
    const matched = this.match(target);
    if (!matched) return false;
    if (matched.route.redirect) return this.navigate(matched.route.redirect, { ...options, replace: true });
    if (this.current?.path === target && !options.force) return true;
    this.writeHistory(target, { replace: Boolean(options.replace), state: options.state });
    return this.apply(target, { direction: options.replace ? 'replace' : 'forward', state: options.state });
  }

  replace(path, options = {}) {
    return this.navigate(path, { ...options, replace: true });
  }

  back() {
    if (history.length > 1) history.back();
    else this.replace(this.defaultRoute);
  }

  writeHistory(path, { replace = false, state = null, silent = false } = {}) {
    const url = this.mode === 'history' ? path : `${location.pathname}${location.search}#${path}`;
    const payload = { ...(state || {}), glasskit: true, path };
    if (replace) history.replaceState(payload, '', url);
    else if (!silent) history.pushState(payload, '', url);
  }

  syncFromLocation({ direction = 'back' } = {}) {
    const path = this.pathFromLocation();
    if (!this.match(path)) return this.replace(this.defaultRoute);
    return this.apply(path, { direction });
  }

  async apply(path, { direction = 'forward', state = null } = {}) {
    const matched = this.match(path);
    if (!matched) return false;
    if (matched.route.redirect) return this.replace(matched.route.redirect);

    const next = {
      ...matched,
      state,
      direction,
      app: this.app,
      router: this,
      store: this.app.store
    };
    const previous = this.current;

    if (matched.route.beforeEnter && await matched.route.beforeEnter(next, previous) === false) return false;
    previous?.route?.leave?.(previous, next);
    this.app.emit('routebeforechange', { from: previous, to: next });

    this.applying = true;
    try {
      if (matched.route.tab) this.app.selectTab(matched.route.tab, direction !== 'replace');
      if (matched.route.screen) await this.app.push(matched.route.screen);
    } finally {
      this.applying = false;
    }

    const target = matched.route.screen
      ? this.app.root.querySelector(`[data-ios-screen="${CSS.escape(matched.route.screen)}"]`)
      : matched.route.tab
        ? this.app.root.querySelector(`[data-ios-tab-panel="${CSS.escape(matched.route.tab)}"]`)
        : null;

    if (target) {
      target.glasskitRoute = next;
      target.dataset.glasskitRoutePath = matched.path;
      target.dispatchEvent(new CustomEvent('glasskit:pageenter', { bubbles: true, detail: next }));
    }

    this.current = next;
    matched.route.enter?.(next, previous);
    this.app.emit('routechange', { from: previous, to: next });
    return true;
  }

  handleLinkClick(event) {
    const link = event.target.closest('[data-glasskit-link]');
    if (!link || !this.app.root.contains(link)) return;
    const raw = link.getAttribute('data-glasskit-link') || link.getAttribute('href');
    if (!raw) return;
    event.preventDefault();
    this.navigate(raw);
  }

  build(path, params = {}) {
    return buildPath(path, params);
  }
}

export { buildPath as buildGlassKitPath, normalisePath as normaliseGlassKitPath };
