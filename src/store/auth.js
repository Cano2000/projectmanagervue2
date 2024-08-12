import { defineStore } from "pinia";

export const useAuth = defineStore("auth",{
    state: () => {
        return {
            token: null,
            // user_name: null,
            id_user: null,
            baseUrl: "https://projectsapi.ivancano.com/api/users"
            // baseUrl: "http://localhost:3000/api/users"
        }
    },
    getters: {
        
    },
    actions: {
        async login(email, password) {
            const uri = `${this.baseUrl}/login`

            const rawResponse = await fetch(uri, {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            })

            const response = await rawResponse.json()

            if(response.status == false) {
                this.token = null
                // this.user_name = null
                this.id_user = null
                return false
            } else {
                this.token = response.data.token
                // this.user_name = response.data.user_name
                this.id_user = response.data.id
                return true
            }
        }
    },
    persist: true
})

export default useAuth