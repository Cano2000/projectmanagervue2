import { defineStore } from "pinia";

import { useAuth } from "@/store/auth"

export const useStatusStore = defineStore("status",{
    state: () => {
        return {
            statuses: [],
            baseUrl: "https://projectsapi.ivancano.com/api/statuses"
            // baseUrl: "http://localhost:3000/api/statuses"
        }
    },
    getters: {
        
    },
    actions: {
        async getStatuses() {
            const auth = useAuth();
            
            const uri = `${this.baseUrl}`

            const rawResponse = await fetch(uri, {
                method: "GET",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${auth.token}`
                }
            })

            const response = await rawResponse.json()

            if(response.status == false) {
                return false
            } else {
                this.statuses = response.data
                return true
            }
        },
        async createStatus(name) {
            const auth = useAuth();
            
            const uri = `${this.baseUrl}/register`

            const rawResponse = await fetch(uri, {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    "name": name,
                })
            })

            const response = await rawResponse.json()

            if(response.status == false) {
                return false
            } else {
                
                return true
            }
        },
    },
    persist: true
})

export default useStatusStore