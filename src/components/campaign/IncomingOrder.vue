<template>
    <div class="box mt-2 min-h-[50%] w-full max-h-screen
            md:min-h-[40%] md:h-[42vh] 
            2xl:h-full">
        <div class="h-full flex flex-col">
            <!-- <div class="flex w-full m-3"> 
                <h2 class="text-lg font-medium ml-5 mr-auto">Incoming Order</h2>

                <button type='button' class="w-36 mr-3 shadow-md btn btn-primary" @click="routeTOLuckyDraw()">
                            Lucky Draw
                </button >
                <button type='button' class="w-36 mr-6 shadow-md btn btn-primary" @click="routeTOManageOrder()">
                            Manage Order
                </button >
            </div> -->

            <div class="flex justify-between flex w-full h-16">
                <div class="flex">
                    <h2 class="text-lg font-medium ml-5 my-auto">{{$t('campaign_live.incoming.incoming_order')}}</h2>
                    <Tippy 
                        class="rounded-full w-50 my-auto" 
                        data-tippy-allowHTML="true" 
                        data-tippy-placement="right" 
                        :content="$t('tooltips.campaign_live.incoming_order')" 
                        theme='light'
                    > 
                        <HelpCircleIcon class="inline-block w-5 -mt-1 tippy-icon" />
                    </Tippy> 
                </div> 
                <button class="btn btn-primary h-fit my-auto mr-6 w-40" 
                    @click="routeTOManageOrder()" 
                    :disabled="layoutStore.userInfo.user_subscription.status === sandboxMode"> 
                  {{ $t(`campaign_live.incoming.manage_order` ) }}
                </button>
            </div>
            
            <div class="overflow-auto max-h-[90%]">
                <table class="table table-sm h-full">
                    <thead class="table-dark text-center">
                        <tr>
                            <th class="whitespace-nowrap bg-dark" v-for="column in incoming_order_columns"
                                :key="column.key">
                                {{ $t(`campaign_live.incoming.table.`+column.name) }}
                            </th>
                        </tr>
                    </thead>
                 
                    <tbody>
                        <tr v-if="store.incomingOrdersDict.length === 0" class="h-[300px]">
                            <td class="mt-40 text-center border-none text-sm md:text-lg text-slate-500" :colspan="4" > 
                                {{ $t(`campaign_live.incoming.table.no_order`) }}
                            </td> 
                        </tr> 
                        <tr v-for="(pre_order, key, index) in store.incomingOrdersDict" :key="index">
                            <td>#{{ pre_order.id }}</td>
                            <td>
                                <div v-if="pre_order.platform === 'facebook'" class="w-10 h-10 image-fit mx-auto">
                                    <div class="w-10 h-10 image-fit">
                                        <img src="/src/assets/images/lss-img/facebook.png" />
                                    </div>
                                </div>
                                <div v-else-if="pre_order.platform === 'instagram'" class="w-10 h-10 image-fit mx-auto">
                                    <div class="w-10 h-10 image-fit">
                                        <img src="/src/assets/images/lss-img/instagram.png" />
                                    </div>
                                </div>
                                <div v-else-if="pre_order.platform === 'youtube'" class="w-10 h-10 image-fit mx-auto">
                                    <div class="w-10 h-10 image-fit">
                                        <img src="/src/assets/images/lss-img/youtube.png" />
                                    </div>
                                </div>
                                <div v-else-if="pre_order.platform === 'twitch'" class="w-10 h-10 image-fit mx-auto">
                                    <div class="w-10 h-10 image-fit">
                                        <img src="/src/assets/images/lss-img/twitch.png" />
                                    </div>
                                </div>
                                <div v-else-if="pre_order.platform === 'tiktok'" class="w-10 h-10 image-fit mx-auto">
                                    <div class="w-10 h-10 image-fit">
                                        <img src="/src/assets/images/lss-img/tiktok_black_bg.png" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <template v-if="pre_order.customer_name != ''"> {{ pre_order.customer_name }} </template>
                                <template v-else> Guest </template>  
                            </td>
                            <td v-if="store.campaign">
                                {{ store.campaign.currency }}
                                {{ (Math.floor(pre_order.subtotal * (10 ** store.campaign.decimal_places)) / 10 ** store.campaign.decimal_places).toLocaleString('en-US')}}
                                {{ store.campaign.price_unit?$t(`global.price_unit.${store.campaign.price_unit}`):''}}
                            </td> 
                            <td>
                                <Tippy 
                                    class="rounded-full w-fit" 
                                    data-tippy-allowHTML="true" 
                                    data-tippy-placement="right" 
                                    :options="{ theme: 'light' }"
                                    :content="$t('tooltips.campaign_live.view_icon')" 
                                > 
                                    <!-- <EyeIcon class="click-icon" @click="routeToDetailPage(pre_order)"/>  -->
                                    <SimpleIcon icon="view" @click="routeToDetailPage(pre_order)"/>
                                </Tippy> 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>        
</template>

<script setup>

import { seller_list_pre_order } from '@/api_v2/pre_order'
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useRoute, useRouter } from "vue-router";
import { onMounted, onUnmounted, ref, getCurrentInstance, computed, watch } from "vue";
import SimpleIcon from '../../global-components/lss-svg-icons/SimpleIcon.vue';

const router = useRouter()
const route = useRoute()

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const store = useCampaignDetailStore();
const layoutStore = useLSSSellerLayoutStore()

const sandboxMode = ref("test")

const incoming_order_columns= [
    { name: "order_number", key: "order_number" },
    { name: "platform", key: "platform" },
    { name: "name", key: "name" },
    { name: "amount", key: "amount" },
    { name: "null", key: "detail" },
]

onMounted(()=>{
    store.incomingOrdersDict = {}
    seller_list_pre_order(route.params.campaign_id).then(res => {
        res.data.forEach(pre_order => {
            store.incomingOrdersDict[pre_order.id]=pre_order
        });
        store.incomingOrders = res.data  //delete if no longer needed
    })
        
})

const hideDropDown = ()=>{
  dom('.dropdown-menu').removeClass('show')
}


const routeToDetailPage = (pre_order)=>{
    router.push({name:'sellerOrder',params:{'campaign_id':route.params.campaign_id,'order_id':pre_order.id},query:{'type':'pre_order'}})
}

const routeTOManageOrder = ()=>{
    router.push({name:'manage-order',params:{'campaign_id':route.params.campaign_id}})
}

// const routeTOLuckyDraw = ()=>{
//     router.push({ name: 'lucky-draw', query: { behavior: 'drawInstantly' }, params: { campaign_id: route.params.campaign_id} })
//     hideDropDown()
// }
// const toDrawList = ()=>{
//     router.push({ name: 'lucky-draw', params: { campaign_id: route.params.campaign_id} })
//     hideDropDown()
// }

</script>

<style scoped>
.form-check-input {
    border-color: black !important;
}
.table th {
    /*padding-left: 0 !important;*/
    padding: 5px !important;
    position: sticky !important; 
    top: 0 !important;
    z-index: 9;
}

.table td {
    /*padding-left: 0 !important;*/
    padding: 5px !important;
    border-collapse: collapse;
    overflow-wrap: break-word;
    max-width: 95px;
    height: 42px;
    text-align: center;
}
.click-icon:hover {
	cursor: pointer;
}

</style>