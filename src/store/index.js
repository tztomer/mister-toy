import { createStore } from 'vuex';
import { storageService } from '../services/storage.service.js';
import { toyService } from '../services/toy.service.js';
// create a store instance
const store = createStore({
  strict: true,
  state() {
    return {
      toys: null,
      toy: null,
      filterBy: {},
      labels: null,
    };
  },
  mutations: {
    filterBy(state, { filter }) {
      let newFilter = JSON.parse(JSON.stringify(filter));
      state.filterBy = newFilter;
      console.log('state', state.filterBy);
    },
    setToys(state, { toys }) {
      state.toys = toys;
    },
    removeToy(state, { id }) {
      console.log('id mu', id);
      const idx = state.toys.findIndex(toy => {
        return toy._id === id;
      });
      console.log('idx', idx);
      return state.toys.splice(idx, 1);
    },
    getToy(state, { toy }) {
      console.log('from mus', toy);
      state.toy = toy;
      console.log('state toy', state.toy);
    },
    createToy(state, { toy }) {
      console.log('mutation toy', toy);
      state.toy = toy;
      console.log('state create toy', state.toy);
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex(entity => entity._id === toy._id);
      state.toys.splice(idx, 1, toy);
    },
    addNewToy(state, { toy }) {
      console.log('new toy from mutation', state.toys);
      state.toys.unshift(toy);
    },
  },
  actions: {
    loadToys({ commit }) {
      toyService
        .query()
        .then(toys => {
          console.log('the toys', toys);
          commit({ type: 'setToys', toys });
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeToy({ commit }, { id }) {
      console.log('from action', id);
      toyService.removeToy(id).then(() => {
        commit({ type: 'removeToy', id });
      });
    },
    getToy({ commit }, { toyId }) {
      console.log(toyId);
      toyService.getToy(toyId).then(currToy => {
        const toy = JSON.parse(JSON.stringify(currToy));

        commit({ type: 'getToy', toy });
      });
    },
    updateToy({ commit }, { toy }) {
      let updatedToy = JSON.parse(JSON.stringify(toy));
      console.log('toy form store', updatedToy);
      return toyService.updateToy(updatedToy).then(toy => {
        commit({ type: 'updateToy', toy });
        // console.log('updated fgfdgdfg', toy);
      });
    },
    addNewToy({ commit }, { toy }) {
      let newToy = JSON.parse(JSON.stringify(toy));
      console.log('toy form new', newToy);
      return toyService.postNewToy(newToy).then(toy => {
        console.log('new toy', toy);
        commit({ type: 'addNewToy', toy });
      });
    },
  },

  getters: {
    toysToDisplay(state) {
      let toys = JSON.parse(JSON.stringify(state.toys));
      const { name, stock, label, sorting, decr } = JSON.parse(JSON.stringify(state.filterBy));
      console.log(name, stock, label, sorting, decr);
      if (name) {
        const regex = new RegExp(name, 'i');
        const searchByname = toys.filter(toy => regex.test(toy.name));
        toys = searchByname;
      }
      if (stock) {
        const inStock = toys.filter(toy => toy.inStock);
        console.log(inStock);
        toys = inStock;
      }
      if (label) {
        console.log('the lable', label);
        const label_ = toys.filter(toy => toy.labels.includes(label));
        toys = label === 'show' ? toys : label_;
      }
      if (sorting) {
        if (decr) {
          const incr = toys.sort((a, b) => {
            if (a[sorting] > b[sorting]) return -1;
            if (a[sorting] < b[sorting]) return 1;
            return 0;
          });
          console.log('incr', incr);
          toys = incr;
        } else {
          const incr = toys.sort((a, b) => {
            if (a[sorting] < b[sorting]) return -1;
            if (a[sorting] > b[sorting]) return 1;
            return 0;
          });
          toys = incr;
        }
      }
      return toys;
    },
    toyLabels(state) {
      return state.labels;
    },
    getToy(state) {
      return JSON.parse(JSON.stringify(state.toy));
    },
  },

  modules: {},
});

export default store;
