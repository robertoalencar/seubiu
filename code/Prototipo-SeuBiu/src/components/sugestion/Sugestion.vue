<template>

  <div>

 <app-sidebar :rotas="routes"> </app-sidebar>

 <app-table> </app-table>

 </div>
</template>
<script>

  import Sidebar from '../shared/sidebar/Sidebar.vue'
  import Table from '../shared/table/Table.vue'
  import {routes}  from '../../routes';     

export default {
  components: {
      'appSidebar': Sidebar,
      'appTable': Table
  },
    data: function(){
      return {
       routes : routes.filter(route => route.menu)
      }
    }

}
</script>


<style>


</style>