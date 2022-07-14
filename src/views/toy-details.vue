<template>
  <section v-if="getToy" class="py-4 flex flex-col gap-2">
    <h1>Toys Details</h1>
    <div class="details-container">
      <p>Toy id: {{ getToy._id }}</p>
      <p>Toy name: {{ getToy.name }}</p>
      <p>Toy price: {{ getToy.price }}</p>
      <p>Toy price: {{ $filters.inStock(getToy.inStock) }}</p>
      <p>Toy catagories: {{ $filters.toyCategories(getToy.labels) }}</p>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'toy-details',
    components: {},
    data() {
      return {
        toys: '',
      };
    },
    created() {
      const { toyId } = this.$route.params;
      this.$store.dispatch({ type: 'getToy', toyId });
      console.log(toyId);
    },
    computed: {
      getToy() {
        return this.$store.getters.getToy;
      },
    },
  };
</script>
