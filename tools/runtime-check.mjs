import { buildGlassKitPath, normaliseGlassKitPath } from '../src/router.js';
import { GlassKitStore } from '../src/store.js';
import { defineComponent } from '../src/component.js';
import { GlassKitRequest } from '../src/request.js';
import { GlassKitStorage } from '../src/storage.js';
import { GlassKitPluginManager } from '../src/plugins.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(normaliseGlassKitPath('items/42/') === '/items/42', 'Router should normalise paths');
assert(
  buildGlassKitPath('/item/:id', { id: 'hello world' }, { source: 'library' }) === '/item/hello%20world?source=library',
  'Router should build parameterized URLs with query values'
);

const store = new GlassKitStore({
  state: { count: 1 },
  getters: {
    doubled: state => state.count * 2
  },
  actions: {
    increment({ update }, amount = 1) {
      return update('count', value => value + amount);
    }
  }
});
let observed = null;
store.subscribe('count', value => { observed = value; });
store.dispatch('increment', 2);
assert(store.get('count') === 3 && observed === 3, 'Store actions should update and notify state');
assert(store.getters.doubled === 6, 'Store getters should derive state');

let watched = null;
const stopWatching = store.watch((state, getters) => getters.doubled, value => { watched = value; });
store.set('count', 4);
stopWatching();
assert(watched === 8, 'Store watch should react to derived values');

const component = defineComponent({ render: () => '<div>OK</div>' });
assert(component.__glasskitComponentDefinition === true, 'defineComponent should return a GlassKit component definition');

const storage = new GlassKitStorage({ namespace: 'runtime-check', storage: null });
storage.set('value', { ok: true });
assert(storage.get('value')?.ok === true, 'Storage should persist JSON through its fallback backend');
storage.clear();
assert(storage.has('value') === false, 'Storage clear should remove namespaced values');

const request = new GlassKitRequest({ baseURL: 'https://example.test', cacheTTL: 1000 });
assert(
  request.buildURL('/items', { z: 2, a: 'one' }) === 'https://example.test/items?a=one&z=2',
  'Request should build stable query URLs'
);

const originalFetch = globalThis.fetch;
let fetchCount = 0;
globalThis.fetch = async () => {
  fetchCount += 1;
  await new Promise(resolve => setTimeout(resolve, 10));
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } });
};
const [first, second] = await Promise.all([
  request.get('/dedupe', { cache: true }),
  request.get('/dedupe', { cache: true })
]);
assert(first.ok && second.ok && fetchCount === 1, 'Request should deduplicate identical in-flight GET requests');
await request.get('/dedupe', { cache: true });
assert(fetchCount === 1, 'Request should reuse fresh cached GET responses');
globalThis.fetch = originalFetch;

const pluginEvents = [];
const pluginManager = new GlassKitPluginManager({ name: 'Runtime App' });
await pluginManager.use({
  name: 'runtime-plugin',
  install() { pluginEvents.push('install'); return { ready: true }; },
  init() { pluginEvents.push('init'); },
  destroy() { pluginEvents.push('destroy'); }
});
await pluginManager.init();
await pluginManager.destroy();
assert(pluginEvents.join(',') === 'install,init,destroy', 'Plugins should install, initialize, and destroy predictably');

console.log('GlassKit runtime checks passed.');
