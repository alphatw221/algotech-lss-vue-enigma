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

            <div class="shrink-0 justify-between flex w-full h-16">
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
            
            <div class="shrink-0 overflow-auto h-[80%] 2xl:h-[90%]">
                <table class="table table-sm">
                    <thead class="table-dark text-center">
                        <tr>
                            <th class="whitespace-nowrap bg-dark w-fit" v-for="column in incoming_order_columns"
                                :key="column.key">
                                {{ $t(`campaign_live.incoming.table.`+column.name) }}
                            </th>
                        </tr>
                    </thead>
                 
                    <tbody>
                        <tr v-if="campaignDetailStore.incomingOrdersDict.length === 0" class="h-[300px]">
                            <td class="mt-40 text-center border-none text-sm md:text-lg text-slate-500" :colspan="4" > 
                                {{ $t(`campaign_live.incoming.table.no_order`) }}
                            </td> 
                        </tr> 
                        <template v-for="(cart, key, index) in campaignDetailStore.incomingOrdersDict" :key="index">
                            
                            <template v-for="(qty, campaign_product_id, index) in cart.products" :key="index">
                            
                                <tr >
                                    <td>#{{ cart.id }}</td>
                                    <td>
                                        <div v-if="cart.platform === 'facebook'" class="w-8 h-8 image-fit mx-auto">
                                            <div class="w-10 h-10 image-fit">
                                                <img src="/src/assets/images/lss-img/facebook.png" />
                                            </div>
                                        </div>
                                        <div v-else-if="cart.platform === 'instagram'" class="w-8 h-8 image-fit mx-auto">
                                            <div class="w-10 h-10 image-fit">
                                                <img src="/src/assets/images/lss-img/instagram.png" />
                                            </div>
                                        </div>
                                        <div v-else-if="cart.platform === 'youtube'" class="w-8 h-8 image-fit mx-auto">
                                            <div class="w-10 h-10 image-fit">
                                                <img src="/src/assets/images/lss-img/youtube.png" />
                                            </div>
                                        </div>
                                        <div v-else-if="cart.platform === 'twitch'" class="w-8 h-8 image-fit mx-auto">
                                            <div class="w-10 h-10 image-fit">
                                                <img src="/src/assets/images/lss-img/twitch.png" />
                                            </div>
                                        </div>
                                        <div v-else-if="cart.platform === 'tiktok'" class="w-8 h-8 image-fit mx-auto">
                                            <div class="w-10 h-10 image-fit">
                                                <img src="/src/assets/images/lss-img/tiktok_black_bg.png" />
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-[12px]">
                                        <template v-if="cart.customer_name != ''"> {{ cart.customer_name }} </template>
                                        <template v-else> Guest </template>  
                                    </td>
                                    <!-- <td v-if="campaignDetailStore.campaign">
                                        {{ campaignDetailStore.campaign.currency }}
                                        {{ (Math.floor(pre_order.subtotal * (10 ** campaignDetailStore.campaign.decimal_places)) / 10 ** campaignDetailStore.campaign.decimal_places).toLocaleString('en-US')}}
                                        {{ campaignDetailStore.campaign.price_unit?$t(`global.price_unit.${campaignDetailStore.campaign.price_unit}`):''}}
                                    </td>  -->
                                    <!-- <td>{{campaignDetailStore.campaignProductDict[campaign_product_id]?.name}}</td> -->
                                    <td >
                                        <div class="flex flex-col h-fit mt-3">
                                            <img :src="campaignDetailStore.campaignProductDict[campaign_product_id]?.image" class="h-8 object-cover"/>
                                            <span class="mx-auto font-medium"> {{campaignDetailStore.campaignProductDict[campaign_product_id]?.order_code}}</span> 
                                        </div>
                                    </td>
                                    <td>{{qty}}</td>
                                    
                                    <td>
                                        <div class="flex flex-row gap-1"> 
                                            <a>
                                                <Tippy 
                                                    data-tippy-allowHTML="true" 
                                                    data-tippy-placement="right" 
                                                    :options="{ theme: 'light' }"
                                                    :content="$t('tooltips.campaign_live.view_icon')" 
                                                > 
                                                    <SimpleIcon icon="viewOrder" color="#334155" @click="routeToDetailPage(cart)"  class="sm:mx-auto w-6" width="24" height="23" />
                                                </Tippy> 
                                            </a>
                                            <a  @click="copyCartLink(cart)">
                                                <Tippy  :content="$t('tooltips.manage_order.link_icon')" :options="{ theme: 'light' }"> 
                                                    <SimpleIcon icon="share" color="#334155" class="sm:mx-auto w-6" width="24" height="23" />
                                                </Tippy>
                                            </a>
                                        </div>
                                    </td>
                                </tr>

                            </template>
                            <!-- CART PRODUCTS LIST -->

                            <!-- <template v-for="(qty, campaign_product_id, index) in cart.products" :key="index">
                                <tr v-if="qty>0">
                                    <td v-for="(column,column_index) in product_columns" :key="column_index">
                                        
                                        


                                        <template v-if="column.key=='image'">
                                            <img data-action="zoom" :src="campaignDetailStore.campaignProductDict[campaign_product_id]?.[column.key]" class="w-10 h-10 image-fit mx-auto" />
                                        </template>
                                        <template v-else-if="column.key=='qty'">
                                            {{qty}}
                                        </template>
                                        <template v-else-if="column.key=='subtotal'">
                                            {{(campaignDetailStore.campaignProductDict[campaign_product_id]?.price||0)*qty}}
                                        </template>
                                        <template v-else>
                                            {{campaignDetailStore.campaignProductDict[campaign_product_id]?.[column.key]}}
                                        </template>







                                    </td>
                                </tr>
                            </template> -->
                        </template>


                    </tbody>
                </table>
            </div>
        </div>
    </div>        
