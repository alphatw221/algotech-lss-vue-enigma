<template>
    <div class="my-5 text-base text-xl sm:text-2xl text-center"> {{$t('order_detail.order')}} </div>
    <div class="w-[100%] mx-2 flex-col flex gap-1">
        <div class="my-auto flex flex-row items-center">
            <h2 class="text-xl font-semibold"> #{{sellerCartStore.cart.id}} 
                <span class="h-8 ml-3 cursor-auto btn btn-rounded-pending text-base" >
                    {{$t('cart.cart')}}
                </span> 
            </h2>

            <button class="btn btn-danger ml-auto mr-5" @click="deleteCart()">{{$t('cart.delete_cart')}}</button>
        </div>
        <div v-if="sellerCartStore.cart.customer_name" class="my-auto">
            <span class="text-base mr-5"> {{ sellerCartStore.cart.customer_name }} {{sellerCartStore.cart.platform ? `/ `+ $t('order_detail.'+ sellerCartStore.cart.platform) : ''}}</span>
        </div>
        
        <div class="flex flex-col sm:flex-row flex-between sm:w-[50%]">
            <div class="my-auto">
                <span class="text-base"> {{$t('order_detail.order_date')}} : {{new Date(sellerCartStore.cart.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}} </span>
            </div>
            <button
                class="ml-auto mr-2 sm:mr-4 btn w-fit btn-outline-primary dark:border-darkmode-400"
                @click="sellerCartStore.showAddItemModal = ! sellerCartStore.showAddItemModal"
            >
                + {{$t('shopping_cart.order_summary.add_item')}}
            </button>
        </div>
    </div>
    <div class="flex flex-col sm:flex-row justify-between gap-3 h-fit sm:max-h-[50vh]"> 

        <!-- OrderDetailTable -->
        <div class="flex-col mt-2 w-[100%] sm:w-1/2"> 
            <CartDetailTable />
        </div>
        <!-- OrderDetailTable -->

        <!-- Price Summary -->
        <div class="w-[100%] sm:w-1/2">
            <CartSummary />
        </div>
        <!-- Price Summary End -->
    </div>


    <AddItemModal/>
</template>

<script setup>
import AddItemModal from "./AddItemModal.vue";
import CartDetailTable from "./CartDetailTable.vue"
import CartSummary from "./CartSummary.vue";
import { computed, onMounted, ref, watch, onUnmounted, getCurrentInstance } from "vue";
// import { seller_list_campaign_product } from "@/api_v2/campaign_product";

import { seller_retrieve_cart, seller_clear_cart } from "@/api_v2/cart"

import { useSellerCartStore } from "@/stores/lss-seller-cart";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useRoute, useRouter } from "vue-router";


const route = useRoute()
const router = useRouter()
const sellerCartStore = useSellerCartStore()

// import { useSellerCartStore } from "@/stores/lss-seller-cart";
// const sellerCartStore = useSellerCartStore()

const layoutStore = useLSSSellerLayoutStore()
const internalInstance = getCurrentInstance()
const eventBus = internalInstance.appContext.config.globalProperties.eventBus



onMounted(()=>{
    seller_retrieve_cart(route.params.cart_id, layoutStore.alert)
    .then(
        res => { sellerCartStore.cart = res.data
            console.log('seller retrive',res.data)
                //  console.log(sellerCartStore.cart) 
                //  show_adjust_price() 
        }
    )
})

const deleteCart = ()=>{
    seller_clear_cart(route.params.cart_id, layoutStore.alert).then(
        res=>{
            sellerCartStore.cart = res.data
        }
    )
}



</script>


<style scoped>
td {  
    width: 100px;
    height: 30px;
    border: 1px solid gray;
}

</style>