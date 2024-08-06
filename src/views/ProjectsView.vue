<template>
    <div class="home">
      <SideBar/>
      <div>
        <h1>Tabla de Projectos</h1>
        <span class="projectTable">
          <ProjectsTable/>
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  // @ is an alias to /src
  import ProjectsTable from '@/components/ProjectsTable.vue';
  import SideBar from '@/components/SideBar.vue'
  
  </script>
  <style>
  .home{
    background-color: #ccc;
    height: 100vh;
    position: relative;
    top: -8px;
  }
  .projectTable{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
  }
  </style>