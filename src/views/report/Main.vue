<template>
    <ReportTable /> 
</template>

<script setup>
import ReportTable from "./ReportTable.vue";
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
// import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
// const sellerCartStore = useSellerCartStore()
// const layoutStore = useLSSSellerLayoutStore()
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus



onMounted(()=>{
})

</script>