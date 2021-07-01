const fs = require('fs');

const output = fs
  .readFileSync('person_ids.json', 'utf8')
  .trim()
  .split('\n')
  .map(el => {
    const what = JSON.parse(el);
    const ever = { id: what.id, name: what.name };
    return ever;
  });

fs.writeFileSync('pls.json', JSON.stringify({ actorID: output }));
