<template>
	<div class="overflow-x-hidden sm:overflow-auto h-fit sm:h-[56vh]">
		<table class="table -mt-3 table-report min-h-[300px]">
			<thead>
				<tr>
					<th class="whitespace-normal xl:whitespace-nowrap text-center text-[16px]" v-for="column in tableColumns" :key="column.key">
						<!-- <template v-if="column.key === 'check'">
							<input 
								class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" 
								type="checkbox" 
								@change="selectAllStock($event)"
							/>
						</template> -->
						<template v-if="column.key === 'edit'">
							{{ '' }}
						</template>
						<template v-else-if="column.key === 'name'">
							<div class="flex justify-center"> 
								{{ $t(`stock.table_column.${column.key}`) }}
								<template v-if="sortBy =='-name'" > 
									<ChevronsUpIcon class="ml-3 h-5 w-5 text-white bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis('name')" />
								</template> 
								<template v-else-if="sortBy =='name'" > 
									<ChevronsDownIcon class="ml-3 h-5 w-5 text-white bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis('-name')" />
								</template> 
								<template v-else> 
									<ChevronDownIcon class="ml-3 h-5 w-5 text-black bg-null opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis('-name')" />
								</template>
							</div>
						</template>
						<template v-else-if="column.key === 'qty'">
							<div class="flex justify-center"> 
								{{ $t(`stock.table_column.${column.key}`) }}
								<template v-if="sortBy =='-qty'" > 
									<ChevronsUpIcon class="ml-3 h-5 w-5 text-white bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis('qty')" />
								</template>
								<template v-else-if="sortBy =='qty'" > 
									<ChevronsDownIcon class="ml-3 h-5 w-5 text-white bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis('-qty')" />
								</template> 
								<template v-else> 
									<ChevronDownIcon class="ml-3 h-5 w-5 text-black bg-null opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis('-qty')" />
								</template>
							</div>
						</template>
						<template v-else>
							{{ $t(`stock.table_column.${column.key}`) }}
						</template>
					</th>
				</tr>
			</thead>
			<tbody>

				<tr class="h-[300px]"
					v-if="showCommentLoding || numOfProducts==0">
					<td v-if="showCommentLoding"
						class="items-center relative tdDot"
						:colspan="tableColumns.length +2" >
						<LoadingIcon icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] right-[50%] top-[50%] translate-x-1/2"/>
					</td>
					<td v-else-if="numOfProducts==0 && keyword == ''" :colspan="tableColumns.length +2" class="TDshadow">
						<div class="mt-40 text-center md:mt-10">
							<h1 class="text-slate-500 text-sm md:text-lg font-bold">
								{{ $t('stock.dont_have_product_notify') }}
							</h1>
							<h1 class="text-slate-500 text-sm md:text-lg">
								{{ $t('stock.click_to_add') }}
							</h1>
						</div>
					</td> 
					<td v-else-if="numOfProducts==0" :colspan="tableColumns.length +2" class="TDshadow">
						<div class="mt-40 text-center md:mt-10">
							<h1 class="text-slate-500 text-sm md:text-lg font-bold">
								{{ $t('stock.no_result') }}
							</h1>
							<h1 class="text-slate-500 text-sm md:text-lg">
								{{ $t('stock.click_to_add') }}
							</h1>
						</div>
					</td> 
				</tr>
				
				<tr
					v-for="(product, index) in stockProducts"
					:key="index"
					class="intro-x"
					:class="{'trBorder' : numOfProducts != 0}"
				>	
					<template v-for="column,index in tableColumns" :key="index"> 
						<!-- <td class="w-10" v-if="column.key == 'check'">
							<input 
								class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto selectCheck" 
								type="checkbox" 
								v-model="product.check"
								@click="selectStock(product, $event)"
							/>
						</td> -->
						<td v-if="column.key === 'image'" class="w-fit text-[12px] lg:w-18 lg:text-sm 2xl:w-32 imgtd" :data-content="$t(`stock.table_column.${column.key}`)">
							<div class="flex justify-center">
								<div class="w-20 h-20 image-fit zoom-in lg:w-12 lg:h-12 " v-if="product.image">
									<Tippy 
										tag="img"
										class="w-full rounded-lg"
										:src= "`${publicPath}` + product.image"
										:content="product.name"
										data-action="zoom"
									/>
								</div>
								<div class="w-20 h-20 image-fit zoom-in lg:w-12 lg:h-12" v-else>
									<Tippy 
										tag="img"
										class="w-full rounded-lg"
										:src= "`${storageUrl}` + `no_image.jpeg`"
										:content="product.name"
										data-action="zoom"
									/>
								</div>
							</div>
						</td>

						<td v-else-if="column.key === 'category'" class="w-full sm:w-fit category" :data-content="$t(`stock.table_column.${column.key}`)">
							<div v-for="(tag,index) in product['tag'] " :key="index">
								<div >{{ tag }}</div> 
							</div>
						</td>

						<td v-else-if="column.key === 'type'" class="w-full sm:w-fit qtyPrice" :data-content="$t(`stock.table_column.${column.key}`)">
							<div class="">{{product[column.key]}}</div> 
						</td>

						<td v-else-if="column.key === 'qty'" class="w-full sm:w-fit qtyPrice" :data-content="$t(`stock.table_column.${column.key}`)">
							<div class="text-right">{{product[column.key]}}</div> 
						</td>

						<td v-else-if="column.key === 'price'" class="w-full sm:w-fit qtyPrice" :data-content="$t(`stock.table_column.${column.key}`)">
							<div class="text-right">
								{{layoutStore.userInfo.user_subscription.currency}} 
								{{Math.floor(parseFloat(product[column.key]) * (10 ** layoutStore.userInfo.user_subscription.decimal_places)) / 10 ** layoutStore.userInfo.user_subscription.decimal_places}}
								{{layoutStore.userInfo.user_subscription.price_unit?$t(`global.price_unit.${layoutStore.userInfo.user_subscription.price_unit}`):''}}</div> 
						</td>

						<td v-else-if="column.key === 'edit'"  class="w-24 table-report__action edit" :data-content="$t(`stock.table_column.${column.key}`)" >
							<div class="place-content-center flex"> 
								<Dropdown placement="bottom-start">
									<DropdownToggle role="button" class="block w-5 h-5" href="javascript:;">
									<MoreHorizontalIcon class="w-5 h-5 text-slate-700" />
									</DropdownToggle>
									<DropdownMenu class="w-28 pt-2">
										<DropdownContent class="w-28 text-center">
											<DropdownItem class="w-28 text-center whitespace-nowrap text-[14px]" @click="routeToEditProduct(product)"> 
												<EditIcon class="w-[20px] h-[20px] mx-1"/> {{ $t('stock.category_manage.edit')}}
											</DropdownItem>
											<DropdownItem class="w-28 text-center whitespace-nowrap text-[14px]" @click="copyProduct(product.id)"> 
												<CopyIcon class="w-[20px] h-[20px] mx-1"/> {{ $t('stock.category_manage.duplicate')}}
											</DropdownItem>
											<DropdownItem class="w-28 text-center text-danger whitespace-nowrap text-[14px]" @click="deleteProduct(product.id)"> 
												<Trash2Icon class="w-[20px] h-[20px] mx-1"/> {{ $t('stock.category_manage.delete')}}
											</DropdownItem>
										</DropdownContent>
									</DropdownMenu>
								</Dropdown> 
							</div>
						</td>

						<td v-else class="sm:w-fit" :data-content="$t(`stock.table_column.${column.key}`)">
							<div class="sm:w-fit"> {{product[column.key]}} </div>
						</td>

					</template>
				</tr>
			</tbody>
		</table> 
	</div>
	<div class="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap mb-10">
		<Page 
			class="mx-auto my-3"
			:total="dataCount" 
			@on-change="changePage"
			@on-page-size-change="changePageSize"
		/>
	</div> 
	<div>
		<Modal :show="showModal" @hidden="hide()" backdrop="static">
			<ModalBody class="p-10 ">
				<div class="mt-1">
					<label for="regular-form-2" class="form-label w-full text-center font-medium" style="font-size: 1.2rem;">Bulk Edit</label>
					
					<label for="crud-form-2" class="form-label text-base mt-2 font-medium">Category</label>
					<TomSelect
						multiple
						placeholder="Select categories to update..."
						v-model="bulkEditStockObj.categories"
					>
						<option v-for="category in categorySelection" :key="category">{{ category }}</option>
					</TomSelect>
					
					<label class="form-label text-base mt-5 font-medium">Status</label>
					<div class="flex">
						<div class="ml-3" v-for="status in statusRadio" :key="status.id">
							<input 
								class="form-check-input w-6 h-6" 
								type="radio" 
								name="horizontal_radio_button1" 
								v-model="bulkEditStockObj.status"
								:value="status.id"
							/>
							<label class="form-check-label text-base" >
								{{ $t(`stock.${status.text}`) }}
							</label>
						</div>
					</div>

				</div>
				<div class="flex justify-between">
					<button class="w-32 shadow-md btn btn-secondary mt-7" @click="hide()">Cancel</button>
					<button class="w-32 shadow-md btn btn-primary mt-7" @click="bulkUpdateStock">Save</button>
				</div>
			</ModalBody>
		</Modal>
	</div>
