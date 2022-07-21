<template>
    <div class="p-2 mt-5 box sm:p-5 sm:pb-0">
        <div class="overflow-auto sm:h-[62vh]">
            <table class="table -mt-3 text-center table-report">
            <thead>
                <tr>
                    <th class="items-center truncate whitespace-normal hover:text-clip" v-for="column in tableColumns"
                        :key="column.key">
                        {{ $t(`assign_product.table_column.${column.key}`) }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in campaignStore.assignedProducts" :key="index" class="intro-x">
                    <template v-for="column in tableColumns" :key="column.key" class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm content-center items-center">

                        <td v-if="column.key === 'image'"
                            class="w-18 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 imgtd"> 
                            <div class="flex items-center justify-center">
                                <div class="w-[120px] h-[120px] image-fit zoom-in lg:w-12 lg:h-12 2xl:w-12 place-items-center">
                                    <Tippy 
                                        tag="img" 
                                        class="rounded-lg cursor-auto" 
                                        :src="`${publicPath}` + product.image"
                                        :content="product.name"
                                    />
                                </div>
                            </div>
                        </td>

                        <td v-else-if="column.key === 'name'" class="w-20 name">
                            <div class="w-full"> {{ product[column.key] }} </div>
                        </td>

                        <td v-else-if="column.key === 'order_code'" class="orderCode">
                            <div class=" form-check place-content-end sm:place-content-center">
                                <input 
                                    type="text" 
                                    class="form-control w-full sm:w-24 h-[42px] mt-1 inputBox" 
                                    :class="{ red: isOrderCodeDuplicate(index) }"
                                    v-model="product.order_code"
                                />
                            </div>
                            <div v-if="isOrderCodeDuplicate(index)" class="text-red-600 text-center">
                                duplicate
                            </div>
                            <div v-if="errorMessages[index]" class="text-red-600 text-center">
                                {{ errorMessages[index].order_code }}
                            </div>
                        </td>
                        <td v-else-if="column.key === 'qty'" class="qty">
                            <div class=" form-check place-content-end sm:place-content-center">
                                <input 
                                    type="number" min="1" 
                                    class="form-control w-full sm:w-24 h-[42px] mt-1 inputBox" 
                                    v-model="product.qty"
                                />
                            </div>
                            <div v-if="errorMessages[index]" class="text-red-600 text-center">
                                {{ errorMessages[index].qty }}
                            </div>
                        </td>

                        <td v-else-if="column.key === 'max_order_amount'" class="maxQty">
                            <div class=" form-check place-content-end sm:place-content-center">
                                <input 
                                    type="number" min="1"  
                                    class="form-control w-full sm:w-24 h-[42px] mt-1 inputBox" 
                                    v-model="product.max_order_amount"
                                    @input="changeInput($event, index)"
                                />
                            </div>
                            <div v-if="errorMessages[index]" class="text-red-600 text-center">
                                {{ errorMessages[index].max_order_amount }}
                            </div>
                        </td>

                        <td v-else-if="column.key === 'tag'"
                            class="my-2 w-full text-[12px] lg:w-18 lg:text-sm 2xl:w-32 items-end category">
                            <div v-for="(tag,index) in product[column.key]" :key="index">
                                {{ tag }}
                            </div>
                        </td>

                        <td v-else-if="column.key === 'price'" class="price">
                            <div class="flex place-content-end relative w-full md:w-24 lg:place-content-center">
                                    <span class="my-auto mr-1"> {{ layoutStore.userInfo.user_subscription.currency }} </span>
                                <input 
                                    type="number" 
                                    min="1" 
                                    class="form-control w-[100%] sm:w-20"
                                    v-model="product[column.key]"                             
                                />
                                </div>
                            <!-- {{ layoutStore.userInfo.user_subscription.currency }} {{ product[column.key].toFixed(layoutStore.userInfo.user_subscription.decimal_places)}} -->
                        </td>

                        <td v-else-if="column.key === 'customer_editable'" class="editable">
                            <div class=" form-check place-content-end sm:place-content-center">
                                <input v-if="product.type === 'lucky_draw'"
                                    id="selectCheckbox" 
                                    class="form-check-input w-[1.2rem] h-[1.2rem]" 
                                    type="checkbox" 
                                    disabled
                                    v-model="product[column.key]"
                                />
                                <input v-else
                                    id="selectCheckbox" 
                                    class="form-check-input w-[1.2rem] h-[1.2rem]" 
                                    type="checkbox"
                                    v-model="product[column.key]"
                                    @click="product.customer_removable = false" 
                                />
                            </div>
                        </td>

                        <td v-else-if="column.key === 'customer_removable'" class="deletable">
                            <div class=" form-check place-content-end sm:place-content-center">
                                <input 
                                    v-if="product.customer_editable === true" 
                                    id="selectCheckbox" 
                                    class="form-check-input w-[1.2rem] h-[1.2rem]" 
                                    type="checkbox" 
                                    v-model="product[column.key]"
                                />
                                <input 
                                    v-else
                                    id="selectCheckbox" 
                                    class="form-check-input w-[1.2rem] h-[1.2rem]" 
                                    type="checkbox" 
                                    disabled
                                    v-model="product[column.key]"
                                />
                            </div>
                        </td>
                        <td v-else-if="column.key === 'status'" class="form-switch status">
                            <input 
                                type="checkbox" 
                                class="form-check-input" 
                                v-model="product[column.key]" 
                                />
                        </td>
                        <td v-else-if="column.key === 'type'" class="type">
                            <select 
                                :class="{ red: checkProductType(index) }"
                                class="form-select w-auto mt-2 sm:mt-0"
                                v-model="product[column.key]"
                            >
                                <option v-for="(type, index) in typeSelection" :key="index" :value="type.value">{{ type.name }}</option>
                            </select> 
                            <div v-if="checkProductType(index)" class="text-red-600 text-center">
                                please select type
                            </div>
                        </td>
                    </template>

                </tr>
            </tbody>
        </table>

        <Modal :show="warningModalPreview" @hidden="warningModalPreview = false">
            <ModalBody class="p-0">
                <div class="p-5 text-center">
                    <XCircleIcon class="w-16 h-16 mx-auto mt-3 text-warning" />
                    <div class="mt-5 text-3xl">Oops...</div>
                    <div class="mt-2 text-lg text-slate-500">{{ warningModalText }}</div>
                </div>
                <div class="px-5 pb-8 text-center">
                    <button type="button" @click="warningModalPreview = false" class="w-24 btn btn-primary">
                        Ok
                    </button>
                </div>
            </ModalBody>
        </Modal>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance, computed } from 'vue';
