<template>
    <div class="p-2 mt-5 box sm:p-5 sm:pb-0">
        <div class="overflow-auto h-fit sm:h-[62vh]">
            <table class="table -mt-3 text-center table-report">
            <thead>
                <tr>
                    <th class="items-center text-center w-24" v-for="column in tableColumns"
                        :key="column.key">
                        {{$t(`edit_campaign_product.campaign_product_table.${column.key}`)}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="props.loading" class="trDot">
                    <td :colspan="tableColumns.length" class="trDot">
                        <LoadingIcon icon="three-dots" color="1a202c" class="absolute body-middle"/>
                    </td>
                </tr>
                <tr v-else-if="campaignDetailStore.campaignProducts.length == 0" class="trDot">
                    <td :colspan="tableColumns.length" class="trDot">
						<div class="mt-5 text-center md:mt-40" >
							<h1 class="text-slate-500 text-sm md:text-lg font-bold">
								{{ $t('edit_campaign_product.campaign_product_table.no_product') }}
							</h1>
							<h1 class="text-slate-500 text-sm md:text-lg">
								{{ $t('edit_campaign_product.campaign_product_table.set_up_first') }}
							</h1>
						</div>
					</td> 
                </tr>
                <template v-else> 
                    <tr v-for="(campaign_product, index) in campaignDetailStore.campaignProducts" :key="index" class="align-middle intro-x">
                    <template v-for="column in tableColumns" :key="column.key">
                        <td v-if="column.key === 'image'" class="w-18 text-[12px] sm:w-18 lg:text-sm 2xl:w-32 imgtd">
                            <div class="flex items-center justify-center">
                                <div class="w-[90px] h-[90px] image-fit zoom-in md:w-14 md:h-14 place-items-center">
                                    <img 
                                        class="rounded-lg cursor-auto" 
                                        data-action="zoom"
                                        :src="campaign_product.image ? campaign_product.image : `${staticDir}no_image.jpeg`" 
                                    />
                                </div> 
                            </div>
                        </td>

                        <td v-else-if="column.key === 'order_code'" 
                            class="w-24 text-[12px] lg:text-sm orderCode text-center" 
                            :class="{'luckyDraw': campaign_product.type == 'lucky_draw'}"
                            :data-content="$t(`edit_campaign_product.campaign_product_table.${column.key}`)">
                            <div v-if="campaign_product.type == 'lucky_draw'"> - </div>
                            <div v-else>
                                {{ campaign_product[column.key] }}        
                            </div>
                        </td>

                        <td v-else-if="column.key === 'qty_for_sale'" 
                            class="w-24 text-[12px] lg:text-sm qty text-center" 
                            :class="{'luckyDraw': campaign_product.type == 'lucky_draw'}"
                            :data-content="$t(`edit_campaign_product.campaign_product_table.${column.key}`)">
                            <!-- <div v-if="campaign_product.type == 'lucky_draw'" > - </div> -->
                            <div>{{ campaign_product[column.key] }} </div>
                        </td>

                        <td v-else-if="column.key === 'max_order_amount'" 
                            class="w-24 text-[12px] lg:text-sm maxQty text-center"
                            :class="{'luckyDraw': campaign_product.type == 'lucky_draw'}"
                            :data-content="$t(`edit_campaign_product.campaign_product_table.${column.key}`)">
                            <div v-if="campaign_product.type == 'lucky_draw'" > - </div>
                            <div v-else>
                                {{ campaign_product[column.key] }}    
                            </div>
                        </td>
                        

                        <td v-else-if="column.key === 'categories'" 
                            class="my-1 w-full text-[12px] lg:w-18 lg:text-sm 2xl:w-28 items-end category" 
                            :data-content="$t(`edit_campaign_product.campaign_product_table.${column.key}`)">
                            <div v-for="(productCategoryID,productCategoryIndex) in campaign_product[column.key]" :key="productCategoryIndex">{{ (layoutStore.userInfo?.user_subscription?.product_categories?.find(productCategory=>productCategory.id.toString()==productCategoryID))?.name }}</div> 
                        </td>

                        <td v-else-if="column.key === 'price'" class="price" 
                            :data-content="$t(`edit_campaign_product.campaign_product_table.${column.key}`)">
                            <div class="whitespace-nowrap" v-if="campaignDetailStore.campaign">
                                {{ campaignDetailStore.campaign.currency }}
                                {{ (Math.floor(parseFloat(campaign_product[column.key]) * (10 ** campaignDetailStore.campaign.decimal_places)) / 10 ** campaignDetailStore.campaign.decimal_places).toLocaleString('en-US')}}
                                {{campaignDetailStore.campaign.price_unit?$t(`global.price_unit.${campaignDetailStore.campaign.price_unit}`):''}}</div>
                        </td>

                        <td v-else-if="column.key === 'name'" class="text-[12px] w-full lg:w-24 lg:text-sm  content-center items-center longMessage">
                            <div>{{ campaign_product[column.key] }}</div>
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
                        <td v-else-if="column.key === 'oversell'" 
                            :class="{'luckyDraw': campaign_product.type == 'lucky_draw'}"
                            class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-28 text-center content-center items-center editable" 
                            :data-content="$t(`edit_campaign_product.campaign_product_table.${column.key}`)">
                            <div v-if="campaign_product.type == 'lucky_draw'" > - </div>
                            <div v-else class=" form-check place-content-end sm:place-content-center">
                                <input 
                                    class="form-check-input w-[1.2rem] h-[1.2rem]" 
                                    type="checkbox" 
                                    disabled
                                    v-model="campaign_product[column.key]" 
                                />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'customer_editable'" 
                            :class="{'luckyDraw': campaign_product.type == 'lucky_draw'}"
                            class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-28 text-center content-center items-center editable" 
                            :data-content="$t(`edit_campaign_product.campaign_product_table.${column.key}`)">
                            <div v-if="campaign_product.type == 'lucky_draw'" > - </div>
                            <div v-else class=" form-check place-content-end sm:place-content-center">
                                <input 
                                    class="form-check-input w-[1.2rem] h-[1.2rem]" 
                                    type="checkbox" 
                                    disabled
                                    v-model="campaign_product[column.key]" 
                                />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'customer_removable'" 
                            class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-28 text-center content-center items-center removable"
                            :class="{'luckyDraw': campaign_product.type == 'lucky_draw'}"
                            :data-content="$t(`edit_campaign_product.campaign_product_table.${column.key}`)">
                            <div v-if="campaign_product.type == 'lucky_draw'" > - </div>
                            <div v-else class=" form-check place-content-end sm:place-content-center">
                                <input 
                                    class="form-check-input w-[1.2rem] h-[1.2rem]"
                                    type="checkbox" 
                                    disabled 
                                    v-model="campaign_product[column.key]" 
                                />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'pinned'" 
                            :class="{'luckyDraw': campaign_product.type == 'lucky_draw'}"
                            class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-28 text-center content-center items-center pinned" 
                            :data-content="$t(`edit_campaign_product.campaign_product_table.${column.key}`)">
                            <div v-if="campaign_product.type == 'lucky_draw'" > - </div>
                            <div v-else class=" form-check place-content-end sm:place-content-center">
                                <input 
                                    class="form-check-input w-[1.2rem] h-[1.2rem]" 
                                    type="checkbox" 
                                    disabled
                                    v-model="campaign_product[column.key]" 
                                />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'type'" class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-28 items-end type" :data-content="$t(`edit_campaign_product.campaign_product_table.${column.key}`)">
                            <div class=" form-check place-content-end sm:place-content-center">
                                    {{$t(`edit_campaign_product.campaign_product_table.types.${campaign_product[column.key] }`)}}    
                            </div>                
                        </td>

                        <td v-else-if="column.key === 'edit'" class="edit " :data-content="$t(`edit_campaign_product.campaign_product_table.${column.key}`)">
                            <div class="flex place-content-end sm:place-content-center">
                                <button 
                                    class="btn btn-outline-secondary mr-1 h-[35px] sm:h-[42px]"
                                    type="button" 
                                    @click="showEditCampaignProductModal(campaign_product, index)" 
                                > 
                                    {{$t(`edit_campaign_product.campaign_product_table.edit`)}}  
                                </button>
                                <button 
                                    class="btn btn-danger h-[35px] sm:h-[42px]"
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
                </template>
                
                </tbody>
            </table>
        </div> 
        <div class="flex flex-wrap items-center intro-y sm:flex-row sm:flex-nowrap">
            <Page class="mx-auto my-3" 
            :total="dataCount" 
            show-sizer :page-size-opts="[20,50,100,500,1000]" 
            :page-size="pageSize" 
            @on-change="changePage" 
            @on-page-size-change="changePageSize" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance, watch, computed, defineProps } from 'vue';
