<template>
<div class="flex flex-col lg:mt-8 my-3 gap-5 h-fit sm:h-full">
  <h2 class="text-xl sm:text-2xl sm:px-20 mx-auto sm:mx-0 font-medium">
    {{ $t('buyers.page_title')}}
  </h2>
  <div class="flex flex-col px-3 sm:px-8 py-5 box h-full lg:mx-20 gap-4">
    <div class="flex flex-row">
      <BuyersSearchBar class="my-auto"/> 
      <FileUploadButton 
        v-if="sellerStore?.userInfo?.user_subscription?.user_plan?.display?.import_customer_button"
        class="ml-auto text-sm h-[35px] w-[35px] p-0 sm:p-2 sm:w-fit sm:h-[42px] text-[#ff9505] bg-[#fefce8] font-medium shadow-lg border-[#fcd34d] hover:bg-[#fef6e8] rounded-full border-[2px]" 
        button_id="import_customer"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :multiple="false"
        :uploadFunction = "importCustomers"
      >
      
      <LoadingIcon  v-if="import_processing" icon="three-dots" color="black" class="absolute h-[30px] w-[30px] sm:w-40 mr-2 sm:mr-0 sm:h-[20px] top-2"/>
      <template  v-else> 
        <ArrowDownIcon class="w-6 h-6 " />
        <span class="hidden sm:inline-block text-md font-bold text-[#ff9505] align-middle flex flex-row">Import Customer</span> 
      </template>
      </FileUploadButton>
      
    </div>
    
    <BuyersListTable
      :tableColumns="tableColumns"
    />
  </div>
</div>
</template>

<script setup>
import BuyersSearchBar from "@/views/seller-buyers/BuyersSearchBar.vue";
import BuyersListTable from "@/views/seller-buyers/BuyersListTable.vue";
import { ref, watch, computed, getCurrentInstance, onMounted} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list";
import { retrieve_campaign } from "@/api_v2/campaign"
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { import_customer } from "@/api_v2/user_subscription"
import FileUploadButton from "@/components/file-upload-button/Main.vue";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies()
const accessToken = cookies.get('access_token')
const sellerStore = useLSSSellerLayoutStore();
const store = useLSSCampaignListStore();
const route = useRoute();
const router = useRouter();
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus; 

const searchColumns = ref([{ text: "name", value: "name" }]);

const tableColumns = ref([
    { name: null, key: "customer_img" },
    { name: "customer_name", key: "customer_name" },
    { name: "email", key: "email"},
    // { name: "type", key: "type" },
    { name: "order_history", key: "order_history"},
    { name: "points", key: "points"},
]);


onMounted(()=>{
  sellerStore.buyer = {}
})

const import_processing = ref(false)
const fileBuffer = ref(null)

const importCustomers = file =>{
  import_processing.value = true
  fileBuffer.value = file
  startWebSocketConnection(true)
}


const startWebSocketConnection =(init)=> {
    const websocket = new WebSocket(
        `${import.meta.env.VITE_APP_WEBSOCKET_URL}/ws/data/import/?token=${accessToken}`
    );

    websocket.onmessage = e =>{
        const data = JSON.parse(e.data);

        if(data.type==="room_data" && init){
          let formData = new FormData();
          formData.append("file", fileBuffer.value);
          formData.append('room_id',data.room_id)

          import_customer(formData, sellerStore.alert)
          .then((res) => {
            console.log(res.data)
          }).catch(err=>{
            console.log('upload file error')
            websocket.close(1000);
          });
        } 

        else if(data.type==="result_data"){
            console.log(data)
            if(data.data.result=='complete'){
              location.reload()
            }else{
              sellerStore.alert.showMessageToast('Import Fail, Please try again or contect support team.')
            }
            websocket.close(1000);
        } 

    };

    websocket.onopen = e => {
        console.log('socket connected')
    };

    websocket.onclose = e => {
        if(e.code!=1000){
            startWebSocketConnection(false)
        }
        console.error('socket closed');
        import_processing.value = false
    };

    websocket.onerror = function(err) {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        websocket.close(1000);
    };
}

</script>
