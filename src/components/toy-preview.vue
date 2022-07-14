<template>
  <div class="preview">
    <div>{{ toy.name }}</div>
    <div>{{ toy.price }}</div>
    <div>{{ $filters.toyCategories(toy.labels) }}</div>
    <div>{{ $filters.createdAt(toy.createdAt) }}</div>
    <div>Toy available {{ $filters.inStock(toy.inStock) }}</div>
    <div>Toy reviews: {{ $filters.toyCategories(toy.reviews) }}</div>
    <router-link :to="'/toy/details/' + toy._id">Details</router-link>
    <router-link :to="'/toy/edit/' + toy._id">Edit</router-link>
  </div>
</template>

<script>
  export default {
    name: 'toy-preview',
    props: {
      toy: Object,
    },

    computed: {
      createdAt() {
        let time = Math.floor(Math.random() * 50) + 1;
        return time;
      },
    },
  };

  // _id: utilService.makeId(),
  //   name: 'Talking Doll',
  //   price: 123,
  //   labels: ['Doll', 'Battery Powered', 'Baby'],
  //   createdAt: 1631031801011,
  //   inStock: true,
</script>
