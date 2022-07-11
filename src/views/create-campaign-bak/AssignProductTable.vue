<template>
    <div class="overflow-x-auto overflow-y-auto h-[500px]">
        <table class="table table-report">
            <thead>
                <tr>
                    <th class="items-center truncate whitespace-normal hover:text-clip" v-for="column in tableColumns"
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
                                <div class="w-20 h-20 image-fit zoom-in lg:w-12 lg:h-12 2xl:w-12 place-items-center">
                                    <Tippy 
                                        tag="img" 
                                        class="rounded-lg cursor-auto" 
                                        :src="`${publicPath}` + product.image"
                                        :content="product.name"
                                    />
                                </div>
                            </div>
                        </td>
                        
                        <td v-else-if="column.key === 'order_code'"
                            class="w-18 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center"> 
                            <div class="self-center form-check place-content-center">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    aria-label="default input" 
                                    :value="product.order_code"
                                    @input="changeInput($event, index, 'order_code')"
                                    style="width: 4rem; height: 2rem; margin-top: 5px;"
                                />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'qty_campaign'"
                            class="w-18 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center"> 
                            <div class="self-center form-check place-content-center">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    aria-label="default input" 
                                    :value="product.qty"
                                    @input="changeInput($event, index, 'qty_campaign')"
                                    style="width: 4rem; height: 2rem; margin-top: 5px;"
                                />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'max_order'"
                            class="w-18 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center"> 
                            <div class="self-center form-check place-content-center">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    aria-label="default input" 
                                    :value="product.max_order_amount"
                                    @input="changeInput($event, index, 'max_order')"
                                    style="width: 4rem; height: 2rem; margin-top: 5px;" 
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
                            <div class="self-center mt-2 form-check place-content-center">
                               <input 
                                    id="selectCheckbox" 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    v-model="product[column.key]"
                                />
                                <span class="ml-3 checkboxWord"> Select</span>
                            </div>
                        </td>

                        <td v-else-if="column.key === 'editable'"
                            class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center"> 
                            <div class="self-center mt-2 form-check place-content-center">
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
                                    />
                                    <span class="ml-3 checkboxWord"> Editable</span>
                            </div>
                        </td>

                        <td v-else-if="column.key === 'deletable'"
                            class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center"> 
                            <div class="self-center mt-2 form-check place-content-center">
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
                                />
                                <span class="ml-3 checkboxWord"> Deletable</span>
                            </div>
                        </td>

                        <td v-else-if="column.key === 'type'"
                            class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center"> 
                            <div class="self-center mt-2 form-check place-content-center"> {{ product[column.key] }} </div>
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
        <div class="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
            <Page 
                class="mx-auto my-3"
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

const campaignStore = useCreateCampaignStore(); 
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const publicPath = ref(import.meta.env.VITE_APP_IMG_URL)

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
	{ name: "Qty for Campaign", key: "qty_campaign" },
	{ name: "Max Qty / Order", key: "max_order" },
	{ name: "Category", key: "tag" },
	{ name: "Price", key: "price" },
	{ name: "Editable", key: "editable" },
	{ name: "Deletable", key: "deletable" },
	{ name: "Type", key: "type" }
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
            if (item.editable === false) {
                item.deletable = false
            }
        })
        // 跳頁時選取記憶 selected, editable, deletable 欄位
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

        if (event.target.value <= productsList.value[index].qty) {
            if (type == 'qty_campaign') {
                productsList.value[index].qty_campaign = event.target.value
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

    console.log(campaignStore.assignedProducts)
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
  z-index: 50;
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