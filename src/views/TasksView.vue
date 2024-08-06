<template>
    <div class="home">
        <SideBar/>
        <div>
            <h1>Tabla de Tareas</h1>
            <span class="projectTable">
            <TaskComponent/>
            <!-- <DoubleTaskComponent/> -->
            </span>
        </div>
    </div>
</template>
  
<script setup>
// @ is an alias to /src
import TaskComponent from '@/components/TaskComponent.vue';
import SideBar from '@/components/SideBar.vue'
// import DoubleTaskComponent from '@/components/DoubleTaskComponent.vue'

</script>
<style>
.home{
background-color: #ccc;
height: 100vh;
position: relative;
top: -8px;
}

</style>