import { useCreateCampaignStore } from "@/stores/lss-create-campaign";
import { useRoute, useRouter } from "vue-router";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import { seller_create_campaign_products, seller_bulk_create_campaign_products } from "@/api_v2/campaign_product";


const campaignStore = useCreateCampaignStore();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const publicPath = ref(import.meta.env.VITE_APP_IMG_URL)
const route = useRoute();
const router = useRouter();
const layoutStore = useLSSSellerLayoutStore()
const dataCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const productsList = ref([])
const category = ref(undefined)

const warningModalPreview = ref(false)
const duplicateOrderCode = ref(false)

const tableColumns = ref([
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
    { name: "Activate", key: "status" }
])
const errorMessages = ref([])
const typeSelection = ref([
    { name: 'Product', value: 'product' },
    { name: 'Lucky Draw', value: 'lucky_draw' }
])
const blankArray = ref([null, '', undefined])

onMounted(() => {
    campaignStore.assignedProducts.forEach((item) => {
        if (item.status == 'enabled') item.status = true
        else if (item.status == 'disabled') item.status = false
    });

    eventBus.on('confirmProducts', () => {
        let orderCodeList = []
        campaignStore.assignedProducts.forEach((item) => {
            orderCodeList.push(item.order_code)
        })

        duplicateOrderCode.value = false
        if (new Set(orderCodeList).size !== orderCodeList.length) {
            duplicateOrderCode.value = true
            warningModalPreview.value = true
            return
        }
        orderCodeList.forEach((value) => {
            if (blankArray.value.includes(value)) {
                duplicateOrderCode.value = true
                warningModalPreview.value = true
                return
            }
        })

        let assignedProducts = campaignStore.assignedProducts
        for (let i = 0; i < assignedProducts.length; i ++) {
            assignedProducts[i]['product_id'] = assignedProducts[i]['id']
            assignedProducts[i]['qty_for_sale'] = parseInt(assignedProducts[i]['qty'])
            assignedProducts[i]['max_order_amount'] = parseInt(assignedProducts[i]['max_order_amount'])
        }

        seller_bulk_create_campaign_products(route.params.campaign_id, assignedProducts)
        .then(response => {
            router.push({ name: 'campaign-list' })
        }).catch(error => {
            if (error.response) {
                errorMessages.value = error.response.data.errors
            }
        })
    })
})

