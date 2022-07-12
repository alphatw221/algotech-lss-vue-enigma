<template>
    <div class="flex flex-col h-full box text-lg overflow-y-auto p-10" v-if="ready">
        <h1 class="text-center"> Lucky Draw </h1>
        <div v-show="!showDrawlist"> 
            <DrawCreate 
                :campaignTitle="campaignTitle"
            />
        </div>
        <div v-show="showDrawlist">
            <DrawList 
                :luckydrawList="luckydrawList" 
                :campaignTitle="campaignTitle"
            /> 
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, getCurrentInstance, onUnmounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list"
import { list_campaign_lucky_draw } from '@/api_v2/campaign_lucky_draw';
import { retrieve_campaign } from '@/api_v2/campaign'
import DrawCreate from "./DrawCreate.vue";
import DrawList from "./DrawList.vue";

const route = useRoute()
const router = useRouter()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const store = useLSSCampaignListStore()
const showDrawlist = ref(false)
const luckydrawList = ref([])
const ready = ref(false)
const campaignTitle = ref('')


onMounted(() => {
    retrieve_campaign(route.params.campaign_id).then(res => {
        campaignTitle.value = res.data.title
    }).catch(err => {
        console.log(err);
    })

    list_campaign_lucky_draw(route.params.campaign_id).then(res => {
        if (Object.entries(res.data).length > 0) {
            showDrawlist.value = true
            luckydrawList.value = res.data
        }
        ready.value = true
    }).catch(err => {
        console.log(err);
    })

    eventBus.on('changeDrawPage', () => { 
        showDrawlist.value = !showDrawlist.value 
    })
})

onUnmounted(() => {
    eventBus.off('changeDrawPage')
})


</script>

<style scoped>
</style> 