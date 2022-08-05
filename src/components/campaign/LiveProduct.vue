<template>
    <div
        class="box mt-2 min-h-[30%] w-full max-h-screen
            md:min-h-[40%] md:h-[45vh] 
            2xl:h-full">
        <div class="flex flex-col h-full"> 

            <div class="flex justify-between flex w-full h-16">
                <h2 class="text-lg font-medium ml-5 my-auto">{{$t('campaign_live.product.product')}}</h2>
                <template v-if="route.query.status !='history'">
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

            <div class="overflow-auto max-h-[85%]">
                <table class="table table-sm">
                    <thead class="table-dark">
                        <tr class="relative">
                            <th class="whitespace-nowrap bg-dark md:hidden">
                                {{ $t('campaign_live.product.modal_column.activate') }}
                            </th>
                            <template v-for="column in product_columns.slice(0, -1)" :key="column.key">
                                <th
                                    class="whitespace-nowrap bg-dark">
                                    {{ $t(`campaign_live.product.modal_column.`+column.name) }}
                                </th>
                            </template>
                            <th class="whitespace-nowrap bg-dark lgAct">
                                {{ $t('campaign_live.product.modal_column.activate') }}
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="product,index in store.campaignProducts" :key="index">

                            <td class="md:hidden">
                                <div class="m-auto form-check form-switch w-fit">
                                    <input
                                        @click="toggle_campaign_product_status(product)"
                                        class="form-check-input" type="checkbox" 
                                        v-model="product.status"
                                    />
                                </div>
                            </td>

                            <td><img data-action="zoom" :src="imagePath + product.image" class="w-10 h-10 image-fit" /></td>
                            
                            <td>
                                <span class="mr-0.5"> {{[index+1].toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}} </span>  
                                {{ product.name }}</td>
                            <template v-if="product.type === 'lucky_draw'">
                                <td></td>
                            </template>
                            <template v-else>
                                <td>{{ product.order_code }}</td>
                            </template>
                            <td>
                                <b>{{ product.qty_add_to_cart }}</b> / <b>{{ product.qty_sold }}</b> / <b>{{ product.qty_for_sale - product.qty_sold }}</b>
                            </td>
                            <!-- currency_sign reference from user_subscription -->
                            <td v-if="store.campaign">
                                {{ store.campaign.currency }}
                                {{ store.campaign.decimal_places=='0'?Math.trunc(parseFloat(product.price)):parseFloat(product.price).toFixed(store.campaign.decimal_places)}}
                                {{ store.campaign.price_unit?$t(`global.price_unit.${store.campaign.price_unit}`):''}}
                            </td>  
                            <td class="status_active">
                                <div class="m-auto form-check form-switch w-fit">
                                    <input
                                        @click="toggle_campaign_product_status(product)"
                                        class="form-check-input" type="checkbox" 
                                        v-model="product.status"
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
import { list_campaign_product } from '@/api/campaign_product';
import { seller_toggle_campaign_product_status } from '@/api_v2/campaign_product';
// import AddProductFromStock from './modals/AddProductFromStockModal.vue';
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";


const route = useRoute();
const router = useRouter();

const store = useCampaignDetailStore()
// const internalInstance = getCurrentInstance();
// const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const imagePath = import.meta.env.VITE_APP_IMG_URL
const product_columns = [
    { name: "null", key: "image" },
    { name: "name", key: "name" },
    { name: "order_code", key: "order_code" },
    { name: "cart_sold_left", key: "Sold_Left" },
    { name: "price", key: "price" },
    { name: "activate", key: "activate" }
]


onMounted(() => {
        list_campaign_product(route.params.campaign_id).then(res => {
            store.campaignProducts = res.data

        })
    }
)


const toggle_campaign_product_status = (product) => {
    seller_toggle_campaign_product_status(product.id).then(res => {
        Object.entries(res.data).forEach(([key,value]) => {
            product[key]=value                       //proxy object only got setter
        });
    })
}


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
}

@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 768px) {

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