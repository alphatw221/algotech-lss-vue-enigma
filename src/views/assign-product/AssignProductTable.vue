<template>
    <div class="overflow-x-auto overflow-y-auto h-[67vh] sm:h-[62vh]">
        <table class="table text-center table-report">
            <thead>
                <tr>
                    <th class="items-center text-center truncate whitespace-normal hover:text-clip" v-for="column in tableColumns"
                        :key="column.key">
                        {{ column.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in productsList" :key="index" class="align-middle intro-x">
                    <template v-for="column in tableColumns" :key="column.key">

                        <td v-if="column.key === 'image'"
                            class="w-18 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 imgtd">
                            <div class="flex items-center justify-center">
                                <div class="w-[120px] h-[120px] image-fit zoom-in lg:w-12 lg:h-12 2xl:w-12 place-items-center">
                                    <img class="rounded-lg cursor-auto" data-action="zoom"
                                        :src="product.image ? storageUrl + product.image : storageUrl + 'no_image.jpeg'" />
                                </div>
                            </div>
                        </td>

                        <td v-else-if="column.key === 'order_code'"
                            class="w-24 text-[12px] lg:text-sm">
                            <div class="form-check place-content-center">
                                <input type="text" class="form-control w-full sm:w-24 h-[42px] mt-1" aria-label="default input"
                                    :value="product.order_code" @input="changeInput($event, index, 'order_code')"
                                    :disabled="product.disabledEdit" />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'qty'"
                            class="w-24 text-[12px] lg:text-sm">
                            <div class="form-check place-content-center">
                                <input type="text" class="form-control w-full sm:w-24 h-[42px] mt-1" aria-label="default input" :value="product.qty"
                                    @input="changeInput($event, index, 'qty')"
                                    :disabled="product.disabledEdit" />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'max_order'"
                            class="w-24 text-[12px] lg:text-sm">
                            <div class="form-check place-content-center">
                                <input type="text" class="form-control w-full sm:w-24 h-[42px] mt-1" aria-label="default input"
                                    :value="product.max_order_amount" @input="changeInput($event, index, 'max_order')"
                                    :disabled="product.disabledEdit" />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'tag'"
                            class="my-2 w-full text-[12px] lg:w-18 lg:text-sm 2xl:w-32 items-end">
                            <div v-for="tag in product[column.key]" :key="tag">{{ tag }}</div>
                        </td>

                        <td v-else-if="column.key === 'price'"
                            class="w-full text-[12px] lg:w-fit lg:text-sm whitespace-nowrap">
                            <div>{{ product.currency_sign }} {{ product[column.key] }}</div>
                        </td>

                        <td v-else-if="column.key === 'name'"
                            class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32  content-center items-center longMessage">
                            <div class="w-full">{{ product[column.key] }}</div>
                        </td>

                        <td v-else-if="column.key === 'selected'"
                            class="text-[12px] lg:w-18 lg:text-sm 2xl:w-32 selected">
                            <div class="sm: form-check sm:place-content-center">
                                <input id="selectCheckbox"
                                    class="form-check-input w-[1.2rem] h-[1.2rem]"
                                    type="checkbox" v-model="product[column.key]" :disabled="product.disabledEdit" />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'editable'"
                            class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32  content-center items-center">
                            <div class=" form-check place-content-end sm:place-content-center">
                                <div v-if="product.type === 'lucky_draw'">
                                    <input id="selectCheckbox" class="form-check-input w-[1.2rem] h-[1.2rem]" type="checkbox" disabled
                                        v-model="product[column.key]" />
                                </div>
                                <input v-else id="selectCheckbox" class="form-check-input w-[1.2rem] h-[1.2rem]" type="checkbox"
                                    v-model="product[column.key]" @click="product.deletable = false"
                                    :disabled="product.disabledEdit" />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'deletable'"
                            class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32  content-center items-center">
                            <div class=" form-check place-content-end sm:place-content-center">
                                <input v-if="product.editable == false" id="selectCheckbox" class="form-check-input w-[1.2rem] h-[1.2rem]"
                                    type="checkbox" disabled v-model="product[column.key]" />
                                <input v-else id="selectCheckbox" class="form-check-input w-[1.2rem] h-[1.2rem]" type="checkbox"
                                    v-model="product[column.key]" :disabled="product.disabledEdit" />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'type'"
                            class="my-2 w-full text-[12px] lg:w-18 lg:text-sm 2xl:w-32 items-end">
                            <div class=" form-check place-content-end sm:place-content-center"> {{ product[column.key] }}
                            </div>
                        </td>

                        <td v-else-if="column.key === 'edit'">
                            <button class="w-32 bg-white btn dark:border-darkmode-400" v-show="product.disabledEdit"
                                @click="product.disabledEdit = !product.disabledEdit">
                                Edit
                            </button>
                            <button class="w-32 bg-white btn dark:border-darkmode-400" v-show="product.disabledEdit == false"
                                @click="product.disabledEdit = !product.disabledEdit">
                                Cancel
                            </button>
                            <button class="w-32 ml-5 shadow-md btn btn-primary" v-show="product.disabledEdit == false"
                                @click="updateProduct(index)">
                                Update
                            </button>
                        </td>
                    </template>
                </tr>

            </tbody>
        </table>
        <div class="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
            <Page class="mx-auto my-3" :total="dataCount" @on-change="changePage"
                @on-page-size-change="changePageSize" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance, watch } from 'vue';
import { useCreateCampaignStore } from "@/stores/lss-create-campaign";
import { list_product } from '@/api_v2/product';
import { seller_retrieve_campaign_product, seller_delete_campaign_product, seller_update_campaign_product } from '@/api_v2/campaign_product';
import { useRoute } from 'vue-router';

const campaignStore = useCreateCampaignStore();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const storageUrl = import.meta.env.VITE_APP_IMG_URL

const route = useRoute()

const dataCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const productsList = ref([])
const category = ref(undefined)
const tableColumns = ref([
    { name: "Selected", key: "selected" },
    { name: "Image", key: "image" },
    { name: "Product Name", key: "name" },
    { name: "Order Code", key: "order_code" },
    { name: "Qty for Campaign", key: "qty" },
    { name: "Max Qty / Order", key: "max_order" },
    { name: "Category", key: "tag" },
    { name: "Price", key: "price" },
    { name: "Type", key: "type" },
    { name: "Editable", key: "editable" },
    { name: "Deletable", key: "deletable" },

])

onMounted(() => {
    search()

    eventBus.on("assignTable", (payload) => {
        currentPage.value = 1
        category.value = payload.filterColumn
        search()
    })
    eventBus.on("addProducts", () => {
        addProdcuts()
    })
})

onUnmounted(() => {
    eventBus.off("assignTable");
    eventBus.off("addProducts");
})

const search = () => {
    if (route.name === 'assign-product') {
        list_product(pageSize.value, currentPage.value, undefined, undefined, 'enabled', category.value)
            .then(response => {
                dataCount.value = response.data.count
                productsList.value = response.data.results

                productsList.value.forEach((item) => {
                    item.qty_campaign = item.qty
                    item.selected = false
                    item.editable = true
                    item.deletable = true
                    item.max_order_amount = item.qty
                    if (item.type === 'lucky_draw') {
                        item.editable = false
                        item.deletable = false
                    }
                    if (item.editable === false) item.deletable = false
                })
                // 換頁時選取記憶在store中 selected, editable, deletable 欄位
                if (campaignStore.assignedProducts.length > 0) {
                    for (let i = 0; i < campaignStore.assignedProducts.length; i++) {
                        for (let j = 0; j < productsList.value.length; j++) {
                            if (campaignStore.assignedProducts[i].id == productsList.value[j].id) {
                                productsList.value[j] = campaignStore.assignedProducts[i]
                            }
                        }
                    }
                }
            }).catch(function (error) {
                console.log(error);
            })
    } else if (route.name === 'edit-campaign-product') {
        seller_retrieve_campaign_product(route.params.campaign_id, category.value, currentPage.value, pageSize.value)
            .then(response => {
                dataCount.value = response.data.count
                productsList.value = response.data.results

                productsList.value.forEach((item) => {
                    item.qty_campaign = item.qty_for_sale
                    item.qty = item.qty_for_sale
                    item.selected = true
                    item.editable = item.customer_editable
                    item.deletable = item.customer_removable
                    item.disabledEdit = true
                    if (item.type === 'lucky_draw') {
                        item.editable = false
                        item.deletable = false
                    }
                    if (item.editable === false) item.deletable = false
                })

                let editExists = false
                tableColumns.value.forEach((item) => { if (item.name === 'Edit') editExists = true })
                if (editExists == false) tableColumns.value.push({ name: "Edit", key: "edit" })
            }).catch(function (error) {
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

const changeInput = (event, index, type) => {
    if (type == 'order_code') {
        productsList.value[index].order_code = event.target.value
    } else {
        if (event.target.value[0] == '0' && event.target.value.length > 1) event.target.value = event.target.value.substring(1)
        console.log(event.target.value)
        if (parseInt(event.target.value) <= productsList.value[index].qty_campaign) {
            if (type == 'qty') {
                productsList.value[index].qty = event.target.value
            } else if (type == 'max_order') {
                productsList.value[index].max_order_amount = event.target.value
            }
        } else if(parseInt(event.target.value) > productsList.value[index].qty_campaign) {
            alert('input number is over product max quantity')
            event.target.value = productsList.value[index].qty
            return
        } else {
            productsList.value[index].max_order_amount = 0
        } 
    }
}

// 把選取且無重複的product加入store
const addProdcuts = () => {
    let assignProductIdList = []
    if (campaignStore.assignedProducts.length > 0) {
        campaignStore.assignedProducts.forEach((item) => {
            assignProductIdList.push(item.id)
        })
    }

    productsList.value.forEach((item) => {
        if (item.selected == true && !assignProductIdList.includes(item.id)) {
            campaignStore.$patch((state) => {
                state.assignedProducts.push(item)
            })
        } else if (item.selected == false && assignProductIdList.includes(item.id)) {
            campaignStore.$patch((state) => {
                state.assignedProducts.splice(state.assignedProducts.indexOf(item), 1);
            })
        }
    })
}

const updateProduct = (index) => {
    console.log(productsList.value[index])

    if (productsList.value[index].selected == false) {
        seller_delete_campaign_product(route.params.campaign_id, productsList.value[index].id)
            .then(response => {
                console.log(response.data)
                search()
            })
    } else {
        productsList.value[index]['qty_for_sale'] = parseInt(productsList.value[index]['qty'])
        productsList.value[index]['max_order_amount'] = parseInt(productsList.value[index]['max_order_amount'])
        productsList.value[index]['customer_editable'] = productsList.value[index]['editable']
        productsList.value[index]['customer_removable'] = productsList.value[index]['deletable']

        seller_update_campaign_product(route.params.campaign_id, productsList.value[index].id, productsList.value[index])
            .then(response => {
                console.log(response.data)
                search()
            })
    }
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

    td:nth-of-type(4):before {
        content: "Order Code";
        text-align: left !important;
        top:25% !important;
    }

    td:nth-of-type(5):before {
        content: "Qty for Campaign";
        top:25% !important;
    }

    td:nth-of-type(6):before {
        content: "Max Qty / Order";
        top:25% !important;
    }

    td:nth-of-type(7):before {
        top: -3px;
        content: "Category";
        top:25% !important;
    }
    td:nth-of-type(7){
        display: flex;
        flex-direction:column; 
        justify-content: center;
        vertical-align:baseline !important;
    }

    td:nth-of-type(8):before {
        content: "Price";
        margin-top: 0px !important;
    }

    td:nth-of-type(11):before {
        content: "Editable";
    }

    td:nth-of-type(10):before {
        content: "Deletable";
    }

    td:nth-of-type(9):before {
        content: "Type";
        text-align: left !important;
        margin-top: 0 !important;
    }
}
</style>