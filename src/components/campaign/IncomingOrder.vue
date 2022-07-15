<template>
    <div class="box col-span-12 col-start-1 row-start-3 row-span-2 max-h-screen mt-0
        lg:row-start-1 lg:row-span-3 lg:col-start-6 lg:col-span-7  lg:h-[100%]
        2xl:row-start-1 2xl:row-span-6 2xl:col-span-4 2xl:col-start-9 
        ">
        <div class="h-full flex flex-col">
            <div class="flex justify-between mb-3">
                <h2 class="text-lg font-medium m-3 ml-5">Incoming Order</h2>
                <button class="btn btn-primary w-32 mt-auto mr-3" @click="router.push({ name: 'lucky-draw', query: { behavior: 'drawInstantly' }, params: { campaign_id: route.params.campaign_id} })">
                    Go Lucky Draw 
                </button>
            </div>
            
            <div class="overflow-auto scrollbar-hidden">
                <table class="table table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th class="whitespace-nowrap bg-dark" v-for="column in incoming_order_columns"
                                :key="column.key">
                                {{ column.name }}
                            </th>
                        </tr>
                    </thead>
                
                    <tbody>
                        <tr v-for="order, index in store.incomingOrders" :key="index">
                            <td>#{{ order.id }}</td>
                            <td>
                                <div v-if="order.platform === 'facebook'" class="w-10 h-10 image-fit">
                                    <div class="w-10 h-10 image-fit">
                                        <img src="/src/assets/images/lss-img/facebook.png" />
                                    </div>
                                </div>
                                <div v-else-if="order.platform === 'instagram'" class="w-10 h-10 image-fit">
                                    <div class="w-10 h-10 image-fit">
                                        <img src="/src/assets/images/lss-img/instagram.png" />
                                    </div>
                                </div>
                                <div v-else-if="order.platform === 'youtube'" class="w-10 h-10 image-fit">
                                    <div class="w-10 h-10 image-fit">
                                        <img src="/src/assets/images/lss-img/youtube.png" />
                                    </div>
                                </div>
                            </td>
                            <td>{{ order.customer_name }}</td>
                            <td>{{ order.currency_sign }}{{ parseFloat(order.subtotal).toFixed(2) }}</td> 
                            <td>
                                <EyeIcon class="click-icon" @click="routeToDetailPage(order.id)"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>        
</template>

<script setup>
import {list_campaign_pre_order} from '@/api/campaign_pre_order';
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { useRoute, useRouter } from "vue-router";
import { onMounted, onUnmounted, ref, getCurrentInstance } from "vue";

const router = useRouter()
const route = useRoute()

const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const store = useCampaignDetailStore();
const imagePath=import.meta.env.VITE_APP_IMG_URL
const incoming_order_columns= [
    { name: "Order No", key: "order_no" },
    { name: "Platform", key: "platform" },
    { name: "Name", key: "name" },
    { name: "Amount", key: "amount" },
    { name: "Detail", key: "detail" },
]


// route.params.campaign_id

onMounted(()=>{
        list_campaign_pre_order(route.params.campaign_id).then(res => {
            store.incomingOrders = res.data
        })
        
})




const routeToDetailPage = (order_id)=>{
    router.push({name:'sellerOrder',params:{'order_id':order_id},query:{'type':'pre_order'}})
}




</script>

<style scoped>
.demo-breadcrumb-separator {
    color: #ff5500;
    padding: 0 5px;
}

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
}
.click-icon:hover {
	cursor: pointer;
}
</style>