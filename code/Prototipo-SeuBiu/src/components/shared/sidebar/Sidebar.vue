<template>

<div class="new">

<aside class="app-sidebar" id="sidebar">
  <div class="sidebar-header">
    <span class="sidebar-brand"><span class="highlight" >SeuBiu </span> Admin</span>
    <button type="button" class="sidebar-toggle">
      <i class="fa fa-times"></i>
    </button>
  </div>


  <div class="sidebar-menu">
    <ul class="sidebar-nav">
      <li v-for="rota in rotas">
          <router-link  class="title" :to="rota.path ? rota.path : '/' ">
          <div class="icon">
            <i class="fa fa-tasks" aria-hidden="true"></i>
          </div>
          <div class="title"> {{ rota.name }} </div>
        </router-link>
      </li>
    </ul>
  </div>

  </aside>

  </div>




  </template>

  <script>
    export default{
          props : ['rotas']
          
    }
  </script>

  <style scoped>
    new{
      float: left;
      width: auto;
    }
  
  </style>