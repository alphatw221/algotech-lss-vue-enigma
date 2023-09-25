<template>
    <div class="flex flex-col gap-3 mt-5"> 

        <div class="flex flex-row justify-between" > 
            <label class="w-fit whitespace-nowrap form-label text-base my-auto"> {{'Point Reward Table'}} </label>
            <button class="btn btn-primary w-32 h-[35px]" @click="addPointTableTier()"> {{$t('settings.points.add')}} </button>
        </div>

        <div class="flex flex-row flex-wrap gap-3 sm:gap-2 mt-5 sm:flex-row sm:mt-0" 
            v-for="(tier, index) in (props?.modelValue?.point_reward_tiers||[])" :key="index">

            <div  class="flex-1 gap-2 flex"> 
                <input  
                    class="w-16 md:w-32 form-control flex-1"
                    type="number" 
                    :value="1"
                    disabled
                />
                <label class="w-fit whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]">{{props?.currency||'USD'}}</label>
                <ChevronsRightIcon class="my-auto"/>
                <input  
                    class="w-16 md:w-32 form-control flex-1"
                    type="number" 
                    v-model="tier.point_redemption_rate"
                />
                <label class="form-label text-base my-auto text-[14px] md:text-[16px]"> {{$t('settings.points.points')}} </label>
            </div>
            <div  class="flex-1 gap-2 flex"> 
                <template v-if="index==0">
                    <label class="w-fit whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]">—　{{props?.currency||'USD'}}</label>
                    <input  
                    class="w-20 md:w-32 form-control flex-1"
                    type="text" 
                    :value="0"
                    disabled
                    />
                </template>
                <template v-else>
                    <label class="w-fit whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]">—　{{props?.currency||'USD'}}</label>
                    <input  
                    class="w-20 md:w-32 form-control flex-1"
                    type="number" 
                    v-model="props.modelValue.point_reward_tiers[index-1].upper_bound"
                    />
                </template>
            
                <label class="w-fit whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]"> ~ {{props?.currency||'USD'}}</label>
                <input  
                    class="w-20 md:w-32 form-control flex-1 "
                    type="number" 
                    v-model="tier.upper_bound"
                />

            </div>
            
            
            <button 
                class="flex-0 inline-block w-full h-[42px] ml-auto text-base btn btn-danger sm:rounded-lg sm:w-24" 
                @click="deletePointTableTier(index)"
            >
                {{ $t('settings.delivery_form.delete') }}
            </button>
        </div>

        
        <div class="flex flex-row flex-wrap gap-3 mt-5 sm:flex-row sm:mt-0" >

                <div  class="flex-1 gap-2 flex"> 
                    <input  
                        class="w-16 md:w-32 form-control flex-1"
                        type="number" 
                        :value="1"
                        disabled
                    />
                    <label class="w-fit whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]">{{props?.currency||'USD'}}</label>
                    <ChevronsRightIcon class="my-auto"/>
                    <input  
                        class="w-16 md:w-32 form-control flex-1"
                        type="number" 
                        v-model="props.modelValue.default_point_redemption_rate"
                    />
                    <label class="form-label text-base my-auto text-[14px] md:text-[16px]"> {{$t('settings.points.points')}}</label>
                </div>

                <div  class="flex-1 gap-2 flex"> 
                    <template v-if="(props.modelValue?.point_reward_tiers||[]).length">
                        <label class="w-fit whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]">—　{{props?.currency||'USD'}}</label>
                        <input  
                        class="w-20 md:w-32 form-control flex-1"
                        type="number" 
                        v-model="props.modelValue.point_reward_tiers[props.modelValue?.point_reward_tiers.length-1].upper_bound"
                        />
                    </template>
                    <template v-else>
                        <label class="w-fit whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]">—　{{props?.currency||'USD'}}</label>
                        <input  
                        class="w-20 md:w-32 form-control flex-1"
                        type="number" 
                        :value="0"
                        disabled
                        />
                    </template>
                    <label class="w-fit whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]"> ~ {{props?.currency||'USD'}}</label>
                    <input  
                        class="w-20 md:w-32 form-control flex-1 "
                        type="text" 
                        :value="'above'"
                        disabled
                    />
                </div>
            
                <button 
                    class="flex-0 hidden 2xl:inline-block w-full h-[42px] ml-auto text-base btn-white sm:rounded-lg sm:w-24 text-white cursor-default " 
                >
                    {{ $t('settings.delivery_form.delete') }}
                </button>
        </div>
    </div>

        
    <div class="flex flex-col"> 
        <label class="w-fit whitespace-nowrap form-label text-base mt-3"> {{ 'Cash Redemption Rate' }}</label>

        <div class="flex flex-row gap-3 max-w-lg">
            <div class="flex flex-1 flex-row gap-3"> 
                <input  
                class="w-14 md:w-32 form-control flex-1"
                type="number" 
                v-model="props.modelValue.cash_redemption_rate_points"
                />
                <label class="w-fit flex-0 whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]"> {{$t('settings.points.points')}}</label>
            </div>
            
            <ChevronsRightIcon class="my-auto flex-0 w-8"/>
            
            <div class="flex flex-1 flex-row gap-3"> 
                <label class="w-fit flex-0 whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]"> {{props?.currency||'USD'}}</label>
                <input  
                    class="w-14 md:w-32 form-control flex-1"
                    type="number" 
                    v-model="props.modelValue.cash_redemption_rate_cash"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, defineProps, onBeforeMount, watch, computed, defineEmits } from 'vue';
import { get_general_info, update_general_info } from '@/api_v2/user_subscription'
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useLSSPointsMetaStore } from '@/stores/lss-points-meta';

import i18n from "@/locales/i18n"

const props = defineProps({
    modelValue:Object,
    currency:String,
})
const emits = defineEmits()
const updateModelValue = ()=>{
  emits('update:modelValue', props.modelValue)
}

const LSSSellerLayoutStore = useLSSSellerLayoutStore();




const addPointTableTier = ()=>{
    var _point_redemption_rate = props?.modelValue?.default_point_redemption_rate
    var _upper_bound = 0
    if((props.modelValue?.point_reward_tiers||[]).length>0){
        _upper_bound = (props.modelValue?.point_reward_tiers?.[((props.modelValue?.point_reward_tiers||[]).length-1)]?.upper_bound||0)+1
    }
    const pointTier = {
        upper_bound:_upper_bound,
        point_redemption_rate:_point_redemption_rate
    };

    (props?.modelValue?.point_reward_tiers||[])?.push(pointTier)
    updateModelValue()
}

const deletePointTableTier = index=>{
    (props?.modelValue?.point_reward_tiers||[])?.splice(index,1)
    updateModelValue()
}



</script>
