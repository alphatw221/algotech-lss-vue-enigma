<template>
  <div :class="{ hidden: store.openTab !== 2, block: store.openTab === 2 }">
    <div class="grid grid-cols-12 gap-5 intro-y">
      <div class="col-span-12 row-start-2 intro-y lg:row-start-1 lg:col-span-8">
        <h2 class="w-full mr-auto text-xl font-medium">{{$t('shopping_cart.delivery_tab.contact_info')}}</h2>
        <div class="grid grid-cols-12 gap-5 p-0 my-10 mt-3 intro-y lg:p-10">
          <label for="regular-form-2" class="col-span-4 form-label lg:col-span-2 my-auto">
            {{$t('shopping_cart.delivery_tab.first_name')}}</label>
            <div class="col-span-8 lg:col-span-4">
              <input id="regular-form-2" type="text"
                class="col-span-8 form-control lg:col-span-4" placeholder=""
                :class="{ 'border-danger': reciever_validate.shipping_first_name.$error }"
                v-model.trim="reciever_validate.shipping_first_name.$model" @blur="reciever_validate.shipping_first_name.$touch"/>
                <template v-if="reciever_validate.shipping_first_name.$error">
                      <label
                        class="mt-2 text-danger"
                      >
                        {{$t('shopping_cart.delivery_tab.first_err')}}
                      </label>
                  </template>
              </div>
          <label for="regular-form-2" class="col-span-4 form-label lg:col-span-2 my-auto">
            {{$t('shopping_cart.delivery_tab.last_name')}}</label>
            <div class="col-span-8 lg:col-span-4">
              <input id="regular-form-2" type="text"
                class="form-control " placeholder=""
                :class="{ 'border-danger': reciever_validate.shipping_last_name.$error }"
                v-model.trim="reciever_validate.shipping_last_name.$model" />
                <template v-if="reciever_validate.shipping_last_name.$error">
                          <label
                            class="mt-2 text-danger"
                          >
                            {{$t('shopping_cart.delivery_tab.last_err')}}
                          </label>
                  </template>
            </div>
          <label for="regular-form-2" class="col-span-4 form-label lg:col-span-2 my-auto">{{$t('shopping_cart.delivery_tab.email')}}</label>
          <div class="col-span-8 lg:col-span-4">
              <input id="regular-form-2" type="email"
                placeholder="example@gmail.com"
                class="form-control "
                :class="{ 'border-danger': reciever_validate.shipping_email.$error }"
                v-model.trim="reciever_validate.shipping_email.$model" />
              <template v-if="reciever_validate.shipping_email.$error">
                  <label
                    v-for="(error, index) in reciever_validate.shipping_email.$errors"
                  :key="index"
                    class="mt-2 text-danger"
                  >
                    {{$t(`shopping_cart.delivery_tab.`+error.$message)}}
                  </label>
              </template>
          </div>
          
          <label for="regular-form-2" class="col-span-4 form-label lg:col-span-2 my-auto">{{$t('shopping_cart.delivery_tab.phone')}}</label>
          <div class="col-span-8 lg:col-span-4">
          <input id="regular-form-2" type="tel"
            class="form-control " placeholder=""
            :class="{ 'border-danger': reciever_validate.shipping_phone.$error }"
            v-model.trim="reciever_validate.shipping_phone.$model" />
            <template v-if="reciever_validate.shipping_phone.$error">
                  <label
                    class="mt-2 text-danger"
                  >
                    {{$t('shopping_cart.delivery_tab.phone_err')}}
                  </label>
              </template>
          </div>
        </div>

        <div class="flex flex-col items-center mt-8 intro-y sm:flex-row">
          <h2 class="mb-5 mr-auto text-xl font-medium">
            {{$t('shopping_cart.delivery_tab.shipping_info')}}
          </h2>
        </div>

        <TabGroup>
          <TabList class="flex items-center justify-around w-full nav-boxed-tabs grow">
            <Tab class="w-[95%] h-14 border-[#131c34] lg:w-64 flex" tag="button"
              @click="select_shipping_method('delivery')">
              <div class="inline-flex items-center grow place-content-center">
                <TruckIcon class="block mr-3" /><span class="text-sm lg:text-lg">{{$t('shopping_cart.delivery_tab.home_delivery')}}</span>
              </div>
            </Tab>
            <template v-if="store.order.campaign && store.order.campaign.meta_logistic.additional_delivery_options">
                <Tab v-if="store.order.campaign.meta_logistic.additional_delivery_options.length !== 0" class="w-[95%] h-14 border-[#131c34] lg:w-64 flex" tag="button"
                @click="select_shipping_method('pickup')">
                <div class="inline-flex items-center grow place-content-center">
                  <HomeIcon class="block mr-3" /><span class="text-sm lg:text-lg">{{$t('shopping_cart.delivery_tab.self_pickup')}}</span>
                </div>
              </Tab>
            </template>
          </TabList>


          <TabPanels class="mt-5">
            <!-- BEGIN Delivery Panel -->
            <TabPanel class="leading-relaxed">
              <label class="col-span-12 font-medium text-md">{{$t('shopping_cart.delivery_tab.delivery_info')}}</label>
              <div class="grid grid-cols-12">
                <div class="col-span-12 gap-5 p-8 intro-y">
                  <label for="regular-form-2" class="my-2 form-label">{{$t('shopping_cart.delivery_tab.address')}}</label>
                  <div>
                    <input id="regular-form-2" type="text" class="form-control " placeholder=""
                      :class="{ 'border-danger': delivery_validate.shipping_address_1.$error }"
                      v-model.trim="delivery_validate.shipping_address_1.$model" />
                    <template v-if="delivery_validate.shipping_address_1.$error">
                          <label
                            class="mt-2 text-danger"
                          >
                            {{$t('shopping_cart.delivery_tab.address_err')}}
                          </label>
                    </template>
                  </div>
                  <label for="regular-form-2" class="my-2 form-label">{{$t('shopping_cart.delivery_tab.city')}}</label>
                  <div>
                  <input id="regular-form-2" type="text" class="form-control " placeholder=""
                    :class="{ 'border-danger': delivery_validate.shipping_location.$error }"
                    v-model.trim="delivery_validate.shipping_location.$model" />
                  <template v-if="delivery_validate.shipping_location.$error">
                          <label
                            class="mt-2 text-danger"
                          >
                            {{$t('shopping_cart.delivery_tab.city_err')}}
                          </label>
                  </template>
                  </div>
                  <label for="regular-form-2" class="my-2 form-label">{{$t('shopping_cart.delivery_tab.state')}}</label>
                  <div>
                  <input id="regular-form-2" type="text" class="form-control " placeholder=""
                    :class="{ 'border-danger': delivery_validate.shipping_region.$error }"
                    v-model.trim="delivery_validate.shipping_region.$model" />
                    <template v-if="delivery_validate.shipping_region.$error">
                          <label
                            class="mt-2 text-danger"
                          >
                            {{$t('shopping_cart.delivery_tab.state_err')}}
                          </label>
                  </template>
                  </div>
                  <label for="regular-form-2" class="my-2 form-label">{{$t('shopping_cart.delivery_tab.postal_code')}}</label>
                  <div>
                  <input id="regular-form-2" type="text" class="form-control " placeholder=""
                    :class="{ 'border-danger': delivery_validate.shipping_postcode.$error }"
                    v-model.trim="delivery_validate.shipping_postcode.$model" />
                    <template v-if="delivery_validate.shipping_postcode.$error">
                          <label
                            class="mt-2 text-danger"
                          >
                            {{$t('shopping_cart.delivery_tab.postal_code_err')}}
                          </label>
                  </template>
                  </div>
                  
                </div>
                <!-- BEGIN Delivery Option -->
                <label class="col-span-12 font-medium text-md">{{$t('shopping_cart.delivery_tab.option.delivery')}}</label>
                <div class="col-span-12 gap-5 mx-0 intro-y lg:mx-20 2xl:mx-20">
                  <div v-if="store.order.campaign">

                    <div class="flex px-10 py-6 my-4 border-2 rounded-lg form-check">
                      <input :id="'radio-switch-'" class="form-check-input" type="radio"
                        name="vertical_radio_button" :value="null" v-model="shipping_option_index_computed" />
                      <label class="mr-auto form-check-label" :for="'radio-switch-'">{{$t('shopping_cart.delivery_tab.option.default')}}</label>
                      <div>
                        <label class="form-check-label">{{ store.order.campaign.currency }}</label>
                        {{Math.floor(parseFloat(store.order.campaign.meta_logistic.delivery_charge) * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
                        <label class="form-check-label">{{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}</label>
                      </div>
                    </div>

                    <div class="flex px-10 py-6 my-4 border-2 rounded-lg form-check"
                      v-for="(option, index) in store.order.campaign.meta_logistic.additional_delivery_options"
                      :key="index">
                      <input :id="'radio-switch-' + index" class="form-check-input" type="radio"
                        name="vertical_radio_button" :value="index" v-model="shipping_option_index_computed" />
                      <label class="mr-auto form-check-label" :for="'radio-switch-' + index">{{ option.title }}</label>

                      <div v-if="option.type === '+'">
                        <label class="form-check-label">{{ store.order.campaign.currency }}</label>
                        {{Math.floor((parseFloat(option.price) + parseFloat(store.order.campaign.meta_logistic.delivery_charge)) * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
                        <label class="form-check-label">{{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}</label>
                      </div>
                      <div v-else>
                        <label class="form-check-label">{{ store.order.campaign.currency }}</label>
                        {{Math.floor(parseFloat(option.price) * (10 ** store.order.campaign.decimal_places)) / 10 ** store.order.campaign.decimal_places}}
                        <label class="form-check-label">{{store.order.campaign.price_unit?$t(`global.price_unit.${store.order.campaign.price_unit}`):''}}</label>
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
                <label class="col-span-12 font-medium text-md">{{$t('shopping_cart.delivery_tab.option.pickup')}}</label>
                <div class="col-span-12 gap-5 intro-y lg:mx-20 2xl:mx-20">
                  <div v-if="store.order.campaign">
                    <div class="flex px-10 py-6 my-4 border-2 rounded-lg form-check"
                      v-for="(option, index) in store.order.campaign.meta_logistic.pickup_options" :key="index">

                      <input :id="'pickup-switch-' + index" class="form-check-input" type="radio"
                        name="vertical_radio_button" :value="index"
                        v-model="shipping_option_index_computed" />
                      <label class="mr-auto form-check-label" :for="'pickup-switch-' + index">{{ option.name }}</label>


                      <label class="form-check-label" :for="'pickup-switch-' + index">{{
                          option.address
                      }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <!-- END Pickup Panel -->
          </TabPanels>


          <div class="col-span-12 mt-10">
            <div class="font-medium text-md">
              {{$t('shopping_cart.delivery_tab.note')}}
            </div>
            <p id="" class="col-span-12 col-start-1 p-5 form-control" placeholder="" v-if="store.order.campaign">
              {{store.order.campaign.meta_logistic.delivery_note}}
            </p>
          </div>
          

        </TabGroup>


        <div class="col-span-12 mt-10">
          <div class="font-medium text-md">{{$t('shopping_cart.delivery_tab.remark')}}</div>
          <textarea id="" class="col-span-12 col-start-1 form-control indent-4" placeholder=""
            v-model="shipping_info.shipping_remark">
          </textarea>
        </div>

      </div>

      <div class="col-span-12 row-start-1 lg:col-span-4">
        <div class="intro-y">
          <OrderSummary class="m-0 2xl:m-5" />
        </div>

        <div class="col-span-12 mt-5 intro-y box lg:col-span-6">
          <ShoppingCartTableSimple />
        </div>



      </div>
    </div>
    
    <div class="flex my-5">
      <button class="mr-auto rounded-full w-fit btn btn-outline-primary" @click="store.openTab= 1">
        {{$t('shopping_cart.delivery_tab.previous')}}
      </button>

      <button class="w-fit btn btn-rounded-primary" @click="proceed_to_payment">
        {{$t('shopping_cart.delivery_tab.proceed_to_payment')}}
      </button>
    </div>
  </div>
</template>


<script setup>
import OrderSummary from "./OrderSummary.vue";
import ShoppingCartTableSimple from "./ShoppingCartTable-simple.vue";
import { required, minLength, maxLength, email, integer } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import { computed, onMounted, ref, watch, reactive, toRefs } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useRoute, useRouter } from "vue-router";
import { buyer_update_delivery_info, guest_update_delivery_info } from "@/api_v2/pre_order"
import { buyer_retrieve_latest_order_shipping_info } from "@/api_v2/order"
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"
import { useCookies } from 'vue3-cookies'
import i18n from "@/locales/i18n"
const { cookies } = useCookies()
const route = useRoute();
const router = useRouter();

const store = useShoppingCartStore();
const layoutStore = useLSSBuyerLayoutStore();

const shipping_info= ref({
			shipping_option:"",
      shipping_option_index:null,
      shipping_method: "delivery",
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
      pickup_address:"",

      shipping_option_data:{}
		})

const shipping_option_index_computed = computed({
  get:()=>{
    return shipping_info.value.shipping_option_index
  },set:index=>{
    shipping_info.value.shipping_option_index=index
    store.shipping_info.shipping_option_index=index
    shipping_info.value.pickup_address=shipping_info.value.shipping_method=='pickup'?store.order.campaign.meta_logistic.pickup_options[index]?.address : ''

    shipping_info.value.shipping_option=shipping_info.value.shipping_method=='pickup'?store.order.campaign.meta_logistic.pickup_options[index]?.name :shipping_info.value.shipping_method=='delivery' && index!=null ? store.order.campaign.meta_logistic.additional_delivery_options[index].title : ''
    
    if(shipping_info.value.shipping_method=='pickup'){
      shipping_info.value.shipping_option_data = JSON.parse(JSON.stringify(store.order.campaign.meta_logistic.pickup_options[index]))
    }else{
      shipping_info.value.shipping_option_data = JSON.parse(JSON.stringify(store.order.campaign.meta_logistic.additional_delivery_options[index]))
    }

  }})

const shipping_method_computed = computed({
  get:()=>{
    return shipping_info.value.shipping_method
  },set:method=>{
    shipping_info.value.shipping_method=method
    store.shipping_info.shipping_method=method
  }})

const isAnonymousUser=cookies.get("login_with")=='anonymousUser'

onMounted(()=>{
  if(!isAnonymousUser){
    buyer_retrieve_latest_order_shipping_info().then(res=>{
      res.data.shipping_method='delivery'
      res.data.shipping_option=''
      shipping_info.value = res.data
    })
  }
  
})

const select_shipping_method = method => {
  shipping_method_computed.value=method
}



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

    layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_user_info'))
    return
  }

  if(shipping_info.value.shipping_method==='delivery'){

    delivery_validate.value.$touch();
    
     if(shipping_info.value.shipping_option_index === ''){
      layoutStore.alert.showMessageToast('select shipping method')
      return
    }
    else if(delivery_validate.value.$invalid){
      layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_delivery_info'))
      return
    }
  }



  // if (!confirm(i18n.global.t('shopping_cart.checkout_message')))return 

  
  

  const update_delivery_info = isAnonymousUser?guest_update_delivery_info:buyer_update_delivery_info
  update_delivery_info(route.params.pre_order_oid, {shipping_data:shipping_info.value})
  .then(res=>{
    router.push(`/buyer/order/${res.data.oid}/payment`)
  }).catch(error=>{
    if (error.response.data)store.order = error.response.data
    
  })
  
}


</script>

<style scoped>
.homeTab {
  border-radius: 0px !important;
}

.nav-item{
  justify-content: center;
  display: flex !important;
}
</style>