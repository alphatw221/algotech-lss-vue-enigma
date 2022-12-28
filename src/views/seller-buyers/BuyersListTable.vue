<template>
  <LoadingTable  v-if="(showBuyersLoading == true)" :column="tableColumns" :tableName="'buyers'" theadColor="#E2E8F0"/> 
  <div v-else-if="(showBuyersLoading == false)" 
    class="overflow-x-hidden sm:overflow-auto sm:h-[62vh] mt-4">
    <table class="table -mt-3 table-report">
      <thead>
        <tr>
          <th class="text-center whitespace-nowrap" v-for="column in tableColumns" :key="column.key">
            <template v-if="column.key === 'customer_name'">
              <div class="text-left">
                  {{ $t(`buyers.table_column.`+column.name) }}
              </div>
            </template>
            <template v-if="column.key === 'email'">
              <div class="text-left">
                  {{ $t(`buyers.table_column.`+column.name) }}
              </div>
            </template>
            <template v-else-if="column.key === 'order_history'">
              <div class="text-center">
                  {{ $t(`buyers.table_column.`+column.name) }}
              </div>
            </template>
            <template v-else-if="column.key === 'points'">
              <div class="text-center">
                  {{ $t(`buyers.table_column.`+column.name) }}
              </div>
            </template>
            
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(buyer, index) in buyers" :key="index" class="intro-x">
          <template v-for="column in tableColumns" :key="column.key">
            <td v-if="column.key == 'customer_name'" class="w-fit">
              {{ buyer.name }}
            </td>
            <td v-if="column.key == 'email'" class="w-fit" :data-content="$t('buyers.table_column.' + column.key)">
              {{ buyer.email }}
            </td>
            <td v-if="column.key == 'customer_img'" class="text-left w-5 w-fit">
              <div class="flex justify-center">
                <div class="w-fit h-fit image-fit">
                    <div class="flex-none w-20 h-20 sm:mr-1 sm:w-12 sm:h-12 image-fit">
                        <img class="rounded-full" :src="getBuyerImg(buyer)"/>
                    </div>
                </div>
              </div>
            </td> 
            <!-- <td v-if="column.key == 'type'" class="text-center w-fit">
              <template v-if="buyer.buyer">
                Registered
              </template>
              <template v-else>
                Guest
              </template>
            </td> -->
            <td v-if="column.key == 'order_history'" class="items-center manage_order w-fit" :data-content="$t('buyers.table_column.' + column.key)">
              <a class="flex items-center justify-center" @click="toBuyerOrderHistory(buyer)">
                <span class="mr-3 sm:hidden"> {{$t('buyers.table_column.order_history')}}</span>
                <Tippy  :content="$t('buyers.table_column.order_history')" :options="{ theme: 'light' }">
                  <!-- <font-awesome-icon icon="fa-solid fa-list-check" class="self-center w-8 h-[24px]"/>  -->
                  <ShoppingBagIcon color="#2d8cf0" width="30" height="32" />
                </Tippy> 
              </a>
            </td>
            <td v-if="column.key == 'points'" class="items-center manage_order w-fit" :data-content="$t('buyers.table_column.' + column.key)">
              <a class="flex items-center justify-center" @click="toBuyerPoints(buyer)">
                <span class="mr-3 sm:hidden"> {{$t('buyers.table_column.points')}}</span>
                <Tippy  :content="$t('buyers.table_column.points')" :options="{ theme: 'light' }">
                  <SimpleIcon color="#2d8cf0" icon="point" width="30" height="32" />
                </Tippy> 
              </a>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex flex-wrap items-center intro-y sm:flex-row sm:flex-nowrap">
    <Page 
    class="mx-auto my-3 flex flex-row flex-wrap justify-center gap-1 mb-10"
          :total="dataCount"
          :page-size="page_size"
          show-sizer :page-size-opts="[10,20,50,100]" 
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        />
    </div>
</template>

<script setup>
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { list_buyers } from "@/api_v2/user_subscription"
import {defineProps, onMounted, onUnmounted, getCurrentInstance, ref, defineEmits, computed} from 'vue'
import { useRoute, useRouter } from "vue-router";
import LoadingTable from '@/components/lss-skeleton/table/LoadingTable.vue'


