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
						<template v-else-if="column.key === 'category'" v-for="(tag,index) in product['tag']" :key="index">
							<div>{{ tag }}</div> 
						</template>
						<template v-else-if="column.key === 'qty' || column.key === 'max_order_amount'">
							<input class="form-check-input w-full sm:w-32 2xl:e-full mt-2 sm:mt-0 sm:w-auto" min="1" :max="product[column.key]" type="number" :value="product[column.key]"/>
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
			class="mx-auto my-3"
			:total="dataCount" 
			@on-change="changePage"
			@on-page-size-change="changePageSize"
		/>
		<button type="button" class="btn btn-primary right-0" @click="submitData">Apply</button>
	</div> 
	
</template>

<script setup>
import { createAxiosWithBearer } from '@/libs/axiosClient'
import { seller_create_campaign_products } from "@/api_v2/campaign_product"
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const props = defineProps({
	requestUrl: String,
	columns: Array,
	routerPath: String,
	routerParam: String,
	status: String
});

const assignedProducts = ref([])
const checkboxAll = ref(false)
const selected = ref([])
const selectAll = () => {
	selected.value = []
	if (checkboxAll.value) {
		listItems.value.forEach(el => {
			selected.value.push(el.id)
		})
		// collect data
		assignedProducts.value = listItems.value
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

onMounted(() => {
	search();
	eventBus.on("searchTable", (payload) => {
		currentPage.value = 1
		pageSize.value = pageSize
		category.value = payload.filterColumn
		search()
	});
	
	
})
	
onUnmounted(() => {
	eventBus.off("searchTable");
	eventBus.off("passCampaignProduct");
})
	
const search = () => {
	
	createAxiosWithBearer()
	.get(props.requestUrl + `?page_size=${pageSize.value}&page=${currentPage.value}&search_column=${searchColumn.value}&product_status=${props.status}&category=${category.value}`)
	.then(response => {
		console.log(response.data.count === undefined)
		if(response.data.count === undefined) {
			return false
		}
		dataCount.value = response.data.count
		totalPage.value = Math.ceil(response.data.count / pageSize.value)
		console.log("444444")
		eventBus.on("passCampaignProduct", (payload) => {
			console.log("2222")
			let stock = response.data
			payload.forEach(value=> {
				let index = stock.findIndex(el=> el.id == value.product)
				stock.splice(index, 1)
			})
			listItems.value = stock
		});
		
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
	seller_create_campaign_products(route.query.campaign_id, assignedProducts)
	.then(response => {
		router.push({ name: 'side-menu-campaign-list' })
	})
}

</script>