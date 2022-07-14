<template>
  <div v-if="toy">
    <router-link to="/">Toy List</router-link>
    <form>
      <input type="text" v-model="toy.name" />
      <input type="number" v-model="toy.price" />
      <select v-model="toy.labels" multiple placeholder="Select labels">
        <option v-for="(label, idx) in labels" :value="label" :key="idx" :label="label" />
      </select>
      <div class="created">{{ $filters.createdAt(toy.createdAt) }}</div>

      <label class="switch">
        <input type="checkbox" v-model="toy.inStock" @change="inStock" />
        <span class="slider round"></span>
      </label>
      <div class="created"> {{ $filters.toyCategories(toy.reviews) }} </div>

      <button>Save Toy</button>
    </form>
    <pre>{{ toy }}</pre>
  </div>
</template>

<script>
  import { toyService } from '../services/toy.service.js';
  export default {
    name: 'toy-edit',
    data() {
      return {
        toy: null,
        msg: 'Hello from edit ',
        labels: toyService.labels(),
        active: false,
      };
    },
    methods: {
      saveToy() {
        console.log('values', $event);
      },
    },
    created() {
      const { toyId } = this.$route.params;
      if (toyId) {
        return toyService.getToy(toyId).then(toy => (this.toy = toy));
      } else {
        return (this.toy = toyService.getEmptyToy());
      }
    },
    computed: {
      inStock() {
        this.active = !this.active;
      },
    },
  };
</script>
<style>
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
