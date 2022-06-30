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
					v-for="(product, key) in listItems"
					:key="key"
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
							<input class="form-check-input w-full sm:w-32 2xl:e-full mt-2 sm:mt-0 sm:w-auto" type="text" v-model="product[column.key]" :class="{ error: checkOrderCode(product[column.key]) }"/>
						</template>
						<template v-else-if="column.key === 'category'" v-for="(tag,index) in product['tag']" :key="index">
							<div>{{ tag }}</div> 
						</template>
						<template v-else-if="column.key === 'qty' || column.key === 'max_order_amount'">
							<input class="form-check-input w-full sm:w-32 2xl:e-full mt-2 sm:mt-0 sm:w-auto" min="1" :max="maxValue(product, column.key)" type="number" v-model="product[column.key]" />
						</template>
						<template v-else-if="column.key === 'type'">
							<select 
								id="tabulator-html-filter-field"
								class="form-select sm:w-30 2xl:e-full mt-2 sm:mt-0 sm:w-auto"
								v-model="product[column.key]"
							>
								<option v-for="(type, key) in product_type" :key="key" :value="type">{{ removeDash(type) }}</option>
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
const duplicatedOrderCodeList = ref([])

onMounted(() => {
	search();
	eventBus.on("searchTable", (payload) => {
		currentPage.value = 1
		category.value = payload.filterColumn
		search()
	});
	
	
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

const submitData = () => {
	if (duplicatedOrderCodeList.value.length) {
		layoutStore.alert.showMessageToast("Duplicated Order Code Exists");
		return false
	}
	let new_products = []
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
}


const checkOrderCode = (order_code) => {
	let list = listItems.value.filter(el=> el.order_code === order_code)
	if (list.length > 1) {
		if (!duplicatedOrderCodeList.value.includes(order_code)) {
			duplicatedOrderCodeList.value.push(order_code)
		}
		return true
	}
	duplicatedOrderCodeList.value = duplicatedOrderCodeList.value.filter(el=> el != order_code)
	return false
}

const maxValue = (product, key) => {
	let index = stockProducts.value.findIndex(el => el.id === product.id)
	return stockProducts.value[index][key]
}

const rules = computed(()=>{
    return{
        code:{required, maxLength: maxLength(10)},
        price:{required, decimal},
        max_order_amount: { minValue: minValue(1), integer}  
    }
});

const validate = useVuelidate(rules, listItems);

</script>

<style scoped>

.error {
	border-color: red;
}
</style>