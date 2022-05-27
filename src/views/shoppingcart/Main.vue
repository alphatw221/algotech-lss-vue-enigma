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
              :style="filterStyle"
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
            <div class="overflow-x-auto col-span-12 2xl:col-span-7 lg:col-span-7">
              <ShoppingCartTable
                :requestUrl="'.'"
                :columns="tableColumns"
                :product="products"
              >
              </ShoppingCartTable>
            </div>
            <div class="col-span-10 2xl:col-start-8 col-span-5 lg:col-start-8 col-span-5">
              <OrderSummary
                :page_type="'stap1'"
              >
              </OrderSummary>
            </div>
          </div>
          <div class="box grid grid-cols-12 gap-4 ml-4 mr-4">
            <div class="overflow-x-auto col-start-1 col-span-7">
              <div><span class="text-lg">Special Note:</span></div>
              <div class="flex"><div class="mr-auto">Special Note!!!!!!!!!!!!!!!!!!!!</div></div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>2</TabPanel>
        <TabPanel>
          <div class="grid grid-cols-12 gap-4">
            <div class="col-start-1 col-span-7">
              <ShippingSummary />
              <PaymentMethods />
            </div>
            <div class="col-start-8 col-span-5">
              <OrderSummary />
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
