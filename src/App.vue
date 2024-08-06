<template>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    /* overflow: hidden; Asegura que no haya desbordamiento */
    background-image: url('@/assets/loginBackground.webp'); /* Ajusta la ruta según donde tengas la imagen */
    background-size: cover; /* Cubre todo el contenedor, ajustándose al tamaño del mismo */
    background-position: center; /* Centra la imagen en el contenedor */
    background-repeat: no-repeat; /* Evita que la imagen se repita */
    height: 100vh; /* Opcional: ajusta la altura para que cubra toda la pantalla verticalmente */
}
</style>
