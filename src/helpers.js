function shuffleArray(arr) {
  return arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);
}

function* generatorFromArray(arr) {
  for (const val of arr) {
    yield val;
  }
}

export { shuffleArray, generatorFromArray };
