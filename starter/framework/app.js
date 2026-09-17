import { IOSApp } from './ios.js';
import { GlassKitRouter } from './router.js';
import { GlassKitStore } from './store.js';

export const GLASSKIT_VERSION = '1.0.0';

export class GlassKitApp extends IOSApp {
  constructor(options = {}) {
    if ((typeof Element !== 'undefined' && options instanceof Element) || typeof options === 'string') options = { root: options };
    const root = options.root || document.querySelector('[data-glasskit-app]') || document.querySelector('[data-ios-app]');
    super(root);

    this.options = options;
    this.name = options.name || 'GlassKit App';
    this.store = options.store instanceof GlassKitStore ? options.store : new GlassKitStore(options.store || {});
    this.router = new GlassKitRouter(this, {
      routes: options.routes || [],
      mode: options.router?.mode || options.routerMode || 'hash',
      defaultRoute: options.router?.defaultRoute || options.defaultRoute
    });
    this.initialized = false;

    this.root.dataset.glasskitApp = this.root.dataset.glasskitApp || '';
    this.root.__glasskitApp = this;
    this.root.__iosApp = this;
  }

  init() {
    if (this.initialized) return this;
    super.init();
    this.router.init();
    this.initialized = true;
    this.emit('ready', { app: this });
    return this;
  }

  emit(name, detail = {}) {
    const eventName = name.startsWith('glasskit:') ? name : `glasskit:${name}`;
    const event = new CustomEvent(eventName, { bubbles: true, detail });
    this.root.dispatchEvent(event);
    const hook = this.options.on?.[name.replace(/^glasskit:/, '')];
    if (typeof hook === 'function') hook(detail, this);
    return event;
  }

  on(name, listener, options) {
    const eventName = name.startsWith('glasskit:') ? name : `glasskit:${name}`;
    this.root.addEventListener(eventName, listener, options);
    return () => this.root.removeEventListener(eventName, listener, options);
  }

  selectTab(name, animate = true) {
    if (this.router?.ready && !this.router.applying) {
      const route = this.router.findByTab(name);
      if (route) {
        this.router.navigate(route.path);
        return;
      }
    }
    return super.selectTab(name, animate);
  }

  push(name) {
    if (this.router?.ready && !this.router.applying) {
      const route = this.router.findByScreen(name);
      if (route) return Promise.resolve(this.router.navigate(route.path));
    }
    return super.push(name);
  }

  back() {
    if (this.router?.ready && !this.router.applying) {
      this.router.back();
      return Promise.resolve(true);
    }
    return super.back();
  }

  transitionToTab(name, animate = true) {
    return super.selectTab(name, animate);
  }

  transitionPush(name) {
    return super.push(name);
  }

  transitionBack() {
    return super.back();
  }

  navigate(path, options = {}) {
    return this.router.navigate(path, options);
  }

  replace(path, options = {}) {
    return this.router.replace(path, options);
  }

  destroy() {
    this.router.destroy();
    this.root.__glasskitApp = null;
    if (this.root.__iosApp === this) this.root.__iosApp = null;
    this.initialized = false;
    this.emit('destroy', { app: this });
  }
}

export function createGlassKitApp(options = {}) {
  return new GlassKitApp(options).init();
}
