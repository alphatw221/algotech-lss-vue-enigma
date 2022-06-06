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
					v-for="(order, key) in listItems"
					:key="order.key"
					class="intro-x"
				>
					<td v-for="column in tableColumns" class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm">
                        <template v-if="column.key === 'action'">
                            <EyeIcon @click="this.$router.push(`/orders/${order.id}`);" />
                        </template>
						<template v-else>
							{{order[column.key]}}
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
import { createAxiosWithBearer } from "@/libs/axiosClient";
export default {
	data() {
		return {
			page: 1,
			totalPage: 1,
			page_size: 10,
			dataCount: 0,
            listItems: [],
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
			createAxiosWithBearer().get(`${'/api/order/buyer_list/'}`).then(response => {
				 if (response.data.length != undefined) {
					this.dataCount = response.data.length;
					const totalPage = parseInt(response.data.length / this.pageSize);
					this.totalPage = totalPage == 0 ? 1 : totalPage;
				}
				this.listItems = response.data;
				console.log(response);
			}).catch(function (error) {
				console.log(error);
			})
		},
	},
}
</script>