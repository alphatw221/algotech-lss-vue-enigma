<template>
  <!-- BEGIN: Wizard Layout -->
  <div class="intro-y box py-10 sm:py-20 mt-5">
    <TabGroup class="w-full">
      <TabList>
        <div
          class="
            relative
            w-full
            before:hidden
            before:lg:block
            before:absolute
            before:w-[64%]
            before:h-[3px]
            before:top-0
            before:bottom-0
            before:mt-4
            before:bg-slate-100
            before:dark:bg-darkmode-400
            flex flex-col
            lg:flex-row
            justify-center
            px-5
            sm:px-20
          "
        >
          <Tab>
            <div
              class="
                intro-x
                lg:text-center
                flex
                items-center
                lg:block
                flex-1
                z-10
              "
            >
              <button class="w-10 h-10 rounded-full btn btn-primary">1</button>
              <div
                class="lg:w-32 font-medium text-base lg:mt-3 ml-3 lg:mx-auto"
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
                  w-10
                  h-10
                  rounded-full
                  btn
                  text-slate-500
                  bg-slate-100
                  dark:bg-darkmode-400 dark:border-darkmode-400
                "
              >
                2
              </button>
              <div
                class="
                  lg:w-32
                  text-base
                  lg:mt-3
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
                  w-10
                  h-10
                  rounded-full
                  btn
                  text-slate-500
                  bg-slate-100
                  dark:bg-darkmode-400 dark:border-darkmode-400
                "
              >
                3
              </button>
              <div
                class="
                  lg:w-32
                  text-base
                  lg:mt-3
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
        </div>
      </TabList>

      <TabPanels>
        <TabPanel>
          <div><h1>My Cart</h1></div>
          <div class="overflow-x-auto">
            <ShoppingCartTable
              :columns="tableColumns"
              :product="product"
            >
            </ShoppingCartTable>
          </div>
        </TabPanel>
        <TabPanel>2</TabPanel>
        <TabPanel> c </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
  <!-- END: Wizard Layout -->
</template>

<script>
import ShoppingCartTable from "@/components/table/ShoppingCartTable.vue";
export default {
  components:{
    ShoppingCartTable,
  },
  data() {
    return {
      tableColumns: [
        { name: "Product", key: "product" },
        { name: "Q'TY", key: "qty" },
        { name: "Price", key: "price" },
        { name: "Subtotal", key: "subtotal" },
        { name: " ", key: "remove" },
      ],
      product:[
        {
          img:'',
          name:'cookie',
          price: 10.00,
          qty: 3,
        },
        {
          img:'',
          name:'car',
          price: 10000.00,
          qty: 1,
        },
        {
          img:'',
          name:'pooo',
          price: 1024.00,
          qty: 10,
        }
      ]
    };
  },
  mounted(){
      this.$cookies.set("access_token","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUzODc1MDI1LCJpYXQiOjE2NTMyNzAyMjUsImp0aSI6IjM4MDNmYTdiYzhmZTQyOWFiNDc4OWNmNjcxMThiZGNjIiwidXNlcl9pZCI6NzcsImRhdGEiOnsiYXV0aF91c2VyX2lkIjo3Nywic2VsbGVyX2lkIjo5MCwiY3VzdG9tZXJfaWQiOjEwNCwibmFtZSI6IkplcmVteSBDaG91IiwiZW1haWwiOiJqZXJlbXljaG91QGFjY29sYWRlZ2xvYmFsLm5ldCJ9fQ.XM2nRfhg-h8REC__rAnxIcW-WR3CpUlLKQZ-wXC6FrQ");
  }
};
</script>

