<template>
    <div class="p-2 mt-5 box sm:p-5 sm:pb-0">
        <div class="overflow-auto sm:h-[62vh]">
            <table class="table -mt-3 text-center table-report">
            <thead>
                <tr>
                    <th 
                        class="items-center text-center truncate whitespace-normal hover:text-clip" 
                        v-for="column in tableColumns"
                        :key="column.key">
                        {{ $t(`assign_product.table_column.${column.key}`) }}
                    </th>
                </tr>
            </thead>
            <tbody >
                <tr v-for="(product, index) in productsList" :key="index" class="align-middle intro-x">
                    <template v-for="column in tableColumns" :key="column.key">

                        <td v-if="column.key === 'image'" class="w-18 text-[12px] sm:w-18 lg:text-sm 2xl:w-32 imgtd">
                            <div class="flex items-center justify-center">
                                <div class="w-[120px] h-[120px] image-fit zoom-in lg:w-12 lg:h-12 2xl:w-12 place-items-center">
                                    <img 
                                        class="rounded-lg cursor-auto" 
                                        data-action="zoom"
                                        :src="product.image ? product.image : `${staticDir}no_image.jpeg`" 
                                    />
                                </div>
                            </div>
                        </td>

                        <td v-else-if="column.key === 'order_code'" class="w-24 text-[12px] lg:text-sm orderCode">
                            <div class="form-check place-content-center">
                                <template v-if="route.name === 'edit-campaign-product'">
                                    {{ product[column.key] }}        
                                </template>
                                <template v-else>
                                    <input 
                                        type="text" 
                                        class="form-control w-full sm:w-24 h-[42px] mt-1"
                                        v-model="product[column.key]"
                                    />
                                </template>
                            </div>
                        </td>

                        <td v-else-if="column.key === 'qty'" class="w-24 text-[12px] lg:text-sm qty">
                            <div class="form-check place-content-center">
                                <template v-if="route.name === 'edit-campaign-product'">
                                    {{ product[column.key] }}        
                                </template>
                                <template v-else>
                                    <input 
                                        type="number" min="1" 
                                        class="form-control w-full sm:w-24 h-[42px] mt-1" 
                                        v-model="product[column.key]"
                                    />
                                </template>
                            </div>
                        </td>

                        <td v-else-if="column.key === 'max_order_amount'" class="w-24 text-[12px] lg:text-sm maxQty">
                            <div class="form-check place-content-center">
                                <template v-if="route.name === 'edit-campaign-product'">
                                    {{ product[column.key] }}        
                                </template>
                                <template v-else>
                                    <input 
                                        type="number" min="1" 
                                        class="form-control w-full sm:w-24 h-[42px] mt-1"
                                        v-model="product[column.key]" 
                                        @input="changeInput($event, index)"
                                    />
                                </template>
                            </div>
                        </td>

                        <td v-else-if="column.key === 'tag'" class="my-2 w-full text-[12px] lg:w-18 lg:text-sm 2xl:w-28 items-end category">
                            <div v-for="tag in product[column.key]" :key="tag">
                                {{ tag }}
                            </div>
                        </td>

                        <td v-else-if="column.key === 'price'" class="price">
                            <template v-if="route.name === 'edit-campaign-product'" class="whitespace-nowrap">
                                <div>{{ layoutStore.userInfo.user_subscription.currency }} {{ parseFloat(product[column.key]).toFixed(layoutStore.userInfo.user_subscription.decimal_places)}}</div>
                            </template>
                            <template v-else>
                                <div class="flex place-content-end relative w-full md:w-24 lg:place-content-center">
                                    <span class="my-auto mr-1"> {{ layoutStore.userInfo.user_subscription.currency }} </span>
                                <input 
                                    type="number" 
                                    min="1" 
                                    class="form-control w-[100%] sm:w-20"
                                    v-model="product[column.key]"                             
                                />
                                </div>
                            </template>
                        </td>

                        <td v-else-if="column.key === 'name'" class="text-[12px] w-full lg:w-24 lg:text-sm  content-center items-center longMessage">
                            <div class="w-full">{{ product[column.key] }}</div>
                        </td>

                        <td v-else-if="column.key === 'selected'" class="text-[12px] lg:w-18 lg:text-sm 2xl:w-28 selected">
                            <div class="sm: form-check sm:place-content-center">
                                <input 
                                    id="selectCheckbox"
                                    class="form-check-input w-[1.2rem] h-[1.2rem]"
                                    type="checkbox" 
                                    v-model="product[column.key]" 
                                />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'customer_editable'" class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-28  content-center items-center editable">
                            <div class=" form-check place-content-end sm:place-content-center">
                                <template v-if="route.name === 'edit-campaign-product'">
                                    <input 
                                        class="form-check-input w-[1.2rem] h-[1.2rem]" 
                                        type="checkbox" 
                                        disabled
                                        v-model="product[column.key]" 
                                    />
                                </template>
                                <template v-else>
                                    <input 
                                        v-if="product.type === 'lucky_draw'" 
                                        class="form-check-input w-[1.2rem] h-[1.2rem]" 
                                        type="checkbox" 
                                        disabled
                                        v-model="product[column.key]" 
                                    />
                                    <input 
                                        v-else 
                                        class="form-check-input w-[1.2rem] h-[1.2rem]" 
                                        type="checkbox"
                                        v-model="product[column.key]" 
                                        @click="product.customer_removable = false"
                                    />
                                </template>
                            </div>
                        </td>

                        <td v-else-if="column.key === 'customer_removable'" class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-28  content-center items-center removable">
                            <div class=" form-check place-content-end sm:place-content-center">
                                <template v-if="route.name === 'edit-campaign-product'">
                                    <input 
                                        class="form-check-input w-[1.2rem] h-[1.2rem]"
                                        type="checkbox" 
                                        disabled 
                                        v-model="product[column.key]" 
                                    />
                                </template>
                                <template v-else>
                                    <input 
                                        v-if="product.customer_editable == false"
                                        class="form-check-input w-[1.2rem] h-[1.2rem]"
                                        type="checkbox" 
                                        disabled 
                                        v-model="product[column.key]" 
                                    />
                                    <input 
                                        v-else 
                                        class="form-check-input w-[1.2rem] h-[1.2rem]" 
                                        type="checkbox"
                                        v-model="product[column.key]" 
                                    />
                                </template>
                            </div>
                        </td>

                        <td v-else-if="column.key === 'type'" class="w-full text-[12px] lg:w-18 lg:text-sm 2xl:w-28 items-end type">
                            <template v-if="route.name === 'edit-campaign-product'">
                                {{ product[column.key] }}        
                            </template>        
                            <template v-else>
                                <select class="form-select w-auto" v-model="product[column.key]">
                                    <option v-for="(type, index) in typeSelection" :key="index" :value="type.value">
                                        {{type.name}}
                                    </option>
                                </select> 
                            </template>              
                        </td>

                        <td v-else-if="column.key === 'edit'" class="edit">
                            <!-- <button 
                                class="w-24 bg-white btn dark:border-darkmode-400" 
                                v-show="true"
                                @click="eventBus.emit('editCampaignProduct', { editCampaignProduct: true, product: product })"
                            >
                                Edit
                            </button> -->
                            <Dropdown placement="bottom-start" v-show="true">
                                <DropdownToggle role="button" class="block w-5 h-5" href="javascript:;">
                                    <MoreHorizontalIcon class="w-5 h-5 text-slate-700" />
                                </DropdownToggle>
                                <DropdownMenu class="w-40 pt-2">
                                    <DropdownContent class="w-40 text-center">
                                        <DropdownItem 
                                            class="w-full text-center whitespace-nowrap" 
                                            @click="eventBus.emit('editCampaignProduct', { editCampaignProduct: true, product: product })"
                                        > 
                                            <EditIcon class="h-[20px] w-[20px] mr-1" /> {{ $t('assign_product.modal.edit') }} 
                                        </DropdownItem>
                                        <DropdownItem 
                                            class="w-full whitespace-nowrap"
                                            @click="deleteProduct(index)"
                                        > 
                                            <ShoppingCartIcon class="h-[20px] w-[20px] mr-1" />{{ $t('assign_product.modal.delete') }} 
                                        </DropdownItem>
                                    </DropdownContent>
                                </DropdownMenu>
                            </Dropdown> 
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
import { ref, onMounted, onUnmounted, getCurrentInstance, watch, computed } from 'vue';
import { useCreateCampaignStore } from '@/stores/lss-create-campaign';
import { list_product } from '@/api_v2/product';
import { seller_list_campaign_product, seller_delete_campaign_product, seller_update_campaign_product } from '@/api_v2/campaign_product';
import { useRoute } from 'vue-router';
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useCampaignDetailStore } from '@/stores/lss-campaign-detail';

