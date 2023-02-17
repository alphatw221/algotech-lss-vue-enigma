<template>
    <div class="flex flex-col h-[100%] text-lg p-3 sm:px-10 sm:m-5 gap-3 sm:gap-0" v-if="ready">
        <div class="flex flex-col sm:flex-row justify-between sm:mx-5 gap-3"> 
            <h1 v-if="showDrawlist" class="text-center sm:text-left text-xl sm:text-2xl font-medium my-auto"> {{ $t('lucky_draw.lucky_draw') }} </h1>
            <h1 v-else class="text-center sm:text-left text-xl sm:text-2xl font-medium my-auto"> {{ $t('lucky_draw.lucky_draw_create') }} </h1>
            <button
                v-show="showDrawlist" 
                class="w-40 h-[35px] sm:h-[42px] text-white btn btn-warning btn-rounded mx-auto sm:mx-0 border-[2px] border-slate-100 shadow-lg"
                @click="existsDrawlist = eventBus.emit('changeDrawPage')" >
                <span class="font-bold mr-1 text-[16px]">+</span> {{ $t('lucky_draw.draw_list.create') }}
            </button>
        </div>
        <div class="box sm:mx-5 sm:mt-3">
            <div v-show="!showDrawlist"> 
            <DrawCreate 
                :campaignTitle="campaignTitle"
            />
            </div>
            <div v-show="showDrawlist">
                <DrawList 
                    :luckydrawList="luckydrawList" 
                    :campaignTitle="campaignTitle"
                    :luckyPrizeObj="luckyPrizeObj"
                /> 
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, getCurrentInstance, onUnmounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list"
import { list_campaign_lucky_draw } from '@/api_v2/campaign_lucky_draw';
import { retrieve_campaign } from '@/api_v2/campaign';
import { seller_search_campaign_product } from '@/api_v2/campaign_product';
import DrawCreate from "./DrawCreate.vue";
import DrawList from "./DrawList.vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
const layoutStore = useLSSSellerLayoutStore();
const route = useRoute()
const router = useRouter()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const showDrawlist = ref(false)
const luckydrawList = ref([])
const ready = ref(false)
const campaignTitle = ref('')
const luckyPrizeObj = ref({})

onMounted(() => {
    retrieve_campaign(route.params.campaign_id, layoutStore.alert).then(res => {
        campaignTitle.value = res.data.title
    })
    list_campaign_lucky_draw(route.params.campaign_id, layoutStore.alert).then(res => {
        if (Object.entries(res.data).length > 0) {
            showDrawlist.value = true
            luckydrawList.value = res.data
        }
    })
    var _campaign_id, _category, _keyword, _page, _page_size, _type, _toastify
    seller_search_campaign_product(

        _campaign_id=route.params.campaign_id, 
        _category='', 
        _keyword='', 
        _page=1, 
        _page_size=500, 
        _type = "", 
        _toastify=layoutStore.alert

    )
    
    
    .then(res => {
        for (let i = 0; i < res.data.results.length; i ++) {
            if (res.data.results[i].type === 'lucky_draw') {
                luckyPrizeObj.value[res.data.results[i].id] = Math.ceil(res.data.results[i].qty_for_sale - res.data.results[i].qty_add_to_cart)
            }
        }
        ready.value = true
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