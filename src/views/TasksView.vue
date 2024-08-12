<template>
    <div class="home">
        <SideBar/>
        <div class="background">
            <span class="tasks">
            <TaskComponent/>
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
background-color: #3d3d3d;
height: 100vh;
position: relative;
top: -8px;
}

.background {
    background-color: #3d3d3d;
}

</style>