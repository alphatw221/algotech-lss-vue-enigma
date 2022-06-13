<template>
  <div :class="{ hidden: store.openTab !== 2, block: store.openTab === 2 }">
    <div class="intro-y grid grid-cols-12 gap-5">
      <div class="intro-y col-span-12 row-start-2 lg:row-start-1 2xl:row-start-1 lg:col-span-8">
        <h2 class="text-xl font-medium mr-auto w-full">Contact Information</h2>
        <div class=" p-0 mt-3 intro-y grid grid-cols-12 gap-5 my-10 lg:p-10 2xl:p-10">
          <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">First
            Name</label>
            <div class="col-span-8 lg:col-span-4 2xl:col-span-4">
              <input id="regular-form-2" type="text"
                class="form-control form-control-rounded col-span-8 lg:col-span-4 2xl:col-span-4" placeholder=""
                :class="{ 'border-danger': validate.first_name.$error }"
                v-model.trim="validate.first_name.$model" />
                <template v-if="validate.first_name.$error">
                      <label
                        class="text-danger mt-2"
                      >
                        Please enter First Name
                      </label>
                  </template>
              </div>
          <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">Last
            Name</label>
            <div class="col-span-8 lg:col-span-4 2xl:col-span-4">
              <input id="regular-form-2" type="text"
                class="form-control form-control-rounded " placeholder=""
                :class="{ 'border-danger': validate.last_name.$error }"
                v-model.trim="validate.last_name.$model" />
                <template v-if="validate.last_name.$error">
                          <label
                            class="text-danger mt-2"
                          >
                            Please enter Last Name
                          </label>
                  </template>
            </div>
          <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">Email</label>
          <div class="col-span-8 lg:col-span-4 2xl:col-span-4">
              <input id="regular-form-2" type="email"
                placeholder="example@gmail.com"
                class="form-control form-control-rounded"
                :class="{ 'border-danger': validate.email.$error }"
                v-model.trim="validate.email.$model" />
              <template v-if="validate.email.$error">
                  <label
                    v-for="(error, index) in validate.email.$errors"
                  :key="index"
                    class="text-danger mt-2"
                  >
                    {{ error.$message }}
                  </label>
              </template>
          </div>
          
          <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">Phone</label>
          <div class="col-span-8 lg:col-span-4 2xl:col-span-4">
          <input id="regular-form-2" type="tel"
            class="form-control form-control-rounded " placeholder=""
            :class="{ 'border-danger': validate.phone.$error }"
            v-model.trim="validate.phone.$model" />
            <template v-if="validate.phone.$error">
                  <label
                    class="text-danger mt-2"
                  >
                    Phone number is required
                  </label>
              </template>
          </div>
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
                <div class="p-8 intro-y col-span-12 gap-5">
                  <label for="regular-form-2" class="form-label my-2">Address</label>
                  <div>
                  <input id="regular-form-2" type="text" class="form-control form-control-rounded" placeholder=""
                    :class="{ 'border-danger': delivery_validate.address.$error }"
                    v-model.trim="delivery_validate.address.$model" />
                    <template v-if="delivery_validate.address.$error">
                          <label
                            class="text-danger mt-2"
                          >
                            Please enter Address
                          </label>
                  </template>
                  </div>
                  <label for="regular-form-2" class="form-label my-2">City</label>
                  <div>
                  <input id="regular-form-2" type="text" class="form-control form-control-rounded" placeholder=""
                    :class="{ 'border-danger': delivery_validate.city.$error }"
                    v-model.trim="delivery_validate.city.$model" />
                  <template v-if="delivery_validate.city.$error">
                          <label
                            class="text-danger mt-2"
                          >
                            Please enter City
                          </label>
                  </template>
                  </div>
                  <label for="regular-form-2" class="form-label my-2">State</label>
                  <div>
                  <input id="regular-form-2" type="text" class="form-control form-control-rounded" placeholder=""
                    :class="{ 'border-danger': delivery_validate.state.$error }"
                    v-model.trim="delivery_validate.state.$model" />
                    <template v-if="delivery_validate.state.$error">
                          <label
                            class="text-danger mt-2"
                          >
                            Please enter State
                          </label>
                  </template>
                  </div>
                  <label for="regular-form-2" class="form-label my-2">Postal Code</label>
                  <div>
                  <input id="regular-form-2" type="text" class="form-control form-control-rounded" placeholder=""
                    :class="{ 'border-danger': delivery_validate.postal_code.$error }"
                    v-model.trim="delivery_validate.postal_code.$model" />
                    <template v-if="delivery_validate.postal_code.$error">
                          <label
                            class="text-danger mt-2"
                          >
                            Please enter Postal Code
                          </label>
                  </template>
                  </div>
                  
                </div>
                <!-- BEGIN Delivery Option -->
                <label class="text-md font-medium col-span-12">Delivery Option</label>
                <div class="p-8 intro-y col-span-12 gap-5 mx-0 lg:mx-20 2xl:mx-20">
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
                <div class="p-2 intro-y col-span-12 gap-5 mx-0 lg:mx-20 lg:p-8 2xl:mx-20 2xl:p-8">
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
          <div class="col-span-12 mt-10">
            <div class="text-md font-medium">
              Delivery and Collect Note
            </div>
            <p id="" class="form-control col-start-1 col-span-12 p-5" placeholder="" v-if="'campaign' in store.order">
              {{store.order.campaign.meta_logistic.delivery_note}}
            </p>
          </div>
          <div class="col-span-12 mt-10">
            <div class="text-md font-medium">Remark</div>
            <textarea id="" class="form-control col-start-1 col-span-12 indent-4" placeholder=""
              v-model="store.shipping_info.shipping_remark">
                Remark remark remark remark</textarea>
          </div>
        </TabGroup>
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
    <div class="my-5 flex">
      <button class="w-full btn btn-outline-primary mr-auto lg:w-fit 2xl:lg:w-fit" @click="store.openTab= 1">
        Previous
      </button>
      <button class="w-full btn btn-primary lg:w-fit 2xl:lg:w-fit" @click="test">
        Proceed to Payment
      </button>
    </div>
  </div>
