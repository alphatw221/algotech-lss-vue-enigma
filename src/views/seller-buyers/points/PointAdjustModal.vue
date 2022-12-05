<template>
    <Modal backdrop="static" :show="showModal">
        <ModalHeader class="text-center text-base relative mx-3">
            <span class="mx-auto">{{$t('buyers.buyer_point.adjust_point_modal.title')}}</span>
            <a 
                class="absolute right-0 top-2"
                @click="hide()"> <XIcon class="w-8 h-8 text-slate-400" /></a>
        </ModalHeader>
        <ModalBody class="px-10 text-left flex flex-col gap-3">

            <span class="mx-auto text-black -mb-3"> {{$t('buyers.buyer_point.adjust_point_modal.current_points')}}</span>

            <div class="flex flex-row gap-1 text-danger justify-center"> 
              <span class="text-2xl font-bold">{{Math.floor(props.wallet.points).toLocaleString("en-GB")}} </span>
              <!-- <span  class="text-lg mt-auto"> {{ $t('buyers.buyer_point.points') }} </span>  -->
            </div>

            <div class="flex flex-row gap-5">
                <div class="flex flex-col w-full">
                    <span> {{$t('buyers.buyer_point.adjust_point_modal.type')}} </span>
                    <select class="form-control h-[35px] sm:h-[42px]" v-model="point.type"> 
                        <template v-for="opt in options" :key="opt" > 
                            <option :value="opt.name"> {{opt.name}}</option>
                        </template>
                    </select> 
                </div> 
                <div class="flex flex-col w-full">
                    <span> {{$t('buyers.buyer_point.adjust_point_modal.points')}} </span>
                    <input class="form-control" type="number" v-model="v.points.$model"/> 
                    <label class="block text-danger text-[12px]" 
                        v-for="error, index in v.points.$errors" :key="index">
                        {{ $t(`settings.delivery.errors.${error.$validator}`) }}
                    </label>
                </div> 
            </div> 

            <div class="flex flex-col w-full">
                <span> {{$t('buyers.buyer_point.adjust_point_modal.reason')}} </span>
                <input class="form-control" type="text" v-model="point.reason"/> 
            </div> 

            <div v-if="point.type == 'add'" class="flex flex-col w-full">
                <span> {{$t('buyers.buyer_point.adjust_point_modal.expired_at')}} </span>
                <v-date-picker class="" 
					v-model="v.expire_at.$model" 
					:timezone="timezone" 
					is-required
                    mode="date"
					:min-date='new Date()'
					>
                    <template v-slot="{ inputValue, inputEvents }">
                    <input :value="inputValue" v-on="inputEvents" 
                        class="form-control" type="text" />
                    </template>
				</v-date-picker>
                <label class="block text-danger text-[12px]" 
                    v-for="error, index in v.expire_at.$errors" :key="index">
                    {{ $t(`settings.delivery.errors.${error.$validator}`) }}
                </label>
            </div> 

            <button class="btn btn-primary w-fit ml-auto px-5"
                @click="save()"> 
                {{$t('buyers.buyer_point.adjust_point_modal.save')}}
            </button>
        </ModalBody>
    </Modal>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import { useLSSSellerLayoutStore } from '@/stores/lss-seller-layout';
import { ref, onMounted, onUnmounted, getCurrentInstance, computed} from 'vue'
import { required,integer, minValue,requiredIf } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const layoutStore = useLSSSellerLayoutStore()
const showModal = ref(false)
const options = ref([
    {name:"add"},
    {name:"deduct"}
])
const props = defineProps({
    wallet:Object
})

const point = ref({
    type:"add",
    points:"",
    reason:"",
    expire_at:""
})

const pointRules = computed(()=>{
    return {
        points:{required,integer,minValue:minValue(1)},
        expire_at:{required:requiredIf(point.value.type == 'add')}
    }
})

const v = useVuelidate(pointRules, point);

const save=()=>{
    v.value.$touch()
    if (v.value.$invalid)layoutStore.alert.showMessageToast('Invalid Data')
}

const hide = ()=>{
    point.value={
        type:"add",
        points:"",
        reason:"",
        expire_at: new Date()
    }
    showModal.value=false
}

onMounted(()=>{
    eventBus.on('showPointAdjustModal', (payload) => {
        showModal.value = true
  })
})

onUnmounted(()=>{
  eventBus.off('showPointAdjustModal')
})

</script>
