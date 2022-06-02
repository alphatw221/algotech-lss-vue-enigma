<template>
    <div :class="{ hidden: store.openTab !== 2, block: store.openTab === 2 }">
              <div class="intro-y grid grid-cols-12 gap-5">
                <div class="intro-y col-span-12 row-start-2 lg:row-start-1 2xl:row-start-1 lg:col-span-8">
                  <h2 class="text-xl font-medium mr-auto w-full">Contact Information</h2>
                  <div class=" p-0 mt-3 intro-y grid grid-cols-12 gap-5 my-10 lg:p-10 2xl:p-10">
                    <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">First
                      Name</label>
                    <input id="regular-form-2" type="text"
                      class="form-control form-control-rounded col-span-8 lg:col-span-4 2xl:col-span-4"
                      placeholder="" 
                      v-model="store.delivery_info.first_name"/>
                    <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">Last
                      Name</label>
                    <input id="regular-form-2" type="text"
                      class="form-control form-control-rounded col-span-8 lg:col-span-4 2xl:col-span-4"
                      placeholder=""
                      v-model="store.delivery_info.last_name" />
                    <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">Email</label>
                    <input id="regular-form-2" type="text"
                      class="form-control form-control-rounded col-span-8 lg:col-span-4 2xl:col-span-4"
                      placeholder=""
                      v-model="store.delivery_info.email" />
                    <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">Phone</label>
                    <input id="regular-form-2" type="text"
                      class="form-control form-control-rounded col-span-8 lg:col-span-4 2xl:col-span-4"
                      placeholder=""
                      v-model="store.delivery_info.phone" />
                  </div>

                  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
                    <h2 class="text-xl font-medium mr-auto mb-5">
                      Shipping Information
                    </h2>
                  </div>

                  <TabGroup>
                    <TabList class="nav-boxed-tabs mx-0 lg:mx-10 2xl:mx-10 flex">
                      <Tab class="flex-1 shrink inline-flex w-max-44 py-6 lg:w-60 2xl:w-60 xl:py-10 2xl:py-10 border-[#131c34]"
                        tag="button" @click="delivery_method('delivery')">
                        <TruckIcon class="block mr-3" /><span class="text-sm lg:text-lg 2xl:text-lg">Delivery</span>
                      </Tab>
                      <Tab class="flex-1 shrink inline-flex w-max-44 py-6 lg:w-60 lg:py-6 2xl:w-60 xl:py-10 2xl:py-10 border-[#131c34]"
                        tag="button" @click="delivery_method('pickup')">
                        <HomeIcon class="block mr-3" /><span class="text-sm lg:text-lg 2xl:text-lg">Collect In Store</span>
                      </Tab>
                    </TabList>
                    <TabPanels class="mt-5">
                      <TabPanel class="leading-relaxed">
                        <label class="text-md font-medium col-span-12">Delivery Information</label>
                        <div class="grid grid-cols-12">
                          <div class="box p-8 intro-y col-span-12 gap-5">
                            <label for="regular-form-2" class="form-label my-2">Address</label>
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded"
                              placeholder=""  v-model="store.delivery_info.delivery_info.shipping_address_1" />
                            <label for="regular-form-2" class="form-label my-2">City</label>
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded"
                              placeholder=""  v-model="store.delivery_info.delivery_info.shipping_location" />
                            <label for="regular-form-2" class="form-label my-2">State</label>
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded"
                              placeholder="" v-model="store.delivery_info.delivery_info.shipping_region" />
                            <label for="regular-form-2" class="form-label my-2">Postal Code</label>
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded"
                              placeholder="" v-model="store.delivery_info.delivery_info.shipping_postcode" />
                          </div>
                          <!-- Delivery Option -->
                          <label class="text-md font-medium col-span-12">Delivery Option</label>
                          <div class="box p-8 intro-y col-span-12 gap-5 mx-0 lg:mx-20 2xl:mx-20">
                            <!-- {{ store.order.campaign.meta_logistic }} -->
                            <div v-if="'campaign' in store.order">
                                <div class="flex form-check my-5" v-for="(item,index) in store.order.campaign.meta_logistic.additional_delivery_charge_title" :key="index">
                                  <input :id="'radio-switch-'+index" class="form-check-input" type="radio"
                                    name="vertical_radio_button" value="vertical-radio-chris-evans" @click="info(item)"/>
                                  <label class="form-check-label mr-auto" :for="'radio-switch-'+index">{{ item }}</label>
                                  <label class="form-check-label">{{store.order.campaign.currency}} {{store.order.campaign.meta_logistic.additional_delivery_charge_price[index]}}</label>
                                </div>
                            </div>
                            
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel class="leading-relaxed">
                        <div class="grid grid-cols-12">
                          <label class="text-md font-medium col-span-12">Pickup Option</label>
                          <div class="box p-2 intro-y col-span-12 gap-5 mx-0 lg:mx-20 lg:p-8 2xl:mx-20 2xl:p-8">
                            <div v-if="'campaign' in store.order">
                              <div class="flex form-check my-5" v-for="(item,index) in store.order.campaign.meta_logistic.branch_name" :key="index">
                                <input :id="'pickup-switch-'+index" class="form-check-input" type="radio"
                                  name="vertical_radio_button" value="vertical-radio-store-1" @click="info(item)"/>
                                <label class="form-check-label mr-auto" :for="'pickup-switch-'+index">{{ item }}</label>
                                <label class="form-check-label" :for="'pickup-switch-'+index">{{ store.order.campaign.meta_logistic.branch_address[index] }}</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                    </TabPanels>
                    <div class="col-span-12 mt-10">
                      <div class="text-md font-medium">
                        Delivery and Collect Note
                      </div>
                      <p id="" class="form-control col-start-1 col-span-12 p-5" placeholder="">
                        Delivery will be shipped after Dragon Boat Festval sorry
                        for the inconvenience we caused.
                      </p>
                    </div>
                    <div class="col-span-12 mt-10">
                      <div class="text-md font-medium">Remark</div>
                      <textarea id="" class="form-control col-start-1 col-span-12" placeholder="" v-model="store.delivery_info.remark">
                                  Remark remark remark remark</textarea>
                    </div>
                  </TabGroup>
                </div>

                <div class="col-span-12 row-start-1 lg:col-span-4">
                  <div class="intro-y">
                    <OrderSummary />
                  </div>

                  <div class="intro-y box col-span-12 lg:col-span-6 mt-5">
                    <ShoppingCartTableSimple/>
                  </div>



                </div>
              </div>
              <div class="my-5 flex justify-end">
                <button class="w-full btn btn-primary lg:w-fit 2xl:lg:w-fit"
                  @click="to_payment">
                  Proceed to Payment
                </button>
              </div>
            </div>
