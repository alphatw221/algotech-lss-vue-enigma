<template>

    <div class="grid grid-cols-12 lg:gap-10 w-full">
      <div class="col-span-12 row-start-2 lg:row-start-1 lg:col-span-8 mt-10 lg:mt-0">
        <TabGroup class="flex flex-col gap-10 text-left">
          <h2 id="shipping_info">{{$t('shopping_cart.delivery_tab.shipping_info')}}</h2>
          
          <TabList 
            v-if="props.store?.cart.campaign" 
            class="flex flex-row items-center justify-start w-full nav-boxed-tabs grow gap-2 -mt-4 sm:mt-0">
            <div class="w-1/2"
              v-if="props.store?.cart?.campaign?.meta_logistic?.is_self_delivery_enabled "> 
              <Tab class="h-14 border-[#131c34] w-48 xl:w-64 flex" tag="button" @click="selectShippingMethod('delivery')">
                <div class="inline-flex items-center w-full h-full place-content-center">
                  <SimpleIcon v-if="shipping_info.shipping_method==='delivery'" icon="delivery" color='white' class="block mr-3" width="24" /> 
                  <SimpleIcon v-else icon="delivery" color="#131C34" class="block mr-3" width="24" /> 
                  <span class="text-sm lg:text-lg">{{$t('shopping_cart.delivery_tab.home_delivery')}}</span>
                </div>
              </Tab>
            </div>
            <div class="w-1/2"
              v-if="props.store?.cart.campaign.meta_logistic?.is_store_pickup_enabled">
              <Tab  
                class="h-14 border-[#131c34] w-48 xl:w-64 flex" tag="button"
                @click="selectShippingMethod('pickup')">
                <div class="inline-flex items-center w-full h-full place-content-center">
                  <SimpleIcon  v-if="shipping_info.shipping_method==='pickup'" icon="store" color='white' class="block mr-3" width="24" /> 
                  <SimpleIcon  v-else color="#131C34" class="block mr-3" width="24" /> 

                  <span class="text-sm lg:text-lg">{{$t('shopping_cart.delivery_tab.self_pickup')}}</span>
                </div>
              </Tab>
            </div>
          </TabList>
         

          <TabPanels v-if="props.store?.cart.campaign" >
            <!-- BEGIN Delivery Panel -->
            <TabPanel 
            v-if="props.store?.cart?.campaign?.meta_logistic?.is_self_delivery_enabled "
            class="leading-relaxed">
              <div class="flex flex-col gap-6">
                

                <!-- Delivery Address -->
                <div >
                  <h2 class="mt-4 sm:mt-8">{{$t('order.delivery_info')}}</h2>
                  <div class="flex flex-col gap-4 intro-y mt-4">
                    <!--Street Address-->
                    <div class="flex flex-col gap-1">
                      <p>{{$t('order.shipping_address')}}</p>
                      <input id="regular-form-2" type="text" class="form-control"
                        :class="{ 'border-danger': delivery_validate.shipping_address_1.$error }"
                        :placeholder="$t('shopping_cart.delivery_tab.address_hint')"
                        v-model.trim="delivery_validate.shipping_address_1.$model" />
                      <h4 class="text-danger flex flex-col sm:flex-row"> 
                        <template v-for="(error,index) in delivery_validate.shipping_address_1.$errors" :key="index">
                          <span>{{ error.$message }}</span>
                          <span v-if="index+1 !== delivery_validate.shipping_address_1.$errors.length"
                              class="hidden sm:block mx-1">/</span>
                        </template>
                      </h4>
                    </div>

                    <!--Location-->
                    <div class="flex flex-col gap-1">
                      <p>{{$t('order.shipping_location')}}</p>
                     
                      <input id="regular-form-2" type="text" class="form-control " placeholder=""
                        :class="{ 'border-danger text-danger': delivery_validate.shipping_location.$error }"
                        v-model.trim="delivery_validate.shipping_location.$model" /> 

                      <h4 class="text-danger flex flex-col sm:flex-row"> 
                        <template v-for="(error,index) in delivery_validate.shipping_location.$errors" :key="index">
                          <span>{{ error.$message }}</span>
                          <span v-if="index+1 !== delivery_validate.shipping_location.$errors.length"
                              class="hidden sm:block mx-1">/</span>
                        </template>
                      </h4>
                    </div>

                    
                     <!--Region-->
                    <div class="flex flex-col gap-1">
                      <p>{{$t('order.shipping_region')}}</p>
                   
                      <template v-if="computedRegionOptions.length>0"> 

                        <select class="form-select h-[35px] sm:h-[42px] w-full" v-model="shipping_info.shipping_region">
                          <option v-for="(option, optionIndex) in computedRegionOptions" :key="optionIndex" :value="option">{{ option }}</option>
                        </select>

                      </template>
                      <template v-else> 
                        <input id="regular-form-2" type="text" class="form-control " placeholder=""
                          :class="{ 'border-danger text-danger': delivery_validate.shipping_region.$error }"
                          v-model.trim="delivery_validate.shipping_region.$model" /> 
                      </template>

                      <h4 class="text-danger flex flex-col sm:flex-row"> 
                        <template v-for="(error,index) in delivery_validate.shipping_region.$errors" :key="index">
                          <span>{{ error.$message }}</span>
                          <span v-if="index+1 !== delivery_validate.shipping_region.$errors.length"
                              class="hidden sm:block mx-1">/</span>
                        </template>
                      </h4>
                    </div>

                    <!--Property Type-->
                    <div class="flex flex-col gap-1" v-if="props.store?.user_subscription?.user_plan?.display?.order_shipping_property_type">
                      <p>{{$t('order.shipping_property_type')}}</p>

                      <select class="form-select h-[35px] sm:h-[42px] w-full" v-model="shipping_info.shipping_property_type">
                          <option :value="null"></option>
                          <option value="HDB">HDB</option>
                          <option value="Condo/Apartment">Condo/Apartment</option>
                          <option value="Landed">Landed</option>
                          <option value="Office">Office</option>

                        </select>

                    </div>

                    <!--Postal Code-->
                    <div class="flex flex-col gap-1">
                      <p>{{$t('order.shipping_postcode')}}</p>
                      <input id="regular-form-2" type="text" class="form-control " placeholder=""
                        :class="{ 'border-danger text-danger': delivery_validate.shipping_postcode.$error }"
                        v-model.trim="delivery_validate.shipping_postcode.$model" />
                      <h4 class="text-danger flex flex-col sm:flex-row"> 
                        <template v-for="(error,index) in delivery_validate.shipping_postcode.$errors" :key="index">
                          <span>{{ error.$message }}</span>
                          <span v-if="index+1 !== delivery_validate.shipping_postcode.$errors.length"
                              class="hidden sm:block mx-1">/</span>
                        </template>
                      </h4>
                    </div>
                  </div>
                </div> 


                <!-- BEGIN Delivery Option -->
                <h3 id="delivery_options">{{$t('shopping_cart.delivery_tab.option.delivery')}}</h3>

                <div class="flex flex-col gap-4 mx-0 intro-y lg:mx-10 xl:mx-20">

               
                  <div>
                    <!-- Default Option -->
                    <div 
                        v-if="((props.store?.cart.campaign.meta_logistic?.is_self_delivery_enabled == true) || computedAppliedCategoryLogistic) && computedRegionOptions.length<1"
                        class="logistic-options border-2 rounded-lg relative "
                        :class="{'border-red-600/90 shadow-sm': displayDeliveryOptionIndex == null}"
                        @click="selectDeliveryOption(null,{})"
                      >
                      <CheckSquareIcon v-if="displayDeliveryOptionIndex == null" class="absolute left-3 text-red-800"/>
                      <p id="default_delivery" class="min-w-[100px] whitespace-nowrap">{{ !['',' ',undefined,null].includes(props.store?.cart.campaign.meta_logistic?.title) ? props.store?.cart.campaign.meta_logistic?.title : $t('shopping_cart.delivery_tab.option.default')}}</p>
                      <template v-if="computedAppliedCategoryLogistic||props.store?.cart?.free_delivery||computedSubtotalOverFreeDeliveryThreshold||computedItemsOverFreeDeliveryThreshold"></template>
                      <h4 v-else class="ml-auto">
                        {{ props.store?.cart.campaign.currency }}
                        {{(Math.floor(parseFloat(props.store?.cart.campaign.meta_logistic.delivery_charge) * (10 ** props.store?.cart.campaign.decimal_places)) / 10 ** props.store?.cart.campaign.decimal_places).toFixed(props.store?.cart.campaign.decimal_places)}}
                        {{props.store?.cart.campaign.price_unit?$t(`global.price_unit.${props.store?.cart.campaign.price_unit}`):''}}
                      </h4>
                    </div>

                    <!-- Own Delivery Options -->
                    <template v-if="(props.store?.cart?.campaign?.meta_logistic?.is_self_delivery_enabled == true)"> 
                      <!-- <template
                        v-for="(option, index) in props.store?.cart.campaign.meta_logistic.additional_delivery_options"
                        :key="index">  -->
                      <template
                        v-for="(option, index) in computedDeliveryServiceOptions"
                        :key="index"> 
                        <div class="logistic-options border-2 rounded-lg relative mt-5" 
                          :class="{'border-red-600/90 shadow-sm': displayDeliveryOptionIndex == index}"
                          @click="selectDeliveryOption(index, option)"
                          >
                          <CheckSquareIcon v-if="displayDeliveryOptionIndex == index" class="absolute left-3 text-red-800"/>

                          <div class="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-4 flex-wrap"> 
                            <div class="flex flex-row gap-6 items-center">
                              <p  class="min-w-[100px] whitespace-nowrap">{{ option?.region }}</p>
                              <p :id="option.title" class="min-w-[100px] whitespace-nowrap">{{ option.title }}</p>
                            
                            </div>
                          </div>

                          <h4 id="option_price" class="whitespace-nowrap ml-auto">
                            <!-- on top delivery charge-->
                            <template v-if="computedAppliedCategoryLogistic||props.store?.cart?.free_delivery||computedSubtotalOverFreeDeliveryThreshold||computedItemsOverFreeDeliveryThreshold"></template>
                            <template v-else-if="option.type === '+'">
                              {{ props.store?.cart.campaign.currency }}
                              {{(Math.floor((parseFloat(option.price) + parseFloat(props.store?.cart.campaign.meta_logistic.delivery_charge)) * (10 ** props.store?.cart.campaign.decimal_places)) / 10 ** props.store?.cart.campaign.decimal_places).toFixed(props.store?.cart.campaign.decimal_places)}}
                              {{props.store?.cart.campaign.price_unit?$t(`global.price_unit.${props.store?.cart.campaign.price_unit}`):''}}
                            </template>
                            <!-- replace delivery charge-->
                            <template v-else>
                              {{ props.store?.cart.campaign.currency }}
                              {{(Math.floor(parseFloat(option.price) * (10 ** props.store?.cart.campaign.decimal_places)) / 10 ** props.store?.cart.campaign.decimal_places).toFixed(props.store?.cart.campaign.decimal_places)}}
                              {{props.store?.cart.campaign.price_unit?$t(`global.price_unit.${props.store?.cart.campaign.price_unit}`):''}}
                            </template>
                          </h4>
                        </div>
                      </template>
                    </template>
                    
                  </div>

                  <!-- Delivery Date -->
                  <template v-if="computedDeliveryDates.length ">
                    <h3 class="whitespace-nowrap lg:-mx-10 xl:-mx-20">{{$t('shopping_cart.delivery_tab.delivery_date')}}</h3>
                    <div class="flex flex-col sm:flex-row gap-3"> 

                      <div class="flex flex-col w-full"> 
                   
                        <select 
                          class="border-2 h-[50px] w-full rounded-lg px-10 text-[1rem]" 
                          :class="{'border-danger': time_validate.shipping_date.$errors.length > 0}" 
                          v-model="shipping_info.shipping_date"> 
                          <option v-for="(dateOption, dateOptionIndex) in computedDeliveryDates" :key="dateOptionIndex"> {{ dateOption.date }} </option>
                        </select>

                        <h4 class="text-danger flex flex-col sm:flex-row"> 
                          <template v-for="(error,index) in time_validate.shipping_date.$errors" :key="index">
                            <span>{{ error.$message }}</span>
                            <span v-if="index+1 !== time_validate.shipping_date.$errors.length"
                                class="hidden sm:block mx-1">/</span>
                          </template>
                        </h4>

                      </div>

                      <div class="flex flex-col w-full"> 
                        <select 
                          class="border-2 h-[50px] w-full rounded-lg px-10 text-[1rem]" 
                          :class="{'border-danger': time_validate.shipping_time_slot.$errors.length > 0}" 
                          v-model="shipping_info.shipping_time_slot"> 
                          <option v-for="(timeSlot, timeSlotIndex) in (computedShippingTimeSlots)" :key="timeSlotIndex"> {{ timeSlot }} </option>
                        </select>
                        <h4 class="text-danger flex flex-col sm:flex-row"> 
                          <template v-for="(error,index) in time_validate.shipping_time_slot.$errors" :key="index">
                            <span>{{ error.$message }}</span>
                            <span v-if="index+1 !== time_validate.shipping_time_slot.$errors.length"
                                class="hidden sm:block mx-1">/</span>
                          </template>
                        </h4>

                      </div>
                    </div>
                  </template>
                  <!-- END Delivery Date -->

                </div>
                <!-- END Delivery Option -->

              </div>
            </TabPanel>
            <!-- END Delivery Panel -->

            <!-- BEGIN Pickup Panel -->
            <TabPanel v-if="props.store?.cart.campaign.meta_logistic?.is_store_pickup_enabled" 
              class="leading-relaxed">
              <div class="flex flex-col gap-6">
                <h3 id="pickup_options">{{$t('shopping_cart.delivery_tab.option.pickup')}}</h3>

                <!-- pickup options-->
                <div class="flex flex-col gap-4 lg:mx-20 z-0"> 
                  <template v-for="(option, index) in props.store?.cart.campaign.meta_logistic.pickup_options" :key="index"> 
                    <div class="logistic-options border-2 rounded-lg relative"
                      :class="{'border-red-600/90 shadow-sm': displayPickupOptionIndex == index}"
                      @click="selectPickupOption(index,option)"
                      >
                      <CheckSquareIcon v-if="displayPickupOptionIndex == index" class="absolute left-3 text-red-800"/>
                      <div class="flex flex-col sm:flex-row flex-0 w-full"> 
                        <div class="flex flex-col mr-auto">
                          <p>{{ option.name }}</p>
                          <h4>{{ option.address }}</h4>
                        </div> 
                        <template v-if="option.daterange "> 
                          <h4 class="flex-0 my-auto text-slate-600">
                            {{option.daterange?.split('~')?.[0]
                            +'~'+
                            option.daterange?.split('~')?.[1]}}</h4>
                        </template>
                      </div>
                    </div>
                  </template>
                </div>

                <!-- pickup time-->
                <template v-if="props.store?.cart.campaign.meta_logistic?.pickup_options[displayPickupOptionIndex]?.daterange && shipping_info.shipping_method == 'pickup'"> 
                  <h3 class="whitespace-nowrap">{{$t('shopping_cart.delivery_tab.pickup_date')}}</h3>
                  <div class="flex flex-col sm:flex-row gap-3 lg:mx-20 z-20">

                    <Litepicker :key={pickupDatePickerKey} v-model="pickup_time_validate.shipping_date.$model" :options="{
                        autoApply: false,
                        showWeekNumbers: true,
                        dropdowns: {
                          minYear: 1990,
                          maxYear: null,
                          months: true,
                          years: true,
                        },
                        minDate:props.store?.cart.campaign.meta_logistic?.pickup_options[displayPickupOptionIndex]?.daterange?.split('~')?.[0],
                        maxDate:props.store?.cart.campaign.meta_logistic?.pickup_options[displayPickupOptionIndex]?.daterange?.split('~')?.[1],
                      }" class="block border-2 h-[50px] px-10 w-full min-w-[300px] rounded-lg" :class="{'border-danger': pickup_time_validate.shipping_date.$errors.length > 0}"/>


                    <div class="flex flex-col w-full">
                      <select 
                        class="border-2 h-[50px] w-full rounded-lg px-10 text-[1rem]" 
                        :class="{'border-danger': pickup_time_validate.shipping_time_slot.$errors.length > 0}"
                        v-model="pickup_time_validate.shipping_time_slot.$model"> 
                        <option v-for="option in props.store?.cart.campaign.meta_logistic.pickup_options[displayPickupOptionIndex]?.options" :key="option"> {{ option }} </option>
                      </select>
                      <h4 class="text-danger flex flex-col sm:flex-row"> 
                        <template v-for="(error,index) in pickup_time_validate.shipping_time_slot.$errors" :key="index">
                          <span>{{ error.$message }}</span>
                          <span v-if="index+1 !== pickup_time_validate.shipping_time_slot.$errors.length"
                              class="hidden sm:block mx-1">/</span>
                        </template>
                      </h4>
                    </div>
                  </div>
                </template>
              </div>
            </TabPanel>
            <!-- END Pickup Panel -->
          </TabPanels>
        </TabGroup>

        <div class="flex flex-col gap-10 sm:gap-14 mt-10 sm:mt-14">
          <div class="flex flex-col gap-4">
            <h3 class="w-full mr-auto text-xl font-medium mb-2">{{$t('shopping_cart.delivery_tab.contact_info')}}</h3>
            <div class="flex flex-col lg:flex-row justify-between gap-4 lg:gap-20"> 

              <div class="flex flex-col xl:flex-row gap-1 xl:gap-4 w-full">
                <p class="flex-2 mt-2 w-24">{{$t('shopping_cart.delivery_tab.full_name')}}</p>
                <div class="flex-1">
                  <input type="text" 
                    class="form-control" 
                    :placeholder="$t('shopping_cart.delivery_tab.name_placeholder')"
                    :class="{ 'border-danger': reciever_validate.shipping_first_name.$error }"
                    v-model.trim="reciever_validate.shipping_first_name.$model" 
                    @blur="reciever_validate.shipping_first_name.$touch"/>
                  <h4 class="text-danger flex flex-col sm:flex-row"> 
                    <template v-for="(error,index) in reciever_validate.shipping_first_name.$errors" :key="index">
                      <span>{{ error.$message }}</span>
                      <span v-if="index+1 !== reciever_validate.shipping_first_name.$errors.length"
                          class="hidden sm:block mx-1">/</span>
                    </template>
                  </h4>
                </div>
              </div>

              <div class="flex flex-col xl:flex-row gap-1 xl:gap-4 w-full">
                <p class="flex-2 mt-2 w-24">{{$t('shopping_cart.delivery_tab.email')}}</p>
                <div class="flex-1">
                  <input type="email" 
                    placeholder="example@gmail.com"
                    class="form-control"
                    :class="{ 'border-danger': reciever_validate.shipping_email.$error }"
                    v-model.trim="reciever_validate.shipping_email.$model" />
                  <h4 class="text-danger flex flex-col sm:flex-row"> 
                    <template v-for="(error,index) in reciever_validate.shipping_email.$errors" :key="index">
                      <span>{{ error.$message }}</span>
                      <span v-if="index+1 !== reciever_validate.shipping_email.$errors.length"
                          class="hidden sm:block mx-1">/</span>
                    </template>
                  </h4>
                </div>
              </div>
            </div>
            
            <div class="flex flex-col xl:flex-row gap-1 xl:gap-4 lg:w-1/2 lg:pr-10"> 
              <p class="flex-2 mt-2 w-24 whitespace-nowrap">{{$t('shopping_cart.delivery_tab.cell_phone')}}</p>
              <div class="flex-1">
                <input type="tel" 
                  class="form-control " placeholder=""
                  :class="{ 'border-danger': reciever_validate.shipping_cellphone.$error }"
                  v-model.trim="reciever_validate.shipping_cellphone.$model" />
                <h4 class="text-danger flex flex-col sm:flex-row"> 
                  <template v-for="(error,index) in reciever_validate.shipping_cellphone.$errors" :key="index">
                    <span>{{ error.$message }}</span>
                    <span v-if="index+1 !== reciever_validate.shipping_cellphone.$errors.length"
                        class="hidden sm:block mx-1">/</span>
                  </template>
                </h4>
              </div>
            </div>

          </div>

          <template v-if="props.store?.cart?.campaign?.meta_logistic?.delivery_note">
            <div class="flex flex-col gap-6"> 
              <h3>{{$t('shopping_cart.delivery_tab.note')}}</h3>
              <p class="p-5 form-control whitespace-pre-line border" placeholder="">
                {{props.store?.cart.campaign.meta_logistic.delivery_note}} 
              </p>
            </div>
          </template>
          
          <div class="flex flex-col gap-6"
            v-if="!props.store?.user_subscription?.user_plan?.hide?.order_shipping_remark">
            <h3 class="font-medium text-md">{{$t('shopping_cart.delivery_tab.remark')}}</h3>
            <textarea id="" class="form-control indent-4 h-32" placeholder=""
              v-model="shipping_info.shipping_remark">
            </textarea>
          </div>
        </div>

      </div> 

      <div class="col-span-12 row-start-1 lg:col-span-4 flex flex-col gap-10">
        <div class="intro-y">
          <OrderSummarySkeleton v-if="props.cartLoading"/>
          <OrderSummary class="m-0 2xl:m-5" v-else 
          :deliveryMethod="shipping_info.shipping_method" 
          :deliveryOptionData="deliveryOptionData"
          :role="props.role"
          :layout_store="props.layout_store"
          :store="props.store"
          :campaign_product_dict="props.campaign_product_dict"
          
          
          
          />
        </div>

        <div class="intro-y box lg:col-span-4" v-if="props.role=='customer'">
          <ShoppingCartTableSimple />
        </div>
      </div>
    </div>
    
    <div class="flex my-10">
      <button class="mr-auto rounded-full px-5 w-fit btn btn-outline-primary" @click="props.store.openTab= 1" v-if="props.role=='customer'">
        {{$t('shopping_cart.delivery_tab.previous')}}
      </button>
      <button 
        :show="showCheckoutButton" class="w-fit btn btn-rounded-primary px-5 ml-auto"
        @click="proceed_to_payment()" :disabled="props.store?.user_subscription?.status === sandboxMode || checkoutLoading">

        {{$t('shopping_cart.delivery_tab.proceed_to_payment')}}

      </button>
    </div>

    <Modal :show="checkoutLoading" @hidden="!checkoutLoading" class="text-center" backdrop="static">
        <ModalBody class="">
          <div class="flex flex-col"> 
            <p class="text-lg text-primary font-medium"> {{$t('shopping_cart.delivery_tab.processing')}} </p>
            <LoadingIcon icon="loading_payment"/>
          </div>
        </ModalBody>
    </Modal>

