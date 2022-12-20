<template>
  <div :class="{ hidden: shoppingCartStore.openTab !== 2, block: shoppingCartStore.openTab === 2 }">
    <div class="grid grid-cols-12 gap-5 intro-y">
      <div class="col-span-12 row-start-2 intro-y lg:row-start-1 lg:col-span-8">
        

        <h2 class="my-5 mr-auto text-xl font-medium">
          {{$t('shopping_cart.delivery_tab.shipping_info')}}
        </h2>

        <TabGroup>
          <TabList class="flex items-center justify-around w-full nav-boxed-tabs grow">
            <Tab class="w-[95%] h-14 border-[#131c34] lg:w-64 flex" tag="button"
              @click="select_shipping_method('delivery')">
              <div class="inline-flex items-center grow place-content-center">
                <SimpleIcon icon="delivery" :color="deliveryColor" class="block mr-3" width="24" /> 
                <span class="text-sm lg:text-lg">{{$t('shopping_cart.delivery_tab.home_delivery')}}</span>
              </div>
            </Tab>
            <template v-if="shoppingCartStore.cart.campaign && shoppingCartStore.cart.campaign.meta_logistic.pickup_options">
                <Tab v-if="shoppingCartStore.cart.campaign.meta_logistic.pickup_options.length !== 0" class="w-[95%] h-14 border-[#131c34] lg:w-64 flex" tag="button"
                @click="select_shipping_method('pickup')">
                <div class="inline-flex items-center grow place-content-center">
                  <SimpleIcon icon="store" :color="pickupColor" class="block mr-3" width="24" /> 
                  <span class="text-sm lg:text-lg">{{$t('shopping_cart.delivery_tab.self_pickup')}}</span>
                </div>
              </Tab>
            </template>
          </TabList>


          <TabPanels class="mt-5">

            <!-- BEGIN Delivery Panel -->
            <TabPanel class="leading-relaxed">

              <div class="flex flex-col">
                <!-- BEGIN Delivery Option -->
                <label class="font-medium text-md mt-5">{{$t('shopping_cart.delivery_tab.option.delivery')}}</label>
                <div class="gap-5 mx-0 intro-y lg:mx-20">
                  <template v-if="shoppingCartStore.cart.campaign">

                    <!-- Ecpay 店到店 -->
                    <template v-if="(shoppingCartStore.cart.campaign.meta_logistic?.ecpay?.enabled == true)">
                      <template v-for="(item, key, index) in shoppingCartStore.cart.campaign.meta_logistic?.ecpay?.logistics_sub_type" :key="key">
                        <div v-if="item?.enabled == true" class="flex flex-row flex-wrap cursor-pointer px-10 py-5 my-4 border-2 rounded-lg form-check justify-between"
                        :class="{'border-slate-600': shipping_option_index_computed == key}"
                        @click="select_shipping_method('ecpay') & (shipping_option_index_computed = key)"
                        >
                          <div class="ml-2 text-lg">{{ $t(`settings.delivery_form.ecpay.logistics_sub_type.${key}`) }}</div>
                          <div v-if="key !== 'TCAT'" class="flex flex-row gap-4 -p-6">
                            <a class="ml-2 my-auto" @click="get_c2c_map(key)">選擇門市</a>
                            <!-- <img class="cursor-pointer" src="@/assets/images/lss-img/711.png" @click="get_c2c_map('UNIMARTC2C')"/>  -->
                            <!-- <img class="cursor-pointer" src="@/assets/images/lss-img/Family_Mart.png" @click="get_c2c_map('FAMIC2C')"/>  -->
                          </div>
                          <div class="ml-4 my-auto" v-if="shoppingCartStore.cart.meta?.ecpay_cvs?.logistics_sub_type == key">
                            <p> {{shoppingCartStore.cart.meta.ecpay_cvs.cvs_store_name}} </p>
                            
                            <p> {{shoppingCartStore.cart.meta?.ecpay_cvs?.cvs_address}}</p>
                          </div>
                          <template v-if="item.type === '+'">
                            <label class="form-check-label whitespace-nowrap ml-auto">
                              {{ shoppingCartStore.cart.campaign.currency }}
                              {{(Math.floor((parseFloat(item.delivery_charge) + parseFloat(shoppingCartStore.cart.campaign.meta_logistic.delivery_charge)) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
                              {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}</label>
                          </template>
                          <template v-else>
                            <label class="form-check-label whitespace-nowrap ml-auto">
                              {{ shoppingCartStore.cart.campaign.currency }}
                              {{(Math.floor(parseFloat(item.delivery_charge) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
                              {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}</label>
                          </template>
                        </div>
                      </template>
                    </template>

                    <!-- Default Option -->
                    <div 
                    v-if="(shoppingCartStore.cart.campaign.meta_logistic?.is_self_delivery_enabled == true)"
                      class="flex flex-row flex-wrap cursor-pointer px-10 py-6 my-4 border-2 rounded-lg form-check"
                      :class="{'border-slate-600': shipping_option_index_computed == null}"
                      @click="select_shipping_method('delivery') & (shipping_option_index_computed = null)"
                      >
                      <div class="ml-2 text-lg">{{$t('shopping_cart.delivery_tab.option.default')}}</div>
                      <div class="ml-auto">
                        <label class="form-check-label">
                        {{ shoppingCartStore.cart.campaign.currency }}
                        {{(Math.floor(parseFloat(shoppingCartStore.cart.campaign.meta_logistic.delivery_charge) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
                        {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}</label>
                      </div>
                    </div>

                    <template
                      v-if="(shoppingCartStore.cart.campaign.meta_logistic?.is_self_delivery_enabled == true)"
                      v-for="(option, index) in shoppingCartStore.cart.campaign.meta_logistic.additional_delivery_options"
                      :key="index"> 
                      <div class="flex flex-row flex-wrap cursor-pointer px-10 py-6 my-4 border-2 rounded-lg form-check gap-2"
                        :class="{'border-slate-600': shipping_option_index_computed == index}"
                        @click="select_shipping_method('delivery') & (shipping_option_index_computed = index)"
                      >
                      <div class="ml-2 text-lg">{{ option.title }}</div>
                        
                        <template v-if="option.type === '+'">
                          <label class="form-check-label whitespace-nowrap ml-auto">
                            {{ shoppingCartStore.cart.campaign.currency }}
                            {{(Math.floor((parseFloat(option.price) + parseFloat(shoppingCartStore.cart.campaign.meta_logistic.delivery_charge)) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
                            {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}</label>
                        </template>
                        <template v-else>
                          <label class="form-check-label whitespace-nowrap ml-auto">
                            {{ shoppingCartStore.cart.campaign.currency }}
                            {{(Math.floor(parseFloat(option.price) * (10 ** shoppingCartStore.cart.campaign.decimal_places)) / 10 ** shoppingCartStore.cart.campaign.decimal_places).toLocaleString('en-GB')}}
                            {{shoppingCartStore.cart.campaign.price_unit?$t(`global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`):''}}</label>
                        </template>
                      </div>
                    </template>

                    <div class="flex flex-col flex-wrap" v-if="shoppingCartStore.cart.campaign.meta_logistic.delivery_date?.start_at">
                      <label class="text-base text-[14px] font-medium whitespace-nowrap lg:-mx-20">{{$t('shopping_cart.delivery_tab.delivery_date')}}</label>
                      <v-date-picker class="z-49" 
                        v-model="shipping_info.shipping_date_time"
                        :timezone="timezone" 
                        :columns="$screens({ default: 1})" 
                        mode="datetime" is-required is24hr
                        :min-date='shoppingCartStore.cart.campaign.meta_logistic.delivery_date.start_at'
                        :max-date='shoppingCartStore.cart.campaign.meta_logistic.delivery_date.end_at'
                        >
                        <template v-slot="{ inputValue, inputEvents }">
                          <input :value="inputValue" v-on="inputEvents" @click="shipping_info.shipping_date_time = null"
                            class="form-control border h-[42px] px-10 py-6 w-42 rounded-lg focus:outline-none focus:border-indigo-400" />
                        </template>
                      </v-date-picker>
                    </div>
                  </template>
                </div>
                <!-- END Delivery Option -->

                 <!-- Delivery Address -->
                <template v-if="showAddressForm()">
                  <label class="font-medium text-md mt-5">{{$t('shopping_cart.delivery_tab.delivery_info')}}</label>
                  <div class="gap-5 mx-0 intro-y lg:mx-20">

                    <!--Postal Code-->
                    <label for="regular-form-2" class="my-2 form-label">{{$t('shopping_cart.delivery_tab.postal_code')}}</label>
                    <div>
                      <input id="regular-form-2" type="text" class="form-control " placeholder=""
                        :class="{ 'border-danger': delivery_validate.shipping_postcode.$error }"
                        v-model.trim="delivery_validate.shipping_postcode.$model" />
                      <template v-for="(error,index) in delivery_validate.shipping_postcode.$errors" :key="index">
                        <label
                          class="mt-2 text-danger"
                        >
                        {{ error.$message }}
                        </label>
                        <br/>
                      </template>
                    </div>
                    
                    <!--City-->
                    <label for="regular-form-2" class="my-2 form-label">{{$t('shopping_cart.delivery_tab.city')}}</label>
                    <div>
                      <select class="form-select h-[35px] sm:h-[42px] w-full" v-model="city_computed">
                        <option :value="null">{{ $t('shopping_cart.delivery_tab.please_select') }}</option>
                        <option v-for="(city,index) in twZipcodeStore.data" :key="index" :value="index">{{ city.name }}</option>
                      </select>
                      <!-- <input id="regular-form-2" type="text" class="form-control " placeholder=""
                        :class="{ 'border-danger': delivery_validate.shipping_region.$error }"
                        v-model.trim="delivery_validate.shipping_region.$model" /> -->
                      <template v-for="(error, index) in delivery_validate.shipping_region.$errors" :key="index">
                        <label
                          class="mt-2 text-danger"
                        >
                        {{ error.$message }}
                        </label>
                        <br/>
                      </template>
                    </div>

                    <!--District Area-->
                    <label for="regular-form-2" class="my-2 form-label">{{$t('shopping_cart.delivery_tab.district')}}</label>
                    <div>
                      <select class="form-select h-[35px] sm:h-[42px] w-full" v-model="area_computed">
                        <option :value="null">{{ $t('shopping_cart.delivery_tab.please_select') }}</option>
                        <option v-for="(area,index) in twZipcodeStore.data[cityIndex]?.areas" :key="index" :value="index">{{ area.name }}</option>
                      </select>
                      
                      <!-- <input id="regular-form-2" type="text" class="form-control " placeholder=""
                        :class="{ 'border-danger': delivery_validate.shipping_location.$error}"
                        v-model.trim="delivery_validate.shipping_location.$model" /> -->
                      <template v-for="(error,index) in delivery_validate.shipping_location.$errors" :key="index">
                        <label
                          class="mt-2 text-danger"
                        >
                        {{ error.$message }}
                        </label>
                        <br/>
                      </template>
                    </div>
                    
                    <!--Street Address-->
                    <label for="regular-form-2" class="my-2 form-label">{{$t('shopping_cart.delivery_tab.address')}}</label>
                    <div>
                      <input id="regular-form-2" type="text" class="form-control"
                        :class="{ 'border-danger': delivery_validate.shipping_address_1.$error }"
                        :placeholder="$t('shopping_cart.delivery_tab.address_hint')"
                        v-model.trim="delivery_validate.shipping_address_1.$model" />
                      <template v-for="(error,index) in delivery_validate.shipping_address_1.$errors" :key="index">
                        <label
                          class="mt-2 text-danger"
                        >
                        {{ error.$message }}
                        </label>
                        <br/>
                      </template>
                    </div>
                  </div>
                </template> 
              </div>
            </TabPanel>
            <!-- END Delivery Panel -->

            <!-- BEGIN Pickup Panel -->
            <TabPanel class="leading-relaxed">
              <label class="font-medium text-md">{{$t('shopping_cart.delivery_tab.option.pickup')}}</label>
              <template v-if="shoppingCartStore.cart.campaign">
                <template v-for="(option, index) in shoppingCartStore.cart.campaign.meta_logistic.pickup_options" :key="index"> 
                  <div class="flex flex-row justify-between form-check cursor-pointer px-5 sm:px-10 py-6 border-2 rounded-lg lg:mx-20 z-0 my-5"
                    :class="{'border-slate-600': shipping_option_index_computed == index}"
                    @click="select_shipping_method('pickup') & (shipping_option_index_computed = index) & pickup_date_range(index)"
                    >

                      <div class="flex flex-col sm:flex-row flex-0 w-full"> 
                        <div class="flex flex-col mr-auto">
                          <div class="font-medium flex-0 text-lg ml-2">{{ option.name }}</div>
                          <div class="font-medium flex-0 ml-2">{{ option.address }}</div>
                        </div> 
                        <template v-if="option.start_at !== null && option.end_at !== null"> 
                          <label class="form-check-label flex-0 my-auto">{{new Date(option.start_at).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})
                            +'~'+
                            new Date(option.end_at).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}}</label>
                        </template>
                    </div>
                  </div>

                </template>

                <template v-if="shoppingCartStore.cart.campaign.meta_logistic?.pickup_options[pickup_select_index]?.start_at"> 
                  <label class="font-medium text-md whitespace-nowrap">{{$t('shopping_cart.delivery_tab.pickup_date')}}</label>
                    <!-- pickup time-->
                  <div class="flex flex-col flex-wrap lg:mx-20 z-20">
                    <v-date-picker class="z-50" 
                      v-model="shipping_info.shipping_date_time"
                      :timezone="timezone" 
                      :columns="$screens({ default: 1})" 
                      mode="datetime" is-required is24hr
                      :min-date='date_range.start'
                      :max-date='date_range.end'
                      >
                      <template v-slot="{ inputValue, inputEvents }">
                        <input :value="inputValue" v-on="inputEvents" 
                          class="form-control border h-[42px] px-10 py-6 w-42 rounded-lg focus:outline-none focus:border-indigo-400" />
                      </template>
                    </v-date-picker>
                  </div>
                </template>
              </template>
            </TabPanel>
            <!-- END Pickup Panel -->
          </TabPanels>
        </TabGroup>

        <h2 class="w-full mr-auto text-xl font-medium mt-5">{{$t('shopping_cart.delivery_tab.contact_info')}}</h2>
        <div class="grid grid-cols-12 gap-5 p-0 my-10 mt-3 intro-y lg:p-10">
          <label for="regular-form-2" class="col-span-4 form-label lg:col-span-2 my-auto">
            {{$t('shopping_cart.delivery_tab.full_name')}}</label>
            <div class="col-span-8 lg:col-span-4">
              <input id="regular-form-2" type="text"
                class="col-span-8 form-control lg:col-span-4 full-name" 
                placeholder="中文 2~5 個字, 英文 4~10 個字"
                :class="{ 'border-danger': reciever_validate.shipping_first_name.$error }"
                v-model.trim="reciever_validate.shipping_first_name.$model" @blur="reciever_validate.shipping_first_name.$touch"/>
                <template v-for="(error, index) in reciever_validate.shipping_first_name.$errors" :key="index">
                  <label class="mt-2 text-danger">
                    {{ error.$message }}
                  </label>
                  <br/>
                </template>
              </div>
          <!-- <label for="regular-form-2" class="col-span-4 form-label lg:col-span-2 my-auto">
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
            </div> -->
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
                  {{ error.$message }}
                  </label>
                  <br/>
              </template>
          </div>
          
          <label for="regular-form-2" class="col-span-4 form-label lg:col-span-2 my-auto">{{$t('shopping_cart.delivery_tab.phone')}}</label>
          <div class="col-span-8 lg:col-span-4">
          <input id="regular-form-2" type="tel"
            class="form-control"
            :class="{ 'border-danger': reciever_validate.shipping_phone.$error }"
            placeholder="ex: 02xxxxxxxx"
            v-model.trim="reciever_validate.shipping_phone.$model" />
            <template v-for="(error, index) in reciever_validate.shipping_phone.$errors" :key="index">
              <label class="mt-2 text-danger">
                {{ error.$message }}
              </label>
              <br/>
            </template>
          </div>
          <label for="regular-form-2" class="col-span-4 form-label lg:col-span-2 my-auto">{{$t('shopping_cart.delivery_tab.cell_phone')}}</label>
          <div class="col-span-8 lg:col-span-4">
          <input id="regular-form-2" type="tel"
            class="form-control " placeholder=""
            :class="{ 'border-danger': reciever_validate.shipping_cellphone.$error }"
            v-model.trim="reciever_validate.shipping_cellphone.$model" />
            <template v-for="(error, index) in reciever_validate.shipping_cellphone.$errors" :key="index">
              <label class="mt-2 text-danger">
                {{ error.$message }}
              </label>
              <br/>
            </template>
          </div>
        </div>

        <div class="col-span-12 mt-10">
          <div class="font-medium text-md">
            {{$t('shopping_cart.delivery_tab.note')}}
          </div>
          <p id="" class="col-span-12 col-start-1 p-5 form-control whitespace-pre-line" placeholder="" v-if="shoppingCartStore.cart.campaign">
            {{shoppingCartStore.cart.campaign.meta_logistic.delivery_note}}
          </p>
        </div>

        <div class="col-span-12 mt-10"
          v-if="!shoppingCartStore.user_subscription?.user_plan?.hide?.order_shipping_remark"
        >
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
      <button class="mr-auto rounded-full w-fit btn btn-outline-primary" @click="shoppingCartStore.openTab= 1">
        {{$t('shopping_cart.delivery_tab.previous')}}
      </button>

      <button :show="show" v-if="checkoutLoading" class="w-fit btn btn-rounded-primary" >
        {{$t('shopping_cart.delivery_tab.proceed_to_payment')}}
        <LoadingIcon icon="three-dots" color="1a202c" class="absolute w-12 h-fit"/>
      </button>
      <button :show="show" v-else class="w-fit btn btn-rounded-primary" @click="proceed_to_payment" :disabled="shoppingCartStore.user_subscription.status === sandboxMode">
        {{$t('shopping_cart.delivery_tab.proceed_to_payment')}}
      </button>
    </div>
  </div>
</template>


<script setup>
import OrderSummary from "./OrderSummary.vue";
import ShoppingCartTableSimple from "./ShoppingCartTable-simple.vue";
import { required, minLength, maxLength, email, integer, helpers, requiredUnless } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import { computed, onMounted,onUnmounted, ref, watch, reactive, toRefs } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useRoute, useRouter } from "vue-router";
// import { buyer_update_delivery_info } from "@/api_v2/pre_order"
import { buyer_checkout_cart,buyer_get_cvs_map } from "@/api_v2/cart"
import { buyer_retrieve_latest_order_shipping_info } from "@/api_v2/order"
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"
import { useTwZipcodeStore } from "@/stores/tw-zipcode"
import { useCookies } from 'vue3-cookies'
import i18n from "@/locales/i18n"
const { cookies } = useCookies()
const route = useRoute();
const router = useRouter();

const shoppingCartStore = useShoppingCartStore();
const layoutStore = useLSSBuyerLayoutStore();
const twZipcodeStore = useTwZipcodeStore();
const sandboxMode = ref("test")
const show = ref(false)
const checkoutLoading = ref(false)
const pickupdatePicker = ref(null)
const date_range = ref({
  start:new Date(),
  end:new Date()
})
let webSocket = null

const shipping_option_index = ref('')
const pickup_select_index = ref(null)
const shipping_info= ref({
			shipping_option:"",
      shipping_method: "delivery",
      shipping_first_name: "",
      // shipping_last_name: "",
      shipping_email: "",
      shipping_phone: "",
      shipping_cellphone: "",
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
      shipping_date_time:new Date(),
      shipping_time: null,
      pickup_address:"",

      shipping_option_data:{}
		})


const deliveryColor = ref('white')
const pickupColor = ref('#131C34')

const areaIndex = ref(null)
const cityIndex = ref(null)
const city_computed = computed({
  get:()=>{
    return cityIndex.value
  },
  set:index=>{
    cityIndex.value = index
    delivery_validate.value.shipping_region.$model = twZipcodeStore.data[index]?.name
    areaIndex.value = null
    delivery_validate.value.shipping_location.$model = null
  }
})
const area_computed = computed({
  get:()=>{
    return areaIndex.value
  },
  set:index=>{
    areaIndex.value = index
    delivery_validate.value.shipping_location.$model = twZipcodeStore.data[cityIndex.value]?.areas[index]?.name
    delivery_validate.value.shipping_postcode.$model = twZipcodeStore.data[cityIndex.value]?.areas[index]?.zip
  }
})

const select_shipping_method = method => {
  console.log("select_shipping_method", method)
  shipping_method_computed.value=method
  deliveryColor.value = method !== 'pickup'? 'white' :'#131C34'
  pickupColor.value = method == 'pickup'? 'white' :'#131C34'
}
const shipping_method_computed = computed({
  get:()=>{
    return shipping_info.value.shipping_method
  }
  ,set:method=>{
    shipping_info.value.shipping_method=method
    shoppingCartStore.shipping_info.shipping_method=method        //order summary compute this
    if (method !== "pickup") {
      shoppingCartStore.shipping_info.shipping_option_index = shipping_option_index.value
    } 
    if (method === "pickup") {
      shoppingCartStore.shipping_info.shipping_option_index = null
    }
  }
})

const shipping_option_index_computed = computed({
  get:()=>{
    return shipping_option_index.value
  },set:index=>{
    console.log("set", index)
    shipping_option_index.value = index
    shoppingCartStore.shipping_info.shipping_option_index=index
    shipping_info.value.pickup_address=shipping_info.value.shipping_method=='pickup'?shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index]?.address : ''

    shipping_info.value.shipping_option=shipping_info.value.shipping_method=='pickup'?shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index]?.name :shipping_info.value.shipping_method=='delivery' && index!=null ? shoppingCartStore.cart.campaign.meta_logistic.additional_delivery_options[index]?.title : ''
    
    if(shipping_info.value.shipping_method=='pickup'){
      shipping_info.value.shipping_option_data = JSON.parse(JSON.stringify(shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index]))
    }
    // temp for ecpay
    else if(shipping_info.value.shipping_method=='ecpay'){
      if(shipping_option_index.value == shoppingCartStore.cart.meta.ecpay_cvs?.logistics_sub_type) {
        shipping_info.value.shipping_option_data = shoppingCartStore.cart.meta.ecpay_cvs
      } else {
        shipping_info.value.shipping_option_data = {}
      }
      if (["TCAT"].includes(shipping_option_index.value)) {
        shipping_info.value.shipping_option_data['logisticsType'] = 'HOME'
      } else {
        shipping_info.value.shipping_option_data['logisticsType'] = 'CVS'
      }
      Object.assign(shipping_info.value.shipping_option_data,{
        'LogisticsSubType': shipping_option_index.value,
        'type': shoppingCartStore.cart.campaign.meta_logistic[shipping_info.value.shipping_method]["logistics_sub_type"][shipping_option_index.value].type,
        "price": shoppingCartStore.cart.campaign.meta_logistic[shipping_info.value.shipping_method]["logistics_sub_type"][shipping_option_index.value].delivery_charge,
      })
      console.log(shipping_info.value.shipping_option_data)
    }
    else{
      shipping_info.value.shipping_option_data = index == null ? {} : JSON.parse(JSON.stringify(shoppingCartStore.cart.campaign.meta_logistic.additional_delivery_options[index]))
    }
  }
})

const isAnonymousUser=cookies.get("login_with")=='anonymousUser'
const showAddressForm = () => {
  if (shipping_info.value.shipping_method == "pickup") return true
  if (shipping_option_index_computed.value == "") return false
  if (shipping_option_index_computed.value === 'UNIMARTC2C' || shipping_option_index_computed.value === 'FAMIC2C') return false
  return true
}
const pickup_date_range = (index) =>{
  date_range.value.start = shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index].start_at
  date_range.value.end = shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index].end_at
  pickup_select_index.value = index
  // console.log(shoppingCartStore.cart.campaign.meta_logistic)
}

onMounted(()=>{
  if(!isAnonymousUser){
    buyer_retrieve_latest_order_shipping_info(layoutStore.alert).then(res=>{

      res.data.shipping_method='delivery'     //default value
      res.data.shipping_option_data={}        //default value
      shipping_info.value = res.data
      city_computed.value = (twZipcodeStore.data.findIndex(city => city.name == shipping_info.value.shipping_region) == -1) ? null : twZipcodeStore.data.findIndex(city => city.name == shipping_info.value.shipping_region)
      areaIndex.value = (twZipcodeStore.data[city_computed.value]?.areas) ? twZipcodeStore.data[city_computed.value]?.areas.findIndex(area => area.name == shipping_info.value.shipping_location) : null
      show.value = true
    })
  }
  
})


const exactlength = (param) =>
  helpers.withParams(
    { type: 'exactlength', value: param },
    (value) => {
      if (value.length === 0) return true
      return value.length === param
    }
)
const twCellPhoneBeginning = (value) => {
  if (value.length === 0) return true
  if (value[0] !== "0") return false
  if (value.length === 1) return true
  if (value[1] !== "9") return false
  return true
}
const specialCharacter = (value) => {
  const special_characters = "^‘`!@#%&*+”<>|_[]"
  return !special_characters.split('').some(char => value.includes(char))
}

const bytesBtwLength = (min,num) => (value) => {
  var string; 
  var len = 0;
  for(var i=0; i < value.length; i++){
    string = value.charCodeAt(i);
   while( string > 0 && string != 32){
      len++;
      string = string >> 8;
   }
  }
  if (len > num) return false
  if (min > len) return false
  else return true
}

const reciever_rules = computed(()=>{
    return{
      shipping_first_name: {
        required: helpers.withMessage(i18n.global.t("vulidate.required"), required),
        // maxLength: helpers.withMessage(i18n.global.t("vulidate.exceed_maximum_length", { number:5 }), maxLength(5)),
        bytesBtwLength: helpers.withMessage(i18n.global.t("vulidate.name_between_length", { number:'4-10' }), bytesBtwLength(4,10)),
        specialCharacter: helpers.withMessage(i18n.global.t("vulidate.contains_special_characters") + " ^ ‘ ` ! @ # % & * + ” < > | _ [ ]", specialCharacter)
      },
      shipping_phone: {
        integer: helpers.withMessage(i18n.global.t("vulidate.only_integer"), integer),
        requiredIf: helpers.withMessage(i18n.global.t("vulidate.required_either_one"), 
          requiredUnless(function() {
            return shipping_info.value.shipping_cellphone !== ""
          })
        ),
        maxLength: helpers.withMessage(i18n.global.t("vulidate.exceed_maximum_length", { number:10 }), maxLength(10)),
      },
      shipping_cellphone: {
        integer: helpers.withMessage(i18n.global.t("vulidate.only_integer"), integer),
        requiredIf: helpers.withMessage(i18n.global.t("vulidate.required_either_one"), 
          requiredUnless(function() {
            return shipping_info.value.shipping_phone !== ""
          })
        ),
        cellphoneLength: helpers.withMessage(i18n.global.t("vulidate.exact_number_length", {number:10}), exactlength(10)),
        twCellPhoneBeginning: helpers.withMessage(i18n.global.t("vulidate.tw_cellphone_begining"), twCellPhoneBeginning)
      },
      shipping_email: {
        required: helpers.withMessage(i18n.global.t("vulidate.required"), required),
        email: helpers.withMessage(i18n.global.t("vulidate.invalid_email"), email),
        maxLength: helpers.withMessage(i18n.global.t("vulidate.exceed_maximum_length", { number:100 }), maxLength(100)),
      }
  }
});

const delivery_rules = computed(()=>{
  return{
    shipping_address_1: {
      required: helpers.withMessage(i18n.global.t("vulidate.required"), required),
      bytesBtwLength: helpers.withMessage(i18n.global.t("vulidate.invalid_address"), bytesBtwLength(4,60)),
    },
    shipping_location: {
      required: helpers.withMessage(i18n.global.t("vulidate.required"), required),
      exactlength: helpers.withMessage(i18n.global.t("vulidate.exact_number_length", {number:3}), exactlength(3)),
    },
    shipping_region: {
      required: helpers.withMessage(i18n.global.t("vulidate.required"), required),
      exactlength: helpers.withMessage(i18n.global.t("vulidate.exact_number_length", {number:3}), exactlength(3)),
    },
    shipping_postcode: {
      integer: helpers.withMessage(i18n.global.t("vulidate.only_integer"), integer),
      required: helpers.withMessage(i18n.global.t("vulidate.required"), required),
      maxLength: helpers.withMessage(i18n.global.t("vulidate.exceed_maximum_length", { number:6 }), maxLength(6)),
    },
  }}
);

const reciever_validate = useVuelidate(reciever_rules, shipping_info);
const delivery_validate = useVuelidate(delivery_rules, shipping_info);

const get_c2c_map = (storeType) =>{
  const cvsdata = {'LogisticsSubType':storeType} //UNIMARTC2C or FAMIC2C
  buyer_get_cvs_map(route.params.cart_oid,cvsdata).then(
    res=>{
      const form = document.createElement('form');
      form.setAttribute("id", "data_set");
      form.method = 'post';
      form.action = res.data.action;
      const params = res.data.data
      // {
      //   "MerchantID": "3344643",
      //   "MerchantTradeNo": "anyno",
      //   "LogisticsType": "CVS",
      //   "LogisticsSubType": "UNIMARTC2C",
      //   "IsCollection": "Y",
      //   "ServerReplyURL": "https://3612-220-136-84-226.jp.ngrok.io/api/v2/cart/buyer/cvsmap/callback/",
      //   "ExtraData": "6390449bbc4b20ae3d99e212"
      // }
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const hiddenField = document.createElement('input');
          hiddenField.type = 'hidden';
          hiddenField.name = key;
          hiddenField.value = params[key];

          form.appendChild(hiddenField);
        }
      }
      document.body.appendChild(form);
      form.submit();
    }
  )
  
}


const proceed_to_payment = () =>{
  
  if(shipping_info.value.shipping_method !== 'pickup'){
    if(shipping_option_index.value === ''){
      layoutStore.alert.showMessageToast('選擇運送方式')
      return
    }

    else if(shipping_info.value.shipping_option_data['logisticsType'] == 'CVS' && !shipping_info.value.shipping_option_data['cvs_store_id']){
      layoutStore.alert.showMessageToast('選取店到店門市')
      return
    }
  }
  if (["UNIMARTC2C", "FAMIC2C"].includes(shipping_option_index.value)) {
    shipping_info.value.shipping_location = ''
    shipping_info.value.shipping_region = ''
    shipping_info.value.shipping_address_1 = ''
    shipping_info.value.shipping_postcode = ''
  } else {
    delivery_validate.value.$touch();
    if (delivery_validate.value.$invalid && shipping_info.value.shipping_option_data.logisticsType !== 'CVS'){
      layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_delivery_info'))
      return
    }
  }

  reciever_validate.value.$touch();

  if (reciever_validate.value.$invalid) {

    layoutStore.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_user_info'))
    return
  }
  console.log(shipping_info.value)
  checkoutLoading.value = true
  buyer_checkout_cart(route.params.cart_oid, {shipping_data:shipping_info.value, points_used:shoppingCartStore.points_used}, layoutStore.alert)
  .then(res=>{
    if(res.data.oid){
      router.push({name:"buyer-order-payment-page", params:{'order_oid':res.data.oid}})
    }else{
      shoppingCartStore.cart = res.data
      layoutStore.alert.showMessageToast('out of stock')
    }
    checkoutLoading.value = false
  })
  .catch(err=>{checkoutLoading.value = false})
  
  
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

input::placeholder {
  font: 10px/3 sans-serif;
}
</style>