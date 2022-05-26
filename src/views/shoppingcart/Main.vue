<template>
<!-- BEGIN: Wizard Layout -->
<div class="intro-y box py-10 sm:py-20 mt-5">
    <TabGroup class="w-full"> 
        <TabList class="absolute top-5 nav-tabs">
                <Tab>
                    <div class="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
                        <button class="w-12 h-12 rounded-full btn bg-primary text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400 "
                            :style="filterStyle" >
                          <ShoppingCartIcon />
                          </button>
                        <div class="lg:w-32 font-medium text-base text-slate-600 lg:mt-1 ml-3 lg:mx-auto">
                            Shopping Cart
                        </div>
                    </div>
                </Tab>

                <Tab>
                    <div class="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                        <button class="w-12 h-12 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">
                            <TruckIcon />
                        </button>
                        <div class="lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400">
                            Delivery
                        </div>
                    </div>
                </Tab>

                <Tab>
                    <div class="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                        <button class="w-12 h-12 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">
                            <CreditCardIcon />
                        </button>
                        <div class="lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400">
                            Payment
                        </div>
                    </div>
                </Tab>
        </TabList>

        <TabPanels class="w-full h-full">
            <TabPanel>1</TabPanel>
            <TabPanel>2</TabPanel>
            <TabPanel>
                <PaymentMethods class="w-full h-full" /> 
            </TabPanel>
        </TabPanels>
    </TabGroup>
    
</div>
<!-- END: Wizard Layout -->
</template>

<script>
import PaymentMethods from "@/components/box/PaymentMethods.vue";

export default {
  components: { 
		PaymentMethods
	},
  data() {
    return {
      }
    },
    computed: {
        filterStyle() {
            if (this.show) {
            return {
                top: 0,
                background: primary,
                marginTop: '15px',
                marginBottom: '15px'
            };
            } else {
            return '';
            }
        }
    }
}

</script>

<style scoped>

</style>