const data = [
  { item: { type: 'wood', size: 10 } },
  { item: { type: 'wood', size: 8 } },
  { item: { type: 'metal', size: 8 } },
];

console.log(data);

function filterItems(filters) {
  return data.filter(function(val) {
    for (let i = 0; i < filters.length; i++) {
      if (val.item[filters[i][0]] != filters[i][1]) {
        return false;
      }
      return true;
    }
  });
}

console.log(
  filterItems([
    ['title', 'wood'],
    // ['poster_path', 8],
  ])
);
