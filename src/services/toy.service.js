import { storageService } from './storage.service.js';
import { utilService } from './util.service.js';

let gToys;
const STORAGE_KEY = 'toyDB';
_createToys();
export const toyService = {
  query,
  getEmptyToy,
  save,
  removeToy,
  getToy,
  toyLabels,
};

function query() {
  return storageService.query(STORAGE_KEY);
}
// function query() {
//   gToys = _createToys();
//   storageService.save(STORAGE_KEY, gToys);
//   return gToys;
// }

function toyLabels() {
  const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor'];
  return labels;
}

function _createToys() {
  let toys = storageService.load(STORAGE_KEY);
  if (!toys || !toys.length) {
    toys = [];
    toys.push(_createToy(97846746531, false));
    toys.push(_createToy(48765945741, true));
    toys.push(_createToy(10886574631, true));
    toys.push(_createToy(59886574631, false));
    toys.push(_createToy(59886574400, false));
    toys.push(_createToy(90886574631, true));
    storageService.save(STORAGE_KEY, toys);
  }

  return toys;
}

function _createToy(time, Stock) {
  const toy = {
    _id: utilService.makeId(),
    name: utilService.randomToyName(),
    price: utilService.makePrice(),
    labels: utilService.labels(),
    createdAt: time,
    inStock: Stock,
  };
  return toy;
}

function getEmptyToy() {
  return {
    _id: utilService.makeId(),
    text: '',
    isDone: false,
  };
}

function getToy(id) {
  return storageService.get(STORAGE_KEY, id);
}
// function getToy(id) {
//   const todo = gToys.find(todo => todo._id === id);
//   return todo;
// }

function save(newTodo) {
  if (newTodo._id) {
    const idx = gToys.findIndex(todo => todo._id === newTodo._id);
    gToys[idx] = newTodo;
    storageService.save(STORAGE_KEY, gToys);
  } else {
    newTodo._id = utilService.makeId();
    gToys.push(newTodo);
    storageService.save(STORAGE_KEY, gToys);
  }
}

function removeToy(id) {
  return storageService.remove(STORAGE_KEY, id);
}
// function remove(id) {
//   const idx = gToys.findIndex(todo => todo._id === id);

//   gToys.splice(idx, 1);
//   storageService.save(STORAGE_KEY, gToys);
//   // return gToys;
// }
