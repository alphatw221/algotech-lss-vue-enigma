<template>
    <div class="p-2 mt-5 box sm:p-5 sm:pb-0">
        <div class="overflow-auto h-[62vh] sm:h-[62vh]">
            <table class="table -mt-3 text-center table-report">
            <thead>
                <tr>
                    <th class="items-center text-center truncate whitespace-normal hover:text-clip" v-for="column in tableColumns"
                        :key="column.key">
                        {{$t(`edit_campaign_product.campaign_product_table.${column.key}`)}}
                    </th>
                </tr>
            </thead>
            <tbody >
                <tr v-for="(campaign_product, index) in campaignDetailStore.campaignProducts" :key="index" class="align-middle intro-x">
                    <template v-for="column in tableColumns" :key="column.key">

                        <td v-if="column.key === 'image'" class="w-18 text-[12px] sm:w-18 lg:text-sm 2xl:w-32 imgtd">
                            <div class="flex items-center justify-center">
                                <div class="w-[120px] h-[120px] image-fit zoom-in lg:w-12 lg:h-12 2xl:w-12 place-items-center">
                                    <img 
                                        class="rounded-lg cursor-auto" 
                                        data-action="zoom"
                                        :src="campaign_product.image ? storageUrl + campaign_product.image : storageUrl + 'no_image.jpeg'" 
                                    />
                                </div>
                            </div>
                        </td>

                        <td v-else-if="column.key === 'order_code'" class="w-24 text-[12px] lg:text-sm orderCode">
                            <div class="form-check place-content-center">
                                {{ campaign_product[column.key] }}        
                            </div>
                        </td>

                        <td v-else-if="column.key === 'qty_for_sale'" class="w-24 text-[12px] lg:text-sm qty">
                            <div class="form-check place-content-center">
                                {{ campaign_product[column.key] }}      
                            </div>
                        </td>

                        <td v-else-if="column.key === 'max_order_amount'" class="w-24 text-[12px] lg:text-sm maxQty">
                            <div class="form-check place-content-center">
                                {{ campaign_product[column.key] }}   
                            </div>
                        </td>

                        <td v-else-if="column.key === 'tag'" class="my-2 w-full text-[12px] lg:w-18 lg:text-sm 2xl:w-28 items-end category">
                            <div v-for="tag in campaign_product[column.key]" :key="tag">
                                {{ tag }}
                            </div>
                        </td>

                        <td v-else-if="column.key === 'price'" class="price">
                                <div class="whitespace-nowrap">{{ layoutStore.userInfo.user_subscription.currency }} {{ parseFloat(campaign_product[column.key]).toFixed(layoutStore.userInfo.user_subscription.decimal_places)}}</div>
                        </td>

                        <td v-else-if="column.key === 'name'" class="text-[12px] w-full lg:w-24 lg:text-sm  content-center items-center longMessage">
                            <div class="w-full">{{ campaign_product[column.key] }}</div>
                        </td>

                        <!-- <td v-else-if="column.key === 'selected'" class="text-[12px] lg:w-18 lg:text-sm 2xl:w-28 selected">
                            <div class="sm: form-check sm:place-content-center">
                                <input 
                                    id="selectCheckbox"
                                    class="form-check-input w-[1.2rem] h-[1.2rem]"
                                    type="checkbox" 
                                    v-model="campaign_product[column.key]" 
                                />
                            </div>
                        </td> -->

                        <td v-else-if="column.key === 'customer_editable'" class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-28  content-center items-center editable">
                            <div class=" form-check place-content-end sm:place-content-center">
                                    <input 
                                        class="form-check-input w-[1.2rem] h-[1.2rem]" 
                                        type="checkbox" 
                                        disabled
                                        v-model="campaign_product[column.key]" 
                                    />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'customer_removable'" class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-28  content-center items-center removable">
                            <div class=" form-check place-content-end sm:place-content-center">

                                    <input 
                                        class="form-check-input w-[1.2rem] h-[1.2rem]"
                                        type="checkbox" 
                                        disabled 
                                        v-model="campaign_product[column.key]" 
                                    />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'type'" class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-28 items-end type">
                            <div class=" form-check place-content-end sm:place-content-center">
                                    {{$t(`edit_campaign_product.campaign_product_table.types.${campaign_product[column.key] }`)}}    
                            </div>                
                        </td>

                        <td v-else-if="column.key === 'edit'" class="edit ">
                            <div class="place-content-center sm:place-content-center">
                                <button 
                                    class="btn btn-outline-secondary mr-1"
                                    type="button" 
                                    @click="showEditCampaignProductModal(campaign_product, index)" 
                                > 
                                    {{$t(`edit_campaign_product.campaign_product_table.edit`)}}  
                                </button>
                                <button 
                                    class="btn btn-danger"
                                    type="button" 
                                    @click="deleteProduct(campaign_product, index)"
                                >
                                    {{$t(`edit_campaign_product.campaign_product_table.delete`)}}  
                                </button>

                                 <!-- <Dropdown placement="bottom-start" v-show="true">
                                    <DropdownToggle role="button" class="block w-5 h-5" href="javascript:;">
                                        <MoreHorizontalIcon class="w-5 h-5 text-slate-700" />
                                    </DropdownToggle>
                                    <DropdownMenu class="w-40 pt-2">
                                        <DropdownContent class="w-40 text-center">
                                            <DropdownItem 
                                                class="w-full text-center whitespace-nowrap" 
                                                @click="showEditCampaignProductModal(campaign_product, index)"
                                            > 
                                                <EditIcon class="h-[20px] w-[20px] mr-1" />
                                                {{$t(`edit_campaign_product.campaign_product_table.edit`)}}  
                                            </DropdownItem>
                                            <DropdownItem 
                                                class="w-full whitespace-nowrap"
                                                @click="deleteProduct(campaign_product, index)"
                                            > 
                                                <ShoppingCartIcon class="h-[20px] w-[20px] mr-1" />
                                                {{$t(`edit_campaign_product.campaign_product_table.delete`)}}  
                                            </DropdownItem>
                                        </DropdownContent>
                                    </DropdownMenu>
                                </Dropdown>  -->
                            </div>
                        </td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div> 
        <div class="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
            <Page class="mx-auto my-3" :total="dataCount" @on-change="changePage" @on-page-size-change="changePageSize" />
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance, watch, computed, defineProps } from 'vue';
import { seller_list_campaign_product, seller_delete_campaign_product, seller_update_campaign_product } from '@/api_v2/campaign_product';
import { useRoute } from 'vue-router';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useCampaignDetailStore } from '@/stores/lss-campaign-detail';

