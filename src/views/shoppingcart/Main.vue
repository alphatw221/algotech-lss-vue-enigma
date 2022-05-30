<template>
  <!-- BEGIN: Wizard Layout -->
  <div class="intro-y box py-10 sm:py-20 mt-5">
    <TabGroup class="w-full">
      <TabList class="absolute top-0 nav-button-tabs">
        <Tab>
          <div
            class="
              intro-x
              lg:text-center
              flex
              items-center
              lg:mt-0 lg:block
              flex-1
              z-10
            "
          >
            <button
              class="
                w-12
                h-12
                rounded-full
                btn
                bg-primary
                text-slate-500
                bg-slate-100
                dark:bg-darkmode-400 dark:border-darkmode-400
              "
            >
              <ShoppingCartIcon />
            </button>
            <div
              class="
                lg:w-32
                text-base
                lg:mt-1
                ml-3
                lg:mx-auto
                text-slate-600
                dark:text-slate-400
              "
            >
              Shopping Cart
            </div>
          </div>
        </Tab>

        <Tab>
          <div
            class="
              intro-x
              lg:text-center
              flex
              items-center
              mt-5
              lg:mt-0 lg:block
              flex-1
              z-10
            "
          >
            <button
              class="
                w-12
                h-12
                rounded-full
                btn
                text-slate-500
                bg-slate-100
                dark:bg-darkmode-400 dark:border-darkmode-400
              "
            >
              <TruckIcon />
            </button>
            <div
              class="
                lg:w-32
                text-base
                lg:mt-1
                ml-3
                lg:mx-auto
                text-slate-600
                dark:text-slate-400
              "
            >
              Delivery
            </div>
          </div>
        </Tab>

        <Tab>
          <div
            class="
              intro-x
              lg:text-center
              flex
              items-center
              mt-5
              lg:mt-0 lg:block
              flex-1
              z-10
            "
          >
            <button
              class="
                w-12
                h-12
                rounded-full
                btn
                text-slate-500
                bg-slate-100
                dark:bg-darkmode-400 dark:border-darkmode-400
              "
            >
              <CreditCardIcon />
            </button>
            <div
              class="
                lg:w-32
                text-base
                lg:mt-1
                ml-3
                lg:mx-auto
                text-slate-600
                dark:text-slate-400
              "
            >
              Payment
            </div>
          </div>
        </Tab>
      </TabList>

      <TabPanels class="w-full h-full mt-5">
        <TabPanel>
          <div>My Cart</div>
          <div class="box grid grid-cols-12 gap-4">
            <div
              class="overflow-x-auto col-span-12 2xl:col-span-7 lg:col-span-7"
            >
              <ShoppingCartTable
                :requestUrl="'.'"
                :columns="tableColumns"
                :product="products"
              >
              </ShoppingCartTable>
            </div>
            <div
              class="
                col-span-10
                2xl:col-start-8
                col-span-5
                lg:col-start-8
                col-span-5
              "
            >
              <OrderSummary :page_type="'stap1'"> </OrderSummary>
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
        </TabPanel>
        <TabPanel class="leading-relaxed p-5">
          <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
            <h2 class="text-xl font-medium mr-auto">Contact Information</h2>
          </div>
          <div class="intro-y grid grid-cols-12 gap-5">
            <div class="intro-y col-span-12 lg:col-span-8">
              <div class="box p-10 mt-3 intro-y grid grid-cols-12 gap-5 my-10">
                <label
                  for="regular-form-2"
                  class="form-label col-span-4 lg:col-span-2 2xl:col-span-2"
                  >First Name</label
                >
                <input
                  id="regular-form-2"
                  type="text"
                  class="
                    form-control form-control-rounded
                    col-span-8
                    lg:col-span-4
                    2xl:col-span-4
                  "
                  placeholder=""
                />
                <label
                  for="regular-form-2"
                  class="form-label col-span-4 lg:col-span-2 2xl:col-span-2"
                  >Last Name</label
                >
                <input
                  id="regular-form-2"
                  type="text"
                  class="
                    form-control form-control-rounded
                    col-span-8
                    lg:col-span-4
                    2xl:col-span-4
                  "
                  placeholder=""
                />
                <label
                  for="regular-form-2"
                  class="form-label col-span-4 lg:col-span-2 2xl:col-span-2"
                  >Email</label
                >
                <input
                  id="regular-form-2"
                  type="text"
                  class="
                    form-control form-control-rounded
                    col-span-8
                    lg:col-span-4
                    2xl:col-span-4
                  "
                  placeholder=""
                />
                <label
                  for="regular-form-2"
                  class="form-label col-span-4 lg:col-span-2 2xl:col-span-2"
                  >Phone</label
                >
                <input
                  id="regular-form-2"
                  type="text"
                  class="
                    form-control form-control-rounded
                    col-span-8
                    lg:col-span-4
                    2xl:col-span-4
                  "
                  placeholder=""
                />
              </div>

              <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
                <h2 class="text-xl font-medium mr-auto mb-5">
                  Shipping Information
                </h2>
              </div>

              <TabGroup>
                <TabList class="nav-boxed-tabs">
                  <Tab
                    class="
                      w-48
                      py-6
                      lg:w-60
                      2xl:w-60
                      xl:py-10
                      2xl:py-10
                      inline-flex
                      border-[#131c34]
                    "
                    tag="button"
                  >
                    <TruckIcon class="block mr-3" /><span class="text-lg"
                      >Delivery</span
                    ></Tab
                  >
                  <Tab
                    class="
                      w-48
                      py-3
                      lg:w-60
                      2xl:w-60
                      xl:py-10
                      2xl:py-10
                      inline-flex
                      border-[#131c34]
                    "
                    tag="button"
                  >
                    <HomeIcon class="block mr-3" /><span class="text-lg"
                      >Collect In Store</span
                    ></Tab
                  >
                </TabList>
                <TabPanels class="mt-5">
                  <TabPanel class="leading-relaxed">
                    <label class="text-md font-medium"
                      >Delivery Information</label
                    >
                    <div class="grid grid-cols-12">
                      <div
                        class="box p-10 mt-3 intro-y col-span-12 gap-5 my-10"
                      >
                        <label
                          for="regular-form-2"
                          class="form-label col-span-12"
                          >Address</label
                        >
                        <input
                          id="regular-form-2"
                          type="text"
                          class="form-control form-control-rounded col-span-12"
                          placeholder=""
                        />
                        <label
                          for="regular-form-2"
                          class="form-label col-span-2"
                          >City</label
                        >
                        <input
                          id="regular-form-2"
                          type="text"
                          class="form-control form-control-rounded col-span-4"
                          placeholder=""
                        />
                        <label
                          for="regular-form-2"
                          class="form-label col-span-2"
                          >State</label
                        >
                        <input
                          id="regular-form-2"
                          type="text"
                          class="form-control form-control-rounded col-span-4"
                          placeholder=""
                        />
                        <label
                          for="regular-form-2"
                          class="form-label col-span-2"
                          >Postal Code</label
                        >
                        <input
                          id="regular-form-2"
                          type="text"
                          class="form-control form-control-rounded col-span-4"
                          placeholder=""
                        />
                      </div>
                    </div>
                    <label class="text-md font-medium">Delivery Option</label>
                    <div class="grid grid-cols-12">
                      <div class="col-span-6">
                        <div class="form-check mt-2">
                          <input
                            id="radio-switch-1"
                            class="form-check-input"
                            type="radio"
                            name=""
                            value=""
                          />
                          <label class="form-check-label" for="radio-switch-1"
                            >Option 1</label
                          >
                        </div>
                        <div class="form-check mt-2">
                          <input
                            id="radio-switch-2"
                            class="form-check-input"
                            type="radio"
                            name=""
                            value=""
                          />
                          <label class="form-check-label" for="radio-switch-2"
                            >Option 2</label
                          >
                        </div>
                        <div class="form-check mt-2">
                          <input
                            id="radio-switch-3"
                            class="form-check-input"
                            type="radio"
                            name=""
                            value=""
                          />
                          <label class="form-check-label" for="radio-switch-3"
                            >Option 3</label
                          >
                        </div>
                      </div>
                      <div class="col-span-6">
                        <div class="form-check mt-2">
                          <label class="form-check-label">USD10</label>
                        </div>
                        <div class="form-check mt-2">
                          <label class="form-check-label">USD10</label>
                        </div>
                        <div class="form-check mt-2">
                          <label class="form-check-label">USD10</label>
                        </div>
                      </div>
                    </div>
                    <div class="text-center mt-10 text-black underline">
                      Load More
                    </div>
                  </TabPanel>
                  <TabPanel class="leading-relaxed">
                    <label class="text-md font-medium">Pickup Option</label>
                    <div class="grid grid-cols-12">
                      <div class="col-span-6">
                        <div>Store</div>
                        <div class="form-check mt-2">
                          <input
                            id="radio-switch-1"
                            class="form-check-input"
                            type="radio"
                            name=""
                            value=""
                          />
                          <label class="form-check-label" for="radio-switch-1"
                            >Store 1</label
                          >
                        </div>
                        <div class="form-check mt-2">
                          <input
                            id="radio-switch-2"
                            class="form-check-input"
                            type="radio"
                            name=""
                            value=""
                          />
                          <label class="form-check-label" for="radio-switch-2"
                            >Store 2</label
                          >
                        </div>
                        <div class="form-check mt-2">
                          <input
                            id="radio-switch-3"
                            class="form-check-input"
                            type="radio"
                            name=""
                            value=""
                          />
                          <label class="form-check-label" for="radio-switch-3"
                            >Store 3</label
                          >
                        </div>
                      </div>
                      <div class="col-span-6">
                        <div>Address</div>
                        <div class="form-check mt-2">
                          <label class="form-check-label"
                            >Add 1, Stress 1, City 1 , State 1 10654</label
                          >
                        </div>
                        <div class="form-check mt-2">
                          <label class="form-check-label"
                            >Add 2, Stress 2, City 2 , State 2 20654</label
                          >
                        </div>
                        <div class="form-check mt-2">
                          <label class="form-check-label"
                            >Add 3, Stress 3, City 3 , State 3 30654</label
                          >
                        </div>
                      </div>
                    </div>
                    <div class="text-center mt-10 text-black underline">
                      Load More
                    </div>
                  </TabPanel>
                </TabPanels>
                <div class="col-span-12 mt-10">
                  <div class="text-md font-medium">
                    Delivery and Collect Note
                  </div>
                  <p
                    id=""
                    class="form-control col-start-1 col-span-12"
                    placeholder=""
                  >
                    Delivery will be shipped after Dragon Boat Festval sorry for
                    the inconvenience we caused.
                  </p>
                </div>
                <div class="col-span-12 mt-10">
                  <div class="text-md font-medium">Remark</div>
                  <textarea
                    id=""
                    class="form-control col-start-1 col-span-12"
                    placeholder=""
                  >
                                  Remark remark remark remark</textarea
                  >
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
                  class="
                    flex
                    items-center
                    px-5
                    py-5
                    sm:py-3
                    border-b border-slate-200/60
                    dark:border-darkmode-400
                  "
                >
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
                      <div class="text-slate-500 mr-5 sm:mr-5">Product 3</div>
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
                      <div class="text-slate-500 mr-5 sm:mr-5">Product 3</div>
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
            <button class="w-full btn btn-primary lg:w-fit 2xl:lg:w-fit">
              Proceed to Payment
            </button>
          </div>

          <!-- END: Order Summary -->
        </TabPanel>
        <TabPanel>
          <div class="grid grid-cols-12 gap-4">
            <div class="col-start-1 col-span-12 lg:col-span-7 2xl:col-span-7">
              <ShippingSummary />
            </div>
            <div class="col-span-12 lg:col-span-5 2xl:col-span-5">
              <OrderSummary />
            </div>
            <div class="col-start-1 col-span-12 lg:col-span-7 2xl:col-span-7">
              <PaymentMethods />
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
  <!-- END: Wizard Layout -->
</template>

<script>
import PaymentMethods from "@/components/box/PaymentMethods.vue";
import OrderSummary from "@/components/box/OrderSummary.vue";
import ShippingSummary from "@/components/box/ShippingSummary.vue";
import ShoppingCartTable from "@/components/table/ShoppingCartTable.vue";

export default {
  components: {
    PaymentMethods,
    OrderSummary,
    ShippingSummary,
    ShoppingCartTable,
  },
  data() {
    return {
      tableColumns: [
        { name: " ", key: "image" },
        { name: "Product", key: "product" },
        { name: "Q'TY", key: "qty" },
        { name: "Price", key: "price" },
        { name: "Subtotal", key: "subtotal" },
        { name: " ", key: "remove" },
      ],
      products: [
        {
          img: "",
          name: "cookie",
          price: 10.0,
          qty: 3,
        },
        {
          img: "",
          name: "car",
          price: 10000.0,
          qty: 1,
        },
        {
          img: "",
          name: "pooo",
          price: 1024.0,
          qty: 10,
        },
      ],
    };
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
};
</script>

<style scoped>
</style>