</template>


<script setup>
import OrderSummary from "./OrderSummary2.vue";
import OrderSummarySkeleton from "./skeleton/OrderSummarySkeleton.vue";
import ShoppingCartTableSimple from "./ShoppingCartTable-simple.vue";
import { required, minLength, maxLength, email, integer, helpers, requiredUnless } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import { computed, onMounted,onUnmounted, ref, watch, reactive, toRefs, getCurrentInstance } from "vue";
import { useShoppingCartStore } from "@/stores/lss-shopping-cart";
import { useRoute, useRouter } from "vue-router";
import { buyer_checkout_cart,buyer_get_cvs_map,seller_checkout_cart } from "@/api_v2/cart"
import { buyer_retrieve_latest_order_shipping_info } from "@/api_v2/order"
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"
import { useTwZipcodeStore } from "@/stores/tw-zipcode"
import { useCookies } from 'vue3-cookies'
import i18n from "@/locales/i18n"
import TomSelect from "tom-select";

const { cookies } = useCookies()
const route = useRoute();
const router = useRouter();


const shoppingCartStore = useShoppingCartStore();
const layoutStore = useLSSBuyerLayoutStore();
const twZipcodeStore = useTwZipcodeStore();
const sandboxMode = ref("test")
const showCheckoutButton = ref(false)
const checkoutLoading = ref(false)


