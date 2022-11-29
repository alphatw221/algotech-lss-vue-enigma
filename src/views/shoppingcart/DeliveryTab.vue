<template>
  <div
    :class="{
      hidden: shoppingCartStore.openTab !== 2,
      block: shoppingCartStore.openTab === 2,
    }"
  >
    <div class="grid grid-cols-12 gap-5 intro-y">
      <div class="col-span-12 row-start-2 intro-y lg:row-start-1 lg:col-span-8">
        <h2 class="w-full mr-auto text-xl font-medium">
          {{ $t("shopping_cart.delivery_tab.contact_info") }}
        </h2>
        <div class="grid grid-cols-12 gap-5 p-0 my-10 mt-3 intro-y lg:p-10">
          <label
            for="regular-form-2"
            class="col-span-4 form-label lg:col-span-2 my-auto"
          >
            {{ $t("shopping_cart.delivery_tab.first_name") }}</label
          >
          <div class="col-span-8 lg:col-span-4">
            <input
              id="regular-form-2"
              type="text"
              class="col-span-8 form-control lg:col-span-4"
              placeholder=""
              :class="{
                'border-danger': reciever_validate.shipping_first_name.$error,
              }"
              v-model.trim="reciever_validate.shipping_first_name.$model"
              @blur="reciever_validate.shipping_first_name.$touch"
            />
            <template v-if="reciever_validate.shipping_first_name.$error">
              <label class="mt-2 text-danger">
                {{ $t("shopping_cart.delivery_tab.first_err") }}
              </label>
            </template>
          </div>
          <label
            for="regular-form-2"
            class="col-span-4 form-label lg:col-span-2 my-auto"
          >
            {{ $t("shopping_cart.delivery_tab.last_name") }}</label
          >
          <div class="col-span-8 lg:col-span-4">
            <input
              id="regular-form-2"
              type="text"
              class="form-control"
              placeholder=""
              :class="{
                'border-danger': reciever_validate.shipping_last_name.$error,
              }"
              v-model.trim="reciever_validate.shipping_last_name.$model"
            />
            <template v-if="reciever_validate.shipping_last_name.$error">
              <label class="mt-2 text-danger">
                {{ $t("shopping_cart.delivery_tab.last_err") }}
              </label>
            </template>
          </div>
          <label
            for="regular-form-2"
            class="col-span-4 form-label lg:col-span-2 my-auto"
            >{{ $t("shopping_cart.delivery_tab.email") }}</label
          >
          <div class="col-span-8 lg:col-span-4">
            <input
              id="regular-form-2"
              type="email"
              placeholder="example@gmail.com"
              class="form-control"
              :class="{
                'border-danger': reciever_validate.shipping_email.$error,
              }"
              v-model.trim="reciever_validate.shipping_email.$model"
            />
            <template v-if="reciever_validate.shipping_email.$error">
              <label
                v-for="(error, index) in reciever_validate.shipping_email
                  .$errors"
                :key="index"
                class="mt-2 text-danger"
              >
                {{ $t(`shopping_cart.delivery_tab.` + error.$message) }}
              </label>
            </template>
          </div>

          <label
            for="regular-form-2"
            class="col-span-4 form-label lg:col-span-2 my-auto"
            >{{ $t("shopping_cart.delivery_tab.phone") }}</label
          >
          <div class="col-span-8 lg:col-span-4">
            <input
              id="regular-form-2"
              type="tel"
              class="form-control"
              placeholder=""
              :class="{
                'border-danger': reciever_validate.shipping_phone.$error,
              }"
              v-model.trim="reciever_validate.shipping_phone.$model"
            />
            <template v-if="reciever_validate.shipping_phone.$error">
              <label class="mt-2 text-danger">
                {{ $t("shopping_cart.delivery_tab.phone_err") }}
              </label>
            </template>
          </div>
        </div>

        <div class="flex flex-col items-center mt-8 intro-y sm:flex-row">
          <h2 class="mb-5 mr-auto text-xl font-medium">
            {{ $t("shopping_cart.delivery_tab.shipping_info") }}
          </h2>
        </div>

        <TabGroup>
          <TabList
            class="flex items-center justify-around w-full nav-boxed-tabs grow"
          >
            <Tab
              class="w-[95%] h-14 border-[#131c34] lg:w-64 flex"
              tag="button"
              @click="select_shipping_method('delivery')"
            >
              <div class="inline-flex items-center grow place-content-center">
                <SimpleIcon
                  icon="delivery"
                  :color="deliveryColor"
                  class="block mr-3"
                  width="24"
                />
                <span class="text-sm lg:text-lg">{{
                  $t("shopping_cart.delivery_tab.home_delivery")
                }}</span>
              </div>
            </Tab>
            <template
              v-if="
                shoppingCartStore.cart.campaign &&
                shoppingCartStore.cart.campaign.meta_logistic.pickup_options
              "
            >
              <Tab
                v-if="
                  shoppingCartStore.cart.campaign.meta_logistic.pickup_options
                    .length !== 0
                "
                class="w-[95%] h-14 border-[#131c34] lg:w-64 flex"
                tag="button"
                @click="select_shipping_method('pickup')"
              >
                <div class="inline-flex items-center grow place-content-center">
                  <SimpleIcon
                    icon="store"
                    :color="pickupColor"
                    class="block mr-3"
                    width="24"
                  />
                  <span class="text-sm lg:text-lg">{{
                    $t("shopping_cart.delivery_tab.self_pickup")
                  }}</span>
                </div>
              </Tab>
            </template>
          </TabList>

          <TabPanels class="mt-5">
            <!-- BEGIN Delivery Panel -->
            <TabPanel class="leading-relaxed">
              <label class="font-medium text-md">{{
                $t("shopping_cart.delivery_tab.delivery_info")
              }}</label>
              <div class="flex flex-col">
                <div class="gap-5 p-8 intro-y">
                  <label for="regular-form-2" class="my-2 form-label">{{
                    $t("shopping_cart.delivery_tab.address")
                  }}</label>
                  <div>
                    <input
                      id="regular-form-2"
                      type="text"
                      class="form-control"
                      placeholder=""
                      :class="{
                        'border-danger':
                          delivery_validate.shipping_address_1.$error,
                      }"
                      v-model.trim="delivery_validate.shipping_address_1.$model"
                    />
                    <template
                      v-if="delivery_validate.shipping_address_1.$error"
                    >
                      <label class="mt-2 text-danger">
                        {{ $t("shopping_cart.delivery_tab.address_err") }}
                      </label>
                    </template>
                  </div>
                  <label for="regular-form-2" class="my-2 form-label">{{
                    $t("shopping_cart.delivery_tab.city")
                  }}</label>
                  <div>
                    <input
                      id="regular-form-2"
                      type="text"
                      class="form-control"
                      placeholder=""
                      :class="{
                        'border-danger':
                          delivery_validate.shipping_location.$error,
                      }"
                      v-model.trim="delivery_validate.shipping_location.$model"
                    />
                    <template v-if="delivery_validate.shipping_location.$error">
                      <label class="mt-2 text-danger">
                        {{ $t("shopping_cart.delivery_tab.city_err") }}
                      </label>
                    </template>
                  </div>
                  <label for="regular-form-2" class="my-2 form-label">{{
                    $t("shopping_cart.delivery_tab.state")
                  }}</label>
                  <div>
                    <input
                      id="regular-form-2"
                      type="text"
                      class="form-control"
                      placeholder=""
                      :class="{
                        'border-danger':
                          delivery_validate.shipping_region.$error,
                      }"
                      v-model.trim="delivery_validate.shipping_region.$model"
                    />
                    <template v-if="delivery_validate.shipping_region.$error">
                      <label class="mt-2 text-danger">
                        {{ $t("shopping_cart.delivery_tab.state_err") }}
                      </label>
                    </template>
                  </div>
                  <label for="regular-form-2" class="my-2 form-label">{{
                    $t("shopping_cart.delivery_tab.postal_code")
                  }}</label>
                  <div>
                    <input
                      id="regular-form-2"
                      type="text"
                      class="form-control"
                      placeholder=""
                      :class="{
                        'border-danger':
                          delivery_validate.shipping_postcode.$error,
                      }"
                      v-model.trim="delivery_validate.shipping_postcode.$model"
                    />
                    <template v-if="delivery_validate.shipping_postcode.$error">
                      <label class="mt-2 text-danger">
                        {{ $t("shopping_cart.delivery_tab.postal_code_err") }}
                      </label>
                    </template>
                  </div>
                </div>
                <!-- BEGIN Delivery Option -->
                <label class="font-medium text-md">{{
                  $t("shopping_cart.delivery_tab.option.delivery")
                }}</label>
                <div class="gap-5 mx-0 intro-y lg:mx-20">
                  <template v-if="shoppingCartStore.cart.campaign">
                    <div
                      class="
                        flex flex-row flex-wrap
                        px-10
                        py-6
                        my-4
                        border-2
                        rounded-lg
                        form-check
                      "
                      :class="{
                        'border-slate-600':
                          shipping_option_index_computed == null,
                      }"
                    >
                      <div>
                        <input
                          :id="'radio-switch-'"
                          class="form-check-input"
                          type="radio"
                          name="vertical_radio_button"
                          :value="null"
                          v-model="shipping_option_index_computed"
                        />
                        <label
                          class="mr-auto form-check-label whitespace-nowrap"
                          :for="'radio-switch-'"
                          >{{
                            $t("shopping_cart.delivery_tab.option.default")
                          }}</label
                        >
                      </div>
                      <div class="ml-auto">
                        <label class="form-check-label">
                          {{ shoppingCartStore.cart.campaign.currency }}
                          {{
                            (
                              Math.floor(
                                parseFloat(
                                  shoppingCartStore.cart.campaign.meta_logistic
                                    .delivery_charge
                                ) *
                                  10 **
                                    shoppingCartStore.cart.campaign
                                      .decimal_places
                              ) /
                              10 **
                                shoppingCartStore.cart.campaign.decimal_places
                            ).toLocaleString("en-GB")
                          }}
                          {{
                            shoppingCartStore.cart.campaign.price_unit
                              ? $t(
                                  `global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`
                                )
                              : ""
                          }}</label
                        >
                      </div>
                    </div>
                    <template
                      v-for="(option, index) in shoppingCartStore.cart.campaign
                        .meta_logistic.additional_delivery_options"
                      :key="index"
                    >
                      <div
                        class="
                          flex flex-row flex-wrap
                          px-10
                          py-6
                          my-4
                          border-2
                          rounded-lg
                          form-check
                          gap-2
                        "
                        :class="{
                          'border-slate-600':
                            shipping_option_index_computed == index,
                        }"
                      >
                        <div>
                          <input
                            :id="'radio-switch-' + index"
                            class="form-check-input"
                            type="radio"
                            name="vertical_radio_button"
                            :value="index"
                            v-model="shipping_option_index_computed"
                          />
                          <label
                            class="mr-auto form-check-label"
                            :for="'radio-switch-' + index"
                            >{{ option.title }}</label
                          >
                        </div>

                        <template v-if="option.type === '+'">
                          <label
                            class="form-check-label whitespace-nowrap ml-auto"
                          >
                            {{ shoppingCartStore.cart.campaign.currency }}
                            {{
                              (
                                Math.floor(
                                  (parseFloat(option.price) +
                                    parseFloat(
                                      shoppingCartStore.cart.campaign
                                        .meta_logistic.delivery_charge
                                    )) *
                                    10 **
                                      shoppingCartStore.cart.campaign
                                        .decimal_places
                                ) /
                                10 **
                                  shoppingCartStore.cart.campaign.decimal_places
                              ).toLocaleString("en-GB")
                            }}
                            {{
                              shoppingCartStore.cart.campaign.price_unit
                                ? $t(
                                    `global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`
                                  )
                                : ""
                            }}</label
                          >
                        </template>
                        <template v-else>
                          <label
                            class="form-check-label whitespace-nowrap ml-auto"
                          >
                            {{ shoppingCartStore.cart.campaign.currency }}
                            {{
                              (
                                Math.floor(
                                  parseFloat(option.price) *
                                    10 **
                                      shoppingCartStore.cart.campaign
                                        .decimal_places
                                ) /
                                10 **
                                  shoppingCartStore.cart.campaign.decimal_places
                              ).toLocaleString("en-GB")
                            }}
                            {{
                              shoppingCartStore.cart.campaign.price_unit
                                ? $t(
                                    `global.price_unit.${shoppingCartStore.cart.campaign.price_unit}`
                                  )
                                : ""
                            }}</label
                          >
                        </template>
                      </div>
                    </template>

                    <div
                      class="flex flex-col flex-wrap"
                      v-if="
                        shoppingCartStore.cart.campaign.meta_logistic
                          .delivery_date?.start_at
                      "
                    >
                      <label
                        class="
                          text-base text-[14px]
                          font-medium
                          whitespace-nowrap
                          lg:-mx-20
                        "
                        >{{
                          $t("shopping_cart.delivery_tab.delivery_date")
                        }}</label
                      >
                      <v-date-picker
                        class="z-49"
                        v-model="shipping_info.shipping_date_time"
                        :timezone="timezone"
                        :columns="$screens({ default: 1 })"
                        mode="datetime"
                        is-required
                        is24hr
                        :min-date="
                          shoppingCartStore.cart.campaign.meta_logistic
                            .delivery_date.start_at
                        "
                        :max-date="
                          shoppingCartStore.cart.campaign.meta_logistic
                            .delivery_date.end_at
                        "
                      >
                        <template v-slot="{ inputValue, inputEvents }">
                          <input
                            :value="inputValue"
                            v-on="inputEvents"
                            @click="shipping_info.shipping_date_time = null"
                            class="
                              form-control
                              border
                              h-[42px]
                              px-10
                              py-6
                              w-42
                              rounded-lg
                              focus:outline-none focus:border-indigo-400
                            "
                          />
                        </template>
                      </v-date-picker>
                    </div>
                  </template>
                </div>
                <!-- END Delivery Option -->
              </div>
            </TabPanel>
            <!-- END Delivery Panel -->

            <!-- BEGIN Pickup Panel -->
            <TabPanel class="leading-relaxed">
              <label class="font-medium text-md">{{
                $t("shopping_cart.delivery_tab.option.pickup")
              }}</label>
              <template v-if="shoppingCartStore.cart.campaign">
                <template
                  v-for="(option, index) in shoppingCartStore.cart.campaign
                    .meta_logistic.pickup_options"
                  :key="index"
                >
                  <div
                    class="
                      flex flex-row
                      justify-between
                      form-check
                      px-5
                      sm:px-10
                      py-6
                      border-2
                      rounded-lg
                      lg:mx-20
                      z-0
                      my-5
                    "
                    :class="{
                      'border-slate-600':
                        shipping_option_index_computed == index,
                    }"
                  >
                    <input
                      class="form-check-input mr-5 flex-0 w-4"
                      type="radio"
                      :name="'pickup-switch-' + index" 
                      v-model="shipping_option_index_computed"
                      :value="index"
                      />

                      <div class="flex flex-col sm:flex-row flex-0 w-full"> 
                        <div class="flex flex-col mr-auto"> 
                          <label class="form-check-label font-medium flex-0" :for="'pickup-switch-' + index">{{ option.name }} </label>  
                          <label class="form-check-label flex-0" :for="'pickup-switch-' + index">{{
                              option.address
                          }}</label>
                        </div> 
 
                        <template v-if=" !['',null,undefined,' '].includes(option.start_at) && !['',null,undefined,' '].includes(option.end_at)"> 
                          <label class="form-check-label flex-0 my-auto">{{new Date(option.start_at).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})
                            +'~'+
                            new Date(option.end_at).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}}</label>
                        </template>
                    </div>
                  </div>
                </template>

                <template
                  v-if="
                    shoppingCartStore.cart.campaign.meta_logistic
                      ?.pickup_options[pickup_select_index]?.start_at
                  "
                >
                  <label class="font-medium text-md whitespace-nowrap">{{
                    $t("shopping_cart.delivery_tab.pickup_date")
                  }}</label>
                  <!-- pickup time-->
                  <div class="flex flex-col flex-wrap lg:mx-20 z-20">
                    <v-date-picker
                      class="z-50"
                      v-model="shipping_info.shipping_date_time"
                      :timezone="timezone"
                      :columns="$screens({ default: 1 })"
                      mode="datetime"
                      is-required
                      is24hr
                      :min-date="date_range.start"
                      :max-date="date_range.end"
                    >
                      <template v-slot="{ inputValue, inputEvents }">
                        <input
                          :value="inputValue"
                          v-on="inputEvents"
                          class="
                            form-control
                            border
                            h-[42px]
                            px-10
                            py-6
                            w-42
                            rounded-lg
                            focus:outline-none focus:border-indigo-400
                          "
                        />
                      </template>
                    </v-date-picker>
                  </div>
                </template>
              </template>
            </TabPanel>
            <!-- END Pickup Panel -->
          </TabPanels>

          <div class="col-span-12 mt-10">
            <div class="font-medium text-md">
              {{ $t("shopping_cart.delivery_tab.note") }}
            </div>
            <p
              id=""
              class="
                col-span-12 col-start-1
                p-5
                form-control
                whitespace-pre-line
              "
              placeholder=""
              v-if="shoppingCartStore.cart.campaign"
            >
              {{ shoppingCartStore.cart.campaign.meta_logistic.delivery_note }}
            </p>
          </div>
        </TabGroup>

        <div
          class="col-span-12 mt-10"
          v-if="
            !shoppingCartStore.user_subscription?.user_plan?.hide
              ?.order_shipping_remark
          "
        >
          <div class="font-medium text-md">
            {{ $t("shopping_cart.delivery_tab.remark") }}
          </div>
          <textarea
            id=""
            class="col-span-12 col-start-1 form-control indent-4"
            placeholder=""
            v-model="shipping_info.shipping_remark"
          >
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
      <button
        class="mr-auto rounded-full w-fit btn btn-outline-primary"
        @click="shoppingCartStore.openTab = 1"
      >
        {{ $t("shopping_cart.delivery_tab.previous") }}
      </button>

      <button
        :show="show"
        v-if="checkoutLoading"
        class="w-fit btn btn-rounded-primary"
      >
        {{ $t("shopping_cart.delivery_tab.proceed_to_payment") }}
        <LoadingIcon
          icon="three-dots"
          color="1a202c"
          class="absolute w-12 h-fit"
        />
      </button>
      <button
        :show="show"
        v-else
        class="w-fit btn btn-rounded-primary"
        @click="proceed_to_payment"
        :disabled="shoppingCartStore.user_subscription.status === sandboxMode"
      >
        {{ $t("shopping_cart.delivery_tab.proceed_to_payment") }}
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
// import { buyer_update_delivery_info } from "@/api_v2/pre_order"
import { buyer_checkout_cart } from "@/api_v2/cart";
import { buyer_retrieve_latest_order_shipping_info } from "@/api_v2/order";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout";
import { useCookies } from "vue3-cookies";
import i18n from "@/locales/i18n";
const { cookies } = useCookies();
const route = useRoute();
const router = useRouter();
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const shoppingCartStore = useShoppingCartStore();
const layoutStore = useLSSBuyerLayoutStore();
const sandboxMode = ref("test");
const show = ref(false);
const checkoutLoading = ref(false);
const pickupdatePicker = ref(null);
const date_range = ref({
  start: new Date(),
  end: new Date(),
});
const pickup_select_index = ref(null);
const shipping_info = ref({
  shipping_option: "",
  shipping_option_index: null,
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
  shipping_date_time: new Date(),
  shipping_time: null,
  pickup_address: "",

  shipping_option_data: {},
});

