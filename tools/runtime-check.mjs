import { buildGlassKitPath, normaliseGlassKitPath } from '../src/router.js';
import { GlassKitStore } from '../src/store.js';
import { defineComponent } from '../src/component.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(normaliseGlassKitPath('items/42/') === '/items/42', 'Router should normalise paths');
assert(
  buildGlassKitPath('/item/:id', { id: 'hello world' }, { source: 'library' }) === '/item/hello%20world?source=library',
  'Router should build parameterized URLs with query values'
);

const store = new GlassKitStore({ count: 1 });
let observed = null;
store.subscribe('count', value => { observed = value; });
store.update('count', value => value + 1);
assert(store.get('count') === 2 && observed === 2, 'Store update should notify subscribers');

const component = defineComponent({ render: () => '<div>OK</div>' });
assert(component.__glasskitComponentDefinition === true, 'defineComponent should return a GlassKit component definition');

console.log('GlassKit runtime checks passed.');
