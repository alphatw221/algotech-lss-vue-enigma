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
					v-for="order in orderItems"
					:key="order.id"
					class="intro-x"
				>
					<td v-for="column in tableColumns" class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm">
                        <template v-if="column.key === 'action'">
                            <EyeIcon @click="this.$router.push(`/buyer/order/${order.id}`);" />
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
            orderItems: [],
			tableColumns: [
                { name: "Order NO.", key: 'id' },
                { name: "Date", key: "created_at" },
                { name: "Payment Method", key: "payment_method" },
                { name: "Amount", key: "total" },
                { name: "Status", key: "status" },
                { name: "Action", key: "action" },
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

				this.orderItems = response.data.results;
				for (let i = 0; i < this.orderItems.length; i++) {
					this.orderItems[i].created_at = new Date(this.orderItems[i].created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
					this.orderItems[i].total = parseFloat(this.orderItems[i].total).toFixed(2)
				}
			}).catch(function (error) {
				console.log(error);
			})
		},
	},
}
</script>