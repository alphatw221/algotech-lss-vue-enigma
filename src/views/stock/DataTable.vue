<template>
	<div class="mt-5 overflow-y-scroll overflow-x-scroll h-[600px]">
		<table class="box table table-report table-auto -mt-3 ">
			<thead>
				<tr>
					<th class="whitespace-normal xl:whitespace-nowrap" v-for="column in columns" :key="column.key">
						{{ column.name }}
					</th>
					<th> </th>
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
							<div class="w-20 h-20 image-fit zoom-in lg:w-12 lg:h-12 2xl:w-12 lg:h-12">
								<Tippy 
									tag="img"
									class="rounded-lg w-full"
									:src= "`${publicPath}` + product.image"
									:content="product.name"
									data-action="zoom"
								/>
							</div>
						</div>
					</td>
					<td v-else-if="column.key === 'category'" class="w-fit" >
						<div v-for="tag in product['tag']">
							<div >{{ tag }}</div> 
						</div>
					</td>
					<td v-else-if="column.key === 'qty' || column.key === 'price' || column.key === 'type'" class="w-fit">
						<div class=" w-fit">{{product[column.key]}}</div> 
					</td>
					<td v-else class="max-w-30 longMessage">
						<div class="max-w-30 longMessage"> {{product[column.key]}} </div>
					</td>
				</template>
					<td class="table-report__action w-12">
						<div class="flex justify-center items-center">
							<a 
								class="flex items-center mr-3" 
								@click="this.$router.push({ path: `/seller/product/edit/${product.id}`})"
							>
								<CheckSquareIcon class="w-4 h-4 mr-1"/> Edit
							</a>
						</div>
					</td>
				</tr>
			</tbody>
		</table> 
	</div>
	<div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
		<Page 
			:total="dataCount" 
			show-sizer
			@on-change="changePage"
			@on-page-size-change="changePageSize"
		/>
	</div> 
</template>

<script>
import { createAxiosWithBearer } from '@/libs/axiosClient'

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
			category: undefined
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
					console.log(this.listItems)
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
		}
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
}

thead th{ 
  position: sticky !important; 
  top: 0 !important;
  z-index: 99;
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
		font-size: 16px;
		padding: 0px !important;
		padding-top: 5px !important;
	}

	.imgtd {
		height: 90px !important;
	}

	thead tr {
		position: absolute;
		top: -9999px;
		left: -9999px;
	}

	tr {
		border-bottom: 1px solid black;
	}

	td {
		border: none;
		position: relative;
		padding-left: 50% !important;
		text-align: left !important;
		box-shadow: none !important;
		margin-top: 10px;
		height: auto;
	}

	.productName {
		padding-left: 15px;
	}

	td:before {
		position: absolute;
		left: 6px;
		width: 45%;
		padding-right: 10px;
		white-space: nowrap;
		font-weight: bold;
		box-shadow: none !important;
		background-color: white !important;
	}

	td:nth-of-type(1):before {
		content: "";
		/* color: #0e9893; */
	}

	td:nth-of-type(2):before {
		content: "Product Name";
		/* color: #0e9893; */
	}

	td:nth-of-type(3):before {
		content: "Order Code";
		/* color: #0e9893; */
	}

	td:nth-of-type(4):before {
		content: "Type";
		/* color: #0e9893; */
	}

	td:nth-of-type(5):before {
		content: "Category";
		/* color: #0e9893; */
	}
	td:nth-of-type(6):before {
		content: "Description";
		overflow-wrap: break-word;
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
}
</style>