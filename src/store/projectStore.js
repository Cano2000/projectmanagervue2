import { defineStore } from "pinia";

import { useAuth } from "@/store/auth"

export const useProjectStore = defineStore("project",{
    state: () => {
        return {
            // baseUrl: "https://bdoapi.ivancano.com/api"
            baseUrl: "http://localhost:3000/api/project"
        }
    },
    getters: {
        
    },
    actions: {
        async getProjects() {
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
                return response
            }
        },
        async createProject(name, description) {
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
                    "description": description
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

export default useProjectStore