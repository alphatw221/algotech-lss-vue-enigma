<template>
    <div class="overflow-x-auto overflow-y-auto h-[500px]">
        <table class="table table-report">
            <thead>
                <tr>
                    <th class="whitespace-normal truncate hover:text-clip items-center" v-for="column in tableColumns"
                        :key="column.key">
                        {{ column.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in productsList" :key="index" class="intro-x">
                    <template v-for="column in tableColumns" :key="column.key"> 

                        <td v-if="column.key === 'image'"
                            class="w-18 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center imgtd"> 
                            <div class="flex items-center justify-center">
                                <div class="w-20 h-20 image-fit zoom-in lg:w-12 lg:h-12 2xl:w-12 lg:h-12 place-items-center">
                                    <Tippy 
                                        tag="img" 
                                        class="rounded-lg cursor-auto" 
                                        :src="product.image?storageUrl + product.image:storageUrl+'no_image.jpeg'"
                                        :content="product.name"
                                    />
                                </div>
                            </div>
                        </td>
                        
                        <td v-else-if="column.key === 'order_code'"
                            class="w-18 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center"> 
                            <div class="form-check self-center place-content-center">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    aria-label="default input" 
                                    :value="product.order_code"
                                    @input="changeInput($event, index, 'order_code')"
                                    style="width: 4rem; height: 2rem; margin-top: 5px;"
                                    :disabled="product.disabledEdit"
                                />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'qty'"
                            class="w-18 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center"> 
                            <div class="form-check self-center place-content-center">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    aria-label="default input" 
                                    :value="product.qty"
                                    @input="changeInput($event, index, 'qty')"
                                    style="width: 4rem; height: 2rem; margin-top: 5px;"
                                    :disabled="product.disabledEdit"
                                />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'max_order'"
                            class="w-18 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center"> 
                            <div class="form-check self-center place-content-center">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    aria-label="default input" 
                                    :value="product.max_order_amount"
                                    @input="changeInput($event, index, 'max_order')"
                                    style="width: 4rem; height: 2rem; margin-top: 5px;" 
                                    :disabled="product.disabledEdit"
                                />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'tag'" 
                            class="my-2 w-20 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center"> 
                            <div v-for="tag in product[column.key]" :key="tag" >{{ tag }}</div> 
                        </td>

                        <td v-else-if="column.key === 'price'"
                            class="w-24 text-[12px] lg:w-24 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center"> 
                            <div>{{ product.currency_sign }} {{ product[column.key] }}</div>
                        </td>

                        <td v-else-if="column.key === 'name'"
                            class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center longMessage"> 
                            <div class="w-fit">{{ product[column.key] }}</div>
                        </td>

                        <td v-else-if="column.key === 'selected'"
                            class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm "> 
                            <div class="form-check mt-2 self-center place-content-center">
                               <input 
                                    id="selectCheckbox" 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    v-model="product[column.key]"
                                    :disabled="product.disabledEdit"
                                />
                                <span class="checkboxWord ml-3"> Select</span>
                            </div>
                        </td>

                        <td v-else-if="column.key === 'editable'"
                            class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center"> 
                            <div class="form-check mt-2 self-center place-content-center">
                                <div v-if="product.type === 'lucky_draw'">
                                    <input
                                        id="selectCheckbox" 
                                        class="form-check-input" 
                                        type="checkbox" 
                                        disabled
                                        v-model="product[column.key]"
                                    />
                                </div>
                                <input
                                    v-else
                                    id="selectCheckbox" 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    v-model="product[column.key]"
                                    @click="product.deletable = false"
                                    :disabled="product.disabledEdit"
                                />
                                <span class="checkboxWord ml-3"> Editable</span>
                            </div>
                        </td>

                        <td v-else-if="column.key === 'deletable'"
                            class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center"> 
                            <div class="form-check mt-2 self-center place-content-center">
                               <input 
                                    v-if="product.editable == false" 
                                    id="selectCheckbox" 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    disabled
                                    v-model="product[column.key]"
                                />
                                <input 
                                    v-else
                                    id="selectCheckbox" 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    v-model="product[column.key]"
                                    :disabled="product.disabledEdit"
                                />
                                <span class="checkboxWord ml-3"> Deletable</span>
                            </div>
                        </td>

                        <td v-else-if="column.key === 'type'"
                            class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center"> 
                            <div class="form-check mt-2 self-center place-content-center"> {{ product[column.key] }} </div>
                        </td>

                        <td v-else-if="column.key === 'edit'">
                            <button class="btn btn-sm btn-secondary w-16 mr-1" v-show="product.disabledEdit" @click="product.disabledEdit = !product.disabledEdit">
                                Edit
                            </button>
                            <button class="btn btn-sm btn-danger w-16 mr-1" v-show="product.disabledEdit == false" @click="product.disabledEdit = !product.disabledEdit">
                                Cancel
                            </button>
                            <button class="btn btn-sm btn-success w-16 mr-1" v-show="product.disabledEdit == false" @click="updateProduct(index)">
                                Update
                            </button>
                        </td>
                    </template>
                </tr>
                
            </tbody>
        </table>
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
            <Page 
                :total="dataCount" 
                @on-change="changePage" 
                @on-page-size-change="changePageSize" 
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance, watch} from 'vue';
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
	{ name: "Editable", key: "editable" },
	{ name: "Deletable", key: "deletable" },
	{ name: "Type", key: "type" },
])

