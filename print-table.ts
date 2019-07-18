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

const toLabel = value => value === undefined ? '' : '' + value;

const getColumnWidths = (entries: any[]) => {
  const cols = {};
  entries.forEach((entry) => {
    Object.keys(entry).forEach(k =>
      cols[k] = Math.max(cols[k] || 0, k.length, toLabel(entry[k]).length)
    );
  });
  return cols;
}

const toTable = (entries: any[]) => {
  const columWidths = getColumnWidths(entries);
  const keys = Object.keys(columWidths);

  const renderRow = entry => {
    const content = keys.map(
      k => toLabel(entry[k]).padEnd(columWidths[k]),
    ).join(' | ');
    return `| ${content} |`;
  }
  
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
