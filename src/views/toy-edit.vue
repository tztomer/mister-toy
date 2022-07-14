<template>
  <div v-if="toy">
    <router-link to="/">Toy List</router-link>
    <form @submit.prevent="saveToy()">
      <input type="text" name="toyname" id="" />
      {{ toy }}
      <button>Save Toy</button>
    </form>
    <pre> {{ msg }}</pre>
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
        toyId: null,
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
        return toyService.getEmptyToy().then(toy => (this.toy = toy));
      }
    },
    computed: {},
  };
</script>
