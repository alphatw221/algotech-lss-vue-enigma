<template>
  <div class="box p-5 border-2 border-secondary">
    <div>
      <!-- TITLE -->
      <div class="flex mb-4 dark:border-darkmode-400">
        <span class="text-lg">{{$t('order_detail.price_summary.price_summary')}}</span>
      </div>

      <!-- SUBTOTAL -->
      <div class="flex">
        <div class="mr-auto">{{$t('order_detail.price_summary.sub_total')}}</div>
        <div class="font-medium" >
          {{sellerOrderDetail.order?.currency}} 
          {{ (Math.floor(parseFloat(sellerOrderDetail.order.subtotal) * (10 ** sellerOrderDetail.order?.decimal_places)) / 10 ** sellerOrderDetail.order?.decimal_places).toLocaleString('en-GB')}}
          {{sellerOrderDetail.order?.price_unit?$t(`global.price_unit.${sellerOrderDetail.order?.price_unit}`):''}}
        </div>
      </div>



      <!-- DISCOUNT -->
      <div class="flex" >
        <template v-if="sellerOrderDetail.order.discount !=0"> 
          <div class="mr-auto">{{$t('shopping_cart.order_summary.promo_discount')}} <span class="text-danger">{{sellerOrderDetail.order.applied_discount?.code ? (sellerOrderDetail.order.applied_discount.code) : '' }}</span></div>
          <div class="font-medium"> 
            {{sellerOrderDetail.order?.currency}}
            -{{(Math.floor(parseFloat(sellerOrderDetail.order.discount) * (10 ** sellerOrderDetail.order?.decimal_places)) / 10 ** sellerOrderDetail.order?.decimal_places).toLocaleString('en-GB')}}
            {{sellerOrderDetail.order?.price_unit?$t(`global.price_unit.${sellerOrderDetail.order?.price_unit}`):''}}
          </div>
        </template>
      </div>


      <!-- POINT DISCOUNT -->
      <div v-if="sellerOrderDetail.order?.point_discount!=0" class="flex flex-row justify-between mt-2" >
        <label class="w-fit my-auto whitespace-nowrap">{{$t('shopping_cart.order_summary.point_discount')}}</label>
        <span class="font-medium text-danger"> 
          {{sellerOrderDetail.order?.currency}} 
          -{{(Math.floor(parseFloat(sellerOrderDetail.order?.point_discount) * (10 ** sellerOrderDetail.order?.decimal_places)) / 10 ** sellerOrderDetail.order?.decimal_places).toLocaleString('en-GB')}}
          {{sellerOrderDetail.order?.price_unit?$t(`global.price_unit.${sellerOrderDetail.order?.price_unit}`):''}}
        </span>
      </div>


      <!-- SUBTOTAL_AFTER_DISCOUNT -->
      <div class="flex" v-if="sellerOrderDetail.order.discount !=0 || sellerOrderDetail.order?.point_discount!=0">
        <!-- <div class="mr-auto">{{$t('order_detail.price_summary.sub_total')}}</div> -->
        <div class="mr-auto">{{$t('order.subtotal_after_discount')}}</div>
        <div class="font-medium" >
          {{sellerOrderDetail.order?.currency}} 
          {{ (Math.floor(parseFloat(Math.max(sellerOrderDetail.order.subtotal-sellerOrderDetail.order.discount-sellerOrderDetail.order.point_discount,0)) * (10 ** sellerOrderDetail.order?.decimal_places)) / 10 ** sellerOrderDetail.order?.decimal_places).toLocaleString('en-GB')}}
          {{sellerOrderDetail.order?.price_unit?$t(`global.price_unit.${sellerOrderDetail.order?.price_unit}`):''}}
        </div>
      </div>



      <!-- SHIPPING -->
      <div class="flex">
        <div class="mr-auto">
          {{$t('order_detail.price_summary.shipping')}}
          <span class="text-red-500" v-if="sellerOrderDetail.order.free_delivery || sellerOrderDetail.order?.meta?.subtotal_over_free_delivery_threshold || sellerOrderDetail.order?.meta?.items_over_free_delivery_threshold">
            ({{$t('order_detail.price_summary.apply_free_delivery')}})
          </span>
        </div>

        <div class="font-medium" v-if="sellerOrderDetail.order.free_delivery || sellerOrderDetail.order?.meta?.subtotal_over_free_delivery_threshold || sellerOrderDetail.order?.meta?.items_over_free_delivery_threshold">
          {{sellerOrderDetail.order?.currency}} 
          {{ (Math.floor(parseFloat(0) * (10 ** sellerOrderDetail.order?.decimal_places)) / 10 ** sellerOrderDetail.order?.decimal_places).toLocaleString('en-GB')}}
          {{sellerOrderDetail.order?.price_unit?$t(`global.price_unit.${sellerOrderDetail.order?.price_unit}`):''}}
        </div>

        <div class="font-medium" v-else>
          {{sellerOrderDetail.order?.currency}} 
          {{ (Math.floor(parseFloat(sellerOrderDetail.order.shipping_cost) * (10 ** sellerOrderDetail.order?.decimal_places)) / 10 ** sellerOrderDetail.order?.decimal_places).toLocaleString('en-GB')}}
          {{sellerOrderDetail.order?.price_unit?$t(`global.price_unit.${sellerOrderDetail.order?.price_unit}`):''}}
        </div>
        
      </div>

      


      

      <!-- ADJUST_PRICE -->
      <template v-if="sellerOrderDetail.order.adjust_price">
        <div class="flex">
            <div class="mr-auto">{{sellerOrderDetail.order.adjust_title}}</div>
            <div class="font-medium" >
              {{sellerOrderDetail.order?.currency}}
              {{Math.floor(parseFloat(sellerOrderDetail.order.adjust_price) * (10 ** sellerOrderDetail.order?.decimal_places)) / 10 ** sellerOrderDetail.order?.decimal_places }}
              <!-- {{sellerOrderDetail.modify_status == '-' ? '-' + Math.floor(parseFloat(sellerOrderDetail.order.adjust_price) * (10 ** sellerOrderDetail.order?.decimal_places)) / 10 ** sellerOrderDetail.order?.decimal_places : Math.floor(parseFloat(sellerOrderDetail.order.adjust_price) * (10 ** sellerOrderDetail.order?.decimal_places)) / 10 ** sellerOrderDetail.order?.decimal_places}} -->
              {{sellerOrderDetail.order?.price_unit?$t(`global.price_unit.${sellerOrderDetail.order?.price_unit}`):''}}
            </div>
            <!-- <XIcon class="w-5 h-5 text-slate-400 cursor-pointer" @click="cleanAdjust()"/> -->
        </div>
      </template>


      

      <!-- TAX -->
      <div class="flex" v-if="sellerOrderDetail.order.tax">
        <div class="mr-auto">{{$t('order_detail.price_summary.tax')}}</div>
        <div class="font-medium"> 
          {{sellerOrderDetail.order?.currency}}
          {{(Math.floor(parseFloat(sellerOrderDetail.order.tax) * (10 ** sellerOrderDetail.order?.decimal_places)) / 10 ** sellerOrderDetail.order?.decimal_places).toLocaleString('en-GB')}}
          {{sellerOrderDetail.order?.price_unit?$t(`global.price_unit.${sellerOrderDetail.order?.price_unit}`):''}}
        </div>
      </div>

      <!-- TOTAL -->
      <div
        class="
          flex
          mt-4
          pt-4
          border-t border-slate-200/60
          dark:border-darkmode-400
        "
      >
        <div class="mr-auto font-medium text-base">{{$t('order_detail.price_summary.total')}}</div>
        <div class="font-medium text-base" >
          {{sellerOrderDetail.order?.currency}} 
          {{(Math.floor(parseFloat(sellerOrderDetail.order.total) * (10 ** sellerOrderDetail.order?.decimal_places)) / 10 ** sellerOrderDetail.order?.decimal_places).toLocaleString('en-GB')}}
          {{sellerOrderDetail.order?.price_unit?$t(`global.price_unit.${sellerOrderDetail.order?.price_unit}`):''}}
        </div>
      </div>

    </div>
  </div>
    
</template>
<script setup>
import { useSellerOrderStore } from "@/stores/lss-seller-order";

import { useRoute, useRouter } from "vue-router";
import {ref, watch, computed, onMounted} from "vue";
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";

const campaignDetailStore = useCampaignDetailStore();
const sellerOrderDetail = useSellerOrderStore();
const route = useRoute();
const router = useRouter();
const sellerStore = useLSSSellerLayoutStore()

</script>
