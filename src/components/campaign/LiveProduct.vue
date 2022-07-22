<template>
    <div
        class="box col-span-12 col-start-1 row-start-5 row-span-2 h-screen
            lg:col-start-6 lg:col-span-7 lg:row-start-4 lg:row-span-3 lg:h-[100%]
            2xl:row-start-1 2xl:row-span-6 2xl:col-span-4 2xl:col-start-5 
            ">
        <div class="flex flex-col h-full"> 
            <div class="flex w-full m-3">
                <h2 class="w-48 ml-5 mr-auto text-lg font-medium">{{$t('campaign_live.product.product')}}</h2>
                <template v-if="route.query.status !='history'">
                    <Dropdown class="inline-block">
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
            <div class="overflow-auto">
                <table class="table table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th class="whitespace-nowrap bg-dark" v-for="column in product_columns"
                                :key="column.key">
                                {{ $t(`campaign_live.product.modal_column.`+column.name) }}
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="product,index in store.campaignProducts" :key="index">
                            <td><img data-action="zoom" :src="imagePath + product.image" class="w-10 zoom-in" /></td>
                            
                            <td>{{ product.name }}</td>
                            <template v-if="product.type === 'lucky_draw'">
                                <td></td>
                            </template>
                            <template v-else>
                                <td>{{ product.order_code }}</td>
                            </template>
                            <td>
                                {{ product.qty_add_to_cart }}/{{ product.qty_sold }}/{{ product.qty_for_sale - product.qty_sold }}
                            </td>
                            <!-- currency_sign reference from user_subscription -->
                            <td>{{ product.currency_sign }}{{ product.price }}</td>  
                            <td>
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
import { list_campaign_product, update_campaign_product } from '@/api/campaign_product';

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
    update_campaign_product(product.id, route.params.campaign_id, {'status':product.status?false:true}).then(res => {
        console.log(res.data)
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

thead th{ 
  position: sticky !important; 
  top: 0 !important;
  z-index: 9;
}
</style>