const campaignStore = useCreateCampaignStore();
const detailStore = useCampaignDetailStore()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

const staticDir = import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR
const route = useRoute()
const layoutStore = useLSSSellerLayoutStore()
const dataCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const productsList = ref([])
const category = ref(undefined)
const tableColumns = ref([
    { name: "Selected", key: "selected" },
    { name: "Image", key: "image" },
    { name: "Product Name", key: "name" },
    { name: "Type", key: "type" },
    { name: "Order Code", key: "order_code" },
    { name: "Qty for Campaign", key: "qty" },
    { name: "Max Qty / Order", key: "max_order_amount" },
    { name: "Category", key: "tag" },
    { name: "Price", key: "price" },
    { name: "Editable", key: "customer_editable" },
    { name: "Deletable", key: "customer_removable" },
])
const typeSelection = ref([
    { name: 'Product', value: 'product' },
    { name: 'Lucky Draw', value: 'lucky_draw' }
])


onMounted(() => {
    campaignStore.assignedProducts = []
    search()

    if (route.name === 'edit-campaign-product') tableColumns.value = tableColumns.value.filter(obj => obj.name != 'Selected')

    eventBus.on("assignTable", (payload) => {
        currentPage.value = 1
        category.value = payload.filterColumn
        search()
    })
    eventBus.on("addProducts", () => {
        addProdcuts()
    })
    eventBus.on("search", () => {
        search()
    })
})