const shipping_option_index_computed = computed({
  get:()=>{
    return shipping_info.value.shipping_option_index
  },set:index=>{
    shipping_info.value.shipping_date_time = shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index].start_at
    date_range.value.start = shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index].start_at
    date_range.value.end = shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index].end_at
    pickup_select_index.value = index
    shipping_info.value.shipping_option_index=index
    shoppingCartStore.shipping_info.shipping_option_index=index
    shipping_info.value.pickup_address=shipping_info.value.shipping_method=='pickup'?shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index]?.address : ''

    shipping_info.value.shipping_option=shipping_info.value.shipping_method=='pickup'?shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index]?.name :shipping_info.value.shipping_method=='delivery' && index!=null ? shoppingCartStore.cart.campaign.meta_logistic.additional_delivery_options[index]?.title : ''
    
    if(shipping_info.value.shipping_method=='pickup'){
      shipping_info.value.shipping_option_data = JSON.parse(JSON.stringify(shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index]))
    }else{
      shipping_info.value.shipping_option_data = index == null ? {} : JSON.parse(JSON.stringify(shoppingCartStore.cart.campaign.meta_logistic.additional_delivery_options[index]))
    }
  },
});

const shipping_method_computed = computed({
  get:()=>{
    return shipping_info.value.shipping_method
  },set:method=>{

    shipping_info.value.shipping_option_index = null
    shoppingCartStore.shipping_info.shipping_option_index = null  //order summary compute this
    shipping_info.value.shipping_method=method
    shoppingCartStore.shipping_info.shipping_method=method        //order summary compute this
  }})

