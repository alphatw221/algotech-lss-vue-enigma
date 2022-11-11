<template>
    <!--POINTS SETTINGS-->
    <div class="flex flex-col justify-between gap-5 my-5" 
        :class="{'md:flex-row': props.status == 'settings'}">

        <label v-if="props.status == 'settings'" class="whitespace-nowrap w-72 text-xl">{{$t('settings.points.title')}}</label>

        <div v-else-if="props.status !== 'settings'"
            class="flex flex-col gap-4"> 
            <span class="text-xl font-medium leading-none lg:-mx-6 whitespace-nowrap w-60">{{$t('settings.points.title')}}</span>
		    <hr class="-mx-6" />
        </div>

        <div class="flex flex-col gap-5 w-full">

            <div v-for="field in sellerPointsMeta.fields" :key="field.key">


                <div v-if="field.type==='checkbox'">
                    <input 
                        class="form-control form-check-input w-[1.5rem] h-[1.5rem] mr-2" 
                        type="checkbox" 
                        v-model="props.meta_point[field.key]"
                    />
                    <label class="w-fit whitespace-nowrap form-label text-base font-medium mr-3">{{$t('settings.points.'+ field.key)}}</label>
                </div>


                <div class="flex flex-row md:flex-col w-full justify-between md:gap-1" v-if="field.type==='select'"> 
                    <label class="w-fit whitespace-nowrap form-label text-base font-medium my-auto"> {{$t('settings.points.'+ field.key)}}</label>
                    <select 
                        class="rounded-lg form-select sm:form-select-lg w-32 md:w-60"
                        v-model="props.meta_point[field.key]"
                    >
                        <template v-for="option in field.options" :key="option.key"> 
                            <option v-if="option.key == 'unlimited'" :value="option.value">{{$t('settings.points.'+ option.key)}}</option>
                            <option v-else :value="option.value">{{option.key}}</option>
                        </template>
                    </select>
                </div>
                


                <div v-if="field.type==='textarea'">
                    <label class="w-fit whitespace-nowrap form-label text-base font-medium mt-3">{{$t('settings.points.description')}}</label>
                    <Tippy 
                        class="rounded-full w-50 my-auto ml-1" 
                        data-tippy-allowHTML="true" 
                        data-tippy-placement="right" 
                        :content="$t('tooltips.settings.points.points_des')" 
                        theme='light'
                    > 
                        <HelpCircleIcon class="inline-block w-5 -mt-1 tippy-icon" />
                    </Tippy> 
                    <textarea 
                        class="h-48 p-2 mr-5 form-control" 
                        placeholder="xxx"
                        v-model="props.meta_point[field.key]"
                    >
                    </textarea>
                </div>
                
                <!-- COMPONENT -->
                <div v-if="field.key=='reward_table'" class="flex flex-col gap-3"> 

                    <div class="flex flex-row justify-between" v-if="field.key=='reward_table'"> 
                        <label class="w-fit whitespace-nowrap form-label text-base font-medium my-auto"> {{$t('settings.points.reward_table')}} </label>
                        <button class="btn btn-primary w-32 h-[35px]" @click="addPointTableTier()"> {{$t('settings.points.add')}} </button>
                    </div>

                    <div class="flex flex-row flex-wrap gap-2 mt-5 sm:flex-row sm:mt-0" 
                        v-for="(tier, index) in props.meta_point[field.key]" :key="index">

                        <div class="flex-1 gap-2 flex"> 
                            <template v-if="index==0">
                                <label class="w-fit whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]"> SGD</label>
                                <input  
                                class="w-24 md:w-32 form-control flex-1"
                                type="text" 
                                :value="0"
                                disabled
                                />
                            </template>
                            <template v-else>
                                <label class="w-fit whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]"> SGD</label>
                                <input  
                                class="w-24 md:w-32 form-control flex-1"
                                type="number" 
                                v-model="props.meta_point[field.key][index-1].upper_bound"
                                />
                            </template>
                           
                            <label class="w-fit whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]"> ~ SGD</label>
                            <input  
                                class="w-24 md:w-32 form-control flex-1 "
                                type="number" 
                                v-model="tier.upper_bound"
                            />
                        </div>
                        
                        <div  class="flex-1 gap-2 flex"> 
                            <ChevronsRightIcon class="my-auto"/>
                            <input  
                                class="w-24 md:w-32 form-control flex-2"
                                type="number" 
                                v-model="tier.point_redemption_rate"
                            />
                            <label class="form-label text-base my-auto text-[14px] md:text-[16px]"> {{$t('settings.points.points')}} </label>
                        </div>
                        
                    
                        
                        <button 
                            class="flex-0 inline-block w-full h-[42px] ml-auto text-base btn btn-danger sm:rounded-lg sm:w-24" 
                            @click="deletePointTableTier(index)"
                        >
                            {{ $t('settings.delivery_form.delete') }}
                        </button>
                    </div>

                    
                    <div class="flex flex-row flex-wrap gap-3 mt-5 sm:flex-row sm:mt-0" >

                        <div class="flex-1 gap-2 flex"> 
                            
                            <template v-if="(props.meta_point[field.key]||[]).length">
                                <label class="w-fit whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]"> SGD</label>
                                <input  
                                class="w-24 md:w-32 form-control flex-1"
                                type="number" 
                                v-model="props.meta_point[field.key][props.meta_point[field.key].length-1].upper_bound"
                                />
                            </template>
                            <template v-else>
                                <label class="w-fit whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]"> SGD</label>
                                <input  
                                class="w-24 md:w-32 form-control flex-1"
                                type="number" 
                                :value="0"
                                disabled
                                />
                            </template>
                            <label class="w-fit whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]"> ~ SGD</label>
                            <input  
                                class="w-24 md:w-32 form-control flex-1 "
                                type="text" 
                                :value="'above'"
                                disabled
                            />
                        </div>
                        
                        <div  class="flex-1 gap-2 flex"> 
                            <ChevronsRightIcon class="my-auto"/>
                            <input  
                                class="w-24 md:w-32 form-control flex-2"
                                type="text" 
                                v-model="props.meta_point.default_point_redemption_rate"
                            />
                        <label class="form-label text-base my-auto text-[14px] md:text-[16px]"> {{$t('settings.points.points')}}</label>
                        </div>
                    </div>
                </div>
                
                <!-- COMPONENT -->
                <div  v-if="field.key=='redemption_rate_point'" class="flex flex-col gap-2"> 
                    <label class="w-fit whitespace-nowrap form-label text-base font-medium mt-3"> {{$t('settings.points.redemption')}}</label>

                        
                    <div class="flex flex-row gap-3 md:gap-3 -mt-3" >

                        <div class="flex flex-1 flex-row gap-3 md:max-w-1/4"> 
                            <input  
                            class="w-14 md:w-32 form-control flex-1"
                            type="number" 
                            v-model="props.meta_point[field.key]"
                            />
                            <label class="w-fit flex-0 whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]"> {{$t('settings.points.points')}}</label>
                        </div>
                        
                        <ChevronsRightIcon class="my-auto flex-0 w-8"/>
                        
                        <div class="flex flex-1 flex-row gap-3 md:max-w-1/4"> 
                            <label class="w-fit flex-0 whitespace-nowrap form-label text-base my-auto text-[14px] md:text-[16px]"> SGD</label>
                            <input  
                                class="w-14 md:w-32 form-control flex-1"
                                type="number" 
                                v-model="props.meta_point['redemption_rate_cash']"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, defineProps, onBeforeMount, watch, computed } from 'vue';
