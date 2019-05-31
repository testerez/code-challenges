const countries = [
  {
    name: 'France',
    code: 'fr',
    population: 698769,
  },
  {
    name: 'Espagne',
    code: 'es',
    population: {}
  },
  {
    name: 'Espagne',
    code: 'es',
    population: 9809709709870987,
    foo: null,
  },
]


const padRight = (s: string, lenght: number, padChar = ' ') =>
  s + padChar.repeat(Math.max(0, lenght - s.length));

const toLabel = value => value === undefined ? '' : '' + value;

const toTable = (entries: any[]) => {
  const cols = {};
  entries.forEach((entry) => {
    Object.keys(entry).forEach(k =>
      cols[k] = Math.max(cols[k] || 0, k.length, toLabel(entry[k]).length)
    );
  });
  const renderRow = entry => {
    const content = keys.map(
      k => padRight(toLabel(entry[k]), cols[k]),
    ).join(' | ');
    return `| ${content} |`;
  }
  
  const keys = Object.keys(cols);
  const headerRow = renderRow(
    keys.reduce((acc, k) => ({ ...acc, [k]: k }), {}),
  );
  const hr = '-'.repeat(headerRow.length);
  return [
    hr,
    headerRow,
    hr,
    ...entries.map(renderRow),
    hr,
  ].join('\n'); ;
}

console.log(toTable(countries));
