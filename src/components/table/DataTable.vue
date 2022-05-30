<template>
	<div >
		<table class="table table-report mt-5 overflow-y-scroll">
			<thead>
				<tr >
					<th class="whitespace-nowrap" v-for="column in columns" :key="column.key">
						{{ column.name }}
					</th>
				</tr>
			</thead>
			<tbody style=" height: 500px;">
				<tr
					v-for="(product, key) in listItems"
					:key="key"
					class="intro-x"
				>	
					<td v-for="column in columns" :key="column.key">
						<template v-if="column.key === 'image'" class="w-40">
							<div class="flex">
								<div class="w-10 h-10 image-fit zoom-in">
									<Tippy 
										tag="img"
										class="rounded-full"
										:src= "`${publicPath}` + product.image"
										:content="`Uploaded at`"
									/>
								</div>
							</div>
						</template>
						<template v-else-if="column.key === 'category'" v-for="tag in product['tag']">
							<div>{{ tag }}</div> 
						</template>
						<template v-else>
							{{ product[column.key] }}
						</template>
					</td>
					<td class="table-report__action w-30">
						<div class="flex justify-center items-center">
							<a 
								class="flex items-center mr-3" 
								@click="this.$router.push({ path: routerPath, query: { type: routerParam, id: product['id'] }})"
							>
								<CheckSquareIcon class="w-4 h-4 mr-1"/> Edit
							</a>
						</div>
					</td>
				</tr>
			</tbody>
		</table> 
		<div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
			<Page 
				:total="dataCount" 
				show-sizer
				@on-change="changePage"
				@on-page-size-change="changePageSize"
			/>
		</div> 
	</div>
</template>

<script>
import { createAxiosWithBearer } from '@/libs/axiosClient'

export default {
	props: {
		requestUrl: String,
		columns: Array,
		routerPath: String,
        routerParam: String,
		status: String
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
        
		this.eventBus.on("searchTable", (payload) => {
			this.currentPage = 1
			this.searchColumn = payload.searchColumn
			this.keyword = payload.keyword
			this.pageSize = payload.pageSize
			this.category = payload.filterColumn
			this.search()
		});

	},
	unmounted() {
		this.eventBus.off("searchTable");
	},
	methods: {
		search() {
			createAxiosWithBearer()
			.get(this.requestUrl + `?page_size=${this.pageSize}&page=${this.currentPage}&search_column=${this.searchColumn}&keyword=${this.keyword}&product_status=${this.status}&category=${this.category}`)
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