<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <!-- Tab List-->
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px last:mr-0 flex-auto text-center ml-14">
          <div @click="toggleTabs(1)" class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
            <button :class="{
              'text-neutral-600 bg-white': openTab !== 1,
              'text-white bg-primary': openTab === 1,
            }"
              class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
              <ShoppingCartIcon />
            </button>
            <div
              class="w-0 invisible lg:visible 2xl:visible lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
              :class="{
                'text-neutral-600': openTab !== 1,
                'font-bold': openTab === 1,
              }">
              Shopping Cart
            </div>
          </div>
        </li>
        <li class="-mb-px last:mr-0 flex-auto text-center">
          <div @click="toggleTabs(2)" class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
            <button :class="{
              'text-neutral-600 bg-white': openTab !== 2,
              'text-white bg-primary': openTab === 2,
            }"
              class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
              <TruckIcon />
            </button>
            <div
              class="w-0 invisible lg:visible 2xl:visible lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
              :class="{
                'text-neutral-600': openTab !== 2,
                'font-bold': openTab === 2,
              }">
              Delivery
            </div>
          </div>
        </li>
        <li class="-mb-px last:mr-0 flex-auto text-center">
          <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
            <button 
              class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400">
              <CreditCardIcon />
            </button>
            <div
              class="w-0 invisible lg:visible 2xl:visible lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400"
              >
              Payment
            </div>
          </div>
        </li>
      </ul>
      <div class="box relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
        <div class="px-4 py-5 flex-auto">

          <div class="tab-content tab-space">
            <div :class="{ hidden: openTab !== 1, block: openTab === 1 }">
              <div>My Cart</div>
              <div class="box grid grid-cols-12 gap-4">
                <div class="overflow-x-auto col-span-12 2xl:col-span-7 lg:col-span-7">
                  <ShoppingCartTable :requestUrl="'.'" :columns="tableColumns" :product="products">
                  </ShoppingCartTable>
                </div>
                <div class="col-span-12 2xl:col-start-8 2xl:col-span-5 lg:col-start-8 lg:col-span-5">
                  <OrderSummary :page_type="'step1'"> </OrderSummary>
                </div>
              </div>
              <div class="box grid grid-cols-12 gap-4 ml-4 mr-4">
                <div class="overflow-x-auto col-start-1 col-span-7">
                  <div><span class="text-lg">Special Note:</span></div>
                  <div class="flex">
                    <div class="mr-auto">Special Note!!!!!!!!!!!!!!!!!!!!</div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="{ hidden: openTab !== 2, block: openTab === 2 }">
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
                      placeholder="" />
                    <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">Last
                      Name</label>
                    <input id="regular-form-2" type="text"
                      class="form-control form-control-rounded col-span-8 lg:col-span-4 2xl:col-span-4"
                      placeholder="" />
                    <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">Email</label>
                    <input id="regular-form-2" type="text"
                      class="form-control form-control-rounded col-span-8 lg:col-span-4 2xl:col-span-4"
                      placeholder="" />
                    <label for="regular-form-2" class="form-label col-span-4 lg:col-span-2 2xl:col-span-2">Phone</label>
                    <input id="regular-form-2" type="text"
                      class="form-control form-control-rounded col-span-8 lg:col-span-4 2xl:col-span-4"
                      placeholder="" />
                  </div>

                  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
                    <h2 class="text-xl font-medium mr-auto mb-5">
                      Shipping Information
                    </h2>
                  </div>

                  <TabGroup>
                    <TabList class="nav-boxed-tabs mx-10">
                      <Tab class="w-48 py-6 lg:w-60 2xl:w-60 xl:py-10 2xl:py-10 inline-flex border-[#131c34]"
                        tag="button">
                        <TruckIcon class="block mr-3" /><span class="text-lg">Delivery</span>
                      </Tab>
                      <Tab class="w-48 py-3 lg:w-60 2xl:w-60 xl:py-10 2xl:py-10 inline-flex border-[#131c34]"
                        tag="button">
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
                              placeholder="" />
                            <label for="regular-form-2" class="form-label my-2">City</label>
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded"
                              placeholder="" />
                            <label for="regular-form-2" class="form-label my-2">State</label>
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded"
                              placeholder="" />
                            <label for="regular-form-2" class="form-label my-2">Postal Code</label>
                            <input id="regular-form-2" type="text" class="form-control form-control-rounded"
                              placeholder="" />
                          </div>
                          <label class="text-md font-medium col-span-12">Delivery Option</label>
                          <div class="box p-8 intro-y col-span-12 gap-5 mx-0 lg:mx-20 2xl:mx-20">
                            <div class="flex form-check my-5">
                              <input id="radio-switch-1" class="form-check-input" type="radio"
                                name="vertical_radio_button" value="vertical-radio-chris-evans" />
                              <label class="form-check-label mr-auto" for="radio-switch-1">Option 1</label>
                              <label class="form-check-label" for="radio-switch-1">USD $10</label>
                            </div>
                            <div class="flex form-check my-5">
                              <input id="radio-switch-2" class="form-check-input" type="radio"
                                name="vertical_radio_button" value="vertical-radio-liam-neeson" />
                              <label class="form-check-label mr-auto" for="radio-switch-2">Option 2</label>
                              <label class="form-check-label" for="radio-switch-1">USD $20</label>
                            </div>
                            <div class="flex form-check my-5">
                              <input id="radio-switch-3" class="form-check-input" type="radio"
                                name="vertical_radio_button" value="vertical-radio-daniel-craig" />
                              <label class="form-check-label mr-auto" for="radio-switch-3">Option 3</label>
                              <label class="form-check-label" for="radio-switch-1">USD $30</label>
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
                            <div class="flex form-check my-5">
                              <input id="radio-switch-2" class="form-check-input" type="radio"
                                name="vertical_radio_button" value="vertical-radio-store-2" />
                              <label class="form-check-label mr-auto" for="radio-switch-2">Store 2</label>
                              <label class="form-check-label" for="radio-switch-1">Add 1, Stress 1, City 1 , State 1 10654</label>
                            </div>
                            <div class="flex form-check my-5">
                              <input id="radio-switch-3" class="form-check-input" type="radio"
                                name="vertical_radio_button" value="vertical-radio-store-3" />
                              <label class="form-check-label mr-auto" for="radio-switch-3">Store 3</label>
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
                      <textarea id="" class="form-control col-start-1 col-span-12" placeholder="">
                                  Remark remark remark remark</textarea>
                    </div>
                  </TabGroup>
                </div>

                <!-- BEGIN: Order Summary -->
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
                  @click="this.$router.push('/seller/shopping-payment')">
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderSummary from "@/components/box/OrderSummary.vue";
import ShippingSummary from "@/components/box/ShippingSummary.vue";
import ShoppingCartTable from "@/components/table/ShoppingCartTable.vue";
import { buyer_cart_retrieve } from "@/api_v2/buyer";


