import { defineStore } from "pinia";

import { useAuth } from "@/store/auth"

export const usetaskStore = defineStore("task",{
    state: () => {
        return {
            baseUrl: "https://projectsapi.ivancano.com/api/tasks"
            // baseUrl: "http://localhost:3000/api/tasks"
        }
    },
    getters: {
        
    },
    actions: {
        async getTasksByProject(projectId) {
            const auth = useAuth();
            
            const uri = `${this.baseUrl}/${projectId}`
            
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
        async createTask(task) {
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
                    "title": task.title,
                    "description": task.description,
                    "statusId": task.statusId,
                    "projectId": task.projectId,
                    "userId": auth.id_user
                })
            })

            const response = await rawResponse.json()
            console.log(response.success == false)
            if(response.success == false) {
                return false
            } else {
                return true
            }
        },
        async reorderTasks(task) {
            const auth = useAuth();
            
            const uri = `${this.baseUrl}/reorder`
            
            const rawResponse = await fetch(uri, {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                        "taskId": task.taskId,
                        "newOrder": task.newOrder,
                        "oldOrder": task.oldOrder,
                        "oldStatusId": task.oldStatusId,
                        "newStatusId": task.newStatusId
                })
            })

            const response = await rawResponse.json()
            console.log(response.success == false)
            if(response.success == false) {
                return false
            } else {
                return true
            }
        },
        async removeTask(taskId) {
            const auth = useAuth();
            
            const uri = `${this.baseUrl}/${taskId}`
            
            const rawResponse = await fetch(uri, {
                method: "DELETE",
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
                return true
            }
        },
    },
    persist: true
})

export default usetaskStore