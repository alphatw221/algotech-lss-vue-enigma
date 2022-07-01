<template>
	<div class="overflow-x-auto overflow-y-auto h-[670px]">
		<table class="table table-report mt-5 table-auto">
			<thead>
				<tr >
				<th><input class="form-check-input" type="checkbox" v-model="checkboxAll" @change="selectAll"/></th>
					<th class="whitespace-normal truncate hover:text-clip" v-for="column in columns" :key="column.key">
						{{ column.name }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(product, product_index) in listItems"
					:key="product_index"
					class="intro-x"
				>	
					<td><input class="form-check-input" type="checkbox" :value="product.id" v-model="selected" @change="updateSelected(product)"/></td>
					<td v-for="column in columns" :key="column.key" class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm">
						<template v-if="column.key === 'image'" >
							<div class="flex">
								<div class="w-10 h-10 image-fit zoom-in lg:w-12 lg:h-12 2xl:w-12 lg:h-12">
									<Tippy 
										tag="img"
										class="rounded-lg"
										:src= "`${publicPath}` + product.image"
										:content="`Uploaded at`"
									/>
								</div>
							</div>
						</template>
						<template v-else-if="column.key === 'order_code'">
							<input class="form-check-input w-full sm:w-32 2xl:e-full mt-2 sm:mt-0 sm:w-auto" type="text" v-model="product[column.key]" @change="checkOrderCode(product_index, column.key, product[column.key])" :class="{ error: highlightOrderCodeError(product_index, column.key) }"/>
							<label class="error_message" v-if="validateList[product_index][column.key]['required']">Required</label>
							<label class="error_message" v-else-if="validateList[product_index][column.key]['duplicate_code']">Duplicate Order Code</label>
							<label class="error_message" v-else-if="validateList[product_index][column.key]['used_in_campaign_products']">Already Used In Campaign Products</label>
							<label class="error_message" v-else-if="validateList[product_index][column.key]['max_length_10']">Enter order code with no more than 10 digits</label>
						</template>
						<template v-else-if="column.key === 'category'" v-for="(tag,tag_index) in product['tag']" :key="tag_index">
							<div>{{ tag }}</div> 
						</template>
						<template v-else-if="column.key === 'qty' || column.key === 'max_order_amount'">
							<input class="form-check-input w-full sm:w-32 2xl:e-full mt-2 sm:mt-0 sm:w-auto" min="1" :max="stockProducts[product_index]['qty']" type="number" v-model="product[column.key]" :class="{ error: checkMaxValue(product_index, column.key, 'max_value', product[column.key], stockProducts[product_index]['qty']) }"/>
							<label class="error_message" v-if="validateList[product_index][column.key]['max_value']">exceed stock amount</label>
						</template>
						<template v-else-if="column.key === 'type'">
							<select 
								id="tabulator-html-filter-field"
								class="form-select sm:w-30 2xl:e-full mt-2 sm:mt-0 sm:w-auto"
								v-model="product[column.key]"
							>
								<option v-for="(type, type_key) in product_type" :key="type_key" :value="type">{{ removeDash(type) }}</option>
							</select> 
						</template>
						<template v-else-if="column.key === 'customer_editable' || column.key === 'customer_removable'">
							<input class="form-check-input" type="checkbox" v-model="product[column.key]"/>
						</template>
						<template v-else>
							<div class="truncate hover:text-clip sm:w-25 lg:w-25 2xl:w-30"> {{product[column.key]}} </div>
						</template>
					</td>
				</tr>
			</tbody>
		</table> 
		
		
	</div>
	<div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center justify-between">
		<Page 
			:total="dataCount" 
			@on-change="changePage"
			@on-page-size-change="changePageSize"
		/>
		<div>
			<button type="button" class="btn bg-white hover:bg-gray-100 mr-1" @click="resetData">reset</button>
			<button type="button" class="btn btn-primary mr-1" @click="submitData">Apply</button>
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
</style>