import unbound from "/src/assets/images/lss-img/noname.png"
import dom from "@left4code/tw-starter/dist/js/dom";
import i18n from "@/locales/i18n"

const route = useRoute();
const router = useRouter();
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const emits = defineEmits(['showRemindModal',])

const props = defineProps({
    tableColumns: Array,
});

const baseURL = import.meta.env.VITE_APP_WEB
const currentPage= ref(1)
const totalPage= ref(1)
const page_size= ref(20)
const dataCount= ref(0)
const searchColumn= ref('')
const keyword= ref('')
const order_by= ref("created_at")
const checkout= ref(true)
const layoutStore = useLSSSellerLayoutStore()
const showBuyersLoading = ref(true)
const buyers = ref([])

onMounted(()=>{
  search()
  // checkPage()
  showBuyersLoading.value = true
  eventBus.on("BuyerSearch", (payload) => {
    currentPage.value = 1; 
    keyword.value = payload.keyword;
    search();
  })
  // startFromToast();
  
})

onUnmounted(()=>{
  eventBus.off("BuyerSearch");
})


const search =()=>{
    showBuyersLoading.value = true
    buyers.value = []
    list_buyers(keyword.value, currentPage.value, page_size.value, layoutStore.alert)
    .then((response) => {
      if (response.data.count != undefined) {
        dataCount.value = response.data.count;
      }
      buyers.value = response.data.results
      showBuyersLoading.value = false
    })
  }

const changePage = (page)=>{
      currentPage.value = page;
      search();
    }

const changePageSize = (pageSize)=>{
      page_size.value = pageSize;
      search();
    }

const toBuyerOrderHistory = (buyer_data)=>{
  router.push({name:'seller-buyers-order-history',params:{'buyer_id':buyer_data.id}}) 
}

const toBuyerPoints = (buyer_data) => {
  router.push({name:'seller-buyers-points',params:{'buyer_id':buyer_data.id}})
}
const hideDropDown = ()=>{
  dom('.dropdown-menu').removeClass('show')
}

const getBuyerImg = (buyer) => {
  if (buyer.facebook_info?.picture) return buyer.facebook_info.picture
  else if (buyer.google_info?.picture) return buyer.google_info.picture
  return import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR+'fake_head.jpeg'
}

</script>


<style scoped>
.click-icon:hover {
  cursor: pointer;
}

a .dropdown-item{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

td {
  min-height: 50px;
  border-collapse: collapse;
  padding-right: 10px !important;
  padding-left: 10px !important;
}

thead th{ 
  position: sticky !important; 
  top: 0 !important;
  z-index: 50;
  background-color: theme("colors.secondary");
  padding-right: 10px !important;
  padding-left: 10px !important;
}

.tdDot{
	box-shadow: none !important;
}

.alert{
  box-shadow: none !important;
}

@media only screen and (max-width: 760px),
(min-device-width: 769px) and (max-device-width: 769px) {

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
    border-bottom: 2px solid #dddddd; 
    margin-top: 25px;
    padding-bottom: 10px !important;
    position: relative;
  }

  td {
    position: relative;
    display: flex;
    text-align: center;
    box-shadow: none !important;
    align-items: center;
    justify-content:flex-end;
    background-color: white !important;
    min-height: 35px;
    border: none;
		padding-left: 50% !important;
    width: 100%;
    padding-right: 10px; 
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
    text-align:left;
	}

  td:nth-of-type(1):before {
		display:none;
		
	}
  td:nth-of-type(1){
    width: 100%;
    min-height: 20px !important;
    padding-left: 0px !important;
    justify-content:center;
	}
  td:nth-of-type(2):before {
		display:none;
	}
  td:nth-of-type(2){
    display:inline-block; 
    position:relative !important;
    top:8px;
    width: 100%;
    padding-left: 0 !important;
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

  .dotTr{
    border: none;
  }
  .alert:before{
    display: none;
  }
  .alert{
    width: 100%;
    padding-left: 0px !important;
    box-shadow: none;
  }

  .tippy-mobile{
		position: absolute;
		left:53px; 
		top:2.5px;
	}
}
</style>