const props = defineProps({
    eventBusName:String
})

const layoutStore = useLSSSellerLayoutStore()
const campaignDetailStore = useCampaignDetailStore()

const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const storageUrl = import.meta.env.VITE_APP_IMG_URL

const route = useRoute()

const dataCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)


const tableColumns = ref([
    { name: "Image", key: "image" },
    { name: "Product Name", key: "name" },
    { name: "Type", key: "type" },
    { name: "Order Code", key: "order_code" },
    { name: "Qty for Sale", key: "qty_for_sale" },
    { name: "Max Qty / Order", key: "max_order_amount" },
    { name: "Category", key: "tag" },
    { name: "Price", key: "price" },
    { name: "Editable", key: "customer_editable" },
    { name: "Deletable", key: "customer_removable" },
    { name: "", key: "edit" },
])
const typeSelection = ref([
    { name: 'Product', value: 'product' },
    { name: 'Lucky Draw', value: 'lucky_draw' }
])

const payloadBuffer = ref({})

onMounted(() => {

    search()
    eventBus.on(props.eventBusName, (payload) => {
        payloadBuffer.value=payload
        currentPage.value = 1
        search()
    })
})

onUnmounted(() => {
    eventBus.off(props.eventBusName);
})



const search = () => {
        seller_list_campaign_product(route.params.campaign_id, payloadBuffer.value.category, currentPage.value, pageSize.value)
        .then(response => {
            dataCount.value = response.data.count
            campaignDetailStore.campaignProducts = response.data.results
        }).catch(error => {
            console.log(error);
        })
}

