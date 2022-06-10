<template>
  <div :class="{ hidden: store.openTab !== 2, block: store.openTab === 2 }">
    <div class="intro-y grid grid-cols-12 gap-5">
      <div class="intro-y col-span-12 row-start-2 lg:row-start-1 2xl:row-start-1 lg:col-span-8">
        <h2 class="text-xl font-medium mr-auto w-full">Contact Information</h2>
        <div class=" p-0 mt-3 intro-y grid grid-cols-12 gap-5 my-10 lg:p-10 2xl:p-10">
          <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">First
            Name</label>
          <input id="regular-form-2" type="text"
            class="form-control form-control-rounded col-span-8 lg:col-span-4 2xl:col-span-4" placeholder=""
            v-model="store.contact_info.shipping_first_name" />
          <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">Last
            Name</label>
          <input id="regular-form-2" type="text"
            class="form-control form-control-rounded col-span-8 lg:col-span-4 2xl:col-span-4" placeholder=""
            v-model="store.contact_info.shipping_last_name" />
          <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">Email</label>
          <input id="regular-form-2" type="text"
            class="form-control form-control-rounded col-span-8 lg:col-span-4 2xl:col-span-4" placeholder=""
            v-model="store.contact_info.shipping_email" />
          <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">Phone</label>
          <input id="regular-form-2" type="text"
            class="form-control form-control-rounded col-span-8 lg:col-span-4 2xl:col-span-4" placeholder=""
            v-model="store.contact_info.shipping_phone" />
        </div>

        <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
          <h2 class="text-xl font-medium mr-auto mb-5">
            Shipping Information
          </h2>
        </div>

        <TabGroup>
          <TabList class="nav-boxed-tabs mx-0 lg:mx-10 2xl:mx-10 flex items-center w-full">
            <Tab class="w-[95%] h-14 border-[#131c34] lg:w-64 2xl:w-64" tag="button"
              @click="select_shipping_method('delivery')">
              <div class="grow inline-flex items-center place-content-center">
                <TruckIcon class="block mr-3" /><span class="text-sm lg:text-lg 2xl:text-lg ">Home Delivery</span>
              </div>
            </Tab>
            <Tab class="w-[95%] h-14 border-[#131c34] lg:w-64 2xl:w-64" tag="button"
              @click="select_shipping_method('pickup')">
              <div class="grow inline-flex items-center place-content-center">
                <HomeIcon class="block mr-3" /><span class="text-sm lg:text-lg 2xl:text-lg">Self Pickup</span>
              </div>
            </Tab>
          </TabList>


          <TabPanels class="mt-5">
            <!-- BEGIN Delivery Panel -->
            <TabPanel class="leading-relaxed">
              <label class="text-md font-medium col-span-12">Delivery Information</label>
              <div class="grid grid-cols-12">
                <div class="box p-8 intro-y col-span-12 gap-5">
                  <label for="regular-form-2" class="form-label my-2">Address</label>
                  <input id="regular-form-2" type="text" class="form-control form-control-rounded" placeholder=""
                    v-model="store.shipping_info.delivery_info.shipping_address_1" />
                  <label for="regular-form-2" class="form-label my-2">City</label>
                  <input id="regular-form-2" type="text" class="form-control form-control-rounded" placeholder=""
                    v-model="store.shipping_info.delivery_info.shipping_location" />
                  <label for="regular-form-2" class="form-label my-2">State</label>
                  <input id="regular-form-2" type="text" class="form-control form-control-rounded" placeholder=""
                    v-model="store.shipping_info.delivery_info.shipping_region" />
                  <label for="regular-form-2" class="form-label my-2">Postal Code</label>
                  <input id="regular-form-2" type="text" class="form-control form-control-rounded" placeholder=""
                    v-model="store.shipping_info.delivery_info.shipping_postcode" />
                </div>
                <!-- BEGIN Delivery Option -->
                <label class="text-md font-medium col-span-12">Delivery Option</label>
                <div class="box p-8 intro-y col-span-12 gap-5 mx-0 lg:mx-20 2xl:mx-20">
                  <div v-if="'campaign' in store.order">
                    <div class="flex form-check my-5"
                      v-for="(title, index) in store.order.campaign.meta_logistic.additional_delivery_charge_title"
                      :key="index">
                      <input :id="'radio-switch-' + index" class="form-check-input" type="radio"
                        name="vertical_radio_button" :value="title" v-model="store.shipping_info.shipping_option" />
                      <label class="form-check-label mr-auto" :for="'radio-switch-' + index">{{ title }}</label>

                      <div v-if="store.order.campaign.meta_logistic.additional_delivery_charge_type[index] === '+'">
                        <label class="form-check-label">{{ store.order.campaign.currency }}</label>
                        {{ (parseFloat(store.order.campaign.meta_logistic.additional_delivery_charge_price[index]) +
                            parseFloat(store.order.campaign.meta_logistic.delivery_charge)).toFixed(2)
                        }}
                      </div>
                      <div v-else>
                        <label class="form-check-label">{{ store.order.campaign.currency }}</label>
                        {{
                            parseFloat(store.order.campaign.meta_logistic.additional_delivery_charge_price[index]).toFixed(2)
                        }}
                      </div>

                    </div>
                  </div>
                </div>
                <!-- END Delivery Option -->
              </div>
            </TabPanel>
            <!-- END Delivery Panel -->



            <!-- BEGIN Pickup Panel -->
            <TabPanel class="leading-relaxed">
              <div class="grid grid-cols-12">
                <label class="text-md font-medium col-span-12">Pickup Option</label>
                <div class="box p-2 intro-y col-span-12 gap-5 mx-0 lg:mx-20 lg:p-8 2xl:mx-20 2xl:p-8">
                  <div v-if="'campaign' in store.order">
                    <div class="flex form-check my-5"
                      v-for="(branch_name, index) in store.order.campaign.meta_logistic.branch_name" :key="index">

                      <input :id="'pickup-switch-' + index" class="form-check-input" type="radio"
                        name="vertical_radio_button" :value="branch_name"
                        v-model="store.shipping_info.shipping_option" />
                      <label class="form-check-label mr-auto" :for="'pickup-switch-' + index">{{ branch_name }}</label>


                      <label class="form-check-label" :for="'pickup-switch-' + index">{{
                          store.order.campaign.meta_logistic.branch_address[index]
                      }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <!-- END Pickup Panel -->
          </TabPanels>
        </TabGroup>

        <div class="col-span-12 mt-5 mx-5">
          <div class="text-md font-medium">
            Delivery and Collect Note
          </div>
          <p id="" class="form-control col-start-1 col-span-12 p-5" placeholder="">
            Delivery will be shipped after Dragon Boat Festval sorry
            for the inconvenience we caused.
          </p>
        </div>
        <div class="col-span-12 mt-5 mx-5">
          <div class="text-md font-medium">Remark</div>
          <textarea id="" class="form-control col-start-1 col-span-12 indent-4" placeholder=""
            v-model="store.shipping_info.shipping_remark">
                Remark remark remark remark</textarea>
        </div>
      </div>

      <div class="col-span-12 row-start-1 lg:col-span-4">
        <div class="intro-y">
          <OrderSummary class="m-0 2xl:m-5" />
        </div>

        <div class="intro-y box col-span-12 lg:col-span-6 mt-5">
          <ShoppingCartTableSimple />
        </div>



      </div>
    </div>
    <div class="my-5 flex justify-end">
      <button class="w-full btn btn-primary lg:w-fit 2xl:lg:w-fit" @click="proceed_to_payment">
        Proceed to Payment
      </button>
    </div>
  </div>
</template>


<script setup>
import OrderSummary from "./OrderSummary.vue";
import ShoppingCartTableSimple from "./ShoppingCartTable-simple.vue";

import { computed, onMounted, ref, watch } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useRoute, useRouter } from "vue-router";
import { update_delivery_info } from "@/api_v2/pre_order"