const props = defineProps({
  cartLoading: {
      type: Boolean,
      default: true,
  },
  store:{
    type: Object,
    default:{}
  },
  layout_store:{
    type:Object,
    default:{}
  },
  role:{
    type:String,
    default:'customer'
  }, 
  campaign_product_dict:{
    type:Object,
    default:{}
  }
})

const shipping_info= ref({
  shipping_method: "delivery",
  shipping_first_name: "",
  shipping_email: "",
  shipping_cellphone: "",

  shipping_address_1: "",
  shipping_address_2: "",
  shipping_region: "",
  shipping_location: "",
  shipping_postcode: "",
  shipping_property_type:"",

  shipping_remark: "",
  shipping_date: "",
  shipping_time_slot: null,

  delivery_option_index:null,
  pickup_option_index:null
})

const displayDeliveryOptionIndex = ref(null)    
const displayPickupOptionIndex = ref(null)
const deliveryOptionData = ref({})
const pickupOptionData = ref({})
const pickupDatePickerKey = ref(new Date())

const defaultShippingInfo= {
      shipping_method: "delivery",
      shipping_first_name: props.role=='customer'?(props.layout_store?.userInfo?.facebook_info?.name||""):(props.store?.cart?.customer_name||""),
      shipping_date: "",
      shipping_time_slot: null,

      delivery_option_index:null,
      pickup_option_index:null
		}