const changePage = (page) => {
    currentPage.value = page
    search()
}

const changePageSize = (page_size) => {
    pageSize.value = page_size
    search()
}


const showEditCampaignProductModal = (campaign_product, index)=>{
    
    eventBus.emit('editCampaignProduct',{'campaignProduct':JSON.parse(JSON.stringify(campaign_product)),'index':index})
    campaignDetailStore.showEditCampaignProductModal = true
}

const deleteProduct = (campaign_product, index) => {
    seller_delete_campaign_product(campaign_product.id)
    .then(response => {
        campaignDetailStore.campaignProducts.splice(index,1)
    })
}


</script>

<style scoped>
.click-icon:hover {
    cursor: pointer;
}

td {
    height: auto !important;
    min-height: 50px;
    border-collapse: collapse;
    width: auto !important;
    padding-right: 10px !important;
    padding-left: 10px !important;
}

.longMessage {
    overflow-wrap: break-word;
}

thead th {
    position: sticky !important;
    top: 0 !important;
    z-index: 50;
    background-color: theme("colors.secondary");
    padding-right: 10px !important;
    padding-left: 10px !important;
}

.checkboxWord {
    display: none;
}
.form-check-input {
    border-color: rgb(128, 128, 128) !important;
}

@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 768px) {

    table,
    thead,
    tbody,
    th,
    td,
    tr {
        display: block;
        font-size: 16px;
        padding: 0px !important;
    }

    input {
        height: 35px !important;
    }

    .form-check-input{
        width: 1.2rem !important;
        height: 1.2rem !important;
    }

    .checkboxWord {
        display: block;
    }

    thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
    }

    tr {
		border-bottom: 3px solid rgba(61, 61, 61, 0.7);
		margin-top: 20px;
	}

    td {
        min-height: 35px;
        height: auto;
        border: none;
        position: relative;
        padding-left: 50% !important;
        text-align: right !important;
        box-shadow: none !important;
        font-size: 14px;
        vertical-align: middle !important;
        padding-right: 15px !important;
        place-content: right !important;
    }

    td:before {
        position: absolute;
        min-height: 20px;
        left: 6px;
        width: 45%;
        padding-right: 10px;
        white-space: nowrap;
        font-weight: bold;
        box-shadow: none !important;
        background-color: white !important;
        text-align: left;
    }
    .selected:before {
        display: none;
    }

    .selected{
        display: block;
        float:right;
        width:40px !important;
        padding-left: 0px !important;
	}

    .imgtd:before {
        display: none;
    }

    .imgtd {
        display: inline-block;
        width: 80% !important;
        padding-left: 20% !important;
        height: 125px !important;
    }

    td:nth-of-type(3):before {
        display: none;
    }

    td:nth-of-type(3) {
        display: inline-block;
        text-align: center !important;
        width: 100% !important;
        padding-left: 0% !important;
		font-weight: 500;
		color: theme("colors.primary");
        font-size: 16px !important;
    }

    .orderCode:before {
        content: "Order Code";
        text-align: left !important;
        top:25% !important;
    }
    .orderCode input{
        text-align:right
    }

    .qty:before {
        content: "Qty for Campaign";
        top:25% !important;
    }
    .qty input{
        text-align:right
    }

    .maxQty:before {
        content: "Max Qty / Order";
        top:25% !important;
    }
    .maxQty input{
        text-align:right
    }

    .category:before {
        top: -3px;
        content: "Category";
        top:25% !important;
    }
    .category{
        display: flex;
        flex-direction:column; 
        justify-content: center;
        vertical-align:baseline !important;
    }

    .price:before {
        content: "Price";
        top:20% !important;
    }
    .price{
        min-height: 45px;
    }
    .price input{
        text-align:right
    }
    
    .type:before {
        content: "Type";
        text-align: left !important;
        top:25% !important;
        margin-top: 0 !important;
    }

    .editable:before {
        content: "Editable";
    }
    .removable:before {
        content: "Deletable";
    }

    
    .edit:before{
        content: "More";
    }
    /* .edit{
        display:block;
        text-align:left !important;
       top:25% !important;
        margin-top: 0 !important;
    } */
}
</style>