<template> 
    <span class="px-3 text-xl font-medium"> {{$t('change_plan.step_1.your_info')}}</span> 
    <div class="p-3 pt-5 pb-5 text-md lg:text-lg grid grid-cols-2 w-fit"> 
        <span class="col-start-1">  {{$t('change_plan.step_1.current_plan')}} : </span> 
        <span class="ml-3 font-medium text-[#660000] col-start-2"> {{ $t(`change_plan.plan.`+layout.userInfo.user_subscription.type) }} </span> 

        <span class="col-start-1"> {{$t('change_plan.step_1.expired_date')}} : </span>
        <span class="col-start-2 ml-3 font-medium text-[#660000]"> 
            {{new Date(layout.userInfo.user_subscription.expired_at).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}}</span>   
        <span class="col-start-1"> {{$t('change_plan.step_1.name')}} : </span>
        <span class="col-start-2 ml-3 font-medium text-[#660000]"> {{layout.userInfo.name}}</span>   

        <span class="col-start-1"> {{$t('change_plan.step_1.number')}} : </span>
        <span class="col-start-2 ml-3 font-medium text-[#660000]"> {{layout.userInfo.phone}}</span>   

        <span class="col-start-1"> {{$t('change_plan.step_1.email')}} : </span>
        <span class="col-start-2 ml-3 font-medium text-[#660000] truncate"> {{layout.userInfo.email}}</span>
    </div>
</template>

<script setup>
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const layout = useLSSSellerLayoutStore()
</script>
