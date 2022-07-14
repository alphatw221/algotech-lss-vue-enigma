<template>
    <div>
        <!-- BEGIN: commit box -->
        <div class="mt-5 flex justify-self-start">
            <label class="form-label mr-10">Campaign Title : </label>
            <h2 style="display: inline-block;"> {{ props.campaignTitle }} </h2>
        </div>
        <div class="flex flex-col">
            <div class="mt-6 lg:flex 2xl:flex">
                <div class="lg:w-[50%] 2xl:w-[50%] flex-col mr-5 mt-3">
                    <label class="form-label"> Lucky Draw Title</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        :class="{ 'border-danger text-danger border-2': validate.title.$error }" 
                        v-model.trim="validate.title.$model" 
                    />
                    <template v-if="validate.title.$error">
                        <label class="text-danger">Please enter lucky draw title</label>
                    </template>
                </div>
                <div class="lg:w-[50%] 2xl:w-[50%] flex-col mr-5 mt-3">
                    <label class="form-label"> Prize</label>
                    <select 
                        class="w-full form-select-lg" 
                        :class="{ 'border-danger text-danger border-2': !currentSettings.prize.id }" 
                        v-model="currentSettings.prize"
                    >
                        <template v-if="!prizeList.length">
                            <option class="w-40" disabled> 
                                Please Assign Lucky Draw Items into your Campaign
                            </option>
                        </template>
                        <template v-else> 
                            <option v-for="(prize, key) in prizeList" :key="key" :value="prize" class="w-40"> 
                                {{ prize.name }} 
                            </option>
                        </template>    
                    </select>
                    <button 
                        v-if="!prizeList.length" 
                        class="btn btn-outline-danger self-left w-fit mt-2" 
                        @click="detailStore.showAddProductFromStockModal = true"
                    > Assign Prize </button>
                </div>
                <div class="lg:w-[50%] 2xl:w-[50%] flex-col mt-3">
                    <label class="form-label ">Spin Time(sec)</label>
                    <select 
                        class="w-full form-select-lg" 
                        v-model="currentSettings.spin_time"
                    >
                        <option v-for="(spinTime, key) in spinTimes" :key="key" :value="spinTime.value">
                            {{ spinTime.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="mt-6 lg:flex 2xl:flex">
                <div class="lg:w-[50%] 2xl:w-[50%] flex-col mr-5">
                    <label class="form-label"> No. of Winners</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        :class="{ 'border-danger text-danger border-2': validate.num_of_winner.$error }"
                        v-model.trim="validate.num_of_winner.$model" 
                    />
                    <template v-if="validate.num_of_winner.$error">
                        <label class="text-danger">
                            Winner numbers must be between 1 to prize stock {{currentSettings.prize.qty_for_sale}}
                        </label>
                    </template>
                </div>
                <div class="lg:w-[50%] 2xl:w-[50%] flex-col mt-3">
                    <div class="w-full flex">
                        <label class="form-label mr-auto"> Animation Style</label>
                        <input type="file" id="upload" @change="uploadAnimation" hidden/>
                        <label for="upload" id="create_animation">+ Upload Animation</label>
                    </div>
                    <div class="flex mb-3" v-if="currentSettings.path == ''">
						<img :src="previewImage" class="uploading-image h-20 object-cover" />
					</div>
                    <div class="flex mb-3" v-else-if="currentSettings.path != ''">
						<img :src="storageUrl + currentSettings.path" class="uploading-image h-20 object-cover" />
					</div>
                    <div class="flex flex-wrap items-center justify-around">
                        <template v-for="(animates, key) in animationList" :key="key">
                            <div class="w-20 h-20 image-fit relative ">
                                <input type="radio" class="rounded-full vertical-center absolute top-0 left-0 z-50" name="check_animation" @click="currentSettings.path = animates.path" />
                                <Tippy tag="img" class="rounded-full" :src="storageUrl + animates.path" :content="`animation`" />
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <div class="flex"> 
                    <label class="form-label "> Winner Repeat </label> 
                    <Tippy 
                        class="rounded-full w-30 whitespace-wrap" 
                        data-tippy-allowHTML="true" 
                        data-tippy-placement="right" 
                        content="this is the description <br/> of Winner Repeat" 
                        theme='light'
                    > 
                        <HelpCircleIcon class="w-8 ml-2" />
                    </Tippy> 
                </div>
                <div class="flex sm:flex-row mt-2">
                    <div class="form-check mr-5">
                        <input class="form-check-input" type="radio" v-model="currentSettings.repeatable" :value="true" />
                        <label class="form-check-label" for="radio-switch-yes">Yes</label>
                    </div>
                    <div class="form-check mr-5 mt-2 sm:mt-0">
                        <input class="form-check-input" type="radio" v-model="currentSettings.repeatable" :value="false" />
                        <label class="form-check-label" for="radio-switch-no">No</label>
                    </div>
                </div>
            </div>
            <div class="mt-6 mt-6 lg:flex 2xl:flex">
                <div class="lg:w-[50%] 2xl:w-[50%] flex-col mr-5 mt-3">
                    <label class="form-label"> Draw Type</label>
                    <select class="w-full form-select-lg" v-model="currentSettings.type">
                        <option v-for="(type, key) in drawTypes" :key="key" :value="type.value"> {{ type.name }}</option>
                    </select>
                </div>
                <div 
                    v-if="currentSettings.type === 'product'" 
                    class="lg:w-[50%] 2xl:w-[50%] flex-col mt-3"
                >
                    <label class="form-label ">Product</label>
                    <select
                        :class="{ 'border-danger text-danger border-2': currentSettings.campaign_product == '' }" 
                        class="w-full form-select-lg" 
                        v-model="currentSettings.campaign_product"
                    >
                        <option v-for="(product, key) in productList" :key="key" :value="product.id"> 
                            {{ `(${product.order_code})   ${product.name}` }}
                        </option>
                    </select>
                     <!-- <TomSelect 
                        v-model="currentSettings.campaign_product" 
                        class="w-full form-select-lg -mt-1.5"
                        :class="{ 'border-danger text-danger border-2': currentSettings.campaign_product == '' }" 
                    >
                        <option v-for="(product, key) in productList" :key="key" :value="product.id"> 
                            {{ `(${product.order_code})   ${product.name}` }}
                        </option>
                    </TomSelect> -->
                </div>
                <div 
                    v-else-if="currentSettings.type === 'keyword'" 
                    class="lg:w-[50%] 2xl:w-[50%] flex-col ml-5"
                >
                    <label class="form-label "> Keyword</label>
                    <textarea class="w-full h-14 overflow-hidden whitespace-pre-line p-1 rounded-lg "
                        v-model="validate.comment.$model" placeholder="Enter your Keyword"
                        :class="{ 'border-danger text-danger border-2': validate.comment.$error }">
                    </textarea>
                    <template v-if="validate.comment.$error">
                          <label class="text-danger">
                            Please enter a comment to use for lucky draw with minimum 3 digits
                          </label>
                    </template>
                </div>
            </div>
        </div>
        <div class="flex justify-end my-8">
            <button class="btn w-32 dark:border-darkmode-400" @click="router.go()"> Cancel </button>
            <button class="btn btn-primary w-32 shadow-md ml-5" @click="upsert"> Save </button>
        </div>

        <AddProductFromStockModal :productType="'lucky_draw'"/>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { list_campaign_product } from '@/api/campaign_product';
import { create_campapign_lucky_draw, list_campapign_lucky_draw_animation, retrieve_campaign_lucky_draw, update_campaign_lucky_draw } from '@/api_v2/campaign_lucky_draw';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue, maxValue, minLength, integer } from "@vuelidate/validators";
import AddProductFromStockModal from '@/components/campaign/modals/AddProductFromStockModal.vue';

const props = defineProps({
    campaignTitle: String
})
const route = useRoute();
const router = useRouter();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const layoutStore = useLSSSellerLayoutStore()
const detailStore= useCampaignDetailStore()
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL
const spinTimes = ref([ { value: 5, name: '5 secs' }, { value: 10, name: '10 secs' }, { value: 20, name: '20 secs' }, { value: 30, name: '30 secs' }, { value: 60, name: '60 secs' }]);
const drawTypes = ref([ { value: 'like', name: 'Draw by like this post' }, { value: 'purchase', name: 'Draw purchased any product' }, { value: 'product', name: 'Draw by purchased certain product' }, { value: 'keyword', name: 'Draw by keyword' },]);
const prizeList = ref([])
const productList = ref([])
const animationList = ref([])
const currentSettings = ref({
    spin_time: 5,
    num_of_winner: 0,
    repeatable: false,
    type: 'product',
    comment: 'keyword',
    campaign_product: '',
    prize: 'Please Assign Lucky Draw Items into your Campaign',
    title: '',
    animation: '',
    path: ''
})
const previewImage = ref(null)
const formData = new FormData()
const type = ref('create')
const luckyDrawId = ref(0)

const rules = computed(()=> {
    return {
        comment: { required, minLength: minLength(3) },
        title: { required, minLength: minLength(1) },
        num_of_winner: { required, integer, minValue: minValue(1), maxValue: maxValue(currentSettings.value.prize.qty_for_sale) } 
    }
});
const validate = useVuelidate(rules, currentSettings);


onMounted(() => {
    list_product_prize()

    list_campapign_lucky_draw_animation().then(res => {
        animationList.value = res.data
    })

    eventBus.on('editDraw', (payload) => {
        type.value = 'edit'
        luckyDrawId.value = payload.lucky_draw_id
        retrieve_campaign_lucky_draw(luckyDrawId.value).then(res => {
            currentSettings.value = res.data
            currentSettings.value.campaign_product = res.data.campaign_product.id
            currentSettings.value.path = res.data.animation
        })
    })
})

onUnmounted(() => {
    eventBus.off('editDraw')
})

watch(computed(()=>detailStore.campaignProducts), () => { list_product_prize() })

const list_product_prize = () => {
    list_campaign_product(route.params.campaign_id).then(res => {
        for (let i =0; i < res.data.length; i++) {
            if (res.data[i].type === "lucky_draw") prizeList.value.push(res.data[i])
            else productList.value.push(res.data[i])
        }
    })
}

const upsert = () => {
    validate.value.$touch();
    if (validate.value.$invalid || typeof currentSettings.value.prize === 'string') {
        layoutStore.alert.showMessageToast("Invalid Data Inputed")
        return
    } 
    formData.append('data', JSON.stringify(currentSettings.value))

    if (type.value == 'create') {
        create_campapign_lucky_draw(route.params.campaign_id, formData).then(res => {
            layoutStore.notification.showMessageToast("Create Successed")
            router.go()
        })
    } else if (type.value == 'edit') {
        update_campaign_lucky_draw(luckyDrawId.value, formData).then(res => {
            layoutStore.notification.showMessageToast("Update Successed")
            router.go()
        })
    }
};

const uploadAnimation = e => {
    const animation = e.target.files[0];
	formData.append('animation', animation)

	const reader = new FileReader();
	reader.readAsDataURL(animation);
	reader.onload = e =>{ previewImage.value = e.target.result; };
    currentSettings.value.path = '';
}

</script>

<style scoped>

#create_animation {
    display: inline-block;
    background-color: rgb(10, 1, 78);
    color: white;
    padding: 0.5rem;
    font-family: sans-serif;
    border-radius: 0.3rem;
    cursor: pointer;
    text-align: center;
}

</style> 