</template>

<script setup>
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { list_product, delete_product, copy_product, list_product_category } from '@/api_v2/product'

import { ref, onMounted, onUnmounted, defineProps, getCurrentInstance, computed, watch } from 'vue'
import { useRoute, useRouter } from "vue-router"
import dom from "@left4code/tw-starter/dist/js/dom";
import i18n from "@/locales/i18n";

const route = useRoute()
const router = useRouter()
const props = defineProps({
	product_status: String,
	eventBusName: String
})
const tableColumns = ref([
	// { name: "check", key: "check"},
    { name: "image", key: "image" },
	{ name: "name", key: "name" },
	{ name: "category", key: "category" },
	{ name: "description", key: "description" },
	{ name: "qty", key: "qty" },
	{ name: "price", key: "price" },
	{ name: "", key: "edit" },
])
const statusRadio = ref([
	{text: 'for_sale', id: 'enabled'},
	{text: 'delisted', id: 'disabled'},
])

const currentPage = ref(1)
const totalPage = ref(1)
const pageSize = ref(10)
const dataCount = ref(0)
const searchColumn = ref('')
const keyword = ref('')
const stockProducts = ref([])
const category = ref('')
const sortBy = ref('')
const showModal = ref(false)
const categorySelection = ref([])
const bulkEditStockObj = ref({
	categories: [],
	status: false,
	stockIdList: []
})

