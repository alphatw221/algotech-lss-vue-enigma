<template>
	<div >
		<table class="table table-report mt-5 overflow-y-scroll table-auto">
			<thead>
				<tr >
					<th class="whitespace-nowrap" v-for="column in tableColumns" :key="column.key">
						{{ column.name }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					class="intro-x"
					v-for="order in orders"
					:key="order.id"
				>
					<td 
						class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm"
						v-for="column in tableColumns" 
						:key="column.key"
					>
                        <template v-if="column.key === 'action'">
                            <EyeIcon @click="this.$router.push(`/buyer/order/${order.id}`);" />
                        </template>
						<template v-else-if="column.type=='dateTime'">
							{{ new Date(order[column.key]).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }}
						</template>
						<template v-else-if="column.type=='float'">
							{{parseFloat(order[column.key]).toFixed(2)}}
						</template>

						<template v-else>
							{{ order[column.key] }}
						</template>
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
import { buyer_orders_history } from '@/api_v2/order';

export default {
	data() {
		return {
			currentPage: 1,
			totalPage: 1,
			pageSize: 10,
			dataCount: 0,
            orders: [],
			tableColumns: [
                { name: "Order NO.", key: 'id', type:'int'},
                { name: "Date", key: "created_at", type:'dateTime' },
                { name: "Payment Method", key: "payment_method", type:'string'},
                { name: "Amount", key: "total", type:'float'},
                { name: "Status", key: "status", type:'string'},
                { name: "Action", key: "action", type:'link' },
            ],
		}
	},
	mounted() {
		this.getOrderHistoryListData()
	},
	methods: {
		changePage(page) {      
			this.currentPage = page;
			this.getOrderHistoryListData()
		},
		changePageSize(pageSize) {
			this.pageSize = pageSize;
			this.getOrderHistoryListData()
		},
		getOrderHistoryListData() {
			buyer_orders_history(this.currentPage, this.pageSize).then(response => {
				this.dataCount = response.data.count;
				const totalPage = parseInt(this.dataCount / this.pageSize);
				this.totalPage = totalPage == 0 ? 1 : totalPage;

				this.orders = response.data.results;
			}).catch(function (error) {
				console.log(error);
			})
		},
	},
}
</script>