</template>


<script setup>
import OrderSummary from "./OrderSummary.vue";
import ShoppingCartTableSimple from "./ShoppingCartTable-simple.vue";
import {
  required,
  minLength,
  maxLength,
  email,
integer,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import { computed, onMounted, ref, watch, reactive, toRefs } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useRoute, useRouter } from "vue-router";
import { update_delivery_info } from "@/api_v2/pre_order"
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"

const route = useRoute();
const router = useRouter();

const store = useShoppingCartStore();
const layoutStore = useLSSBuyerLayoutStore();

const select_shipping_method = method => {
  store.shipping_info.method = method
}

const formData = reactive({
  first_name:"",
  last_name:"",
  phone:"",
  email: "",
});
const delivery_info = reactive({
  address:"",
  city:"",
  state:"",
  postal_code: "",
});
const rules = {
  first_name: {required,minLength: minLength(1)},
  last_name: {required,minLength: minLength(1)},
  phone: {required,integer,minLength: minLength(1)},
  email: {required,email,},
};
const delivery_rules ={
  address: {required,minLength: minLength(1)},
  city: {required,minLength: minLength(1)},
  state: {required,minLength: minLength(1)},
  postal_code: {required,integer,minLength: minLength(1)},
}

const validate = useVuelidate(rules, toRefs(formData));
const delivery_validate = useVuelidate(delivery_rules, toRefs(delivery_info));

const proceed_to_payment = ()=> {
   store.contact_info.shipping_first_name = formData.first_name
   store.contact_info.shipping_last_name = formData.last_name
   store.contact_info.shipping_phone = formData.phone
   store.contact_info.shipping_email = formData.email

   store.shipping_info.delivery_info.shipping_address_1 = delivery_validate.address
   store.shipping_info.delivery_info.shipping_location = delivery_validate.city
   store.shipping_info.delivery_info.shipping_region = delivery_validate.state
   store.shipping_info.delivery_info.shipping_postcode = delivery_validate.postal_code


  // if (store.shipping_info.method == 'delivery') {
  //   store.shipping_info.delivery_info = Object.assign(store.shipping_info.delivery_info, store.contact_info)
  //   store.shipping_info.delivery_info.shipping_option = store.shipping_info.shipping_option
  //   store.shipping_info.delivery_info.shipping_remark = store.shipping_info.shipping_remark
  // } else {
  //   store.shipping_info.pickup_info = Object.assign(store.shipping_info.pickup_info, store.contact_info)
  //   store.shipping_info.pickup_info.shipping_option = store.shipping_info.shipping_option
  //   store.shipping_info.pickup_info.shipping_remark = store.shipping_info.shipping_remark
  // }

  const assignData={shipping_remark:store.shipping_info.shipping_remark}
  const data ={
    method:store.shipping_info.method,
    shipping_option:store.shipping_info.shipping_option,
    pickup_info:Object.assign(Object.assign(store.shipping_info.pickup_info, store.contact_info),assignData),
    delivery_info:Object.assign(Object.assign(store.shipping_info.delivery_info, store.contact_info),assignData)
    }
  update_delivery_info(route.params.pre_order_id, data).then(res=>{
    router.push(`/buyer/order/${res.data.id}/payment`)
  })
}

const test = () =>{
  validate.value.$touch();
  delivery_validate.value.$touch();
  if (validate.value.$invalid) {
    console.log('1')
    layoutStore.alert.showMessageToast("Invild User Infomation Input")
    return
  }
  else if (delivery_validate.value.$invalid && store.shipping_info.method === 'delivery'){
    console.log(store.shipping_info.method)
    layoutStore.alert.showMessageToast("Invild Delivery Infomation Input")
    return
  }
  
  else if (confirm('Are you sure you want to process check out? Your shopping cart will be cleared.')){
    proceed_to_payment()
  }
}


</script>

<style scoped>
.homeTab {
  border-radius: 0px !important;
}
</style>