const publicPath = import.meta.env.VITE_APP_IMG_URL
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL
const layoutStore = useLSSSellerLayoutStore()
const showCommentLoding = ref(true)
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const numOfProducts = computed(()=>stockProducts.value.length)


watch(computed(() => bulkEditStockObj.value.stockIdList), () => {
	eventBus.emit('isBulkEditShow', { stockListLength: bulkEditStockObj.value.stockIdList.length })
}, { deep:true })

onMounted(()=>{
	list_product_category().then(res => { 
		categorySelection.value = res.data
		categorySelection.value.unshift('uncategory')
	})

	search()
	eventBus.on(props.eventBusName, (payload) => {
		currentPage.value = 1
		searchColumn.value = payload.searchColumn
		keyword.value = payload.keyword
		pageSize.value = payload.pageSize
		category.value = payload.filterColumn
		search()
	});

	eventBus.on(('bulkEditStock'), () => {
		console.log(bulkEditStockObj.value)
		if (bulkEditStockObj.value.stockIdList.length > 0) {
			showModal.value = true
		}
	})
})

onUnmounted(()=>{
	eventBus.off(props.eventBusName)
	eventBus.off('bulkEditStock')
})

const search = ()=>{
	showCommentLoding.value = true
	stockProducts.value = []
	list_product(pageSize.value, currentPage.value, searchColumn.value, keyword.value, props.product_status, '',category.value, '', sortBy.value )
	.then(
		response => {
			if(response.data.count != undefined){
				dataCount.value = response.data.count
				const _totalPage = parseInt(response.data.count / pageSize.value)
				totalPage.value = _totalPage == 0 ? 1 : _totalPage
			}
			stockProducts.value = response.data.results
			showCommentLoding.value = false
		}
	)
}

const changePage = page=> {      
	currentPage.value = page;
	search();
}

const changePageSize = pageSize => {
	pageSize.value = pageSize;
	search();
}

const routeToEditProduct = (product)=>{
	router.push({name:'edit-product',params:{'product_id':product.id}})
	hideDropDown()
}

const hideDropDown = ()=>{
  dom('.dropdown-menu').removeClass('show')
}

