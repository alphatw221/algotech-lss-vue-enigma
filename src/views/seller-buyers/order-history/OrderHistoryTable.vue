<template>
	<div class="overflow-x-auto h-full sm:h-[62vh]">
    <LoadingTable v-if="ready == false" :column="tableColumns" :tableName="'order_history'" /> 
		<table v-if="ready == true" class="table table-report mt-2 table-auto">
			<thead>
				<tr >
					<th class="whitespace-nowrap" v-for="column in tableColumns" :key="column.key">
						{{ $t(`order_history.table.`+column.name) }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					class="intro-x" style="line-height:30px"
					v-for="(order,index) in orders"
					:key="index"
				>
					<td 
						class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:w-32 2xl:text-sm"
						v-for="column in tableColumns" 
						:key="column.key"
            :data-content="$t(`order_history.table.`+column.name)"
					>

            <template v-if="column.key === 'action'">
                <!-- <EyeIcon @click="routeToDetail(order.id)" class="hover:cursor-pointer "/> -->
                <a @click="routeToDetail(order.id)">
                  <u class="md:hidden">{{$t('order_history.table.view')}}</u>
                  <u class="hidden md:inline">{{$t('order_history.table.view')}}</u>
                </a>
            </template>

						<template v-else-if="column.type=='dateTime'">
							{{ new Date(order[column.key]).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }}
						</template>
						<template v-else-if="column.key=='total'">
							{{order.currency}} 
              {{(Math.floor(order[column.key] * (10 ** order.decimal_places)) / 10 ** order.decimal_places).toLocaleString('en-GB')}}
              {{order.price_unit?$t(`global.price_unit.${order.price_unit}`):''}}
						</template>
            <template v-else-if="column.key=='payment_method' && order[column.key]">
							{{order[column.key]=='direct_payment'?`${$t('order_history.direct_payment')} - ${order.meta.account_mode}`:$t(`order_history.${order[column.key]}`)}}
						</template>
            <template v-else-if="column.key=='status'">
							{{$t(`order_history.${order[column.key]}`)}}
						</template>

						<template v-else>
							{{ order[column.key] }}
						</template>
					</td>
				</tr>
			</tbody>
		</table> 
	</div>
  <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
    <Page
    class="mx-auto my-3 flex flex-row flex-wrap justify-center gap-1 mb-10"
      :total="dataCount"
      :page-size="pageSize"
      @on-change="changePage"
      @on-page-size-change="changePageSize"
    />
  </div> 
</template>

<script setup>
import { list_buyer_order_history } from '@/api_v2/user_subscription';
import { computed, onMounted, provide, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { get_order_oid } from "@/api_v2/order"

import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import LoadingTable from '@/views/buyer-points/LoadingTable.vue';
const layoutStore = useLSSSellerLayoutStore()

const route = useRoute();
const router = useRouter();

const buyer_id = route.params.buyer_id
const ready = ref(false)
const currentPage = ref(1)

const totalPage = ref(1)
const pageSize = ref(10)
const dataCount = ref(0)
const orders = ref([])
const tableColumns = ref([
                { name: "order_no", key: 'id', type:'int'},
                { name: "date", key: "created_at", type:'dateTime' },
                { name: "payment_method", key: "payment_method", type:'string'},
                { name: "amount", key: "total", type:'float'},
                { name: "status", key: "status", type:'string'},
                { name: "action", key: "action", type:'link' },
            ])

const routeToDetail =(order_id)=>{
  router.push({name:"seller-buyers-order-detail",params:{buyer_id:buyer_id, order_id:order_id}})
}

const changePage = page=> {      
			currentPage.value = page;
			getOrderHistoryListData()
		}

const changePageSize = pageSize => {
			pageSize.value = pageSize;
			getOrderHistoryListData()
		}

const getOrderHistoryListData = ()=>{
  ready.value= false

	list_buyer_order_history(buyer_id, currentPage.value, pageSize.value, layoutStore.alert).then(response => {
    layoutStore.buyer = response.data.results ? response.data.results?.[0]?.buyer : response.data?.[0]?.buyer
		dataCount.value = response.data.count ? response.data.count : response.data.length
		orders.value = response.data.results ? response.data.results : response.data
    ready.value= true
	})
}
onMounted(()=>{
	getOrderHistoryListData()
})

</script>


<style scoped>
  td{
    height: 28px !important;
	padding-left: 20px !important;
  }

  @media only screen and (max-width: 760px),
  (min-device-width: 769px) and (max-device-width: 1024px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
    padding: 0px !important;
    font-size: 15px;
  }
  
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border-bottom: 2px solid #DDDDDD;
    background: white;
  }

  td {
    border: none;
    border-bottom: 0 !important;
    position: relative;
	  width: auto;
    padding-left: 50% !important;
    text-align: left !important;
    box-shadow: none !important;
    min-height: 28px;
  }

  td:before {
    position: absolute;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: bold;
    box-shadow: none !important;
  }

  td:nth-of-type(1):before {
    content: attr(data-content);
  }
  td:nth-of-type(2):before {
    content: attr(data-content);
    height: 100px;
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
  td:nth-of-type(6):before {
    content: attr(data-content);
  }
  td:nth-of-type(6){
    min-height: 35px !important;
  }
}
</style>