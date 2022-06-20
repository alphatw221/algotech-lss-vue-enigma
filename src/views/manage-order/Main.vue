<template>
    <!-- OUTTER BOX -->
    <div class="intro-y grid grid-cols-12 gap-5">
        <!-- BEGIN: campaign Info -->
        <div class="col-span-12">
            <!-- BEGIN: campaign Status -->
            <CampaignStatus/>
            <!-- END: campaign Status -->

            <div class="col-span-12 mt-8 ">
                <div class="flex align-baseline text-xl -mb-5">
                    <a class="mr-2 ml-2" @click="show_order('manageAllOrder')">All </a>
                    <span class="text-xs p-1 h-5 rounded-full bg-danger text-white">{{store.manageAllOrder.length}}</span>
                    <a class="mr-2 ml-5" @click="show_order('manageReviewOrder')">Review </a>
                    <span class="text-xs p-1 h-5 rounded-full bg-danger text-white align-top">{{store.manageReviewOrder.length}}</span>
                    <!--  <a class="mr-2 ml-5">Pending Payment </a> -->
                    <!-- <span class="text-xs p-1 h-5 rounded-full bg-danger text-white mr- align-top">2</span> -->
                    <a class="mr-2 ml-5" @click="show_order('manageCompleteOrder')">Complete </a>
                    <span class="text-xs p-1 h-5 rounded-full bg-danger text-white mr-5 align-top">{{store.manageCompleteOrder.length}}</span>
                </div>
                <!--分隔線-->
                <div class="w-full border-t border-slate-800/60 dark:border-darkmode-400 mt-5"></div>
                <SearchBar/>
            </div>

            <!-- Table -->
            <div class="form-check form-switch w-full sm:w-auto sm:ml-auto sm:mt-0">
                <label class="form-check-label ml-0" for="show-example-3"> Stop Checkout</label>
                <input @click="stop_checkout($event.target.checked)" class="form-check-input mr-0 ml-3" type="checkbox" v-model="checkout_status"/>
            </div>

            <div class=" mt-3">
                <ManageOrderTable 
                    v-if="tableStatus === 'manageAllOrder'"
                    :tableStatus="tableStatus"
                />
                <ManageOrderTable 
                    v-if="tableStatus === 'manageReviewOrder'"
                    :tableStatus="tableStatus"
                />
                <ManageOrderTable 
                    v-if="tableStatus === 'manageCompleteOrder'"
                    :tableStatus="tableStatus"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
// import {campaign_comment_summarize} from '@/api/user';
import  ManageOrderTable  from "./ManageOrderTable.vue";
import CampaignStatus from "./CampaignStatus.vue";
import SearchBar from "./SearchBar.vue";
import { ref, provide, onMounted } from "vue";
import xlsx from "xlsx";
import { campaign_manage_order } from "@/api/manage_order";
import { allow_checkout, manage_order_list } from "@/api_v2/manage_order"
import { useRoute, useRouter } from "vue-router";
import { useManageOrderStore } from "@/stores/lss-manage-order";
const route = useRoute();
const store = useManageOrderStore()

let page = 1;
let totalPage = 1;
let page_size = 10;
let dataCount = 0;
const deliveryStatus = ref(false);
const checkout_status = route.query.checkout == 1 ? false : true ;
const tableStatus = ref('manageAllOrder')
const show_order = status=>{
  tableStatus.value=status
  console.log(tableStatus.value)
}

function stop_checkout(status){
    allow_checkout(route.params.campaign_id,status).then(
        res=>{
            console.log(res.data)
        }
    )
}

onMounted(()=>{
    search()
    campaign_manage_order(route.params.campaign_id).then(
        res =>{
            store.manageOrder = res.data
            // console.log(res.data)
        }
    )
})
function classification(){
    store.manageReviewOrder,store.manageCompleteOrder = []
    for(data of store.manageAllOrder){
        if(data.status ==='review'){
            store.manageReviewOrder.push(data)
        }else{
            store.manageCompleteOrder.push(data)
        }
    }
}
function search(){
    manage_order_list(route.params.campaign_id).then(
        res => {
			store.manageAllOrder = res.data
            console.log(res.data.length)
            if (res.data.length != 0) {
                dataCount = res.data.length;
                let totalPage = parseInt(res.data.length / page_size);
                totalPage = totalPage == 0 ? 1 : totalPage;
            }
            classification()
		}
    )
}


</script>

<style scoped>
    .modal-content{
        background-color: theme('colors.secondary');
    }
    .dark .modal-content{
        --color-secondary: theme("colors.rgb.blueGray.800");
    }
    .export :hover{
        background-color: #131C34;
        color: #fff;
    }
</style>
