<template>
    <div class="flex flex-col h-full box text-lg overflow-y-auto p-10">
        <h1 class="text-center"> Lucky Draw Setting</h1>
        <div class="mt-3 flex">
            <label for="update-profile-form-2" class="form-label mr-10">Campaign Title</label>
            <h2> {{store.campaign_title}}</h2>
        </div>
        <div v-if="existsDrawlist == false"> 
            <DrawCreate :campaign_id="store.campaign_id" />
        </div>
        <div v-else-if="existsDrawlist == true">
            <DrawCreate :campaign_id="store.campaign_id" />
            <DrawList :luckydrawList="luckydrawList" /> 
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list"
import { list_campaign_lucky_draw } from '@/api_v2/campaign_lucky_draw';
import DrawCreate from "./DrawCreate.vue";
import DrawList from "./DrawList.vue";

const route = useRoute()
const router = useRouter()
const store = useLSSCampaignListStore()
const existsDrawlist = ref(false)
const luckydrawList = ref([])

onMounted(() => {
    list_campaign_lucky_draw(route.params.campaign_id).then(res => {
        console.log(res.data)
        if (Object.entries(res.data).length > 0) {
            existsDrawlist.value = true
            luckydrawList.value = res.data
        }
    }).catch(error => {
        console.log(error);
    })
})


</script>

<style scoped>
</style> 