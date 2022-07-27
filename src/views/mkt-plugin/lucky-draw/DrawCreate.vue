<template>
    <div>
        <!-- BEGIN: commit box -->
        <div class="mt-5 flex justify-self-start">
            <label class="form-label mr-10">{{ $t('lucky_draw.draw_create.campaign_title') }} : </label>
            <h2 style="display: inline-block;"> {{ props.campaignTitle }} </h2>
        </div>
        <div class="flex flex-col">
            <div class="lg:flex">
                <!-- <div class="lg:w-[50%]  flex-col mr-5 mt-3">
                    <label class="form-label"> Lucky Draw Title</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        :class="{ 'border-danger text-danger border-2': validate.title.$error }" 
                        v-model.trim="validate.title.$model" 
                    />
                    <template v-if="validate.title.$error">
                        <label class="text-danger">Enter lucky draw title</label>
                    </template>
                </div> -->
                <div class="lg:w-[50%]  flex flex-col mr-5 mt-6">
                    <label class="form-label"> {{ $t('lucky_draw.draw_create.prize') }}</label>
                    <select 
                        id="prizeSelect"
                        class="w-full form-select sm:form-select-lg rounded-lg" 
                        :class="{ 'border-danger text-danger border-2': !currentSettings.prize.id }" 
                        v-model="currentSettings.prize"
                    >
                        <template v-if="!prizeList.length">
                            <option class="w-40" disabled> 
                                {{ $t('lucky_draw.draw_create.assign_prize_err') }}
                            </option>
                        </template>
                        <template v-else> 
                            <option v-for="(prize, key) in prizeList" :key="key" :value="prize" class="w-40"> 
                                {{ prize.name }} 
                            </option>
                        </template>    
                    </select>
                    <!-- <button 
                        class="btn btn-primary ml-auto w-fit mt-2"
                        :class="{'btn-danger': !prizeList.length}" 
                        @click="productType = 'lucky_draw'; detailStore.showAddProductFromStockModal = true;"
                    > Assign More Prize </button> -->
                </div>
                <div class="lg:w-[50%]  flex-col mr-5 mt-6">
                    <label class="form-label ">{{ $t('lucky_draw.draw_create.spin_time') }}</label>
                    <select 
                        class="w-full form-select sm:form-select-lg rounded-lg" 
                        v-model="currentSettings.spin_time"
                    >
                        <option v-for="(spinTime, key) in spinTimes" :key="key" :value="spinTime.value">
                            {{ spinTime.value }} {{ $t('lucky_draw.draw_create.secs') }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="lg:flex">
                <div class="lg:w-[50%]  flex-col mr-5 mt-6">
                    <label class="form-label"> {{ $t('lucky_draw.draw_create.number_of_winner') }}</label>
                    <input 
                        type="text" 
                        class="form-control mr-5" 
                        :class="{ 'border-danger text-danger border-2': validate.num_of_winner.$error }"
                        v-model.trim="validate.num_of_winner.$model" 
                    />
                    <template v-if="validate.num_of_winner.$error">
                        <label class="text-danger text-[14px] leading-tight">
                            {{ $t('lucky_draw.draw_create.number_winner_warning') }} {{currentSettings.prize.qty_for_sale}}
                        </label>
                    </template>
                </div>
                <div class="lg:w-[50%] flex-col mt-6 mr-5">
                    <label class="form-label mr-auto"> {{ $t('lucky_draw.draw_create.animation_style') }} </label>
                    <div class="flex flex-wrap items-center justify-around">
                        <div class="w-20 h-20 image-fit relative ">
                            <input type="radio" class="rounded-full vertical-center absolute top-0 left-0 z-50" name="check_animation" @click="currentSettings.path = 'static/lucky_draw1.svg'" />
                            <img class="rounded-full" :src="storageUrl + 'static/lucky_draw1.svg'" />
                        </div>
                        <div class="w-20 h-20 image-fit relative ">
                            <input type="radio" class="rounded-full vertical-center absolute top-0 left-0 z-50" name="check_animation" @click="currentSettings.path = 'static/lucky_draw2.svg'" />
                            <img class="rounded-full" :src="storageUrl + 'static/lucky_draw2.svg'" />
                        </div>
                        <template v-for="(animates, key) in animationList" :key="key">
                            <div class="w-20 h-20 image-fit relative">
                                <input type="radio" class="rounded-full vertical-center absolute top-0 left-0 z-50" name="check_animation" @click="currentSettings.path = animates.path" />
                                <img class="rounded-full" :src="storageUrl + animates.path" />
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="lg:flex">
                <div class="lg:w-[50%] flex-col mt-6 mr-5">  
                    <div class="flex"> 
                        <label class="form-label"> {{ $t('lucky_draw.draw_create.winner_repeat') }} </label> 
                        <Tippy 
                            class="rounded-full w-30 whitespace-wrap" 
                            data-tippy-allowHTML="true" 
                            data-tippy-placement="right" 
                            content="Allow same person <br/> to win multiple prizes?" 
                            theme='light'
                        > 
                            <HelpCircleIcon class="w-8 ml-2" />
                        </Tippy> 
                    </div>
                    <div class="flex sm:flex-row mt-2 ">
                        <div class="form-check mr-5">
                            <input class="form-check-input" type="radio" v-model="currentSettings.repeatable" :value="true" />
                            <label class="form-check-label" for="radio-switch-yes">{{ $t('lucky_draw.draw_create.yes') }}</label>
                        </div>
                        <div class="form-check mr-5">
                            <input class="form-check-input" type="radio" v-model="currentSettings.repeatable" :value="false" />
                            <label class="form-check-label" for="radio-switch-no">{{ $t('lucky_draw.draw_create.no') }}</label>
                        </div>
                    </div>
                </div>
                <div class="lg:w-[50%] flex-col flex sm:flex-row mt-3 mr-5 justify-center sm:justify-between"> 

                    <img :src="previewImage" class="max-h-28 mx-auto object-cover" 
                        v-if="currentSettings.path == ''" />
                    <img :src="storageUrl + currentSettings.path" class="max-h-28 mx-auto object-cover" 
                        v-else-if="currentSettings.path != ''" />
                    <div class="btn btn-primary bg-[#070130] w-full sm:w-fit shadow-md mt-3 sm:mt-auto">
                        <input type="file" id="upload" @change="uploadAnimation" hidden/>
                        <label for="upload" id="create_animation">+ {{ $t('lucky_draw.draw_create.upload_animation') }}</label>
                    </div>
                </div>
            </div>
            <div class="lg:flex">
                <div class="lg:w-[50%] flex-col mt-6 mr-5">
                    <label class="form-label"> {{ $t('lucky_draw.draw_create.draw_type') }}</label>
                    <select class="w-full form-select sm:form-select-lg rounded-lg mr-5" v-model="currentSettings.type">
                        <option v-for="(drawType, index) in drawTypes" :key="index" :value="drawType.value"> {{ $t(`lucky_draw.draw_create.draw_selection.${drawType.value}`) }}</option>
                    </select>
                </div>

                <div 
                    v-if="currentSettings.type === 'product'" 
                    class="lg:w-[50%] flex flex-col mt-6 mr-5"
                >   
                    <div class="flex">
                        <label class="form-label">{{ $t('lucky_draw.draw_create.product') }}</label>
                        <!-- <button 
                            class="btn btn-primary h-[35px] sm:h-[42px] w-fit ml-auto mb-1"
                            :class="{'btn-danger': productList.length == 0}" 
                            @click="productType = 'product'; detailStore.showAddProductFromStockModal = true;"
                        > Assign Product </button> -->
                    </div>
                    <select
                        :class="{ 'border-danger text-danger border-2': currentSettings.campaign_product == '' }" 
                        class="w-full form-select sm:form-select-lg rounded-lg mr-5" 
                        v-model="currentSettings.campaign_product"
                    >   
                        <template v-if="productList.length == 0">
                            <option class="w-40 " disabled> 
                                {{ $t('lucky_draw.draw_create.assign_product_err') }}
                            </option>
                        </template>
                        <template v-else> 
                            <option v-for="(product, key) in productList" :key="key" :value="product.id"> 
                                {{ `(${product.order_code})   ${product.name}` }}
                            </option>   
                        </template>
                    </select>
                </div>

                <div 
                    v-else-if="currentSettings.type === 'keyword'" 
                    class="lg:w-[50%]  flex-col mr-5 mt-3"
                >
                    <label class="form-label mt-3"> {{ $t('lucky_draw.draw_create.keyword') }}</label>
                    <textarea class="w-full h-14 overflow-hidden whitespace-pre-line p-1 rounded-lg "
                        v-model="validate.comment.$model" placeholder="Enter your Keyword"
                        :class="{ 'border-danger text-danger border-2': validate.comment.$error }">
                    </textarea>
                    <template v-if="validate.comment.$error">
                        <label class="text-danger text-[14px]">
                            {{ $t('lucky_draw.draw_create.keyword_warning') }}
                        </label>
                    </template>
                </div>

                <div 
                    v-else-if="currentSettings.type === 'purchased'" 
                    class="lg:w-[50%] flex mt-3 mr-5 justify-center"
                >   
                    <!-- <button 
                        class="btn btn-primary ml-auto w-fit h-[35px] sm:h-[42px]"
                        :class="{'btn-danger': productList.length == 0}" 
                        @click="detailStore.showAddProductFromStockModal = true"
                    > Assign Product </button> -->
                    <template v-if="productList.length == 0"> 
                        <label class="form-label text-danger mt-auto text-[14px] md:text-[16px]"> {{ $t('lucky_draw.draw_create.no_product_err')}}</label>
                    </template>
                </div>

                <div
                    v-else 
                    class="lg:w-[50%] flex flex-col mt-3 mr-5">  
                </div>
            </div>  
        </div>

        <div class="flex justify-end my-10 mr-5" v-if="route.query.behavior === 'drawInstantly'">
            <button class="btn w-32 dark:border-darkmode-400" @click="router.back()"> {{ $t('lucky_draw.draw_create.back') }} </button>
            <button class="btn btn-primary w-32 shadow-md ml-5" @click="goDraw"> {{ $t('lucky_draw.draw_create.go_draw') }} </button>
        </div>

        <div class="flex justify-end my-10 mr-5" v-else>
            <button class="btn w-32 dark:border-darkmode-400" @click="router.go()"> {{ $t('lucky_draw.draw_create.cancel') }} </button>
            <button class="btn btn-primary w-32 shadow-md ml-5" @click="upsert"> {{ $t('lucky_draw.draw_create.save') }} </button>
        </div>

        <AddProductFromStockModal :productType="productType"/>
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
import i18n from "@/locales/i18n"

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
const drawTypes = ref([ { value: 'like', name: 'by like this post' }, { value: 'purchase', name: 'by purchased any product' }, { value: 'product', name: 'by purchased certain product' }, { value: 'keyword', name: 'by keyword' },]);
const prizeList = ref([])  
const productList = ref([])
const animationList = ref([])
const currentSettings = ref({
    spin_time: 5,
    num_of_winner: 0,
    repeatable: false,
    type: 'like',
    comment: 'keyword',
    campaign_product: '',
    prize: '',
    title: '',
    animation: '',
    path: ''
})
const previewImage = ref(null)
const formData = new FormData()
const type = ref('create')
const luckyDrawId = ref(0)
const productType = ref('')

const rules = computed(()=> {
    return {
        comment: { required },
        // title: { required, minLength: minLength(1) },
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
    prizeList.value = []
    productList.value = []
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
        layoutStore.alert.showMessageToast(i18n.global.t('lucky_draw.invalid_data'))
        return
    } 
    formData.append('data', JSON.stringify(currentSettings.value))

    if (type.value == 'create') {
        create_campapign_lucky_draw(route.params.campaign_id, formData).then(res => {
            layoutStore.notification.showMessageToast(i18n.global.t('lucky_draw.create_successed'))
            router.go()
        })
    } else if (type.value == 'edit') {
        update_campaign_lucky_draw(luckyDrawId.value, formData).then(res => {
            layoutStore.notification.showMessageToast(i18n.global.t('lucky_draw.update_successed'))
            router.go()
        })
    }
};

const goDraw = () => {
    formData.append('data', JSON.stringify(currentSettings.value))
    create_campapign_lucky_draw(route.params.campaign_id, formData).then(res => {
        layoutStore.notification.showMessageToast(i18n.global.t('lucky_draw.create_successed'))
        let routeData = router.resolve({ name: 'lucky-draw-flow', params: {lucky_draw_id: res.data.id} })
        window.open(routeData.href, '_blank')
    })
}

const uploadAnimation = e => {
    const animation = e.target.files[0];
	formData.append('animation', animation)

	const reader = new FileReader();
	reader.readAsDataURL(animation);
	reader.onload = e =>{ previewImage.value = e.target.result; };
    currentSettings.value.path = '';
    console.log(formData.value)
}

</script>