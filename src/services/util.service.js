export const utilService = {
  makeId,
  randomToyName,
  makePrice,
  labels,
};

function makeId(length = 5) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
function randomToyName() {
  let names = ['Talking Doll', 'Paper Plan', 'Remote Car', 'Playstation', 'Xbox'];
  let name = names[Math.floor(Math.random() * names.length)];
  return name;
}

function _rept(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function labels() {
  const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor'];
  const label = [_rept(labels), _rept(labels), _rept(labels)];
  return label;
}

function makePrice(length = 3) {
  var num = '';
  var possible = '123456789';
  for (var i = 0; i < length; i++) {
    num += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return +num;
}
