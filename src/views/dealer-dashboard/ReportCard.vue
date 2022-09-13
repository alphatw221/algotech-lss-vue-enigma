<template>
    <div class="grid grid-cols-12 gap-6 my-3 w-full">
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box">
                        <div class="flex flex-row justify-between p-5 box bg-gradient-to-tr from-emerald-500 to-green-400">
                            <DollarSignIcon class="shrink-0 w-12 h-12 text-white bg-emerald-800 rounded-full px-1 py-2.5" />
                            <div> 
                                <div class="text-3xl font-medium text-right leading-8">{{cards.orders_amount}}
                                <!-- <span class="text-base">{{manageOrderStatus.order_qty}} / {{manageOrderStatus.order_qty + manageOrderStatus.cart_qty}}</span> -->
                                </div>
                                <div class="truncate mt-2 -mb-1 text-base text-right text-lg font-medium text-white whitespace-nowrap">Total Sells</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box">
                        <div class="flex flex-row justify-between p-5 box bg-gradient-to-tr from-violet-500 to-fuchsia-400">
                            <FileTextIcon class="shrink-0 w-12 h-12 text-white bg-violet-800 rounded-full px-1 py-2.5" />
                            <div> 
                                <div class="text-3xl font-medium text-right leading-8">{{cards.almost_expired_count}}</div>
                                <!-- <span class="text-base">{{manageOrderStatus.cart_qty}} / {{manageOrderStatus.order_qty + manageOrderStatus.cart_qty}}</span> -->
                                <div class="truncate mt-2 -mb-1 text-base text-right text-lg font-medium text-white whitespace-nowrap w-fit">Contracts Due Soon</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box">
                        <div class="flex flex-row justify-between p-5 box bg-gradient-to-tr from-orange-500 to-amber-400">
                            <VideoIcon class="shrink-0 w-12 h-12 text-white bg-orange-800 rounded-full px-1 py-2.5" />
                            <div> 
                                <div class="text-3xl font-medium text-right leading-8">{{ cards.campaigns_count}}</div>
                                <div class="truncate mt-2 -mb-1 text-base text-right text-lg font-medium text-white whitespace-nowrap">Total Campaigns</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                    <div class="report-box">
                        <div class="flex flex-row justify-between p-5 box bg-gradient-to-tr from-indigo-400 to-sky-400">
                            <UsersIcon class="shrink-0 w-12 h-12 text-white bg-indigo-800 rounded-full px-1 py-2.5" />
                            <div> 
                                <div class="text-3xl font-medium text-right leading-8">{{cards.customers_count}}</div>
                                <div class="truncate mt-2 -mb-1 text-base text-right text-lg font-medium text-white whitespace-nowrap">Total Buyers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</template>
<script setup>
import { ref, provide, onMounted } from 'vue';
import { dealer_dashboard } from "@/api/dealer"
import { dealer_dashboard_card } from "@/api_v2/user_subscription"

const cards = ref({
  'customers_count' : 0,
  'campaigns_count' : 0,
  'almost_expired_count' : 0,
  'orders_amount' : 0
})

onMounted(()=>{
    dealer_dashboard_card().then(
      res=>{
        cards.value = res.data[0]
        // console.log(cards.value.orders_amount)
      }
    ).catch(
      error=>{
          console.log(error);
      }
    )
})

</script>

<style scoped>

.report-box:before{
/*     background-color: rgba(178, 209, 214, 0.596); */
    opacity: 0;
}
</style> 