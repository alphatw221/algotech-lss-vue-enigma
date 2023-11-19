<template>
  <div>

    <!-- <ThemeModeSwitcher /> -->
    <CarletBackendTopBar/>
    <CarletBackendMenu /> 


  </div>
</template>

<script setup>
import CarletBackendTopBar from "@/components/carlet-backend-top-bar/Main.vue";
import CarletBackendMenu from "@/components/carlet-backend-menu/Main.vue";
import ThemeModeSwitcher from "@/components/theme-mode-switcher/Main.vue";


import { useCookies } from "vue3-cookies";
import { provide, onMounted, onBeforeMount, ref, computed, watch, getCurrentInstance } from "vue"
import { useRouter ,useRoute} from "vue-router";


const route = useRoute();
const router = useRouter();
const { cookies } = useCookies()


</script>
