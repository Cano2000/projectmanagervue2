import { defineStore } from "pinia";

import { useAuth } from "@/store/auth"

export const useCommentStore = defineStore("comment",{
    state: () => {
        return {
            projects: [],
            baseUrl: "https://projectsapi.ivancano.com/api/comments"
            // baseUrl: "http://localhost:3000/api/comments"
        }
    },
    getters: {
        
    },
    actions: {
        async createComment(comment) {
            const auth = useAuth();
            
            const uri = `${this.baseUrl}/create`

            const rawResponse = await fetch(uri, {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/json',
                    'Accepts': 'Application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    "text": comment.text,
                    "taskId": comment.taskId,
                    "userId": auth.id_user
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

export default useCommentStore