onUnmounted(() => {
    eventBus.off('confirmProducts')
})

const warningModalText = computed(() => {
    if (duplicateOrderCode.value) return 'There are duplicated or blank order code, please rename it.'
})

const changeInput = (event, index) => {
    if (parseInt(event.target.value) > campaignStore.assignedProducts[index].qty) {
        alert('Input number is over product max quantity')
        campaignStore.assignedProducts[index].max_order_amount = campaignStore.assignedProducts[index].qty
    } 
}

const isOrderCodeDuplicate = (index) => {
    let this_order_code = campaignStore.assignedProducts[index].order_code
    for (let i = 0; i < campaignStore.assignedProducts.length; i++) {
        if (i != index && campaignStore.assignedProducts[i].order_code == this_order_code) return true
    }
}

const checkProductType = (index) => {
    if (blankArray.value.includes(campaignStore.assignedProducts[index].type)) return true
}

</script>

<style scoped>
.red {
    border-color: red !important;
}
.click-icon:hover {
	cursor: pointer;
}

.name{
	overflow-wrap: break-word;
}

td {
	height: auto !important;
    min-height: 50px;
    border-collapse: collapse;
    width: auto !important;
    padding-right: 10px !important;
    padding-left: 10px !important;
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

	table, thead, tbody, th, td, tr {
		display: block;
		font-size: 16px;
		padding: 0px !important;
	}
	.imgtd {
        display: inline-block;
        width: 80% !important;
        padding-left: 20% !important;
        height: 125px !important;
    }
    
    .inputBox{
        height: 35px !important;
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

	td:nth-of-type(1):before {
		display:none; 
		/* color: #0e9893; */
	}
    td:nth-of-type(1){
		display: inline-block;
		width: 100% !important;
		padding-left: 0% !important;
		/* color: #0e9893; */
	}

	.name:before {
        display:none; 
	}
    .name{
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
        top:25%;
		/* color: #0e9893; */
	}
    .orderCode input{
        text-align:right
    }
	.qty:before {
		content: "Qty for Campaign";
        top:25%;
		/* color: #0e9893; */
	}
    .qty input{
        text-align:right
    }
	.maxQty:before {
		content: "Max Qty / Order";
        top:25%;
		/* color: #0e9893; */
	}
    .maxQty input{
        text-align:right
    }
	.category:before {
        content: "Category";
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
    .editable:before {
		content: "Editable";
	}
    .deletable:before {
		content: "Deletable";
	}

    .type:before {
        content: "Type";
        text-align: left !important;
        top:25% !important;
        margin-top: 0 !important;
    }
    .status:before {
		content: "Active";
	}
    .status{
        padding-right: 5px !important;
    }
}
</style>