export default {
  components: {
    OrderSummary,
    ShippingSummary,
    ShoppingCartTable,
  },
  data() {
    return {
      openTab: 1,
      tableColumns: [
        { name: " ", key: "image" },
        { name: "Product", key: "product" },
        { name: "Q'TY", key: "qty" },
        { name: "Price", key: "price" },
        { name: "Subtotal", key: "subtotal" },
        { name: " ", key: "remove" },
      ],
      products: [],
      orderSummary: {},
      delvery_info:{
        shipping_first_name: "",
        shipping_last_name: "",
        shipping_email: "",
        shipping_phone: "",
        shipping_address_1: "",
        shipping_location: "",
        shipping_region: "",
        shipping_postcode: "",
        shipping_cost: 0.00,
        shipping_option: "",
        shipping_method: "",
        // shipping_date: '1997-01-01',
        total: 0.00,
        //meta: meta,
        shipping_remark: ""
      }
    };
  },
  mounted() {
    this.buyer_cart_retrieve(818)
  },
  computed: {
    filterStyle() {
      if (this.show) {
        return {
          top: 0,
          background: primary,
          marginTop: "15px",
          marginBottom: "15px",
        };
      } else {
        return "";
      }
    },
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber;
    },
    buyer_cart_retrieve(pre_order_id) {
      buyer_cart_retrieve(pre_order_id)
      .then(
        response => {
          for (const [key, value] of Object.entries(response.data['products'])) {
            this.products.push(value)
          }
          this.orderSummary = response.data['pre_order_price_detail']
        }
      )
    }
  },
};
</script>