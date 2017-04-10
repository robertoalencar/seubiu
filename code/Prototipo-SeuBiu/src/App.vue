<template>

   
    <div id="app" class="teste">

    <side-bar :rotas="routes" ></side-bar>

     <router-view ></router-view>


  </div>

   

</template>

<script>

  import {routes} from './routes';
  import Sidebar from './components/shared/sidebar/Sidebar.vue';

  export default {

    data : function(){
        return {
          routes : routes.filter(route => route.menu)
        }
    },
    components: {
      'sideBar' : Sidebar,

    },
    
  }
</script>

<style>


</style>