onUnmounted(() => {
    eventBus.off("assignTable");
    eventBus.off("addProducts");
    eventBus.off("search");
})

watch(computed(()=>detailStore.campaignProducts), () => { search() })

const search = () => {
    if (route.name === 'assign-product') {
        list_product(pageSize.value, currentPage.value, undefined, undefined, 'enabled', undefined,  category.value, layoutStore.alert)
            .then(response => {
                dataCount.value = response.data.count
                productsList.value = response.data.results
                productsList.value.forEach((item) => {
                    item.selected = false
                    item.max_order_amount = item.qty
                    if (item.type === 'product') {
                        item.customer_editable = true
                        item.customer_removable = true
                    }
                    if (item.customer_editable === false) item.customer_removable = false
                })

                // 換頁時選取記憶在store中 selected, editable, deletable 欄位
                if (campaignStore.assignedProducts.length > 0) {
                    campaignStore.assignedProducts.forEach((storeItem) => {
                        productsList.value.forEach((productItem, pIndex) => {
                            if (storeItem.id == productItem.id) { productsList.value[pIndex] = storeItem }
                        })
                    })
                }
            }).catch(error => {
                console.log(error);
            })
    } else if (route.name === 'edit-campaign-product') {
        seller_list_campaign_product(route.params.campaign_id, category.value, currentPage.value, pageSize.value)
        .then(response => {
            dataCount.value = response.data.count
            productsList.value = response.data.results
            productsList.value.forEach((item) => { item.qty = item.qty_for_sale })
            let editExists = false
            tableColumns.value.forEach((item) => { if (item.name === 'Edit') editExists = true })
            if (editExists == false) tableColumns.value.push({ name: "Edit", key: "edit" })
        }).catch(error => {
            console.log(error);
        })
    }
}

const changePage = (page) => {
    currentPage.value = page
    addProdcuts()
    search()
}

const changePageSize = (page_size) => {
    pageSize.value = page_size
    search()
}

const changeInput = (event, index) => {
    if (parseInt(event.target.value) > productsList.value[index].qty) {
        alert('Input number is over product max qty')
        productsList.value[index].max_order_amount = productsList.value[index].qty
    } 
}

// 把選取且無重複的product加入store
const addProdcuts = () => {
    let assignProductIdList = []
    if (campaignStore.assignedProducts.length > 0) campaignStore.assignedProducts.forEach((item) => { assignProductIdList.push(item.id) })
    productsList.value.forEach((item) => {
        if (item.selected == true && !assignProductIdList.includes(item.id)) campaignStore.assignedProducts.push(item)
        else if (item.selected == false && assignProductIdList.includes(item.id)) campaignStore.assignedProducts.splice(campaignStore.assignedProducts.indexOf(item), 1)
    })
}

const updateProduct = (index) => {
    productsList.value[index]['qty_for_sale'] = parseInt(productsList.value[index]['qty'])
    productsList.value[index]['max_order_amount'] = parseInt(productsList.value[index]['max_order_amount'])

    seller_update_campaign_product(route.params.campaign_id, productsList.value[index].id, productsList.value[index])
    .then(response => {
        console.log(response.data)
        search()
    })
}

const deleteProduct = (index) => {
    seller_delete_campaign_product(route.params.campaign_id, productsList.value[index].id)
    .then(response => {
        search()
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
    border-bottom: 2px solid #dddddd; 
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
        display:none; 
    }
    .edit{
        display:block;
        padding-left: 0px !important;
        padding-right: 0px;
    }

    svg {
        margin: auto;
    }
}
</style>