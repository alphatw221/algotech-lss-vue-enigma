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
					v-for="(order,index) in orders"
					:key="index"
				>
					<td 
						class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm"
						v-for="column in tableColumns" 
						:key="column.key"
					>
                        <template v-if="column.key === 'action'">
                            <EyeIcon @click="router.push(`/buyer/order/${order.id}`);" />
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

<script setup>
import { buyer_orders_history } from '@/api_v2/order';
import { computed, onMounted, provide, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const currentPage = ref(1)

const totalPage = ref(1)
const pageSize = ref(10)
const dataCount = ref(0)
const orders = ref([])
const tableColumns = ref([
                { name: "Order NO.", key: 'id', type:'int'},
                { name: "Date", key: "created_at", type:'dateTime' },
                { name: "Payment Method", key: "payment_method", type:'string'},
                { name: "Amount", key: "total", type:'float'},
                { name: "Status", key: "status", type:'string'},
                { name: "Action", key: "action", type:'link' },
            ])


const changePage = page=> {      
			currentPage.value = page;
			getOrderHistoryListData()
		}

const changePageSize = pageSize => {
			pageSize.value = pageSize;
			getOrderHistoryListData()
		}

const getOrderHistoryListData = ()=>{
	buyer_orders_history(currentPage.value, pageSize.value).then(response => {
		dataCount.value = response.data.count;
		const total_page = parseInt(dataCount.value / pageSize.value);
		totalPage.value = total_page == 0 ? 1 : total_page;
		orders.value = response.data.results;
	}).catch(function (error) {
		console.log(error);
	})
}
onMounted(()=>{
	getOrderHistoryListData()
})

</script>