const isAnonymousUser=cookies.get("login_with")=='anonymousUser'

onMounted(()=>{
  if(!isAnonymousUser){
    buyer_retrieve_latest_order_shipping_info(layoutStore.alert).then(res=>{

const pickup_date_range = (index) => {
  date_range.value.start =
    shoppingCartStore.cart.campaign.meta_logistic.pickup_options[
      index
    ].start_at;
  date_range.value.end =
    shoppingCartStore.cart.campaign.meta_logistic.pickup_options[index].end_at;
  pickup_select_index.value = index;
  // console.log(shoppingCartStore.cart.campaign.meta_logistic)
};

onMounted(() => {
  if (!isAnonymousUser) {
    buyer_retrieve_latest_order_shipping_info(layoutStore.alert).then((res) => {
      res.data.shipping_method = "delivery"; //default value
      res.data.shipping_option_index = null; //default value
      res.data.shipping_option_data = {}; //default value
      shipping_info.value = res.data;
      show.value = true;
    });
  }
});

const deliveryColor = ref("white");
const pickupColor = ref("#131C34");
const select_shipping_method = (method) => {
  shipping_method_computed.value = method;
  deliveryColor.value = method == "delivery" ? "white" : "#131C34";
  pickupColor.value = method == "pickup" ? "white" : "#131C34";
};

const reciever_rules = computed(() => {
  return {
    shipping_first_name: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50),
    },
    shipping_last_name: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50),
    },
    shipping_phone: {
      required,
      integer,
      minLength: minLength(1),
      maxLength: maxLength(50),
    },
    shipping_email: { required, email, maxLength: maxLength(255) },
  };
});

const delivery_rules = computed(() => {
  return {
    shipping_address_1: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(255),
    },
    shipping_location: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(255),
    },
    shipping_region: { maxLength: maxLength(255) },
    shipping_postcode: { maxLength: maxLength(50) },
  };
});