import { seller_search_campaign_product, seller_delete_campaign_product, seller_update_campaign_product } from '@/api_v2/campaign_product';
import { retrieve_campaign } from '@/api_v2/campaign'
import { useRoute } from 'vue-router';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useCampaignDetailStore } from '@/stores/lss-campaign-detail';

const props = defineProps({
    loading:Boolean
})

const layoutStore = useLSSSellerLayoutStore()
const campaignDetailStore = useCampaignDetailStore()

const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

const staticDir = import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR
const route = useRoute()

const dataCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)
const showNoti = ref(false)


const tableColumns = ref([
    { name: "Image", key: "image" },
    { name: "Product Name", key: "name" },
    { name: "Type", key: "type" },
    { name: "Order Code", key: "order_code" },
    { name: "Qty for Sale", key: "qty_for_sale" },
    { name: "Max Qty / Order", key: "max_order_amount" },
    { name: "Category", key: "categories" },
    { name: "Price", key: "price" },
    { name: "Oversell", key: "oversell" },
    { name: "Editable", key: "customer_editable" },
    { name: "Deletable", key: "customer_removable" },
    { name: "Pinned", key: "pinned" },
    { name: "", key: "edit" },
])
const typeSelection = ref([
    { name: 'Product', value: 'product' },
    { name: 'Lucky Draw', value: 'lucky_draw' }
])

