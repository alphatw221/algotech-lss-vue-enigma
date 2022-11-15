<template>
	<div class="overflow-x-hidden sm:overflow-auto h-fit sm:h-[56vh]">
		<table class="table -mt-3 table-report min-h-[300px]">
			<thead>
				<tr>
					<th class="whitespace-normal lg:whitespace-nowrap text-center text-[16px]" v-for="column in computedTableColumns" :key="column.key">
						<template v-if="column.key === 'check'">
							<input 
								class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto" 
								type="checkbox" 
								@change="selectAllStock($event)"
							/>
						</template>
						<template v-else-if="column.key === 'edit'">
							{{ '' }}
						</template>
						<!-- too mush duplication over here -->
						<template v-else-if="column.key === 'name'">
							<div class="flex justify-center"> 
								{{ $t(`stock.table_column.${column.key}`) }}
								<template v-if="sortBy =='-name'" > 
									<ChevronsUpIcon class="ml-3 h-5 w-5 text-white bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis('name')" />
									<XIcon class="w-5 h-5 text-slate-400 cursor-pointer" @click="cancelSortBy()"/>
								</template> 
								<template v-else-if="sortBy =='name'" > 
									<ChevronsDownIcon class="ml-3 h-5 w-5 text-white bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis('-name')" />
									<XIcon class="w-5 h-5 text-slate-400 cursor-pointer" @click="cancelSortBy()"/>
								</template> 
								<template v-else> 
									<ChevronDownIcon class="ml-3 h-5 w-5 text-black bg-null opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis('-name')" />
								</template>
							</div>
						</template>
						<template v-else-if="column.key === 'qty'">
							<div class="flex justify-center w-24"> 
								<div class="shrink-0">{{ $t(`stock.table_column.${column.key}`) }}</div>
								<template v-if="sortBy =='-qty'" > 
									<ChevronsUpIcon class="shrink-0 ml-3 h-5 w-5 text-white bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis('qty')" />
									<XIcon class="w-5 h-5 text-slate-400 cursor-pointer" @click="cancelSortBy()"/>
								</template>
								<template v-else-if="sortBy =='qty'" > 
									<ChevronsDownIcon class="shrink-0 ml-3 h-5 w-5 text-white bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis('-qty')" />
									<XIcon class="w-5 h-5 text-slate-400 cursor-pointer" @click="cancelSortBy()"/>
								</template> 
								<template v-else> 
									<ChevronDownIcon class="shrink-0 ml-3 h-5 w-5 text-black bg-null opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis('-qty')" />
								</template>
							</div>
						</template>
						<template v-else-if="column.key === 'price'">
							<div class="flex justify-center w-24"> 
								<div class="shrink-0">{{ $t(`stock.table_column.${column.key}`) }}</div>
								<template v-if="sortBy =='-price'" > 
									<ChevronsUpIcon class="shrink-0 ml-3 h-5 w-5 text-white bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis('price')" />
									<XIcon class="w-5 h-5 text-slate-400 cursor-pointer" @click="cancelSortBy()"/>
								</template>
								<template v-else-if="sortBy =='price'" > 
									<ChevronsDownIcon class="shrink-0 ml-3 h-5 w-5 text-white bg-[#131c34] opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis('-price')" />
									<XIcon class="w-5 h-5 text-slate-400 cursor-pointer" @click="cancelSortBy()"/>
								</template> 
								<template v-else> 
									<ChevronDownIcon class="shrink-0 ml-3 h-5 w-5 text-black bg-null opacity-[.85] rounded-full right-[5%] z-50" @click="sortByThis('-price')" />
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
						:colspan="computedTableColumns.length +2" >
						<LoadingIcon icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] right-[50%] top-[50%] translate-x-1/2"/>
					</td>
					<td v-else-if="numOfProducts==0 && keyword == ''" :colspan="computedTableColumns.length +2" class="TDshadow">
						<div class="mt-40 text-center md:mt-10">
							<h1 class="text-slate-500 text-sm md:text-lg font-bold">
								{{ $t('stock.no_result.'+ product_status) }}
							</h1>
							<!-- <h1 class="text-slate-500 text-sm md:text-lg">
								{{ $t('stock.click_to_add') }}
							</h1> -->
						</div>
					</td> 
					<td v-else-if="numOfProducts==0" :colspan="computedTableColumns.length +2" class="TDshadow">
						<div class="mt-40 text-center md:mt-10">
							<h1 class="text-slate-500 text-sm md:text-lg font-bold">
								{{ $t('stock.no_result.'+ product_status) }}
							</h1>
							<!-- <h1 class="text-slate-500 text-sm md:text-lg">
								{{ $t('stock.click_to_add') }}
							</h1> -->
						</div>
					</td> 
				</tr>
				
				<tr
					v-for="(product, product_index) in stockProducts"
					:key="product_index"
					class="intro-x"
					:class="{'trBorder' : numOfProducts != 0}"
				>	
					<template v-for="column,index in computedTableColumns" :key="index"> 
						<td class="w-10" v-if="column.key == 'check'">
							<input 
								class="form-control form-check-input w-[1.2rem] h-[1.2rem] sm:mr-1 my-auto selectCheck" 
								type="checkbox" 
								v-model="product.check"
								@click="selectStock(product, $event)"
							/>
						</td>
						<td v-else-if="column.key === 'image'" class="w-fit text-[12px] lg:w-18 lg:text-sm 2xl:w-32 imgtd" :data-content="$t(`stock.table_column.${column.key}`)">
							<div class="flex justify-center">
								<div class="w-20 h-20 image-fit zoom-in lg:w-12 lg:h-12 " v-if="product.image">
									<img 
										class="w-full rounded-lg"
										:src= "product.image"
										data-action="zoom"
									/>
								</div>
								<div class="w-20 h-20 image-fit zoom-in lg:w-12 lg:h-12" v-else>
									<img 
										class="w-full rounded-lg"
										:src= "`${staticDir}` + `no_image.jpeg`"
										data-action="zoom"
									/>
								</div>
							</div>
						</td>

						<td v-else-if="column.key === 'categories'" class="w-full sm:w-fit category" :data-content="$t(`stock.table_column.${column.key}`)">
							<div v-for="(productCategoryID,index) in product[column.key] " :key="index">
								<div >{{ stockStore.productCategoryDict[productCategoryID]?.name }}</div> 
							</div>
						</td>

						<td v-else-if="column.key === 'type'" class="w-full sm:w-fit qtyPrice" :data-content="$t(`stock.table_column.${column.key}`)">
							<div class="">{{product[column.key]}}</div> 
						</td>

						<td v-else-if="column.key === 'qty'" class="w-full sm:w-fit qtyPrice" :data-content="$t(`stock.table_column.${column.key}`)">
							<div class="text-right">{{product[column.key]}}</div> 
						</td>

						<td v-else-if="column.key === 'price'" class="w-full sm:w-20 qtyPrice" :data-content="$t(`stock.table_column.${column.key}`)">
							<div class="text-right">
								<span class="text-[12px]"> {{layoutStore.userInfo.user_subscription.currency}} </span>
								{{(Math.floor(parseFloat(product[column.key]) * (10 ** layoutStore.userInfo.user_subscription.decimal_places)) / 10 ** layoutStore.userInfo.user_subscription.decimal_places ).toLocaleString('en-GB')}}
								{{layoutStore.userInfo.user_subscription.price_unit?$t(`global.price_unit.${layoutStore.userInfo.user_subscription.price_unit}`):''}}</div> 
						</td>

						<td v-else-if="column.key === 'wishlist'" class="w-full sm:w-fit wishlist" :data-content="$t(`stock.table_column.${column.key}`)">
							<template v-if="product.meta.wish_list" > 
								<div v-if="Object.keys(product.meta.wish_list).length >0" 
									class="flex gap-2 cursor-pointer" @click="sentWishlistMail(product,product_index)"> 
										<SimpleIcon icon="wishlist" width="24" height="24"/><span class="font-bold"> ({{Object.keys(product.meta.wish_list).length}})</span>  </div>
								<div v-else class="flex gap-2 cursor-not-allowed"> 
									<SimpleIcon icon="wishlist" width="24" height="24"/><span class="font-bold"> (0) </span>  </div>
							</template>
							<div v-else class="flex gap-2 cursor-not-allowed"> 
							<SimpleIcon icon="wishlist" width="24" height="24"/><span class="font-bold"> (0) </span>  </div>
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
												<!-- <EditIcon class="w-[20px] h-[20px] mx-1"/>  -->
												<SimpleIcon icon="edit" color="#2d8cf0" class="mr-1" />  
												{{ $t('stock.category_manage.edit')}}
											</DropdownItem>
											<DropdownItem class="w-28 text-center whitespace-nowrap text-[14px]" @click="copyProduct(product, product_index)"> 
												<SimpleIcon icon="copy" color="#2d8cf0" class="mr-1" />  
												{{ $t('stock.category_manage.duplicate')}}
											</DropdownItem>
											<DropdownItem class="w-28 text-center text-danger whitespace-nowrap text-[14px]" @click="deleteProduct(product,product_index)"> 
												<!-- <Trash2Icon class="w-[20px] h-[20px] mx-1"/> -->
												<SimpleIcon icon="delete" color="#b91c1c" class="mr-1" />  
												{{ $t('stock.category_manage.delete')}}
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
</template>

