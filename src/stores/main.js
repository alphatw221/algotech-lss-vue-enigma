import { defineStore } from "pinia";

export const userStore = defineStore('user', {
    state: () => {
        return {
            userId: 0,
            userName: undefined,
            email: undefined,
            phone: undefined,
            accessToken: undefined
        }
    }
})