<template>
        <h3 class="text-base">Self Pickup</h3>
        <div v-if="(props?.modelValue||[]).filter(_logisticService=>_logisticService.provider=='self_pickup').length<=0" class="text-center my-5">
            <h3>No Pickup Location Added</h3>
        </div>
        <template v-for="logisticService, i in (props?.modelValue||[])" :key="i">
            <CrudWidge
                v-if="logisticService?.provider=='self_pickup'"
                :formSettings="selfPickupSettings"
                :action="actions"
                v-model="props.modelValue[i]"
                class="intro-y border-slate border-[1px] rounded p-3 my-2"
                @change="()=>{updateModelValue();}"
                :error="props.error?.$each?.$response?.$errors?.[i]"
            >
                <template v-slot:remove_button>
                    <XIcon class="w-6 h-6 right-1 top-1 cursor-pointer absolute text-slate-500" @click="()=>{props?.modelValue?.splice(i,1); updateModelValue(); }"/>
                </template>
            
            </CrudWidge>


        </template>

        <div class="text-center my-2">
            <button class="btn btn-primary rounded-[50%]" @click="()=>{ (props.modelValue||[]).push(props.getLogisticServiceTemplate('self_pickup'));;updateModelValue();}">
                <PlusIcon/>
            </button>
        </div>

</template>

<script setup>
import CrudWidge from '@/views/crud-form-lss/CrudWidge.vue'
import { ref, onMounted, reactive, computed, defineProps, defineEmits, provide } from 'vue';
// import { get_general_info, update_general_info } from '@/api_v2/user_subscription'
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';

const SSSellerLayoutStore = useLSSSellerLayoutStore();

const props = defineProps({

    getLogisticServiceTemplate:Function,
    modelValue:Object,
    error:Object

})

const emits = defineEmits()

const updateModelValue = ()=>{
  emits('update:modelValue', props.modelValue)
}





const selfPickupSettings = [
    {key:'self_pickup_location', name:'Pickup Location', type:'input' ,inputType:'text', class:'w-full', unit:'', placeholder:'Pickup Location'},
    {key:'self_pickup_address', name:'Pickup Address', type:'input' ,inputType:'text', class:'w-full', unit:'', placeholder:'Pickup Address'},
    {type:'slot', slot_name:'remove_button'},


]




const actions={}


</script>