onMounted(() => {
    search()

    eventBus.on("assignTable", (payload) => {
        currentPage.value = 1
        category.value = payload.filterColumn
        search()
    })
    eventBus.on("addProducts", () => { addProdcuts() })
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
                item.max_order_amount = 1
                if (item.type === 'lucky_draw') {
                    item.editable = false
                    item.deletable = false
                }
                if (item.editable === false) item.deletable = false
            })
            // 換頁時選取記憶在store中 selected, editable, deletable 欄位
            if (campaignStore.assignedProducts.length > 0) {
                for (let i = 0; i < campaignStore.assignedProducts.length; i ++) {
                    for (let j = 0; j < productsList.value.length; j ++) {
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
        if (event.target.value == '') event.target.value = 1 
        console.log(parseInt(event.target.value))
        if (parseInt(event.target.value) <= productsList.value[index].qty_campaign) {
            if (type == 'qty') {
                productsList.value[index].qty = event.target.value
            } else if (type == 'max_order') {
                productsList.value[index].max_order_amount = event.target.value
            }
        } else {
            alert('input number is over product max quantity')
            event.target.value = productsList.value[index].qty
            return
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
.longMessage{
	overflow-wrap: break-word;
}	

thead th{ 
  position: sticky !important; 
  top: 0 !important;
  z-index: 99;
  background-color: theme("colors.secondary");
  padding-right: 10px !important;
  padding-left: 10px !important;
}

.checkboxWord{
    display: none;
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

	.imgtd {
		height: 90px !important;
	}

    .checkboxWord{
        display: block;
    }

	thead tr {
		position: absolute;
		top: -9999px;
		left: -9999px;
	}

	tr {
		border-bottom: 1px solid black;
		margin-top: 20px;
	}

	td {
		border: none;
		position: relative;
		padding-left: 50% !important;
		text-align: center !important;
		box-shadow: none !important;
        font-size: 14px; 
	}

	td:before {
		position: absolute;
		left: 6px;
		width: 45%;
		padding-right: 10px;
		white-space: nowrap;
		font-weight: bold;
		box-shadow: none !important;
		background-color: white !important;
	}

	td:nth-of-type(1):before {
		display: none;
        text-align: left !important;
		/* color: #0e9893; */
	}
    td:nth-of-type(1){
		display: inline-block;
		width: 100% !important;
		padding-left: 0% !important;
		/* color: #0e9893; */
	}

	td:nth-of-type(2):before {
		content: "";
		/* color: #0e9893; */
	}

	td:nth-of-type(3):before {
		content: "Product Name";
        text-align: left !important;
		/* color: #0e9893; */
	}

	td:nth-of-type(4):before {
		content: "Order Code";
        text-align: left !important;
		/* color: #0e9893; */
	}

	td:nth-of-type(5):before {
		content: "Qty for Campaign";
        text-align: left !important;
		/* color: #0e9893; */
	}
	td:nth-of-type(6):before {
		content: "Max Qty / Order";
        text-align: left !important;
		/* color: #0e9893; */
	}

	td:nth-of-type(7):before {
		content: "Category";
        text-align: left !important;
		/* color: #0e9893; */
	}
	td:nth-of-type(8):before {
		content: "Price";
        text-align: left !important;
		/* color: #0e9893; */
	}
    td:nth-of-type(11):before {
		content: "Type";
        text-align: left !important;
		/* color: #0e9893; */
	}
    td:nth-of-type(9):before {
        display: none;
        text-align: left !important;
		/* color: #0e9893; */
	}
    td:nth-of-type(10):before {
        display: none;
        text-align: left !important;
		/* color: #0e9893; */
	}

    td:nth-of-type(9){
		display: inline-block;
		width: 50% !important;
		padding-left: 0% !important;
		/* color: #0e9893; */
	}
	td:nth-of-type(10){
		display: inline-block;
		width: 50% !important;
		padding-left: 0% !important;
		/* color: #0e9893; */
	}
    
}
</style>