import { get_general_info, update_general_info } from '@/api_v2/user_subscription'
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { useLSSPointsMetaStore } from '@/stores/lss-points-meta';

import i18n from "@/locales/i18n"
import SimpleIcon from '../../global-components/lss-svg-icons/SimpleIcon.vue';

const props = defineProps({
    meta_point: Object,
    status: String, 
})

const layoutStore = useLSSSellerLayoutStore();
const pointsMetaStore = useLSSPointsMetaStore();
const sellerPointsMeta = ref({fields:[]})

onBeforeMount(() => {
    if(pointsMetaStore?.[layoutStore.userInfo.user_subscription.id.toString()]){
        sellerPointsMeta.value = pointsMetaStore[layoutStore.userInfo.user_subscription.id.toString()]
    }else{
        sellerPointsMeta.value = pointsMetaStore['default']
    }
})

onMounted(()=>{insertMetaData()}) //for create page
watch(computed(()=>props.meta_point), () => { insertMetaData()}) //for edit page

const insertMetaData = ()=>{
    sellerPointsMeta.value.fields.forEach(field => {
        if(typeof props.meta_point[field.key] != field.datatype) props.meta_point[field.key] = field.default
    });
}

const addPointTableTier = ()=>{

    const pointTier = {
        upper_bound:0,
        point_redemption_rate:1
    }
    if(props.meta_point?.reward_table.length>0){
        pointTier.upper_bound = props.meta_point.reward_table[props.meta_point.reward_table.length-1].upper_bound+1
    }
    props.meta_point.reward_table.push(pointTier)
}

const deletePointTableTier = index=>{
    props.meta_point.reward_table.splice(index,1)
}

</script>
