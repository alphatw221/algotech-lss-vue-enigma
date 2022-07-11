<template>
<div class="relative"> 
	<div class="overflow-auto h-[670px] text-[14px] mt-10">
		<table class="table table-report h-[100%] w-[100%]">
			<thead>
				<tr>
					<th class="w-10">
						<input class="form-control form-check-input w-[1rem] h-[1rem] mr-1 my-auto" type="checkbox" v-model="checkboxAll" @change="selectAll"/></th>
					<th class="truncate whitespace-normal hover:text-clip" v-for="column in columns" :key="column.key">
						{{ column.name }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(product, product_index) in listItems"
					:key="product_index"
					class="align-middle intro-x"
				>
					<td class="w-10">
						<input class="form-control form-check-input w-[1rem] h-[1rem] mr-1 my-auto" type="checkbox" :value="product.id" v-model="selected" @change="updateSelected(product)"/></td>
					<td v-for="column in columns" :key="column.key" class="text-[14px]">
						<template v-if="column.key === 'image'" >
							<div class="flex">
								<div class="w-10 h-10 image-fit zoom-in lg:w-12 lg:h-12">
									<img 
										class="rounded-lg zoom-in"
										:src= "`${publicPath}` + product.image"
									/>
								</div>
							</div>
						</template>
						<template v-else-if="column.key === 'order_code'">
						<div class="flex flex-col">
							<input class="w-full mt-2 form-control sm:w-20 sm:mt-0" type="text" v-model="product[column.key]" @change="checkOrderCode(product_index, column.key, product[column.key])" :class="{ error: highlightOrderCodeError(product_index, column.key) }"/>
							<label class="error_message" v-if="validateList[product_index][column.key]['required']">Required</label>
							<label class="error_message" v-else-if="validateList[product_index][column.key]['duplicate_code']">Duplicate Order Code</label>
							<label class="error_message" v-else-if="validateList[product_index][column.key]['used_in_campaign_products']">Already Used In Campaign Products</label>
							<label class="error_message" v-else-if="validateList[product_index][column.key]['max_length_10']">Enter order code with no more than 10 digits</label>
						</div>
						</template>
						<template v-else-if="column.key === 'category'" v-for="(tag,tag_index) in product['tag']" :key="tag_index">
							<div>{{ tag }}</div> 
						</template>
						<template v-else-if="column.key === 'qty' || column.key === 'max_order_amount'">
						<div class="flex flex-col">
							<input class="w-full mt-2 form-control sm:w-20 sm:mt-0" min="1" :max="stockProducts[product_index]['qty']" type="number" v-model="product[column.key]" :class="{ error: checkMaxValue(product_index, column.key, 'max_value', product[column.key], stockProducts[product_index]['qty']) }"/>
							<label class="error_message" v-if="validateList[product_index][column.key]['max_value']">exceed stock amount</label>
						</div>
						</template>
						<template v-else-if="column.key === 'type'">
							<select 
								class="w-auto mt-2 form-select sm:mt-0"
								v-model="product[column.key]"
							>
								<option v-for="(type, type_key) in product_type" :key="type_key" :value="type">{{ removeDash(type) }}</option>
							</select> 
						</template>
						<template v-else-if="column.key === 'customer_editable' || column.key === 'customer_removable'">
							<input class="form-control form-check-input w-[1rem] h-[1rem] mr-1 my-auto" type="checkbox" v-model="product[column.key]"/>
						</template>
						<template v-else-if="column.key === 'price'">
							<div class="z-10 w-20 truncate hover:text-clip"> ${{product[column.key]}} </div>
						</template>
						<template v-else>
							<div class="w-24 break-word"> {{product[column.key]}} </div>
						</template>
					</td>
				</tr>
			</tbody>
		</table> 
		
		
	</div>
	<div class="flex flex-wrap items-center justify-between col-span-12 intro-y sm:flex-row sm:flex-nowrap">
		<Page 
			class="mx-auto my-3"
			:total="dataCount" 
			@on-change="changePage"
			@on-page-size-change="changePageSize"
		/>
		<div>
			<button type="button" class="w-32 btn dark:border-darkmode-400" @click="resetData">reset</button>
			<button type="button" class="w-32 ml-5 shadow-md btn btn-primary" @click="submitData">Apply</button>
		</div>
		
	</div> 
</div>
</template>

<script setup>
import { createAxiosWithBearer } from '@/libs/axiosClient'
import { seller_create_campaign_products } from "@/api_v2/campaign_product"
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list";
import { useVuelidate } from "@vuelidate/core";
import { required,minValue, decimal, integer, maxLength } from "@vuelidate/validators";

const layoutStore = useLSSSellerLayoutStore();
const campaignListStore = useLSSCampaignListStore()
const internalInstance = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const props = defineProps({
	requestUrl: String,
	columns: Array,
	status: String,
	campaignProducts: Array
});


const currentPage = ref(1)
const totalPage = ref(1)
const pageSize = ref(10)
const changePageSize = ref(10)
const dataCount = ref(0)
const searchColumn = ref(undefined)
const listItems = ref([])
const publicPath = ref(import.meta.env.VITE_APP_IMG_URL)
const category = ref(undefined)
const product_type = ref(["product", "lucky_draw"])
const stockProducts = ref([])

onMounted(() => {
	search();
	eventBus.on("searchTable", (payload) => {
		currentPage.value = 1
		category.value = payload.filterColumn
		search()
	});
	getCampaignProductsOrderCodeList()
	
	
})
	
onUnmounted(() => {
	eventBus.off("searchTable");
	eventBus.off("passCampaignProduct");
})

const getCampaingProductsIdList = () => {
	let list = []
	for (let i = 0; i < props.campaignProducts.length; i++) {
		let product_id = props.campaignProducts[i].product
		list.push(product_id)
	}
	return list
}

const getCampaignProductsOrderCodeList = () => {
	for (let i = 0; i < props.campaignProducts.length; i++) {
		let order_code = props.campaignProducts[i].order_code
		campaignProductsOrderCodeList.value.push(order_code)
	}
}

const search = () => {
	createAxiosWithBearer()
	.get(props.requestUrl + `?page_size=${pageSize.value}&page=${currentPage.value}&search_column=&keyword=&product_status=${props.status}&category=${category.value}&exclude=${getCampaingProductsIdList()}`)
	.then(response => {
		if(response.data.count === undefined) {
			return false
		}
		stockProducts.value = JSON.parse(JSON.stringify(response.data.results))
		dataCount.value = response.data.count
		totalPage.value = Math.ceil(response.data.count / pageSize.value)
		listItems.value = response.data.results
		for(let i=0; i<listItems.value.length; i++ ){
			listItems.value[i].max_order_amount = listItems.value[i].qty
			listItems.value[i].customer_editable = true
			listItems.value[i].customer_removable = true
		}
		createValidationList()
		
	}).catch(error => {
		console.log(error)
	})
}

const changePage = (page) => {
	currentPage.value = page
	search()
}

const removeDash = (word) =>{
	return word.replace("_", " ")
}

//for validation function
const campaignProductsOrderCodeList = ref([])
const usedInCampaignOrderCodeList = ref([])
const duplicatedOrderCodeMap = ref({})
const OrderCodeMaxLengthList = ref([])
const OrderCodeRequiredList = ref([])
const validateList = ref([])
const validator = ref({
	'order_code': ['required', 'duplicate_code', 'used_in_campaign_products', 'max_length_10'],
	'qty': ['max_value'],
	'max_order_amount': ['max_value']
})
const createValidationList = () => {
	validateList.value = JSON.parse(JSON.stringify(stockProducts.value))
	validateList.value.forEach(el => {
		Object.keys(validator.value).forEach(key => {
			let new_obj = {}
			validator.value[key].forEach(arr_el => new_obj[arr_el] = false)
			el[key] = new_obj
		})
	})
}

const highlightOrderCodeError = (index, key) => {
	let show = false;
	validator.value['order_code'].forEach(rule => show = show || validateList.value[index][key][rule])
	return show
}

const checkOrderCode = (index, key, order_code) => {
	checkOrderCodeRequired(index, key, 'required', order_code)
	checkOrderCodeDuplicated(index, key, 'duplicate_code', order_code)
	checkOrderCodeUsedInCampaignProduct(index, key, 'used_in_campaign_products', order_code)
	checkOrderCodeMaxLength(index, key, 'max_length_10', order_code)
}

const checkOrderCodeDuplicated = (index, key, validator, order_code) => {
	let list = listItems.value.filter(el => el['order_code'] === order_code && order_code != "")
	if (list.length > 1) {
		duplicatedOrderCodeMap.value[order_code] = []
		listItems.value.forEach((item, idx) => {
			if (item['order_code'] != order_code) {
				return
			}
			validateList.value[idx][key][validator] = true
			duplicatedOrderCodeMap.value[order_code].push(idx)
		})
		Object.keys(duplicatedOrderCodeMap.value).forEach(k=>{
			if (k === order_code) {
				return
			}
			if (!duplicatedOrderCodeMap.value[k].includes(index)) {
				return
			}
			let list2 = duplicatedOrderCodeMap.value[k].filter(e => e != index)
			if (list2.length === 1) {
				list2.forEach(i => {
					validateList.value[i][key][validator] = false
				})
				delete duplicatedOrderCodeMap.value[k]
			}
		})
	} else {
		Object.keys(duplicatedOrderCodeMap.value).forEach(k=>{
			if (!duplicatedOrderCodeMap.value[k].includes(index)) {
				return
			}
			if (duplicatedOrderCodeMap.value[k].length <= 2) {
				duplicatedOrderCodeMap.value[k].forEach(e => {
					validateList.value[e][key][validator] = false
				})
				delete duplicatedOrderCodeMap.value[k]
			} else {
				validateList.value[index]['order_code'][validator] = false
				duplicatedOrderCodeMap.value[k] = duplicatedOrderCodeMap.value[k].filter(e => e != index)
			}
		})
	}
	
	console.log(duplicatedOrderCodeMap.value)
}

const checkOrderCodeUsedInCampaignProduct = (index, key, validator, order_code) => {
	if (campaignProductsOrderCodeList.value.includes(order_code)) {
		validateList.value[index][key][validator] = true
		if (!usedInCampaignOrderCodeList.value.includes(index)) {
			usedInCampaignOrderCodeList.value.push(index)
		}
		return true
	} else {
		validateList.value[index][key][validator] = false
		usedInCampaignOrderCodeList.value = usedInCampaignOrderCodeList.value.filter(e => e != index)
	}
	return false
}

const checkOrderCodeMaxLength = (index, key, validator, order_code) => {
	if (order_code.length > 10) {
		validateList.value[index][key][validator] = true
		if (!OrderCodeMaxLengthList.value.includes(index)) {
			OrderCodeMaxLengthList.value.push(index)
		}
		return true
	}
	validateList.value[index][key][validator] = false
	OrderCodeMaxLengthList.value = OrderCodeMaxLengthList.value.filter(e => e != index)
	return false
}

const checkOrderCodeRequired = (index, key, validator, order_code) => {
	if (["", null, undefined].includes(order_code)) {
		validateList.value[index][key][validator] = true
		if (!OrderCodeRequiredList.value.includes(index)) {
			OrderCodeRequiredList.value.push(index)
		}
		return true
	}
	validateList.value[index][key][validator] = false
	OrderCodeRequiredList.value = OrderCodeRequiredList.value.filter(e => e != index)
	return false
}

const checkMaxValue = (index, key, validator, current_value, max_value) => {
	if (current_value > max_value) {
		validateList.value[index][key][validator] = true
		return true
	}
	validateList.value[index][key][validator] = false
	return false
}

// for checkbox click function
const assignedProducts = ref([])
const checkboxAll = ref(false)
const selected = ref([])

const selectAll = () => {
	selected.value = []
	if (checkboxAll.value) {
		listItems.value.forEach(el => {
			selected.value.push(el.id)
			assignedProducts.value.push(el)
		})
		// collect data
	} else {
		assignedProducts.value = []
	}
}
const updateSelected = (product) => {
	checkboxAll.value = false
	if (selected.value.length === listItems.value.length) {
		checkboxAll.value = true
	}
	// collect data
	if (selected.value.includes(product.id)) {
		assignedProducts.value.push(product)
	} else {
		let index = listItems.value.findIndex(el=> el.id == product.id)
		assignedProducts.value.splice(index, 1)
	}
	
}

// button click function

const submitData = () => {
	if (!selected.value.length) {
		layoutStore.alert.showMessageToast("No Items Selected");
		return false
	}
	if (Object.keys(duplicatedOrderCodeMap.value).length) {
		layoutStore.alert.showMessageToast("Duplicated Order Code Exists");
		return false
	}
	if (OrderCodeMaxLengthList.value.length) {
		layoutStore.alert.showMessageToast("Order Code Exceed 10 digits");
		return false
	}
	if (OrderCodeRequiredList.value.length) {
		layoutStore.alert.showMessageToast("Order Code Is Required");
		return false
	}
	if (usedInCampaignOrderCodeList.value.length) {
		layoutStore.alert.showMessageToast("Already Used In Campaign Products");
		return false
	}
	
	for (let i = 0; i < assignedProducts.value.length; i ++) {
		assignedProducts.value[i]['product_id'] = assignedProducts.value[i]['id']
		delete assignedProducts.value[i]['id']; 
		assignedProducts.value[i]['qty_for_sale'] = parseInt(assignedProducts.value[i]['qty'])
		assignedProducts.value[i]['status'] = true
	}
	seller_create_campaign_products(route.params.campaign_id, assignedProducts.value)
	.then(response => {
		eventBus.emit("addProductFromStock", response.data)
		campaignListStore.showAddProductFromStockModal = false;
		layoutStore.notification.showMessageToast("Successed")
	})
}

const resetData = () => {
	listItems.value = JSON.parse(JSON.stringify(stockProducts.value))
	createValidationList()
}

</script>

<style scoped>

.error {
	border-color: red;
}
.error_message{
	background-color: white;
	color: red;
	position: absolute;
	top:75%;
}
td {
	height: auto !important;
	width: max-content !important;
    min-height: 50px;
    border-collapse: collapse;
    padding-right: 10px !important;
    padding-left: 10px !important;
}

thead th{ 
  position: sticky !important; 
  top: 0 !important;
  z-index: 99;
  background-color: theme("colors.secondary");
  padding-right: 10px !important;
  padding-left: 10px !important;
}
</style>