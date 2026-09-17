export class GlassKitStore {
  constructor(initialState = {}) {
    this.listeners = new Map();
    this.state = new Proxy({ ...initialState }, {
      set: (target, key, value) => {
        const previous = target[key];
        if (Object.is(previous, value)) return true;
        target[key] = value;
        this.notify(String(key), value, previous);
        return true;
      },
      deleteProperty: (target, key) => {
        if (!(key in target)) return true;
        const previous = target[key];
        delete target[key];
        this.notify(String(key), undefined, previous);
        return true;
      }
    });
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    this.state[key] = value;
    return value;
  }

  update(key, updater) {
    if (typeof updater !== 'function') throw new TypeError('GlassKitStore updater must be a function');
    const value = updater(this.state[key], this.state);
    this.state[key] = value;
    return value;
  }

  patch(values = {}) {
    Object.entries(values).forEach(([key, value]) => {
      this.state[key] = value;
    });
    return this.state;
  }

  subscribe(key, listener, { immediate = false } = {}) {
    if (typeof listener !== 'function') throw new TypeError('GlassKitStore subscriber must be a function');
    const name = key || '*';
    if (!this.listeners.has(name)) this.listeners.set(name, new Set());
    this.listeners.get(name).add(listener);
    if (immediate) listener(this.state[name], undefined, name, this.state);
    return () => this.listeners.get(name)?.delete(listener);
  }

  notify(key, value, previous) {
    const invoke = listener => listener(value, previous, key, this.state);
    this.listeners.get(key)?.forEach(invoke);
    this.listeners.get('*')?.forEach(invoke);
  }
}

export function createStore(initialState = {}) {
  return new GlassKitStore(initialState);
}
