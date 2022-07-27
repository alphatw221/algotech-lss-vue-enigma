<template> 
    <span class="px-3 text-xl font-medium"> {{$t('change_plan.step_1.your_info')}}</span> 
    <div class="p-3 pt-5 pb-5 text-md lg:text-lg flex-col"> 
        <div> 
            {{$t('change_plan.step_1.current_plan')}} :
            <span class="ml-3 font-medium text-[#660000]"> {{ $t(`change_plan.plan.`+layout.userInfo.user_subscription.type) }} </span> 
        </div> 
        <div class="flex-col flex sm:flex-row"> 
            {{$t('change_plan.step_1.expired_date')}} : <span class="ml-3 font-medium text-[#660000]"> 
            {{new Date(layout.userInfo.created_at).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}}</span>   
        </div>
        <div> 
            {{$t('change_plan.step_1.name')}} : <span class="ml-3 font-medium text-[#660000]"> {{layout.userInfo.name}}</span>   
        </div>
        <div> 
            {{$t('change_plan.step_1.number')}} : <span class="ml-3 font-medium text-[#660000]"> {{layout.userInfo.phone}}</span>   
        </div>
        <div> 
            {{$t('change_plan.step_1.email')}} : <span class="ml-3 font-medium text-[#660000]"> {{layout.userInfo.email}}</span>   
        </div>
    </div>
</template>

<script setup>
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const layout = useLSSSellerLayoutStore()
</script>