onMounted(()=>{
  if(!isAnonymousUser && props.role=='customer'){
    buyer_retrieve_latest_order_shipping_info(props.layout_store.alert).then(res=>{
      shipping_info.value = {...shipping_info.value, ...res.data, ...defaultShippingInfo}
      showCheckoutButton.value = true
    })
  }
})

const selectDeliveryOption = (index, option)=>{
  if(index===null){
    displayDeliveryOptionIndex.value = null
    shipping_info.value.delivery_option_index = null
    deliveryOptionData.value = {}
  }else{
    displayDeliveryOptionIndex.value = index
    shipping_info.value.delivery_option_index = props.store?.cart?.campaign?.meta_logistic?.additional_delivery_options.indexOf(option)
    deliveryOptionData.value = option
  }
}

const selectPickupOption = (index, option)=>{
  shipping_info.shipping_date = ""
  shipping_info.shipping_time_slot = null
  pickupDatePickerKey.value = new Date()
  shipping_info.value.pickup_option_index = index
  displayPickupOptionIndex.value = index
  pickupOptionData.value = option
}

const computedDeliveryDates = computed(()=>{
  if(Object.keys(deliveryOptionData.value).length){
    return deliveryOptionData?.value?.delivery_dates||[]
  }else if(props?.store?.cart?.campaign?.meta_logistic?.is_use_delivery_date_enabled){
    return props?.store?.cart?.campaign?.meta_logistic?.delivery_dates||[]
  }
  return []
})