</template>

<script setup>

// import { seller_list_pre_order } from '@/api_v2/pre_order'
import { seller_list_cart, get_cart_oid } from '@/api_v2/cart'
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { useRoute, useRouter } from "vue-router";
import { onMounted, onUnmounted, ref, getCurrentInstance, computed, watch } from "vue";
import SimpleIcon from '../../global-components/lss-svg-icons/SimpleIcon.vue';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"


const layoutStore = useLSSSellerLayoutStore()
const router = useRouter()
const route = useRoute()


const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const campaignDetailStore = useCampaignDetailStore();
const baseURL = import.meta.env.VITE_APP_WEB

const sandboxMode = ref("test")

const incoming_order_columns= [
    { name: "order_number", key: "order_number" },
    { name: "platform", key: "platform" },
    { name: "name", key: "name" },
    { name: "product", key: "product" },
    { name: "qty", key: "qty" },
    // { name: "amount", key: "amount" },
    { name: "null", key: "detail" },
]

// const product_columns = [
//     { name: "null", key: null },
//     { name: "image", key: "image" },
//     { name: "name", key: "name" },
//     { name: "price", key: "price" },
//     { name: "type", key: "type" },
//     { name: "qty", key: "qty" },
//     { name: "subtotal", key: "subtotal"}
// ]


onMounted(()=>{
    campaignDetailStore.incomingOrdersDict = {}
    seller_list_cart(route.params.campaign_id).then(res => {
        res.data.forEach(cart => {
            campaignDetailStore.incomingOrdersDict[cart.id]=cart
        });
        campaignDetailStore.incomingOrders = res.data  //delete if no longer needed
    })
})

const hideDropDown = ()=>{
  dom('.dropdown-menu').removeClass('show')
}


const routeToDetailPage = (cart)=>{
    // router.push({name:'seller-order-detail',params:{'campaign_id':route.params.campaign_id,'order_id':cart.id},query:{'type':'cart'}})
    router.push({name:'seller-cart-detail',params:{'campaign_id':route.params.campaign_id,'cart_id':cart.id}})
}

const routeTOManageOrder = ()=>{
    router.push({name:'manage-campaign-order',params:{'campaign_id':route.params.campaign_id}})
}

const copyCartLink = (cart) => {
    get_cart_oid(cart.id, layoutStore.alert).then(
        res =>{

            if(layoutStore.userInfo.user_subscription?.user_plan?.plugins?.easy_store){
                navigator.clipboard.writeText(`${baseURL}/buyer/recaptcha/easy_store/${res.data}`).then(()=>{
                    layoutStore.notification.showMessageToast("copied!")
                })
            }else{
                navigator.clipboard.writeText(`${baseURL}/buyer/cart/${res.data}`).then(()=>{
                    layoutStore.notification.showMessageToast("copied!")
                })
            }
            
    })
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