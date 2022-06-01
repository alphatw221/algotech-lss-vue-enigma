<template>
    <div :class="{ hidden: store.openTab !== 2, block: store.openTab === 2 }">
              <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
                <h2 class="text-xl font-medium mr-auto">Contact Information</h2>
              </div>
              <div class="intro-y grid grid-cols-12 gap-5">
                <div class="intro-y col-span-12 lg:col-span-8">
                  <div class="box p-10 mt-3 intro-y grid grid-cols-12 gap-5 my-10">
                    <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">First
                      Name</label>
                    <input id="regular-form-2" type="text"
                      class="form-control form-control-rounded col-span-8 lg:col-span-4 2xl:col-span-4"
                      placeholder="" 
                      v-model="store.delivery_info.shipping_first_name"/>
                    <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">Last
                      Name</label>
                    <input id="regular-form-2" type="text"
                      class="form-control form-control-rounded col-span-8 lg:col-span-4 2xl:col-span-4"
                      placeholder=""
                      v-model="store.delivery_info.shipping_last_name" />
                    <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">Email</label>
                    <input id="regular-form-2" type="text"
                      class="form-control form-control-rounded col-span-8 lg:col-span-4 2xl:col-span-4"
                      placeholder=""
                      v-model="store.delivery_info.shipping_email" />
                    <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">Phone</label>
                    <input id="regular-form-2" type="text"
                      class="form-control form-control-rounded col-span-8 lg:col-span-4 2xl:col-span-4"
                      placeholder=""
                      v-model="store.delivery_info.shipping_phone" />
                  </div>

                  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
                    <h2 class="text-xl font-medium mr-auto mb-5">
                      Shipping Information
                    </h2>
                  </div>

                  <TabGroup>
                    <TabList class="nav-boxed-tabs mx-10">
                      <Tab class="w-48 py-6 lg:w-60 2xl:w-60 xl:py-10 2xl:py-10 inline-flex border-[#131c34]"
                        tag="button" @click="delivery_method('delivery')">
                        <TruckIcon class="block mr-3" /><span class="text-lg">Delivery</span>
                      </Tab>
                      <Tab class="w-48 py-3 lg:w-60 2xl:w-60 xl:py-10 2xl:py-10 inline-flex border-[#131c34]"
                        tag="button" @click="delivery_method('pickup')">
                        <HomeIcon class="block mr-3" /><span class="text-lg">Collect In Store</span>
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
                            <!-- {{ store.preOrder.campaign.meta_logistic }} -->
                            <div v-if="'campaign' in store.preOrder && store.preOrder.campaign!=undefined">
                              <div v-if="'meta_logistic' in store.preOrder.campaign && store.preOrder.campaign.meta_logistic!=undefined">
                                <div class="flex form-check my-5" v-for="(item,index) in store.preOrder.cmapaign.meta_logistic.additional_delivery_charge_title" :key="index">
                                  <template>
                                    <input id="radio-switch-1" class="form-check-input" type="radio"
                                      name="vertical_radio_button" value="vertical-radio-chris-evans" />
                                    <label class="form-check-label mr-auto" for="radio-switch-1">{{ item }}</label>
                                    <label class="form-check-label" for="radio-switch-1">USD $10</label>
                                  </template>
                                </div>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel class="leading-relaxed">
                        <div class="grid grid-cols-12">
                          <label class="text-md font-medium col-span-12">Pickup Option</label>
                          <div class="box p-2 intro-y col-span-12 gap-5 mx-0 lg:mx-20 lg:p-8 2xl:mx-20 2xl:p-8">
                            <div class="flex form-check my-5">
                              <input id="radio-switch-1" class="form-check-input" type="radio"
                                name="vertical_radio_button" value="vertical-radio-store-1" />
                              <label class="form-check-label mr-auto" for="radio-switch-1">Store 1</label>
                              <label class="form-check-label" for="radio-switch-1">Add 1, Stress 1, City 1 , State 1 10654</label>
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
                      <textarea id="" class="form-control col-start-1 col-span-12" placeholder="" v-model="store.delivery_info.shipping_remark">
                                  Remark remark remark remark</textarea>
                    </div>
                  </TabGroup>
                </div>

                <div class="col-span-12 lg:col-span-4">
                  <div class="intro-y">
                    <OrderSummary />
                  </div>
                  <div class="intro-y box col-span-12 lg:col-span-6 mt-5">
                    <div
                      class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                      <h2 class="font-medium text-base mr-auto">
                        My Cart (4 Items)
                      </h2>
                      <button class="border-none hidden sm:flex underline">
                        Edit
                      </button>
                    </div>
                    <div class="p-5">
                      <div class="relative flex items-center">
                        <div class="w-12 h-12 flex-none image-fit">
                          <img alt="" class="rounded-md" :src="$f()[0].photos[0]" />
                        </div>
                        <div class="ml-4 mr-auto">
                          <a href="" class="font-medium">Product 1</a>
                          <div class="text-slate-500 mr-5 sm:mr-5">
                            Description 123
                          </div>
                        </div>
                        <div class="font-medium text-slate-600 dark:text-slate-500">
                          USD25.99
                        </div>
                      </div>
                      <div class="relative flex items-center mt-5">
                        <div class="w-12 h-12 flex-none image-fit">
                          <img alt="" class="rounded-md" :src="$f()[1].photos[0]" />
                        </div>
                        <div class="ml-4 mr-auto">
                          <a href="" class="font-medium">Product 2</a>
                          <div class="text-slate-500 mr-5 sm:mr-5">
                            Description 123
                          </div>
                        </div>
                        <div class="font-medium text-slate-600 dark:text-slate-500">
                          USD25.99
                        </div>
                      </div>
                      <div class="relative flex items-center mt-5">
                        <div class="w-12 h-12 flex-none image-fit">
                          <img alt="" class="rounded-md" :src="$f()[2].photos[0]" />
                        </div>
                        <div class="ml-4 mr-auto">
                          <a href="" class="font-medium">Product 3</a>
                          <div class="text-slate-500 mr-5 sm:mr-5">
                            Product 3
                          </div>
                        </div>
                        <div class="font-medium text-slate-600 dark:text-slate-500">
                          USD21
                        </div>
                      </div>
                      <div class="relative flex items-center mt-5">
                        <div class="w-12 h-12 flex-none image-fit">
                          <img alt="" class="rounded-md" :src="$f()[2].photos[0]" />
                        </div>
                        <div class="ml-4 mr-auto">
                          <a href="" class="font-medium">Product 4</a>
                          <div class="text-slate-500 mr-5 sm:mr-5">
                            Product 3
                          </div>
                        </div>
                        <div class="font-medium text-slate-600 dark:text-slate-500">
                          USD21
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="my-5 flex justify-end">
                <button class="w-full btn btn-primary lg:w-fit 2xl:lg:w-fit"
                  @click="this.$router.push('/shopping-payment')">
                  Proceed to Payment
                </button>
              </div>
            </div>
</template>
<script setup>
import OrderSummary from "@/components/box/OrderSummary.vue";

import { computed, onMounted, ref, watch } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";

import { useRoute, useRouter } from "vue-router";
import { method } from "lodash";
const route = useRoute();
const router = useRouter();

const store = useShoppingCartStore(); 

function delivery_method(method) {
  store.delivery_info.shipping_method = method
  console.log(store.delivery_info.shipping_method)
  console.log(store.preOrder)
}


onMounted(()=>{
})
</script>