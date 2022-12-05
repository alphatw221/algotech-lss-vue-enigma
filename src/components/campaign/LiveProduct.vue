<template>
    <div
        class="box mt-2 min-h-[30%] w-full max-h-screen
            md:min-h-[40%] md:h-[45vh] 
            2xl:h-full">
        <div class="flex flex-col h-full"> 

            <div class="shrink-0 justify-between flex w-full h-16">
                <h2 class="text-lg font-medium ml-5 my-auto">{{$t('campaign_live.product.product')}}</h2>

                <!-- TEMP -->
                <Dropdown placement="bottom-start">
                <DropdownToggle role="button" class="block w-5 h-5" href="javascript:;">
                  <span>.</span>
                </DropdownToggle>
                <DropdownMenu class="max-w-60 pt-2">
                  <DropdownContent class="w-44 text-center">
                    <DropdownItem class="w-fit text-center whitespace-nowrap" 
                      @click="routeToEditCampaignPage()"> 
                      <SimpleIcon icon="edit" color="#2d8cf0" class="mr-1"/>
                      {{$t("campaign_list.campaign_list_table.edit_campaign")}} 
                    </DropdownItem>
                    <DropdownItem class="w-fit text-center whitespace-nowrap" 
                      @click="routeToEditCampaignProductPage()"> 
                      <SimpleIcon icon="edit" color="#2d8cf0" class="mr-1"/>
                      {{$t("campaign_list.campaign_list_table.edit_campaign_product")}}  
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown> 


                <template v-if="!(route.query.status =='history') && (!layoutStore?.userInfo?.user_subscription?.user_plan?.hide?.add_product_button )">
                    <Dropdown class="inline-block my-auto">
                        <DropdownToggle class="w-40 mr-6 shadow-md btn btn-primary">
                            {{$t('campaign_live.product.add_product')}}
                        </DropdownToggle>
                        <DropdownMenu class="w-48">
                            <DropdownContent>
                                <DropdownItem @click="store.showInstantlyAddProductModal = true">
                                    {{$t('campaign_live.product.instantly')}}
                                </DropdownItem>
                                <DropdownItem @click="store.showAddProductFromStockModal = true">
                                    {{$t('campaign_live.product.from_stock')}}
                                </DropdownItem>
                            </DropdownContent>
                        </DropdownMenu>
                    </Dropdown>
                </template>
            </div>

            <div class="shrink-0 overflow-auto  h-[80%] 2xl:h-[91%]">
                <table class="table table-sm">
                    <thead class="table-dark">
                        <tr class="relative">
                            <th class="whitespace-nowrap bg-dark md:hidden">
                                {{ $t('campaign_live.product.modal_column.activate') }}
                            </th>
                            <template v-for="column in product_columns.slice(0, -1)" :key="column.key">
                            <template v-if="column.name == 'cart_sold_left'"> 
                                <th
                                    class="whitespace-nowrap bg-dark text-[8px]">
                                    {{ $t(`campaign_live.product.modal_column.`+column.name) }}
                                </th>
                            </template>
                            <template v-else-if="column.name == 'price'"> 
                                <th
                                    class="whitespace-nowrap bg-dark text-right">
                                    {{ $t(`campaign_live.product.modal_column.`+column.name) }}
                                </th>
                            </template>
                            <template v-else> 
                                <th
                                    class="whitespace-nowrap bg-dark">
                                    {{ $t(`campaign_live.product.modal_column.`+column.name) }}
                                </th>
                            </template>
                            

                                
                            </template>
                            <th class="whitespace-nowrap bg-dark lgAct">
                                {{ $t('campaign_live.product.modal_column.activate') }}
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-if="store.campaignProducts.length === 0" class="h-[250px]">
                            <td class="mt-40 text-center border-none text-sm md:text-lg text-slate-500" :colspan="6" > 
                                {{ $t(`campaign_live.product.modal_column.no_product`) }}
                            </td> 
                        </tr> 
                        <tr v-for="product,index in store.campaignProducts" :key="index" :class="{'text-slate-400': !product.active}">

                            <td class="md:hidden">
                                <div class="m-auto form-check form-switch w-fit">
                                    <input
                                        @click="toggle_campaign_product_active(product)"
                                        class="form-check-input" type="checkbox" 
                                        v-model="product.active"
                                    />
                                </div>
                            </td>

                            <!-- <td><img data-action="zoom" :src="product.image" class="w-10 h-10 image-fit" /></td> -->
                            
                            <td>
                                <span class="mr-0.5 font-semibold"> {{[index+1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}}.</span>
                                {{ product.name }}</td>
                            <template v-if="product.type === 'lucky_draw'">
                                <td class="font-medium"> *{{$t('lucky_draw.winner_modal.prize')}}*</td>
                            </template>
                            <template v-else>
                                <td>{{ product.order_code }}</td>
                            </template>
                            <td>
                                <b :class="{'text-slate-400': !product.overbook}">{{ product.qty_add_to_cart }}</b> / <b>{{ product.qty_sold }}</b> / 
                                <b v-if="product.qty_for_sale - product.qty_sold - product.qty_pending_payment >= 0" class="">{{ product.qty_for_sale - product.qty_sold - product.qty_pending_payment }}</b>
                                <b v-else class="text-danger" :class="{'text-slate-400': !product.active}">{{ product.qty_for_sale - product.qty_sold - product.qty_pending_payment }}</b>
                            </td>
                            <!-- currency_sign reference from user_subscription -->
                            <td v-if="store.campaign">
                                <div class="text-right">
                                    {{ store.campaign.currency }}
                                    {{ (Math.floor(product.price * (10 ** store.campaign.decimal_places)) / 10 ** store.campaign.decimal_places).toLocaleString('en-US')}}
                                    {{ store.campaign.price_unit?$t(`global.price_unit.${store.campaign.price_unit}`):''}}
                                </div>
                                
                            </td>
                            <td class="">
                                <div class="m-auto form-check form-switch w-fit">
                                    <input
                                        id="overbookCheckbox"
                                        @click="toggle_campaign_product_overbook(product)"
                                        class="form-check-input" type="checkbox" 
                                        v-model="product.overbook" :disabled="route.query.status == 'history' || product.active == false"
                                    />
                                </div>
                            </td>
                            <td class="status_active">
                                <div class="m-auto form-check form-switch w-fit">
                                    <input
                                        @click="toggle_campaign_product_active(product)"
                                        class="form-check-input" type="checkbox" 
                                        v-model="product.active" :disabled="route.query.status == 'history'"
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modals -->
    <!-- <InstantlyAddProduct /> 
    <AddProductFromStock :currentProductList="product_results" :key="product_results"/>  -->

</template>
<script setup>

import { seller_list_campaign_product } from '@/api_v2/campaign_product';
import { seller_toggle_campaign_product_active, seller_toggle_campaign_product_overbook } from '@/api_v2/campaign_product';
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"


const route = useRoute();
const router = useRouter();
const layoutStore = useLSSSellerLayoutStore()
const store = useCampaignDetailStore()
// const internalInstance = getCurrentInstance();
// const eventBus = internalInstance.appContext.config.globalProperties.eventBus;


const product_columns = [
    // { name: "null", key: "image" },
    { name: "name", key: "name" },
    { name: "order_code", key: "order_code" },
    { name: "cart_sold_left", key: "Sold_Left" },
    { name: "price", key: "price" },
    { name: "overbook", key: "overbook" },
    { name: "activate", key: "active" }
]


onMounted(() => {
        seller_list_campaign_product(route.params.campaign_id, 'all', layoutStore.alert).then(res => {
            store.campaignProducts = res.data
        })
    }
)


const toggle_campaign_product_active = (product) => {
    seller_toggle_campaign_product_active(product.id).then(res => {
        Object.entries(res.data).forEach(([key,value]) => {
            product[key]=value                       //proxy object only got setter
        });
        // product.overbook = false
    })
}

const toggle_campaign_product_overbook = (product) => {
    seller_toggle_campaign_product_overbook(product.id).then(res => {
        Object.entries(res.data).forEach(([key,value]) => {
            product[key]=value                       //proxy object only got setter
        });
    })
}

const hideDropDown = ()=>{
  dom('.dropdown-menu').removeClass('show')
}

const routeToEditCampaignPage = ()=>{
    router.push({name:'edit-campaign', params: {'campaign_id':route.params.campaign_id}})
    hideDropDown()
}
const routeToEditCampaignProductPage = ()=>{
    router.push({name:'edit-campaign-product', params: {'campaign_id':route.params.campaign_id}})
    hideDropDown()
}


</script>

<style scoped>
.form-check-input {
    border-color: rgb(92, 92, 92) !important;
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
}

@media only screen and (max-width: 760px),
(min-device-width: 769px) and (max-device-width: 769px) {

.lgAct{
    display: none;
}

.status_active {
    display: none;
}

}
/* thead th{ 
  position: sticky !important; 
  top: 10px !important;
  z-index: 9;
} */
</style>