const reciever_validate = useVuelidate(reciever_rules, shipping_info);
const delivery_validate = useVuelidate(delivery_rules, shipping_info);

const proceed_to_payment = () => {
  reciever_validate.value.$touch();

  if (reciever_validate.value.$invalid) {
    layoutStore.alert.showMessageToast(
      i18n.global.t("shopping_cart.invalid_user_info")
    );
    return;
  }

  if (shipping_info.value.shipping_method === "delivery") {
    delivery_validate.value.$touch();

    if (shipping_info.value.shipping_option_index === "") {
      layoutStore.alert.showMessageToast("select shipping method");
      return;
    } else if (delivery_validate.value.$invalid) {
      layoutStore.alert.showMessageToast(
        i18n.global.t("shopping_cart.invalid_delivery_info")
      );
      return;
    }
  }

  // if (!confirm(i18n.global.t('shopping_cart.checkout_message')))return

  checkoutLoading.value = true;
  buyer_checkout_cart(
    route.params.cart_oid,
    {
      shipping_data: shipping_info.value,
      points_used: shoppingCartStore.points_used,
    },
    layoutStore.alert
  )
    .then((res) => {
      if (res.data.oid) {
        router.push({
          name: "buyer-order-payment-page",
          params: { order_oid: res.data.oid },
        });
      } else {
        shoppingCartStore.cart = res.data;
        layoutStore.alert.showMessageToast("out of stock");
      }
      checkoutLoading.value = false;
    })
    .catch((err) => {
      checkoutLoading.value = false;
    });
};
</script>

<style scoped>
.homeTab {
  border-radius: 0px !important;
}

.nav-item {
  justify-content: center;
  display: flex !important;
}
</style>