</template>
<script setup>
import OrderSummary from "@/components/box/OrderSummary.vue";
import ShoppingCartTableSimple from "@/components/table/ShoppingCartTable-simple.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";

import { useRoute, useRouter } from "vue-router";
import { method } from "lodash";
import { update_delivery_info } from "@/api_v2/pre_order"
const route = useRoute();
const router = useRouter();

const store = useShoppingCartStore(); 

function delivery_method(method) {
  store.delivery_info.method = method
}
const info = (title) => {
	if(store.delivery_info.method == 'delivery'){
    store.delivery_info.delivery_info.shipping_option = title
    store.delivery_info.pickup_info.shipping_option = ""
  }else{
    store.delivery_info.pickup_info.shipping_option = title
    store.delivery_info.delivery_info.shipping_option = ""
  }
}
const delivery_data = () =>{
  if(store.delivery_info.method == 'delivery'){
    store.delivery_info.delivery_info.shipping_first_name = store.delivery_info.first_name
    store.delivery_info.delivery_info.shipping_last_name = store.delivery_info.last_name
    store.delivery_info.delivery_info.shipping_email = store.delivery_info.email
    store.delivery_info.delivery_info.shipping_phone = store.delivery_info.phone
    store.delivery_info.delivery_info.shipping_remark = store.delivery_info.remark
  }else{
    store.delivery_info.pickup_info.shipping_first_name = store.delivery_info.first_name
    store.delivery_info.pickup_info.shipping_last_name = store.delivery_info.last_name
    store.delivery_info.pickup_info.shipping_email = store.delivery_info.email
    store.delivery_info.pickup_info.shipping_phone = store.delivery_info.phone
    store.delivery_info.pickup_info.shipping_remark = store.delivery_info.remark
  }
}
const to_payment = () => {
  
  delivery_data()
  update_delivery_info(route.params.pre_order_id, store.delivery_info)
  .then(
        res => {
          console.log(res.data)
        }
    )
}


onMounted(()=>{
})
</script>