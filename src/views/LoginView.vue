<template>
<div class="container ">
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
    router.push({name: "home"})
  }
}

</script>
<style scoped>
.container {
    margin-top: 19%;
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
}
</style>