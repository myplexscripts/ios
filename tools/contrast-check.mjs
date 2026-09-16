const srgb = value => {
  const channel = value / 255;
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
};

const luminance = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
const ratio = (a, b) => {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
};
const blend = (foreground, background, alpha) => foreground.map((value, index) => Math.round(value * alpha + background[index] * (1 - alpha)));
const hex = value => [1, 3, 5].map(index => parseInt(value.slice(index, index + 2), 16));

const lightSecondaryBackground = hex('#f2f2f7');
const darkSecondaryBackground = hex('#1c1c1e');

const checks = [
  ['Light secondary label', blend([60, 60, 67], lightSecondaryBackground, .78), lightSecondaryBackground, 4.5],
  ['Light tertiary label', blend([60, 60, 67], lightSecondaryBackground, .74), lightSecondaryBackground, 4.5],
  ['Dark secondary label', blend([235, 235, 245], darkSecondaryBackground, .72), darkSecondaryBackground, 4.5],
  ['Dark tertiary label', blend([235, 235, 245], darkSecondaryBackground, .60), darkSecondaryBackground, 4.5],
  ['Light link on white', hex('#0062cc'), hex('#ffffff'), 4.5],
  ['Light link on grouped background', hex('#0062cc'), lightSecondaryBackground, 4.5],
  ['Dark link', hex('#5cb8ff'), darkSecondaryBackground, 4.5],
  ['Light system tint as non-text control', hex('#0088ff'), hex('#ffffff'), 3],
  ['Dark system tint as non-text control', hex('#0091ff'), hex('#000000'), 3]
];

let failed = false;
for (const [name, foreground, background, minimum] of checks) {
  const actual = ratio(foreground, background);
  const pass = actual >= minimum;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}: ${actual.toFixed(2)}:1 (minimum ${minimum}:1)`);
  if (!pass) failed = true;
}

if (failed) process.exit(1);
