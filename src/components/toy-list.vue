<template>
  <ul class="toy-list">
    <li v-for="toy in toys" :key="toy._id">
      <button @click.native="$emit('removeToy', toy._id)">X</button>
      <toy-preview :toy="toy" />
    </li>
  </ul>
</template>

<script>
  import toyPreview from './toy-preview.vue';
  export default {
    name: 'toy-list',
    props: {
      toys: Object,
    },

    components: {
      toyPreview,
    },
  };
</script>
