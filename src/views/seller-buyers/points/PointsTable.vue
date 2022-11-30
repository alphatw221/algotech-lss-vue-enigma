<template>
  <LoadingTable  v-if="ready == false" :column="tableColumns" :tableName="'order_points'" /> 
  
  <div v-else-if="ready == true" class="h-full">
    <table class="table table-report mt-2">
      <thead>
        <tr>
          <th
            class="whitespace-nowrap"
            v-for="column in tableColumns"
            :key="column.key"
          >
            {{ $t(`order_points.table_column.` + column.name) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="intro-x"
          style="line-height: 30px"
          v-for="(order, index) in orders"
          :key="index"
        >
        <!-- <template v-if="(order.points_earned || order.points_used) !== 0">  -->
          <td
            class="w-12 text-[12px] lg:w-18 lg:text-sm 2xl:min-w-32"
            v-for="column in tableColumns"
            :key="column.key"
            :data-content="$t(`order_points.table_column.` + column.name)"
          >
            <template v-if="column.type == 'dateTime'">

              <template v-if="order[column.key]">
                {{
                  new Date(order[column.key]).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                }}
              </template>
              <template v-else>-</template>
              
            </template>
            <template v-else-if="column.type == 'float' ">
              {{ order.currency }}
              {{
                (
                  Math.floor(
                    order[column.key] * 10 ** order.decimal_places
                  ) /
                  10 ** order.decimal_places
                ).toLocaleString("en-GB")
              }}
              {{
                order.price_unit
                  ? $t(`global.price_unit.${order.price_unit}`)
                  : ""
              }}
            </template>

            <template v-else-if="column.type == 'int' ">
              {{(order[column.key]).toLocaleString("en-GB")}}
            </template>

            <template
              v-else-if="column.key == 'campaign_title'"
            >
              {{order.campaign?.title}}
            </template>
            
            <template v-else-if="column.key == 'status'">
              {{ $t(`order_points.${order[column.key]}`) }}
            </template>

            <template v-else>
              {{ order[column.key] }}
            </template>
          </td>
        <!-- </template> -->
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="
      intro-y
      col-span-12
      flex flex-wrap
      sm:flex-row sm:flex-nowrap
      items-center
    "
  >
    <Page
      class="mx-auto my-3"
      :total="dataCount"
      :page-size="pageSize"
      @on-change="changePage"
      @on-page-size-change="changePageSize"
    />
  </div>
</template>

<script setup>
import { retrieve_buyer_history } from '@/api_v2/user_subscription';
import { computed, onMounted, provide, ref, watch, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import { buyer_retrieve_order_oid } from "@/api_v2/order";

import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import LoadingTable from '@/components/lss-skeleton/table/LoadingTable.vue'

const layoutStore = useLSSSellerLayoutStore();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;

const route = useRoute();
const router = useRouter();

const buyer_id = route.params.buyer_id
const ready = ref(false)
const currentPage = ref(1);

const totalPage = ref(1);
const pageSize = ref(10);
const dataCount = ref(0);
const orders = ref([]);
const tableColumns = ref([
  { name: "date", key: "created_at", type: "dateTime" },
  { name: "change_reason", key: "campaign_title", type: "string" },
  { name: "earned", key: "points_earned", type: "int" },
  { name: "used", key: "points_used", type: "int" },
  { name: "discount", key: "point_discount", type: "float" },
  { name: "expire_at", key: "point_expired_at", type: "dateTime" },
]);

const changePage = (page) => {
  currentPage.value = page;
  getOrderHistoryListData();
};

const changePageSize = (pageSize) => {
  pageSize.value = pageSize;
  getOrderHistoryListData();
};

const getOrderHistoryListData = () => {
  ready.value = false

  retrieve_buyer_history(buyer_id, true, currentPage.value, pageSize.value, layoutStore.alert).then(response => {
    if (response.data.count) {
      layoutStore.buyer = response.data.results ? response.data.results[0].buyer : response.data[0].buyer
      dataCount.value = response.data.count ? response.data.count : response.data.length
      orders.value = response.data.results ? response.data.results : response.data
    }
    ready.value= true
	})
};

onMounted(() => {
  getOrderHistoryListData();
});

</script>


<style scoped>
td {
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
    border-bottom: 2px solid #dddddd;
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
  td:nth-of-type(6) {
    min-height: 35px !important;
  }
}
</style>