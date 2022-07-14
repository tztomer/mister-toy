<template>
  <section class="filter-container">
    <form @input="displayFilter" @change="displayFilter">
      <input type="text" v-model="filterBy.name" placeholder="Search toy.." />
      <input type="checkbox" v-model="filterBy.stock" name="toyinstok" :checked="filterBy.stock" />
      <label for="toyinstok"> Toy in Stock</label>
      <pre>{{ filterBy }}</pre>
      <select name="labels" v-model="filterBy.label">
        <option value="show">Show All Toys</option>
        <option v-for="label in labels" :key="label">{{ label }}</option>
      </select>
      <label for="labels"> Select By label</label>

      <button @click.prevent="displayFilter($event)" value="name" type="name">Sort By Name</button>
      <button @click.prevent="displayFilter($event)" value="price" type="price">Sort By Price</button>

      <button @click.prevent="displayFilter($event)" type="created" value="createdAt">Sort5 By Created</button>
    </form>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        filterBy: {
          name: '',
          stock: '',
          label: '',
          sorting: '',
          decr: false,
        },
      };
    },
    methods: {
      displayFilter($event) {
        const { type } = $event;
        if (type === 'click') {
          this.filterBy.sorting = $event.target._value;
          this.filterBy.decr = !this.filterBy.decr;
        }

        console.log('display', this.filterBy);
        this.$store.commit({ type: 'filterBy', filter: this.filterBy });
      },
    },
    computed: {
      labels() {
        return this.$store.getters.toyLabels;
      },
    },
  };
</script>
