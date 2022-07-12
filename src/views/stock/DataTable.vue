<template>
	<div class="mt-3 overflow-auto h-[600px]">
		<table class="table -mt-3 table-auto box table-report ">
			<thead>
				<tr>
					<th class="whitespace-normal xl:whitespace-nowrap" v-for="column in columns" :key="column.key">
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
				<template v-for="column in columns" :key="column.key"> 
					<td v-if="column.key === 'image'" class="w-fit text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm imgtd">
						<div class="flex">
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
					<td v-else-if="column.key === 'qty' || column.key === 'type'" class="w-full sm:w-fit qtyPrice">
						<div class="">{{product[column.key]}}</div> 
					</td>
					<td v-else-if="column.key === 'price'" class="w-full sm:w-fit qtyPrice">
						<div class="">{{layoutStore.userInfo.user_subscription.currency}} {{product[column.key].toFixed(layoutStore.userInfo.user_subscription.decimal_places)}}</div> 
					</td>
					<td v-else-if="column.key === 'edit'"  class="w-12 table-report__action edit">
						<Dropdown placement="bottom-start">
							<DropdownToggle role="button" class="block w-5 h-5" href="javascript:;">
							<MoreHorizontalIcon class="w-5 h-5 text-slate-700" />
							</DropdownToggle>
							<DropdownMenu class="w-20 pt-2 ">
							<DropdownContent class="w-20 text-center ">
								<DropdownItem class="w-20 text-center whitespace-nowrap text-[14px]" @click="this.$router.push({name:'edit-product',params:{product_id:product.id}})"> <EditIcon class="w-[20px] h-[20px] mx-1"/> Edit </DropdownItem>
							</DropdownContent>
							</DropdownMenu>
						</Dropdown> 
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

<script>
import { createAxiosWithBearer } from '@/libs/axiosClient'
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

export default {
	props: {
		requestUrl: String,
		columns: Array,
		product_status: String,
		eventBusName: String
	},
	data() {
		return {
			currentPage: 1,
            totalPage: 1,
            pageSize: 10,
			dataCount: 0,
            searchColumn: undefined,
            keyword: undefined,
            listItems: [],
			publicPath: import.meta.env.VITE_APP_IMG_URL,
			category: undefined,
			storageUrl: import.meta.env.VITE_GOOGLE_STORAGEL_URL,
			layoutStore: useLSSSellerLayoutStore(),
		}
	},
	mounted() {
		this.search();
		this.eventBus.on(this.eventBusName, (payload) => {
			this.currentPage = 1
			this.searchColumn = payload.searchColumn
			this.keyword = payload.keyword
			this.pageSize = payload.pageSize
			this.category = payload.filterColumn
			this.search()
		});

	},
	unmounted() {
		this.eventBus.off(this.eventBusName);
	},
	methods: {
		search() {
			createAxiosWithBearer()
			.get(this.requestUrl + `?page_size=${this.pageSize}&page=${this.currentPage}&search_column=${this.searchColumn}&keyword=${this.keyword}&product_status=${this.product_status}&category=${this.category}`)
			.then(
				response => {
					if(response.data.count != undefined){
						this.dataCount = response.data.count
                        const totalPage = parseInt(response.data.count / this.pageSize)
                        this.totalPage = totalPage == 0 ? 1 : totalPage
                    }
                    this.listItems = response.data.results
				}
			).catch(
                error => {
                    console.log(error)
                }
            )
		},
		changePage(page) {      
			this.currentPage = page;
			this.search();
		},
		changePageSize(pageSize) {
			this.pageSize = pageSize;
			this.search();
		},
	},
}


</script>


<style scoped>
.click-icon:hover {
	cursor: pointer;
}

td {
	height: auto !important;
	padding-right:10px;
	padding-left:10px;
	font-size: 16px;
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
		border-bottom: 3px solid rgba(61, 61, 61, 0.7);
		margin-top: 10px;
	}

	td {
		border: none;
		position: relative;
		padding-left: 50% !important;
		text-align: right !important;
		box-shadow: none !important;
		height: auto;
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
		content: "Quantity";
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
}
</style>