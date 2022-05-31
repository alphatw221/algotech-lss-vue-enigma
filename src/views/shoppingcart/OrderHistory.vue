<template>
    <div>this page is not ready yet</div>
</template>

<script setup>
import { computed, onMounted, provide, ref, watch } from "vue";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
import dom from "@left4code/tw-starter/dist/js/dom";

const layoutStore = useLSSBuyerLayoutStore();


onMounted(() => {
    console.log(layoutStore.userInfo.name)
});



</script>
