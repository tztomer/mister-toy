import { storageService } from './storage.service.js';
import { utilService } from './util.service.js';

// let gToys;
const STORAGE_KEY = 'toyDB';
_createToys();
export const toyService = {
  query,
  getEmptyToy,
  removeToy,
  getToy,
  labels,
  postNewToy,
  updateToy,
  // toyLabels,
};

function query() {
  return storageService.query(STORAGE_KEY);
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

function _createToy(time, Stock, reviews) {
  const toy = {
    _id: utilService.makeId(),
    name: utilService.randomToyName(),
    price: utilService.makePrice(),
    labels: utilService.labels(),
    createdAt: time,
    inStock: Stock,
    reviews: utilService.reviews(),
  };
  return toy;
}
function labels() {
  return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor'];
}

function postNewToy(newToy) {
  return storageService.post(STORAGE_KEY, newToy);
}
function updateToy(updatedToy) {
  return storageService.put(STORAGE_KEY, updatedToy);
}

function getEmptyToy() {
  return {
    _id: null,
    name: '',
    price: '',
    labels: [],
    createdAt: +Date.now(),
    inStock: false,
    reviews: utilService.reviews(),
  };
}

function getToy(id) {
  return storageService.get(STORAGE_KEY, id);
}

function removeToy(id) {
  return storageService.remove(STORAGE_KEY, id);
}