<script setup>
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { search_product, delete_product, copy_product, bulk_update_product, wish_list_send_email } from '@/api_v2/product'

import { ref, onMounted, onUnmounted, defineProps, getCurrentInstance, computed, watch } from 'vue'
import { useRoute, useRouter } from "vue-router"
import dom from "@left4code/tw-starter/dist/js/dom";
import i18n from "@/locales/i18n";
import SimpleIcon from "../../global-components/lss-svg-icons/SimpleIcon.vue";
import { useSellerStockStore } from "@/stores/lss-seller-stock"

const stockStore = useSellerStockStore();
const route = useRoute()
const router = useRouter()
const props = defineProps({
	product_status: String,
	searchEventBusName: String,

})

const statusRadio = ref([
	{text: 'for_sale', id: 'enabled'},
	{text: 'delisted', id: 'disabled'},
])

const computedTableColumns = computed(()=>{

	var columns = [
		{ name: "check", key: "check"},
		{ name: "image", key: "image" },
		{ name: "name", key: "name", sortable:true },
		{ name: "category", key: "categories" },
		{ name: "remark", key: "remark" },
		{ name: "qty", key: "qty", sortable:true },
		{ name: "price", key: "price", sortable:true },
		{ name: "wishlist", key:"wishlist"},
		{ name: "", key: "edit" },]

	if(layoutStore.userInfo?.user_subscription.user_plan?.hide?.stock_table_check){
		columns = columns.filter(column=>column.key!="check")
	}
	if(layoutStore.userInfo?.user_subscription?.user_plan.hide?.stock_table_wishlist){
		columns = columns.filter(column=>column.key!="wishlist")
	}
	if(layoutStore.userInfo?.user_subscription?.user_plan.hide?.stock_table_edit){
		columns = columns.filter(column=>column.key!="edit")
	}
	return columns
})
const currentPage = ref(1)
const totalPage = ref(1)
const pageSize = ref(10)
const dataCount = ref(0)
const searchColumn = ref('')
const keyword = ref('')
const stockProducts = ref([])
const categoryID = ref('')
const sortBy = ref('')
const showModal = ref(false)


