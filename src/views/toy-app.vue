<template>
  <h1>{{ msg }}</h1>
  <filter-by></filter-by>
  <toy-list @removeToy="removeToy" :toys="toys"></toy-list>
</template>
<script>
  import toyList from '../components/toy-list.vue';
  import filterBy from '../components/toy-filter.vue';
  export default {
    name: 'toy-app',
    data() {
      return {
        msg: 'Hello from App',
      };
    },
    methods: {
      removeToy(id) {
        console.log('the remv', id);
        this.$store.dispatch({ type: 'removeToy', id });
      },
    },
    computed: {
      toys() {
        console.log('from app', this.$store.getters.toysToDisplay);
        return this.$store.getters.toysToDisplay;
      },
    },
    created() {
      this.$store.dispatch({ type: 'loadToys' }).then(() => {});
    },
    components: {
      toyList,
      filterBy,
    },
  };
</script>