const computedShippingTimeSlots = computed(()=>{

  shipping_info.value.shipping_time_slot = ''

  if(Object.keys(deliveryOptionData.value).length){
    return (deliveryOptionData.value?.delivery_dates||[]).find(delivery_date=>delivery_date.date==shipping_info.value.shipping_date)?.time_slots||[]
  }else if(props?.store?.cart?.campaign?.meta_logistic?.is_use_delivery_date_enabled){
    return (props?.store?.cart?.campaign?.meta_logistic?.delivery_dates||[]).find(delivery_date=>delivery_date.date==shipping_info.value.shipping_date)?.time_slots||[]
  }
  return []
})

const computedRegionOptions = computed(()=>{

  const _deliveryServiceRegionDict = {}
  const _deliveryRegionOptions = []
  props.store?.cart?.campaign?.meta_logistic?.additional_delivery_options.forEach(deliveryServiceOption => {

    if(deliveryServiceOption?.region && _deliveryServiceRegionDict?.[deliveryServiceOption?.region]!=true){

      _deliveryRegionOptions.push(deliveryServiceOption.region)
      _deliveryServiceRegionDict[deliveryServiceOption.region]=true
      
    }
  });

  return _deliveryRegionOptions
})

const computedDeliveryServiceOptions = computed(()=>{

  const _deliveryServiceOptions = (props.store?.cart?.campaign?.meta_logistic?.additional_delivery_options||[]).filter(deliveryServiceOption=>deliveryServiceOption.region==shipping_info.value.shipping_region)
  if(_deliveryServiceOptions.length==0){
    displayDeliveryOptionIndex.value = null
    shipping_info.value.delivery_option_index = null
    deliveryOptionData.value = {}
  }else{
    displayDeliveryOptionIndex.value = 0
    shipping_info.value.delivery_option_index = (props.store?.cart?.campaign?.meta_logistic?.additional_delivery_options||[]).indexOf(_deliveryServiceOptions[0])
    deliveryOptionData.value = _deliveryServiceOptions[0]

  }
  return _deliveryServiceOptions

})

