<template>
  <div class="sidebar" :class="{ collapsed: sidebarStore.isCollapsed }">
    <button @click="sidebarStore.toggleSidebar" class="toggle-button">
      <i :class="currentIcon"></i>
    </button>
    <nav>
      <ul>
        <li v-for="item in menuItems" :key="item.path">
          <router-link :to="item.path" class="nav-item">
            <i :class="item.icon"></i>
            <span v-if="!sidebarStore.isCollapsed">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useSidebarStore } from '@/store/sidebarStore';

const sidebarStore = useSidebarStore();
const currentIcon = ref(sidebarStore.isCollapsed ? 'fas fa-arrow-left' : 'fas fa-bars'); // Icono inicial

const menuItems = ref([
  // { path: '/home', name: 'Inicio', icon: 'fa fa-home' },
  { path: '/projects', name: 'Proyectos', icon: 'fa fa-folder' },
  // { path: '/tasks', name: 'Tareas', icon: 'fa fa-tasks' },
  // { path: '/settings', name: 'Configuración', icon: 'fa fa-cog' }
]);

watch(() => sidebarStore.isCollapsed, (newVal) => {
    // Se ejecuta cuando 'isCollapsed' cambia
    setTimeout(() => {
        currentIcon.value = newVal ? 'fas fa-arrow-left' : 'fas fa-bars';
    }, 150); // Ajustar este tiempo a la mitad de la duración de la animación
});

</script>

<style scoped>
.sidebar {
  width: 250px;
    height: 100vh;
    background-color: black;
    color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    transition: width 0.3s ease;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
}

.sidebar.collapsed {
    width: 70px; /* Ancho cuando está contraído */
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 10px 15px;
}

.nav-item {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
    flex-direction: column;
}

.nav-item:hover {
    text-decoration: underline;
}

.toggle-button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    transition: transform 0.3s ease;
}

.toggle-button i {
    transition: transform 0.3s ease, opacity 0s ease 0.15s; 
    display: block;
    transform-origin: center;
}

.sidebar.collapsed .toggle-button i {
    transform: rotate(180deg); 
}
</style>