const staticDir = import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR
const layoutStore = useLSSSellerLayoutStore()
const showCommentLoding = ref(true)
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const numOfProducts = computed(()=>stockProducts.value.length)


onMounted(()=>{

	search()
	eventBus.on(props.searchEventBusName, (payload) => {
		currentPage.value = 1
		searchColumn.value = payload.searchColumn
		keyword.value = payload.keyword
		categoryID.value = payload.categoryID
		search()
	});
	eventBus.on('refreshStockTable', () => {
		currentPage.value = 1
		search()
	});

})

onUnmounted(()=>{
	eventBus.off(props.searchEventBusName)
	//refreshStockTable event unregister at Main
})




const search = ()=>{
	showCommentLoding.value = true
	stockProducts.value = []
	var _pageSize, _currentPage, _searchColumn, _keyword, _productStatus, _productType, _categoryID, _exclude, _sortBy, _toastify;

	search_product(
		_pageSize=pageSize.value, 
		_currentPage=currentPage.value, 
		_searchColumn=searchColumn.value, 
		_keyword=keyword.value, 
		_productStatus=props.product_status, 
		_productType='',
		_categoryID=categoryID.value, 
		_exclude='', 
		_sortBy=sortBy.value , 
		_toastify=layoutStore.alert)
	.then(
		response => {
			if(response.data.count != undefined){
				dataCount.value = response.data.count
				const _totalPage = parseInt(response.data.count / pageSize.value)
				totalPage.value = _totalPage == 0 ? 1 : _totalPage
			}
			stockProducts.value = response.data.results
			showCommentLoding.value = false
			// console.log(stockProducts.value)
		}
	)
}

