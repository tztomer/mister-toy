<template>
  <div class="preview">
    <span>{{ toy.name }}</span>
    <span>{{ toy.price }}</span>
    <span>{{ toy.labels.slice(',').join(',') }}</span>
    <span>{{ $filters.createdAt(toy.createdAt) }}</span>
    <span>Toy available {{ toy.inStock ? 'Yes' : 'No' }}</span>
    <router-link :to="'/toy/details/' + toy._id">Details</router-link>
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