const selectShippingMethod = (method)=>{
  shipping_info.value.shipping_date=''
  shipping_info.value.shipping_time_slot = null
  shipping_info.value.shipping_method = method
}


const computedCartSubtotal = computed(()=>{
  var subtotal = 0
  Object.entries(props.store?.cart.products||{}).forEach(([key, qty])=>{
    subtotal += ((props.campaign_product_dict[key]?.price||0)*qty )
  })
  return subtotal
})


const computedProductTotalQuantity = computed(()=>{
  let qty = 0
  Object.entries(props.store?.cart?.products||[]).forEach(([key, value])=>{
    qty += value
  })
  return qty
})

const computedSubtotalOverFreeDeliveryThreshold = computed(()=>{
  return props.store?.cart.campaign?.meta_logistic?.is_free_delivery_for_order_above_price ? computedCartSubtotal.value >= props.store?.cart.campaign?.meta_logistic?.free_delivery_for_order_above_price : false
})

const computedItemsOverFreeDeliveryThreshold = computed(()=>{
  return props.store?.cart.campaign?.meta_logistic?.is_free_delivery_for_how_many_order_minimum ? computedProductTotalQuantity.value >= props.store?.cart.campaign?.meta_logistic?.free_delivery_for_how_many_order_minimum : false
})


