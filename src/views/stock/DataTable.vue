<template>
	<div class="overflow-x-hidden sm:overflow-auto h-fit md:h-[61vh]">
		<table class="table -mt-3 table-report min-h-[300px]">
			<thead>
				<tr>
					<th class="whitespace-normal xl:whitespace-nowrap text-center text-[16px]" v-for="column in props.columns" :key="column.key">
						<template v-if="column.name === ''">
							{{ column.name }}
						</template>
						<template v-else>
							{{ $t(`stock.table_column.${column.name}`) }}
						</template>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr class="h-[300px]"
					v-if="showCommentLoding || listItems==0">
					<td v-if="showCommentLoding"
						class="items-center relative tdDot"
						:colspan="props.columns.length +2" >
						<LoadingIcon icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] right-[50%] top-[50%] translate-x-1/2"/>
					</td>
					<td v-else-if="listItems==0 && keyword == ''" :colspan="props.columns.length +2">
						<div class="mt-40 text-center md:mt-10">
							<h1 class="text-slate-500 text-sm capitalize md:text-lg">
								You Don't Have Product in this Category
							</h1>
						</div>
					</td> 
					<td v-else-if="listItems==0" :colspan="props.columns.length +2">
						<div class="mt-40 text-center md:mt-10">
							<h1 class="text-slate-500 text-sm capitalize md:text-lg">
								No result
							</h1>
						</div>
					</td> 
				</tr>
				<tr
					v-for="(product, key) in listItems"
					:key="key"
					class="intro-x"
					:class="{'trBorder' : listItems != 0}"
				>	
				<template v-for="column in props.columns" :key="column.key"> 
					<td v-if="column.key === 'image'" class="w-fit text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm imgtd">
						<div class="flex justify-center">
							<div class="w-20 h-20 image-fit zoom-in lg:w-12 lg:h-12 2xl:w-12 " v-if="product.image">
								<Tippy 
									tag="img"
									class="w-full rounded-lg"
									:src= "`${publicPath}` + product.image"
									:content="product.name"
									data-action="zoom"
								/>
							</div>
							<div class="w-20 h-20 image-fit zoom-in lg:w-12 lg:h-12 2xl:w-12 " v-else>
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
					<td v-else-if="column.key === 'category'" class="w-full sm:w-fit category" >
						<div v-for="(tag,index) in product['tag'] " :key="index">
							<div >{{ tag }}</div> 
						</div>
					</td>
					<td v-else-if="column.key === 'type'" class="w-full sm:w-fit qtyPrice">
						<div class="">{{product[column.key]}}</div> 
					</td>
					<td v-else-if="column.key === 'qty'" class="w-full sm:w-fit qtyPrice">
						<div class="text-right">{{product[column.key]}}</div> 
					</td>
					<td v-else-if="column.key === 'price'" class="w-full sm:w-fit qtyPrice">
						<div class="text-right">{{layoutStore.userInfo.user_subscription.currency}} {{product[column.key].toFixed(layoutStore.userInfo.user_subscription.decimal_places)}}</div> 
					</td>
					<td v-else-if="column.key === 'edit'"  class="w-24 table-report__action edit">
					<div class="place-content-center flex"> 
						<Dropdown placement="bottom-start">
							<DropdownToggle role="button" class="block w-5 h-5" href="javascript:;">
							<MoreHorizontalIcon class="w-5 h-5 text-slate-700" />
							</DropdownToggle>
							<DropdownMenu class="w-20 pt-2">
							<DropdownContent class="w-20 text-center">
								<DropdownItem class="w-20 text-center whitespace-nowrap text-[14px]" @click="routeToEditProduct(product)"> 
									<EditIcon class="w-[20px] h-[20px] mx-1"/> {{ $t('stock.category_manage.edit')}}
								</DropdownItem>
							</DropdownContent>
							</DropdownMenu>
						</Dropdown> 
					</div>
					</td>
					<td v-else class="sm:w-fit">
						<div class="sm:w-fit"> {{product[column.key]}} </div>
					</td>
				</template>
				</tr>
			</tbody>
		</table> 
	</div>
	<div class="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
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
import { list_product } from '@/api_v2/product'


import { ref, onMounted, onUnmounted, defineProps, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from "vue-router"
import dom from "@left4code/tw-starter/dist/js/dom";

const route = useRoute()
const router = useRouter()

const props = defineProps({
	columns: Array,
	product_status: String,
	eventBusName: String
})


const currentPage = ref(1)
const totalPage = ref(1)
const pageSize = ref(10)
const dataCount = ref(0)
const searchColumn = ref('')
const keyword = ref('')
const listItems = ref([])
const category = ref('')

const publicPath = import.meta.env.VITE_APP_IMG_URL
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL

const layoutStore = useLSSSellerLayoutStore()
const showCommentLoding = ref(true)

const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

onMounted(()=>{
	search()
	eventBus.on(props.eventBusName, (payload) => {
			currentPage.value = 1
			searchColumn.value = payload.searchColumn
			keyword.value = payload.keyword
			pageSize.value = payload.pageSize
			category.value = payload.filterColumn
			search()
		});
})

onUnmounted(()=>{
	eventBus.off(props.eventBusName)
})

const search = ()=>{
	showCommentLoding.value = true
			listItems.value = []
			list_product(pageSize.value, currentPage.value, searchColumn.value, keyword.value, props.product_status, '',category.value )
			.then(
				response => {
					if(response.data.count != undefined){
						dataCount.value = response.data.count
                        const _totalPage = parseInt(response.data.count / pageSize.value)
                        totalPage.value = _totalPage == 0 ? 1 : _totalPage
                    }
                    listItems.value = response.data.results
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
.dotTr{
		border:none !important;
		margin-top: 0 !important;
	}

thead th{ 
	position: sticky !important; 
	top: 0 !important;
	font-size: 16px;
	z-index: 50;
	background-color: theme("colors.secondary");
  	padding-right:10px;
	padding-left:10px;
}

.longMessage{
	overflow-wrap: break-word;
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
		border-bottom: 3px solid rgba(61, 61, 61, 0.7);
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
		display:none;
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
		content: "Order Code";
		/* color: #0e9893; */
	}

	td:nth-of-type(4):before {
		content: "Type";
		/* color: #0e9893; */
	}

	.category:before {
		content: "Category";
		/* color: #0e9893; */
	}
	td:nth-of-type(6):before {
		content: "Description";
		/* color: #0e9893; */
	}
	td:nth-of-type(6){
		white-space: normal !important;
		width: 100% !important;
		/* color: #0e9893; */
	}

	td:nth-of-type(7):before {
		content: "Qty";
		/* color: #0e9893; */
	}
	td:nth-of-type(8):before {
		content: "Price";
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