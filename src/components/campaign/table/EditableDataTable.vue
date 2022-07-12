<template>
<div v-show="openTab=='select'">
	<label class="w-14 flex-none mr-2">Category</label>
	<select 
		id="tabulator-html-filter-field"
		class="form-select w-32"
		v-model="selectedCategory"
		@change="search()"
	>
		<option v-for="category,index in productCategories" :key="index" :value="category.value">{{ category.name }}</option>
	</select>


	<div class="relative"> 
		<div class="overflow-auto h-[670px] text-[14px] mt-10">
			<table class="table table-report h-[100%] w-[100%]">
				<thead>
					<tr>
						<th class="w-10">
							<input class="form-control form-check-input w-[1rem] h-[1rem] mr-1 my-auto" type="checkbox" @change="selectAll($event)"/></th>
						<th class="whitespace-normal truncate hover:text-clip" v-for="column in tableColumns" :key="column.key">
							{{ column.name }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(product, product_index) in stockProducts"
						:key="product_index"
						class="intro-x align-middle"
					>
						<td class="w-10">
							<input class="form-control form-check-input w-[1rem] h-[1rem] mr-1 my-auto" type="checkbox" @click="selectProduct(product_index, $event)"/>
						</td>

						<td v-for="column in tableColumns" :key="column.key" class="text-[14px]">

							<template v-if="column.key === 'image'" >
								<div class="flex">
									<div class="w-10 h-10 image-fit zoom-in lg:w-12 lg:h-12">
										<img 
											class="rounded-lg zoom-in"
											:src="imageUrl+product.image"
										/>
									</div>
								</div>
							</template>

							<template v-else-if="column.key === 'order_code'">
								<div class="flex flex-col">
									<input class="form-control w-full sm:w-20 mt-2 sm:mt-0" type="text" v-model="product[column.key]" />
									<!-- <label class="error_message" v-if="validateList[product_index][column.key]['required']">Required</label>
									<label class="error_message" v-else-if="validateList[product_index][column.key]['duplicate_code']">Duplicate Order Code</label>
									<label class="error_message" v-else-if="validateList[product_index][column.key]['used_in_campaign_products']">Already Used In Campaign Products</label>
									<label class="error_message" v-else-if="validateList[product_index][column.key]['max_length_10']">Enter order code with no more than 10 digits</label> -->
								</div>
							</template>

							<template v-else-if="column.key === 'category'" v-for="(tag,tag_index) in product['tag']" :key="tag_index">
								<div>{{ tag }}</div> 
							</template>

							<template v-else-if="column.key === 'qty' || column.key === 'max_order_amount'">
							<div class="flex flex-col">
								<input class="form-control w-full sm:w-20 mt-2 sm:mt-0" min="1" type="number" v-model="product[column.key]" />
								<!-- <label class="error_message" v-if="validateList[product_index][column.key]['max_value']">exceed stock amount</label> -->
							</div>
							</template>

							<template v-else-if="column.key === 'type'">
								<select 
									class="form-select w-auto mt-2 sm:mt-0"
									v-model="product[column.key]"
								>
									<option v-for="(type, index) in product_type" :key="index" :value="type.value">{{type.name}}</option>
								</select> 
							</template>

							<template v-else-if="column.key === 'customer_editable' || column.key === 'customer_removable'">
								<input class="form-control form-check-input w-[1rem] h-[1rem] mr-1 my-auto" type="checkbox" v-model="product[column.key]"/>
							</template>

							<template v-else-if="column.key === 'price'">
								<div class="truncate hover:text-clip z-10 w-20"> ${{product[column.key]}} </div>
							</template>

							<template v-else>
								<div class="break-word  w-24"> {{product[column.key]}} </div>
							</template>
						</td>
					</tr>
				</tbody>
			</table> 
			
			
		</div>
		<div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center justify-between">
			<Page 
				class="mx-auto my-3"
				:total="dataCount" 
				@on-change="changePage"
				@on-page-size-change="changePageSize"
			/>
			<div>
				<button type="button" class="btn btn-primary w-32 shadow-md ml-5" @click="openTab='confirm'">Next</button>
			</div>
			<!-- <div>
				<button type="button" class="btn w-32 dark:border-darkmode-400" @click="resetData()">reset</button>
				<button type="button" class="btn btn-primary w-32 shadow-md ml-5" @click="submitData()">Apply</button>
			</div> -->
		</div> 
	</div>
</div>


<div v-show="openTab=='confirm'">
	<div class="relative"> 
		<div class="overflow-auto h-[670px] text-[14px] mt-10">
			<table class="table table-report h-[100%] w-[100%]">
				<thead>
					<tr>
						<th class="w-10">

						</th>
						<th class="whitespace-normal truncate hover:text-clip" v-for="column in tableColumns" :key="column.key">
							{{ column.name }}
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(product, product_index) in selectedProducts"
						:key="product_index"
						class="intro-x align-middle"
					>

						<td class="w-10">
							<input class="form-control form-check-input w-[1rem] h-[1rem] mr-1 my-auto" type="checkbox" checked @click="unSelectProduct(product_index, $event)"/>
						</td>

						<td v-for="column in tableColumns" :key="column.key" class="text-[14px]">

							<template v-if="column.key === 'image'" >
								<div class="flex">
									<div class="w-10 h-10 image-fit zoom-in lg:w-12 lg:h-12">
										<img 
											class="rounded-lg zoom-in"
											:src="imageUrl+product.image"
										/>
									</div>
								</div>
							</template>

							<template v-else-if="column.key === 'order_code'">
								<div class="flex flex-col">
									<input class="form-control w-full sm:w-20 mt-2 sm:mt-0" type="text" v-model="product[column.key]" />
									<label class="text-danger flex" v-if="errorMessages[product_index]">{{errorMessages[product_index][column.key]}}</label>
									<!-- <label class="error_message" v-else-if="validateList[product_index][column.key]['duplicate_code']">Duplicate Order Code</label>
									<label class="error_message" v-else-if="validateList[product_index][column.key]['used_in_campaign_products']">Already Used In Campaign Products</label>
									<label class="error_message" v-else-if="validateList[product_index][column.key]['max_length_10']">Enter order code with no more than 10 digits</label> -->
								</div>
							</template>

							<template v-else-if="column.key === 'category'" v-for="(tag,tag_index) in product['tag']" :key="tag_index">
								<div>{{ tag }}</div> 
							</template>

							<template v-else-if="column.key === 'qty' || column.key === 'max_order_amount'">
								<div class="flex flex-col">
									<input class="form-control w-full sm:w-20 mt-2 sm:mt-0" min="1" type="number" v-model="product[column.key]" />
									<label class="text-danger flex" v-if="errorMessages[product_index]">{{errorMessages[product_index][column.key]}}</label>
									<!-- <label class="error_message" v-if="validateList[product_index][column.key]['max_value']">exceed stock amount</label> -->
								</div>
							</template>

							<template v-else-if="column.key === 'type'">
								<select 
									class="form-select w-auto mt-2 sm:mt-0"
									v-model="product[column.key]"
								>
									<option v-for="(type, index) in product_type" :key="index" :value="type.value">{{type.name}}</option>
								</select> 
							</template>

							<template v-else-if="column.key === 'customer_editable' || column.key === 'customer_removable'">
								<input class="form-control form-check-input w-[1rem] h-[1rem] mr-1 my-auto" type="checkbox" v-model="product[column.key]"/>
							</template>

							<template v-else-if="column.key === 'price'">
								<div class="truncate hover:text-clip z-10 w-20"> ${{product[column.key]}} </div>
							</template>

							<template v-else>
								<div class="break-word  w-24"> {{product[column.key]}} </div>
								<label class="text-danger flex" v-if="errorMessages[product_index]">{{errorMessages[product_index][column.key]}}</label>
							</template>
						</td>
					</tr>
				</tbody>
			</table> 
			
			
		</div>
		<div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center justify-between">
			<div>
				<button type="button" class="btn btn-primary w-32 shadow-md ml-5" @click="openTab='select'">Previous</button>
				<button type="button" class="btn w-32 dark:border-darkmode-400" @click="resetSelectedProduct()">Reset</button>
				<button type="button" class="btn btn-primary w-32 shadow-md ml-5" @click="submitData()">Apply</button>
			</div>
		</div> 
	</div>
</div>


</template>

<script setup>
import { createAxiosWithBearer } from '@/libs/axiosClient'
import { seller_create_campaign_products, seller_bulk_create_campaign_products } from "@/api_v2/campaign_product"
import { list_product_category, list_product } from '@/api_v2/product';
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
// import { useLSSCampaignListStore } from "@/stores/lss-campaign-list";
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { useVuelidate } from "@vuelidate/core";
import { required,minValue, decimal, integer, maxLength } from "@vuelidate/validators";

// status="'enabled'"
// requestUrl="'/api/v2/product/search'"
const tableColumns = ref([
    { name: "Product", key: "image" },
    { name: "", key: "name" },
    { name: "Order Code", key: "order_code" },
	{ name: "QTY for Campaign", key: "qty" },
	{ name: "Max QTY/Order", key: "max_order_amount" },
    { name: "Price", key: "price" },
	{ name: "Editable", key: "customer_editable" },
	{ name: "Deletable", key: "customer_removable" },
	{ name: "Category", key: "category" },
	{ name: "Type", key: "type" },
])

const layoutStore = useLSSSellerLayoutStore();
const campaignDetailStore = useCampaignDetailStore()
// const internalInstance = getCurrentInstance();
// const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const route = useRoute();
const router = useRouter();

const openTab = ref('select')
const currentPage = ref(1)
const totalPage = ref(1)
const pageSize = ref(10)
const dataCount = ref(0)

const imageUrl = import.meta.env.VITE_APP_IMG_URL
const selectedCategory = ref('')
const productCategories = ref([{value:'', name:'All'}])
const product_type = [{value:'product',name:'Product'},{value:'lucky_draw',name:'Lucky Draw'}]

const stockProducts = ref([])
const selectedProducts = ref([])
const errorMessages = ref([])
const productDict = {}


onMounted(() => {
	list_product_category().then(
		res => { 
			res.data.forEach(category => {
				productCategories.value.push({value:category, name:category})
			});
			
		}
	)
	
	search();
})
	
watch(computed(()=>selectedProducts.value),()=>{
	updateStockProducts()
}, {deep:true})

watch(computed(()=>stockProducts.value),()=>{
	updateStockProducts()
}, {deep:true})

const updateStockProducts = ()=>{
	let temp = []
	stockProducts.value.forEach((product, index) => {
		if(!(product.id.toString() in productDict)){
			temp.push(product)
		}
	});
	stockProducts.value = temp
}



const selectProduct = (productIndex, event) =>{
	event.target.checked=false
	productDict[stockProducts.value[productIndex].id.toString()]=true
	selectedProducts.value.push(Object.assign({},stockProducts.value[productIndex]))
	errorMessages.value.push(null)

}
const unSelectProduct = (selectedProductIndex, event) =>{
	event.target.checked=true
	delete productDict[selectedProducts.value[selectedProductIndex].id.toString()]
	selectedProducts.value.splice(selectedProductIndex,1)
	errorMessages.value.splice(selectedProductIndex,1)
	search()
}

const resetSelectedProduct = ()=>{

	selectedProducts.value.forEach(product => {
		delete productDict[product.id.toString()]
	});
	selectedProducts.value = []
	errorMessages.value = []
	search()

}

const selectAll = (event)=>{
	event.target.checked=false
	stockProducts.value.forEach(product => {
		productDict[product.id.toString()]=true
		selectedProducts.value.push(Object.assign({},product))
		errorMessages.value.push(null)
	});
	search()
}

const search = () => {

	campaignDetailStore.campaignProducts.forEach(campaignProduct => {
		if(campaignProduct.product)productDict[campaignProduct.product.toString()]=true
	});
	list_product(pageSize.value, currentPage.value, '', '', 'enabled', selectedCategory.value, Object.keys(productDict).join(','))
	.then(response => {
		stockProducts.value = response.data.results
		dataCount.value = response.data.count
		totalPage.value = Math.ceil(response.data.count / pageSize.value)
		stockProducts.value = response.data.results
		
	})
}

const changePage = (page) => {
	currentPage.value = page
	search()
}


const changePageSize = (pageSize)=>{
	pageSize = pageSize;
	search();
}

const submitData = ()=>{
	console.log(selectedProducts.value)
	errorMessages.value = []
	seller_bulk_create_campaign_products(route.params.campaign_id, selectedProducts.value).then(res=>{
		campaignDetailStore.campaignProducts = res.data

	}).catch(errors=>{
		if (errors.response){
			console.log(errors.response.data)
			errorMessages.value = errors.response.data
		}else{
			return errors
		}
	})
}
//for validation function
// const campaignProductsOrderCodeList = ref([])
// const usedInCampaignOrderCodeList = ref([])
// const duplicatedOrderCodeMap = ref({})
// const OrderCodeMaxLengthList = ref([])
// const OrderCodeRequiredList = ref([])
// const validateList = ref([])
// const validator = ref({
// 	'order_code': ['required', 'duplicate_code', 'used_in_campaign_products', 'max_length_10'],
// 	'qty': ['max_value'],
// 	'max_order_amount': ['max_value']
// })

// const createValidationList = () => {
// 	validateList.value = JSON.parse(JSON.stringify(stockProducts.value))
// 	validateList.value.forEach(el => {
// 		Object.keys(validator.value).forEach(key => {
// 			let new_obj = {}
// 			validator.value[key].forEach(arr_el => new_obj[arr_el] = false)
// 			el[key] = new_obj
// 		})
// 	})
// }

// const highlightOrderCodeError = (index, key) => {
// 	let show = false;
// 	validator.value['order_code'].forEach(rule => show = show || validateList.value[index][key][rule])
// 	return show
// }

// const checkOrderCode = (index, key, order_code) => {
// 	checkOrderCodeRequired(index, key, 'required', order_code)
// 	checkOrderCodeDuplicated(index, key, 'duplicate_code', order_code)
// 	checkOrderCodeUsedInCampaignProduct(index, key, 'used_in_campaign_products', order_code)
// 	checkOrderCodeMaxLength(index, key, 'max_length_10', order_code)
// }

// const checkOrderCodeDuplicated = (index, key, validator, order_code) => {
// 	let list = listItems.value.filter(el => el['order_code'] === order_code && order_code != "")
// 	if (list.length > 1) {
// 		duplicatedOrderCodeMap.value[order_code] = []
// 		listItems.value.forEach((item, idx) => {
// 			if (item['order_code'] != order_code) {
// 				return
// 			}
// 			validateList.value[idx][key][validator] = true
// 			duplicatedOrderCodeMap.value[order_code].push(idx)
// 		})
// 		Object.keys(duplicatedOrderCodeMap.value).forEach(k=>{
// 			if (k === order_code) {
// 				return
// 			}
// 			if (!duplicatedOrderCodeMap.value[k].includes(index)) {
// 				return
// 			}
// 			let list2 = duplicatedOrderCodeMap.value[k].filter(e => e != index)
// 			if (list2.length === 1) {
// 				list2.forEach(i => {
// 					validateList.value[i][key][validator] = false
// 				})
// 				delete duplicatedOrderCodeMap.value[k]
// 			}
// 		})
// 	} else {
// 		Object.keys(duplicatedOrderCodeMap.value).forEach(k=>{
// 			if (!duplicatedOrderCodeMap.value[k].includes(index)) {
// 				return
// 			}
// 			if (duplicatedOrderCodeMap.value[k].length <= 2) {
// 				duplicatedOrderCodeMap.value[k].forEach(e => {
// 					validateList.value[e][key][validator] = false
// 				})
// 				delete duplicatedOrderCodeMap.value[k]
// 			} else {
// 				validateList.value[index]['order_code'][validator] = false
// 				duplicatedOrderCodeMap.value[k] = duplicatedOrderCodeMap.value[k].filter(e => e != index)
// 			}
// 		})
// 	}
	
// 	console.log(duplicatedOrderCodeMap.value)
// }

// const checkOrderCodeUsedInCampaignProduct = (index, key, validator, order_code) => {
// 	if (campaignProductsOrderCodeList.value.includes(order_code)) {
// 		validateList.value[index][key][validator] = true
// 		if (!usedInCampaignOrderCodeList.value.includes(index)) {
// 			usedInCampaignOrderCodeList.value.push(index)
// 		}
// 		return true
// 	} else {
// 		validateList.value[index][key][validator] = false
// 		usedInCampaignOrderCodeList.value = usedInCampaignOrderCodeList.value.filter(e => e != index)
// 	}
// 	return false
// }

// const checkOrderCodeMaxLength = (index, key, validator, order_code) => {
// 	if (order_code.length > 10) {
// 		validateList.value[index][key][validator] = true
// 		if (!OrderCodeMaxLengthList.value.includes(index)) {
// 			OrderCodeMaxLengthList.value.push(index)
// 		}
// 		return true
// 	}
// 	validateList.value[index][key][validator] = false
// 	OrderCodeMaxLengthList.value = OrderCodeMaxLengthList.value.filter(e => e != index)
// 	return false
// }

// const checkOrderCodeRequired = (index, key, validator, order_code) => {
// 	if (["", null, undefined].includes(order_code)) {
// 		validateList.value[index][key][validator] = true
// 		if (!OrderCodeRequiredList.value.includes(index)) {
// 			OrderCodeRequiredList.value.push(index)
// 		}
// 		return true
// 	}
// 	validateList.value[index][key][validator] = false
// 	OrderCodeRequiredList.value = OrderCodeRequiredList.value.filter(e => e != index)
// 	return false
// }

// const checkMaxValue = (index, key, validator, current_value, max_value) => {
// 	if (current_value > max_value) {
// 		validateList.value[index][key][validator] = true
// 		return true
// 	}
// 	validateList.value[index][key][validator] = false
// 	return false
// }

// for checkbox click function
// const assignedProducts = ref([])
// const checkboxAll = ref(false)
// const selected = ref([])

// const selectAll = () => {
// 	selected.value = []
// 	if (checkboxAll.value) {
// 		listItems.value.forEach(el => {
// 			selected.value.push(el.id)
// 			assignedProducts.value.push(el)
// 		})
// 		// collect data
// 	} else {
// 		assignedProducts.value = []
// 	}
// }
// const updateSelected = (product) => {
// 	checkboxAll.value = false
// 	if (selected.value.length === listItems.value.length) {
// 		checkboxAll.value = true
// 	}
// 	// collect data
// 	if (selected.value.includes(product.id)) {
// 		assignedProducts.value.push(product)
// 	} else {
// 		let index = listItems.value.findIndex(el=> el.id == product.id)
// 		assignedProducts.value.splice(index, 1)
// 	}
	
// }

// button click function

// const submitData = () => {
// 	if (!selected.value.length) {
// 		layoutStore.alert.showMessageToast("No Items Selected");
// 		return false
// 	}
// 	if (Object.keys(duplicatedOrderCodeMap.value).length) {
// 		layoutStore.alert.showMessageToast("Duplicated Order Code Exists");
// 		return false
// 	}
// 	if (OrderCodeMaxLengthList.value.length) {
// 		layoutStore.alert.showMessageToast("Order Code Exceed 10 digits");
// 		return false
// 	}
// 	if (OrderCodeRequiredList.value.length) {
// 		layoutStore.alert.showMessageToast("Order Code Is Required");
// 		return false
// 	}
// 	if (usedInCampaignOrderCodeList.value.length) {
// 		layoutStore.alert.showMessageToast("Already Used In Campaign Products");
// 		return false
// 	}
	
// 	for (let i = 0; i < assignedProducts.value.length; i ++) {
// 		assignedProducts.value[i]['product_id'] = assignedProducts.value[i]['id']
// 		delete assignedProducts.value[i]['id']; 
// 		assignedProducts.value[i]['qty_for_sale'] = parseInt(assignedProducts.value[i]['qty'])
// 		assignedProducts.value[i]['status'] = true
// 	}
// 	seller_create_campaign_products(route.params.campaign_id, assignedProducts.value)
// 	.then(response => {
// 		eventBus.emit("addProductFromStock", response.data)
// 		campaignDetailStore.showAddProductFromStockModal = false;
// 		layoutStore.notification.showMessageToast("Successed")
// 	})
// }

// const resetData = () => {
// 	listItems.value = JSON.parse(JSON.stringify(stockProducts.value))
// 	createValidationList()
// }








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
  z-index: 50;
  background-color: theme("colors.secondary");
  padding-right: 10px !important;
  padding-left: 10px !important;
}
</style>