const isAnonymousUser=cookies.get("login_with")=='anonymousUser'



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
      maxLength: helpers.withMessage(i18n.global.t("vulidate.exceed_maximum_length", { number:50 }), maxLength(50)),
      minLength: helpers.withMessage(i18n.global.t("vulidate.below_minimum_length", { number:2 }), minLength(2)),
      // bytesBtwLength: helpers.withMessage(i18n.global.t("vulidate.name_between_length", { number:'4-50' }), bytesBtwLength(4,50)),
      specialCharacter: helpers.withMessage(i18n.global.t("vulidate.contains_special_characters") + " ^ ‘ ` ! @ # % & * + ” < > | _ [ ]", specialCharacter)
    },
    shipping_cellphone: {
      integer: helpers.withMessage(i18n.global.t("vulidate.only_integer"), integer),
      required: helpers.withMessage(i18n.global.t("vulidate.required"), required),
      // cellphoneLength: helpers.withMessage(i18n.global.t("vulidate.exact_number_length", {number:10}), exactlength(10)),
      // twCellPhoneBeginning: helpers.withMessage(i18n.global.t("vulidate.tw_cellphone_begining"), twCellPhoneBeginning)
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
      // exactlength: helpers.withMessage(i18n.global.t("vulidate.exact_number_length", {number:3}), exactlength(3)),
    },
    shipping_region: {
      required: helpers.withMessage(i18n.global.t("vulidate.required"), required),
      // exactlength: helpers.withMessage(i18n.global.t("vulidate.exact_number_length", {number:3}), exactlength(3)),
    },
    shipping_postcode: {
      integer: helpers.withMessage(i18n.global.t("vulidate.only_integer"), integer),
      required: helpers.withMessage(i18n.global.t("vulidate.required"), required),
      maxLength: helpers.withMessage(i18n.global.t("vulidate.exceed_maximum_length", { number:6 }), maxLength(6)),
    },
  }}
);