const updateProductsCheck = ()=>{
    stockProducts.value.forEach((product,index) => {
        if(stockStore.selectedProductIDList.includes(product.id)){ 
			console.log('in')
			product.check=true
        }else{
            product.check=false
        }
    });
}

watch(computed(()=>stockProducts.value),updateProductsCheck)

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

const deleteProduct = (product,index) => {
	let yes = confirm(`${i18n.global.t('stock.table_column.confirm_delete')}`)
	if (yes) delete_product(product.id, layoutStore.alert).then(res => {
		stockProducts.value.splice(index,1)
		stockStore.selectedProductIDList = stockStore.selectedProductIDList.filter((v) => v != product.id)
		})
	hideDropDown()
}

const copyProduct = (product, index) => {
	copy_product(product.id, layoutStore.alert).then(res => {
		stockProducts.value.splice(index, 0 , res.data)
		}
	)
	hideDropDown()
}

const sortByThis = (by) =>{
	sortBy.value = by
	search();
}

const cancelSortBy = ()=>{
	sortBy.value = ''
	search();
}

const selectAllStock = (event) => {
	if (event.target.checked) {
		stockProducts.value.forEach(product => { 
			product.check = true 
			if(product.id in stockStore.selectedProductIDList){
				//do nothing
			}else{
				stockStore.selectedProductIDList.push(product.id)
			}
		})
	} else {
		stockProducts.value.forEach(product => { 
			product.check = false 
			stockStore.selectedProductIDList = []
		})		
	}
}

const selectStock = (product, event) => {
	if (event.target.checked){
		if(product.id in stockStore.selectedProductIDList){
			//do nothing
		}else{
			stockStore.selectedProductIDList.push(product.id)
		}
	} 
	else {
		stockStore.selectedProductIDList = stockStore.selectedProductIDList.filter((v) => v != product.id)
	}
	console.log(stockStore.selectedProductIDList)
}

const sentWishlistMail = (product, index) =>{
	let yes = confirm(`${i18n.global.t('stock.wishlist.confirm_send')}`)
	if (yes) {
		wish_list_send_email(product.id, layoutStore.alert).then(
		res=>{
			layoutStore.notification.showMessageToast(`${i18n.global.t('stock.wishlist.success_send')}`)
			stockProducts.value[index].meta.wish_list = []
		})
	}
	else layoutStore.alert.showMessageToast(`${i18n.global.t('stock.wishlist.cancel_send')}`)
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
		 }

	td:nth-of-type(4):before {
		content: attr(data-content);
	}
	td:nth-of-type(5):before {
		content: attr(data-content);
	}
	
	.category:before {
		content: attr(data-content);
	}
	td:nth-of-type(6):before {
		content: attr(data-content);
	}
	td:nth-of-type(6){
		white-space: normal !important;
		width: 100% !important;
	}

	td:nth-of-type(7):before {
		content: attr(data-content);
		 
	}
	.wishlist{
		display:inline-flex;
		justify-content: flex-end;
		width: 100% !important;
	}

	td:nth-of-type(8):before {
		content: attr(data-content);
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