const payloadBuffer = ref({})

onMounted(() => {
    campaignDetailStore.campaignProducts=[] //clear previous data in store
    search()
    eventBus.on(props.eventBusName, (payload) => {
        payloadBuffer.value=payload
        currentPage.value = 1
        search()
        console.log(dataCount.value)
    })
})

onUnmounted(() => {
    eventBus.off(props.eventBusName);
})



const search = () => {
    var _campaign_id, _category, _keyword, _page, _page_size, _type, _toastify
    seller_search_campaign_product(
        _campaign_id=route.params.campaign_id, 
        _category=payloadBuffer.value.category, 
        _keyword=payloadBuffer.value.keyword, 
        _page=currentPage.value, 
        _page_size=pageSize.value, 
        _type = "", 
        _toastify=layoutStore.alert)
    .then(response => {
        dataCount.value = response.data.count
        campaignDetailStore.campaignProducts = response.data.results
        console.log(campaignDetailStore.campaignProducts)
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

.trDot{
	box-shadow: none !important;
}

@media only screen and (max-width: 760px),
(min-device-width: 769px) and (max-device-width: 769px) {

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
		border-bottom: 2px solid #DDDDDD;
		margin-top: 20px;
	}

    td {
        min-height: 30px !important;
        border: none;
        position: relative;
        padding-left: 50%;
        text-align: right !important;
        box-shadow: none !important;
        font-size: 14px;
        vertical-align: middle !important;
        place-content: right !important;
    }

    td:before {
        position: absolute;
        min-height: 30px;
        left: 6px;
        width: 45%;
        white-space: nowrap;
        font-weight: bold;
        box-shadow: none !important;
        background-color: white !important;
        text-align: left !important;
    }
    .selected:before {
        display: none;
    }
/* 
    .selected{
        display: block;
        float:right;
        width:40px !important;
        padding-left: 0px !important;
	} */

    .imgtd:before {
        display: none;
    }

    .imgtd {
        display: inline-block;
        width: 80% !important;
        padding-left: 20% !important;
        height: 95px !important;
    }

    td:nth-of-type(2):before {
        display: none;
    }

    td:nth-of-type(2) {
        display: inline-block;
        text-align: center !important;
        width: 100% !important;
        padding-left: 0% !important;
		font-weight: 500;
		color: theme("colors.primary");
        font-size: 16px !important;
        min-height: 25px !important;
    }

    .orderCode:before {
        content: attr(data-content);
        text-align: left !important;
    }
    .orderCode input{
        text-align:right
    }

    .qty:before {
        content: attr(data-content);
    }
    .qty input{
        text-align:right
    }

    .maxQty:before {
        content: attr(data-content);
    }
    .maxQty input{
        text-align:right
    }

    .category:before {
        content: attr(data-content);
    }

    .price:before {
        content: attr(data-content);
    }
    .type:before {
        content: attr(data-content);
        text-align: left !important;
    }

    .editable:before {
        content: attr(data-content);
    }
    .removable:before {
        content: attr(data-content);
    }

    
    .edit:before{
        content: attr(data-content);
        top:10%;
    }
    .edit{
        min-height: 40px !important;
        z-index: inherit;
    }
    /* .edit{
        display:block;
        text-align:left !important;
       top:25% !important;
        margin-top: 0 !important;
    } */
    .luckyDraw:before{
        display: none !important;
    }
    .luckyDraw{
        display: none !important;
    }
    .trDot:before{
        display: none;
    }
    .trDot{
        display: inline-block;
        padding-left: 0px;
        padding: 20px !important;
        height: 30vh;
    }
}
</style>