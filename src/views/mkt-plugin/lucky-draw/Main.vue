<template>
<div class="flex flex-col h-full box text-lg overflow-y-auto p-10">
    <h1 class="text-center"> Lucky Draw Setting</h1>
    <div class="mt-3 flex">
        <label for="update-profile-form-2" class="form-label mr-10">Campaign Title</label>
        <h2> {{store.campaign_title}}</h2>
    </div>
    <div v-if="drawlist='null'"> 
        <DrawCreate :campaign_id="store.campaign_id" />
        <DrawList /> 
    </div>

    <div v-else>
        <DrawList /> 
    </div>

</div>


</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch, onMounted } from 'vue';
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list"
import DrawCreate from "./DrawCreate.vue";
import DrawList from "./DrawList.vue";

const route = useRoute()
const router = useRouter()
const store = useLSSCampaignListStore()

const drawlist = ref('null')

</script>

<style scoped>
</style> 