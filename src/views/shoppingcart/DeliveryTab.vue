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
                :class="{ 'border-danger': reciever_validate.shipping_first_name.$error }"
                v-model.trim="reciever_validate.shipping_first_name.$model" @blur="reciever_validate.shipping_first_name.$touch"/>
                <template v-if="reciever_validate.shipping_first_name.$error">
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
                :class="{ 'border-danger': reciever_validate.shipping_last_name.$error }"
                v-model.trim="reciever_validate.shipping_last_name.$model" />
                <template v-if="reciever_validate.shipping_last_name.$error">
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
                :class="{ 'border-danger': reciever_validate.shipping_email.$error }"
                v-model.trim="reciever_validate.shipping_email.$model" />
              <template v-if="reciever_validate.shipping_email.$error">
                  <label
                    v-for="(error, index) in reciever_validate.shipping_email.$errors"
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
            :class="{ 'border-danger': reciever_validate.shipping_phone.$error }"
            v-model.trim="reciever_validate.shipping_phone.$model" />
            <template v-if="reciever_validate.shipping_phone.$error">
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

        <TabGroup >
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
                    :class="{ 'border-danger': delivery_validate.shipping_address_1.$error }"
                    v-model.trim="delivery_validate.shipping_address_1.$model" />
                    <template v-if="delivery_validate.shipping_address_1.$error">
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
                    :class="{ 'border-danger': delivery_validate.shipping_location.$error }"
                    v-model.trim="delivery_validate.shipping_location.$model" />
                  <template v-if="delivery_validate.shipping_location.$error">
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
                    :class="{ 'border-danger': delivery_validate.shipping_region.$error }"
                    v-model.trim="delivery_validate.shipping_region.$model" />
                    <template v-if="delivery_validate.shipping_region.$error">
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
                    :class="{ 'border-danger': delivery_validate.shipping_postcode.$error }"
                    v-model.trim="delivery_validate.shipping_postcode.$model" />
                    <template v-if="delivery_validate.shipping_postcode.$error">
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
                <div class="intro-y col-span-12 gap-5 mx-0 lg:mx-20 2xl:mx-20">
                  <div v-if="'campaign' in store.order">
                    <div class="flex form-check my-4 border-2 px-10 py-6 rounded-lg">
                      <input :id="'radio-switch-'" class="form-check-input" type="radio"
                        name="vertical_radio_button" value="" v-model="shipping_info.shipping_option" />
                      <label class="form-check-label mr-auto" :for="'radio-switch-'">default</label>
                      <div>
                        <label class="form-check-label">{{ store.order.campaign.currency }}</label>
                        {{
                            parseFloat(store.order.campaign.meta_logistic.delivery_charge).toFixed(2)
                        }}
                      </div>
                    </div>
                    <div class="flex form-check my-4 border-2 px-10 py-6 rounded-lg"
                      v-for="(title, index) in store.order.campaign.meta_logistic.additional_delivery_charge_title"
                      :key="index">
                      <input :id="'radio-switch-' + index" class="form-check-input" type="radio"
                        name="vertical_radio_button" :value="title" v-model="shipping_info.shipping_option" />
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
                <div class="intro-y col-span-12 gap-5 lg:mx-20 2xl:mx-20">
                  <div v-if="'campaign' in store.order">
                    <div class="flex form-check my-4 border-2 px-10 py-6 rounded-lg"
                      v-for="(branch_name, index) in store.order.campaign.meta_logistic.branch_name" :key="index">

                      <input :id="'pickup-switch-' + index" class="form-check-input" type="radio"
                        name="vertical_radio_button" :value="branch_name"
                        v-model="shipping_info.shipping_option" />
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
              v-model="shipping_info.shipping_remark">
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
      <button class="w-fit btn btn-outline-primary mr-auto rounded-full" @click="store.openTab= 1">
        Previous
      </button>
      <button class="w-fit btn btn-rounded-primary" @click="proceed_to_payment">
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
import { buyer_retrieve_latest_order_shipping_info } from "@/api_v2/order"
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"

const route = useRoute();
const router = useRouter();

const store = useShoppingCartStore();
const layoutStore = useLSSBuyerLayoutStore();

const shipping_info= ref({
			shipping_option:"",
      shipping_method: "pickup",
      shipping_first_name: "",
      shipping_last_name: "",
      shipping_email: "",
      shipping_phone: "",
      shipping_gender: "",
      shipping_company: "",
      shipping_postcode: "",
      shipping_region: "",
      shipping_location: "",
      shipping_address_1: "",
      shipping_address_2: "",
      shipping_status: "",
      shipping_details: "",
      shipping_remark: "",
      shipping_date: null,
      shipping_time: null,
      pickup_address:""
		})

onMounted(()=>{
  buyer_retrieve_latest_order_shipping_info().then(res=>{
    res.data.shipping_method='delivery'
    res.data.shipping_option=''
    shipping_info.value = res.data
  })
})

const select_shipping_method = method => {
  shipping_info.value.shipping_method = method
}

watch(computed(()=>{return shipping_info.value.shipping_method}),(()=>{
  store.shipping_info.shipping_method = shipping_info.value.shipping_method
}))

watch(computed(()=>{return shipping_info.value.shipping_option}),(()=>{     //this will be removed after seller v2 is ready
  store.shipping_info.shipping_option = shipping_info.value.shipping_option
  if(shipping_info.value.shipping_method=='pickup'){
    const campaign = store.order.campaign||null
    if (!campaign) return
    const meta_logistic = campaign.meta_logistic || null
    if (!meta_logistic) return
    const index = meta_logistic.branch_name.indexOf(store.shipping_info.shipping_option)
    shipping_info.value.pickup_address=meta_logistic.branch_address[index]
  }else{
    shipping_info.value.pickup_address=""
  }
  
}))


const reciever_rules = computed(()=>{
    return{
      shipping_first_name: {required,minLength: minLength(1), maxLength: maxLength(50)},
      shipping_last_name: {required,minLength: minLength(1), maxLength: maxLength(50)},
      shipping_phone: {required,integer,minLength: minLength(1), maxLength: maxLength(50)},
      shipping_email: {required,email, maxLength: maxLength(255)},
  }
});

const delivery_rules = computed(()=>{
  return{
    shipping_address_1: {required,minLength: minLength(1), maxLength: maxLength(255)},
    shipping_location: {required,minLength: minLength(1), maxLength: maxLength(255)},
    shipping_region: {required,minLength: minLength(1), maxLength: maxLength(255)},
    shipping_postcode: {required,integer,minLength: minLength(1), maxLength: maxLength(50)},
  }}
);

const reciever_validate = useVuelidate(reciever_rules, shipping_info);
const delivery_validate = useVuelidate(delivery_rules, shipping_info);



const proceed_to_payment = () =>{

  reciever_validate.value.$touch();
  if (reciever_validate.value.$invalid) {
    layoutStore.alert.showMessageToast("Invild User Infomation Input")
    return
  }
  if(shipping_info.value.shipping_method==='delivery'){
    delivery_validate.value.$touch();
  }
  if(delivery_validate.value.$invalid){
      layoutStore.alert.showMessageToast("Invild Delivery Infomation Input")
      return
  }
  else if (confirm('Are you sure you want to process check out? Your shopping cart will be cleared.')){
    update_delivery_info(route.params.pre_order_id, {shipping_data:shipping_info.value}).then(res=>{
      router.push(`/buyer/order/${res.data.id}/payment`)
    })
  }
}


</script>

<style scoped>
.homeTab {
  border-radius: 0px !important;
}
</style>