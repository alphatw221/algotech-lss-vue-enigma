import { defineStore } from "pinia";
import { ref } from "vue"

export const useLSSCategoryManagementStore = defineStore("CategoryManagement", {
  state: () => ({
    productCategories:ref([]),
    showCreateEditModal:ref(false)
  }),
});
