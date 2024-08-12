<template>
    <!-- <div class="loader" :class="{ 'loader-error': isError, 'loader-success': isSuccess }">
      <div class="loader-icon" v-if="isLoading"></div>
      {{ message }}
    </div> -->
    <div class="loaderPage">
        <div class="loader" >
            <div class="loader-icon" v-if="isLoading"></div>
            <span v-if="message == ''">
                Cargando, por favor espera...
            </span>
            <span v-else>
                {{ message }}
            </span>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoaderComp',
    props: {
      isLoading: Boolean,
      isError: Boolean,
      isSuccess: Boolean,
      message: String
    }
  }
  </script>
  
  <style scoped>
.loaderPage{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ffffff7a;
    top: 0px;
    z-index: 1;
}

  .loader {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh; /* Ajusta a la altura completa de la ventana */
  font-size: 18px;
  color: #555;
}

.loader-icon {
  border: 5px solid #f3f3f3; /* Color del fondo del círculo */
  border-top: 5px solid #3498db; /* Color del borde superior */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
  
  .loader-error {
    color: #e74c3c;
  }
  
  .loader-success {
    color: #2ecc71;
  }
  </style>
  