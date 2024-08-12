<template>
<div class="container ">
  <img src="@/assets/loginBackground2.jpg" alt="" class="background-image">
    <form class="loginForm">
        <div class="form-floating mb-3 inputForm">
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="email" placeholder="name@example.com">
            <label for="email" class="form-label">Email address</label>
        </div>
        <div class="form-floating mb-3 inputForm">
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
            <label for="password" class="form-label">Password</label>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="loginUser">Submit</button>
    </form>
    <p class="alert ">{{ feedback }}</p>
</div> 
</template>

<script setup>

import {ref} from "vue"
import { useAuth } from '@/store/auth'
import router from "@/router";

const store = useAuth()

const email = ref("")
const password = ref("")
const feedback = ref("")

const loginUser = async ()  => {
  feedback.value = "Enviando..."
  const response = await store.login(email.value, password.value)

  if(!response) {
    feedback.value = "Error en el logeo"
  } else {
    router.push({name: "projects"})
  }
}

</script>
<style scoped>
.container {
    /* margin-top: 19%; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.loginForm {
    width: 40%;
    background: linear-gradient(to bottom, #2c3e50, #4b636e);
    padding: 1em;
    border-radius: 0.375rem;
    border: #2c3e50 3px solid;
    position: absolute;
    position: absolute;
    top: 50%; /* Centra el formulario verticalmente */
    left: 50%; /* Centra el formulario horizontalmente */
    transform: translate(-50%, -50%); /* Ajusta precisamente el centro del formulario */
    z-index: 10;
}

.background-image {
    position: fixed; /* O puedes usar 'absolute' si no quieres que se mueva al hacer scroll */
    top: 0;
    left: 0;
    width: 100vw; /* 100% del viewport width */
    height: 100vh; /* 100% del viewport height */
    /* background: url('@/assets/loginBackground2.jpg') no-repeat center center; */
    background-size: cover; /* Asegura que la imagen cubra toda el área disponible */
    z-index: -1; /* Coloca la imagen detrás de otros elementos */
  }

/* .container {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    
    background-image: url('@/assets/loginBackground2.jpg'); 
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat; 
    height: 100vh; 
} */
</style>