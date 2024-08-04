<template>
  <div id="app">
    <PaginaWeb v-if="isAuthenticated" />
    <PaginaComponent v-else @authenticated="handleAuthentication" />
    <CreateNews/>
    <NewsList/>

  </div>
</template>

<script>
import PaginaComponent from './views/PaginaComponent.vue'; 
import PaginaWeb from './views/PaginaWeb.vue';


export default {
  name: 'App',
  components: {
    PaginaComponent,
    PaginaWeb
  },
  data() {
    return {
      isAuthenticated: false
    };
  },
  methods: {
    handleAuthentication() {
      this.isAuthenticated = true;
    }
  }
}
</script>

<style>
</style>
