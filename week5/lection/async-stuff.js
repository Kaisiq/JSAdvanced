function syncIterator(list, fn) {
  for (let i = 0; i < list.length; i++) {
    fn(list[i]);
  }
}

function asyncIterator(list, fn) {
  if (list.length === 0) return;
  setTimeout(function () {
    const item = list[0];
  }
}