const deleteProduct = (id) => {
	let yes = confirm(`${i18n.global.t('stock.table_column.confirm_delete')}`)
	if (yes) delete_product(id).then(res => { search() })
	hideDropDown()
}

const copyProduct = (id) => {
	copy_product(id).then(res => { search() })
	hideDropDown()
}

const sortByThis = (by) =>{
	sortBy.value = by
	// sortBy.value = sortBy.value=='name' ? '-name': 'name'
	search();
}

const selectAllStock = (event) => {
	if (event.target.checked) {
		stockProducts.value.forEach(product => { 
			product.check = true 
			bulkEditStockObj.value.stockIdList.push(product.id)
		})
	} else {
		stockProducts.value.forEach(product => { 
			product.check = false 
			bulkEditStockObj.value.stockIdList = []
		})		
	}
}

const selectStock = (product, event) => {
	if (event.target.checked) bulkEditStockObj.value.stockIdList.push(product.id)  
	else bulkEditStockObj.value.stockIdList = bulkEditStockObj.value.stockIdList.filter((v) => v != product.id)
	
	console.log(bulkEditStockObj.value.stockIdList)
}

const hide = () => {
    showModal.value = false
}

const bulkUpdateStock = () => {
	console.log('bulkEditStockObj.value')
	console.log(bulkEditStockObj.value)
}

</script>


<style scoped>
.click-icon:hover {
	cursor: pointer;
}

td {
	height: auto;
	padding-right:10px;
	padding-left:10px;
	font-size: 16px;
}

.TDshadow{
	box-shadow:none !important;
}
.dotTr{
		border:none !important;
		margin-top: 0 !important;
	}

thead th{ 
	position: sticky !important; 
	top: 0 !important;
	font-size: 14px;
	z-index: 50;
	background-color: theme("colors.secondary");
  	padding-right:10px;
	padding-left:10px;
}

.longMessage{
	overflow-wrap: break-word;
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
		font-size: 14px;
		padding: 0px !important;
	}

	thead tr {
		position: absolute;
		top: -9999px;
		left: -9999px;
	}

	tr {
		margin-top: 10px;
	}

	.trBorder{
		border-bottom: 2px solid #dddddd; 
	}

	.dotTr{
		border:none !important;
		margin-top: 0 !important;
	}

	td {
		border: none;
		position: relative;
		padding-left: 50%;
		text-align: right !important;
		box-shadow: none !important;
		min-height: 30px;
		padding-right: 15px !important;
		width: 100% !important;
	}

	td:before {
		position: absolute;
		left: 15px;
		width: 45%; 
		padding-right: 10px;
		text-align: left !important;
		white-space: nowrap;
		font-weight: bold;
		box-shadow: none !important;
		background-color: white !important;
	}

	.imgtd:before {
		display:none; 
	}
	.imgtd {
		display:inline-flex;
		justify-content: center;
		height: 90px !important;
		width: 100% !important;
		padding-left: 0px !important;
	}

	td:nth-of-type(2):before {
		content: '';
	}
	td:nth-of-type(2) {
		display:inline-flex;
		justify-content: center;
		min-height: 35px !important;
		width: 100% !important;
		padding-left: 0px !important;
		color: theme("colors.primary");
		font-weight: 600;
		font-size: 16px !important;
	}

	td:nth-of-type(3):before {
		content: attr(data-content);
		/* color: #0e9893; */
	}

	td:nth-of-type(4):before {
		content: attr(data-content);
		/* color: #0e9893; */
	}
	td:nth-of-type(5):before {
		content: attr(data-content);
		/* color: #0e9893; */
	}
	.category:before {
		content: attr(data-content);
		/* color: #0e9893; */
	}
	td:nth-of-type(6):before {
		content: attr(data-content);
		/* color: #0e9893; */
	}
	td:nth-of-type(6){
		white-space: normal !important;
		width: 100% !important;
		/* color: #0e9893; */
	}

	td:nth-of-type(7):before {
		content: attr(data-content);
		/* color: #0e9893; */
	}
	td:nth-of-type(8):before {
		content: attr(data-content);
		/* color: #0e9893; */
	}
	.edit{
		position: absolute !important;
        top:0;
        right:0;
        width:40px !important;
        padding-left: 10px !important;
	}
	.edit:before{
		display: none;
	}
	.tdDot{
		height: 300px;
	}
}
</style>