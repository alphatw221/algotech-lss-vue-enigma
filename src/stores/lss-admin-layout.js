import { defineStore } from "pinia";
import { ref } from "vue"

export const useLSSAdminLayoutStore = defineStore("adminLayout", {
  state: () => ({
    menu: [
    ],
    showMobileMenu: ref(false),
    isAuthenticated: ref(false),
    userInfo: ref({}),
    notification:ref(),
    alert:ref(),
  }),
});
