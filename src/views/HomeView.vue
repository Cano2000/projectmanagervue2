<template>
  <div class="home">
    <SideBar/>
    <HelloWorld/>
  </div>
</template>

<script setup>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SideBar from '@/components/SideBar.vue'

</script>
<style>
.home{
  background-color: #ccc;
  height: 100vh;
  position: relative;
  top: -8px;
}
</style>