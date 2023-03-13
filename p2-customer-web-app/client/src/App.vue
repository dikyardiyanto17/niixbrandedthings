<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useCounterStore } from './stores/counter';
export default {
  name: "app",
  components: {
    Navbar
  },
  computed: {
    ...mapState(useCounterStore, ['products']),
    ...mapWritableState(useCounterStore, ['isLogged'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchProducts', 'fetchCategories'])
  },
  created() {
    this.fetchProducts()
    this.fetchCategories()
    if (localStorage.access_token) {
      this.isLogged = true
    } else this.isLogged = false
  }
}

</script>

<template>
  <Navbar />
  <RouterView />
</template>
