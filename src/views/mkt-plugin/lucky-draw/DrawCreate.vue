<template>
        <!-- BEGIN: commit box -->
        <form class="flex flex-col">
            <div class="mt-6 flex">
                <div class="w-[50%] flex flex-col mr-5">
                    <label for="update-profile-form-2" class="form-label"> Prize</label>
                    <select class="w-full form-select-lg" v-model="currentSettings.prize">
                        <option v-for="(prize, key) in prizeList" :key="key" :value="prize" class="w-40"> 
                            {{ prize.name }} 
                        </option>
                    </select>
                </div>
                <div class="w-[50%] flex flex-col ml-5">
                    <label for="update-profile-form-2" class="form-label "> Spin Time(sec)</label>
                    <select class="w-full form-select-lg" v-model="currentSettings.spinTime">
                        <option v-for="(spinTime, key) in spinTimes" :key="key" :value="spinTime.value">
                            {{ spinTime.name }}</option>
                    </select>
                </div>
            </div>
            <div class="mt-6 flex">
                <div class="w-[50%] flex flex-col mr-5">
                    <label for="update-profile-form-2" class="form-label"> No. of Winners</label>
                    <input id="form-2" type="text" class="form-control" v-model="currentSettings.winners" />
                </div>
                <div class="w-[50%] flex flex-col ml-5">
                    <div class="w-full flex">
                        <label for="update-profile-form-2" class="form-label mr-auto"> Animation Style</label>
                        <a class="text-[16px]" @click="showModal = true"> + Create New Animation </a>
                    </div>
                    <div class="flex flex-wrap items-center justify-around">
                        <template v-for="(animates, key) in animationStyle" :key="key">
                            <div class="w-20 h-20 image-fit relative ">
                                <input type="radio" class="rounded-full vertical-center absolute top-0 left-0 z-50"
                                    @click="chooseAnimation(animates.value)" />
                                <Tippy tag="img" class="rounded-full" :src="animates.image" :content="`animation`" />
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <div class="flex"> <label for="update-profile-form-2" class="form-label "> Winner Repeat </label> 
                    <Tippy class="rounded-full w-30 whitespace-wrap" 
                        data-tippy-allowHTML="true" 
                        data-tippy-placement="right" 
                        content="this is the discription <br/> of Winner Repeat" 
                        theme='light'> 
                        <HelpCircleIcon class="w-8 ml-2" /></Tippy> </div>
                <div class="flex sm:flex-row mt-2">
                    <div class="form-check mr-5">
                        <input id="radio-switch-yes" class="form-check-input" type="radio"
                            v-model="currentSettings.repeat" :value="true" />
                        <label class="form-check-label" for="radio-switch-yes">Yes</label>
                    </div>
                    <div class="form-check mr-5 mt-2 sm:mt-0">
                        <input id="radio-switch-no" class="form-check-input" type="radio"
                            v-model="currentSettings.repeat" :value="false" />
                        <label class="form-check-label" for="radio-switch-no">No</label>
                    </div>
                </div>
            </div>
            <div class="mt-6 flex">
                <div class="w-[50%] flex flex-col mr-5">
                    <label for="update-profile-form-2" class="form-label"> Draw Type</label>
                    <select class="w-full form-select" v-model="currentSettings.type">
                        <option v-for="(type, key) in drawTypes" :key="key" :value="type.value"> {{ type.name }}</option>
                    </select>
                </div>
                <div v-if="currentSettings.type === 'product'" 
                    class="w-[50%] flex flex-col ml-5">
                    <label for="update-profile-form-2" class="form-label "> Product</label>
                     <TomSelect 
                        v-model="currentSettings.productId" 
                        class="w-full form-select-lg"
                        >
                        <option v-for="(product, key) in productList" :key="key" :value="product.id"
                            > ({{product.order_code}}) &emsp;   {{product.name}}</option>
                    </TomSelect>
                </div>
                <div v-else-if="currentSettings.type === 'keyword'" class="w-[50%] flex flex-col ml-5">
                    <label for="update-profile-form-2" class="form-label "> Keyword</label>
                    <textarea class="w-full h-14 overflow-hidden whitespace-pre-line p-1 rounded-lg "
                        v-model="currentSettings.keyword" placeholder="Enter your Keyword">
                    </textarea>
                </div>
            </div>
        </form>
        <div class="flex justify-end my-8">
            <button class="btn btn-secondary mr-5" @click="router.back()"> Cancel</button>
            <button class="btn btn-primary" @click="save"> Save</button>
        </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch, onMounted, computed} from 'vue';
import { list_campaign_product } from '@/api/campaign_product';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { useVuelidate } from "@vuelidate/core";
import { required,integer,minLength,maxLength } from "@vuelidate/validators";

const props = defineProps({
    campaign_id: Object,
});

const route = useRoute();
const router = useRouter();
const layoutStore = useLSSSellerLayoutStore()

const showModal = ref(false)
const saved = ref(false)
const spinTimes = ref([ { value: 5, name: '5 secs' },{ value: 10, name: '10 secs' },{ value: 20, name: '20 secs' },{ value: 30, name: '30 secs' },{ value: 60, name: '60 secs' }]);
const drawTypes = ref([ { value: 'like', name: 'Draw by like this post' },{ value: 'purchased', name: 'Draw purchased any product' },{ value: 'product', name: 'Draw by purchased certain product' },{ value: 'keyword', name: 'Draw by keyword' },]);
const prizeList = ref([])
const productList = ref([])
const currentSettings = ref({
    spinTime: 5,
    winners: 0,
    repeat: false,
    type: 'product',
    keyword: '',
    productId: '',
    prize:[],
})

const rules = computed(()=>{
    return{
      prize: {required},
      winners: {required,minLength: minLength(1), maxLength: maxLength(50)} }
});

const validate = useVuelidate(rules, currentSettings);

const save = () => {
  validate.value.$touch();
  if (validate.value.$invalid) {
    layoutStore.alert.showMessageToast("Invild User Infomation Input")
    return
  }else 
  console.log(currentSettings.value)
  layoutStore.notification.showMessageToast("Successed")
};


const chooseAnimation = () => {

}


onMounted(() => {
    list_campaign_product(props.campaign_id).then(res => {
        console.log(res.data)
        for (var i =0; i < res.data.length; i++){
            if(res.data[i].type === "lucky_draw"){
                prizeList.value.push(res.data[i])
            }else{
                productList.value.push(res.data[i])
            }
        }
    }).catch(error => {
        console.log(error);
    })
})


</script>

<style scoped>
</style> 