const time_rules = computed(()=>{
  return{
    shipping_date:{required}, 
    shipping_time_slot:{required}
  }}
);

const pickup_time_rules = computed(()=>{
  return{
    shipping_date:{required}, 
    shipping_time_slot:{required}
  }}
);

const reciever_validate = useVuelidate(reciever_rules, shipping_info);
const delivery_validate = useVuelidate(delivery_rules, shipping_info);
const time_validate = useVuelidate(time_rules, shipping_info);
const pickup_time_validate = useVuelidate(pickup_time_rules, shipping_info);

const computedLogisticCategories = computed(()=>{
  let logisticCategories = {}
  Object.entries(props.store?.cart.products).forEach(([key, value])=>{
    if(value>0 && props.campaign_product_dict?.[key]?.categories?.length===1 && props.campaign_product_dict?.[key]?.categories[0] in props.store?.productCategoryDict){
      
      if(logisticCategories?.[props.campaign_product_dict?.[key]?.categories[0]]){
        logisticCategories[props.campaign_product_dict?.[key]?.categories[0]].push({campaignProductId:key,qty:value})
      }else{
        logisticCategories[props.campaign_product_dict?.[key]?.categories[0]] = [{campaignProductId:key,qty:value},]
      }
    }
  })
  return logisticCategories
})

const computedAppliedCategoryLogistic = computed(()=>{
  var applied = false
  Object.entries(computedLogisticCategories.value).forEach(([productCategoryID, objects])=>{
    const productCategory = props.store?.productCategoryDict[productCategoryID]
    if(productCategory?.meta_logistic?.enable_flat_rate) applied = true
  })
  return applied
})

const proceed_to_payment = () =>{
  
  if(shipping_info.value.shipping_method=='delivery'){
    delivery_validate.value.$touch();
    if (delivery_validate.value.$invalid ){
      props.layout_store.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_delivery_info'))
      return
    }
  }
  
  if(shipping_info.value.shipping_method=='delivery' && props.store?.cart.campaign.meta_logistic.is_use_delivery_date_enabled){
    time_validate.value.$touch();
    if (time_validate.value.$invalid){
      props.layout_store.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_time_info'))
      return
    }
  }
  
  if(shipping_info.value.shipping_method=='pickup'){
    pickup_time_validate.value.$touch();
    if (pickup_time_validate.value.$invalid){
      props.layout_store.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_time_info'))
      return
    }
  }

  //CHECK RECIEVER INFO
  reciever_validate.value.$touch();
  if (reciever_validate.value.$invalid) {
    props.layout_store.alert.showMessageToast(i18n.global.t('shopping_cart.invalid_user_info'))
    return
  }


  checkoutLoading.value = true
  
  if(props.role=='customer'){
    buyer_checkout_cart(route.params.cart_oid, {shipping_data:shipping_info.value, points_used:props.store?.points_used||0}, props.layout_store.alert)
    .then(res=>{
      if(res.data.oid){
        router.push({name:"buyer-order-payment-page", params:{'order_oid':res.data.oid}})
      }else{
        props.store.cart = res.data
        props.layout_store.alert.showMessageToast(i18n.global.t('shopping_cart.add_item.out_of_stock'))
      }
      checkoutLoading.value = false
    })
    .catch(err=>{checkoutLoading.value = false})
  }else if(props.role=='seller'){
    seller_checkout_cart(route.params.cart_id, {shipping_data:shipping_info.value}, props.layout_store.alert)
    .then(res=>{
      if(res.data.oid){
        router.push({name:"seller-campaign-order-detail", params:{'campaign_id':route.params.campaign_id,'order_id':res.data.id}})
      }else{
        props.store.cart = res.data
        props.layout_store.alert.showMessageToast(i18n.global.t('shopping_cart.add_item.out_of_stock'))
      }
      checkoutLoading.value = false
    })
    .catch(err=>{checkoutLoading.value = false})
  }
  
  
}


</script>

<style scoped>

/* 大標題 */
h2{
  font-size: 20px; 
  font-weight: 500; 
}
/* 副標 */
h3{
  font-size: 16px; 
  font-weight: 500; 
}

h4{
  font-size: 14px; 
}

p{
  font-size: 16px; 
}

.logistic-options{
  display: flex;
  flex-direction:row;
  align-items:center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px 40px 20px 48px;
  min-height: 80px;
  cursor: pointer;
}

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