const route = useRoute();
const router = useRouter();

const store = useShoppingCartStore();

const select_shipping_method = method => {
  store.shipping_info.method = method
}

const proceed_to_payment = () => {


  // if (store.shipping_info.method == 'delivery') {
  //   store.shipping_info.delivery_info = Object.assign(store.shipping_info.delivery_info, store.contact_info)
  //   store.shipping_info.delivery_info.shipping_option = store.shipping_info.shipping_option
  //   store.shipping_info.delivery_info.shipping_remark = store.shipping_info.shipping_remark
  // } else {
  //   store.shipping_info.pickup_info = Object.assign(store.shipping_info.pickup_info, store.contact_info)
  //   store.shipping_info.pickup_info.shipping_option = store.shipping_info.shipping_option
  //   store.shipping_info.pickup_info.shipping_remark = store.shipping_info.shipping_remark
  // }

  const assignData = { shipping_remark: store.shipping_info.shipping_remark }
  const data = {
    method: store.shipping_info.method,
    shipping_option: store.shipping_info.shipping_option,
    pickup_info: Object.assign(Object.assign(store.shipping_info.pickup_info, store.contact_info), assignData),
    delivery_info: Object.assign(Object.assign(store.shipping_info.delivery_info, store.contact_info), assignData)
  }

  update_delivery_info(route.params.pre_order_id, data).then(res => {
    router.push(`/buyer/order/${res.data.id}/payment`)
  })
}


</script>

<style scoped>
.homeTab {
  border-radius: 0px !important;
}
</style>