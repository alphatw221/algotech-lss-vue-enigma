<template>
    <div class="px-5 sm:px-10">
        <!-- BEGIN: commit box -->
        <div class="mt-5 flex justify-self-start">
            <label class="form-label mr-10">{{ $t('lucky_draw.draw_create.campaign_title') }} : </label>
            <h2 style="display: inline-block; font-weight: 700;"> {{ campaignDetailStore.campaign?.title }} </h2>
        </div>
        <div class="flex flex-col">
            <div class="lg:flex">


                <div class="lg:w-[50%]  flex flex-col lg:mr-5 mt-6">
                    <label class="form-label text-base"> {{ $t('lucky_draw.draw_create.prize') }}</label>
                    <select 
                        id="prizeSelect"
                        class="w-full form-select sm:form-select-lg rounded-lg" 
                        v-model.trim="validate.prize.$model"
                    >
                        <template v-if="!computedPrizeList.length">
                            <option class="w-40" disabled> 
                                {{ $t('lucky_draw.draw_create.assign_prize_err') }}
                            </option>
                        </template>
                        <template v-else> 
                            <option v-for="(prize, key) in computedPrizeList" :key="key" :value="prize" class="w-40"> 
                                {{ prize.name }} 
                            </option>
                        </template>    
                    </select>
                    <template v-if="validate.prize.$error">
                        <label class="text-danger text-[14px] leading-tight">{{ $t('lucky_draw.draw_create.assign_prize_err') }}</label>
                    </template>


                </div>
                <div class="lg:w-[50%]  flex-col mt-6">
                    <div class="flex"> 
                        <label class="form-label text-base">{{ $t('lucky_draw.draw_create.spin_time') }}</label>
                        <Tippy 
                            class="rounded-full w-30 whitespace-wrap" 
                            data-tippy-allowHTML="true" 
                            data-tippy-placement="right" 
                            :content="$t('tooltips.lucky_draw.spin_time')" 
                            theme='light'
                        > 
                            <HelpCircleIcon class="w-8 ml-1 mt-0.5 tippy-icon" />
                        </Tippy> 
                    </div>
                    <select 
                        class="w-full form-select sm:form-select-lg rounded-lg" 
                        v-model="luckyDrawData.spin_time"
                    >
                        <option v-for="(spinTime, key) in spinTimes" :key="key" :value="spinTime.value">
                            {{ spinTime.value }} {{ $t('lucky_draw.draw_create.secs') }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="lg:flex">
                <div class="lg:w-[50%] flex-col lg:mr-5 mt-6">
                    <label class="form-label text-base"> {{ $t('lucky_draw.draw_create.number_of_winner') }}</label>
                    <input 
                        type="text" 
                        class="form-control lg:mr-5" 
                        v-model.trim="validate.num_of_winner.$model" 
                    />
                    <template v-if="validate.num_of_winner.$error">
                        <label class="text-danger text-[14px] leading-tight">
                            {{ $t('lucky_draw.draw_create.number_winner_warning') }} {{luckyDrawData.prize.qty_for_sale}}
                        </label>
                    </template>
                </div>
                <div class="lg:w-[50%] flex-col mt-6 ">  
                    <div class="flex"> 
                        <label class="form-label text-base"> {{ $t('lucky_draw.draw_create.winner_repeat') }} </label> 
                        <Tippy 
                            class="rounded-full w-30 whitespace-wrap" 
                            data-tippy-allowHTML="true" 
                            data-tippy-placement="right" 
                            :content="$t('tooltips.lucky_draw.winner_repeat')" 
                            theme='light'
                        > 
                            <HelpCircleIcon class="w-8 ml-1 mt-0.5 tippy-icon" />
                        </Tippy> 
                    </div>
                    <div class="flex sm:flex-row mt-2 justify-between">
                        <div class="flex w-36">
                            <div class="form-check mr-5">
                                <input class="form-check-input" type="radio" v-model="luckyDrawData.repeatable" :value="true" />
                                <label class="form-check-label" for="radio-switch-yes">{{ $t('lucky_draw.draw_create.yes') }}</label>
                            </div>
                            <div class="form-check sm:mr-5">
                                <input class="form-check-input" type="radio" v-model="luckyDrawData.repeatable" :value="false" />
                                <label class="form-check-label" for="radio-switch-no">{{ $t('lucky_draw.draw_create.no') }}</label>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="lg:flex">
                <div class="lg:w-[50%] flex-col mt-6 ">
                    <label class="form-label text-base"> {{ $t('lucky_draw.draw_create.draw_type') }}</label>
                    <select class="w-full form-select sm:form-select-lg rounded-lg sm:mr-5 text-base" v-model="luckyDrawData.type">
                        <option v-for="(drawType, index) in drawTypes" :key="index" :value="drawType.value"> {{ $t(`lucky_draw.draw_create.draw_selection.${drawType.value}`) }}</option>
                    </select>
                </div>

                <div 
                    v-if="luckyDrawData.type === 'product'" 
                    class="lg:w-[50%] flex flex-col mt-6 sm:mr-5"
                >   
                    <div class="flex"> 
                        <label class="form-label text-base">{{ $t('lucky_draw.draw_create.product') }}</label>

                    </div>
                    <select
                        class="w-full form-select sm:form-select-lg rounded-lg ml-0 sm:ml-5" 
                        v-model="luckyDrawData.campaign_product_id"
                    >   
                        <template v-if="campaignDetailStore.campaignProducts.length == 0">
                            <option class="w-40 " disabled> 
                                {{ $t('lucky_draw.draw_create.assign_product_err') }}
                            </option>
                        </template>
                        <template v-else> 
                            <option v-for="(product, key) in campaignDetailStore.campaignProducts" :key="key" :value="product.id"> 
                                {{ `(${product.order_code})   ${product.name}` }}
                            </option>   
                        </template>
                    </select>
                    <template v-if="drawCondition">
                        <label class="text-danger text-[14px]">
                            {{ $t('lucky_draw.draw_create.campaign_product_warning') }}
                        </label>
                    </template>
                </div>

                <div 
                    v-else-if="luckyDrawData.type === 'keyword'" 
                    class="lg:w-[50%]  flex-col sm:ml-5 mt-3"
                >
                    <label class="form-label text-base mt-3"> {{ $t('lucky_draw.draw_create.keyword') }}</label>
                    <textarea 
                        class="w-full h-14 overflow-hidden whitespace-pre-line p-1 rounded-lg "
                        v-model="luckyDrawData.comment" 
                    ></textarea>
                    <template v-if="drawCondition">
                        <label class="text-danger text-[14px]">
                            {{ $t('lucky_draw.draw_create.keyword_warning') }}
                        </label>
                    </template>
                </div>

                <div 
                    v-else-if="luckyDrawData.type === 'purchased'" 
                    class="lg:w-[50%] flex mt-3 sm:mr-5 justify-center"
                >   

                    <template v-if="campaignDetailStore.campaignProducts.length == 0"> 
                        <label class="form-label text-danger mt-auto text-[14px] md:text-[16px]"> {{ $t('lucky_draw.draw_create.no_product_err')}}</label>
                    </template>
                </div>

                <div
                    v-else 
                    class="lg:w-[50%] flex flex-col mt-3 sm:mr-5">  
                </div>
            </div>

            <div class="lg:flex">
                <div class="lg:w-[100%] flex-col mt-6">
                    <div class="flex justify-between">
                        <label class="form-label text-base mr-auto my-auto"> {{ $t('lucky_draw.draw_create.animation_style') }} </label>
                        <div class="btn btn-primary bg-[#070130] w-48 sm:w-fit shadow-md sm:mt-auto lg:sm:mr-5 text-base">
                            <input type="file" id="upload" @change="uploadAnimation()" hidden/>
                            <label for="upload" id="create_animation">+ {{ $t('lucky_draw.draw_create.upload_animation') }}</label>
                        </div>
                    </div>

                    <div class="flex flex-wrap items-center mt-5">
                        <div class="w-24 h-24 image-fit relative mr-11">
                            <input type="radio" checked class="rounded-full vertical-center absolute top-0 left-0 z-50" name="check_animation" @click="luckyDrawData.animation = `${staticDir}lucky_draw1.svg`" />
                            <img class="rounded-full" :src="`${staticDir}lucky_draw1.svg`" />
                        </div>
                        <div class="w-24 h-24 image-fit relative mr-11">
                            <input type="radio" class="rounded-full vertical-center absolute top-0 left-0 z-50" name="check_animation" @click="luckyDrawData.animation = `${staticDir}lucky_draw2.svg`" />
                            <img class="rounded-full" :src="`${staticDir}lucky_draw2.svg`" />
                        </div>
                        <template v-for="(animates, key) in animationList" :key="key">
                            <div class="w-24 h-24 image-fit relative mr-11">
                                <input type="radio" class="rounded-full vertical-center absolute top-0 left-0 z-50" name="check_animation" @click="luckyDrawData.animation = animates.path" />
                                <img class="rounded-full" :src="animates.path" />
                            </div>
                        </template>
                    </div>
                </div>

            </div>
        </div>



        <div class="flex justify-end my-12 text-base">
            <button class="w-32 bg-white btn dark:border-darkmode-400" @click="routeToLuckyDrawList()"> {{ $t('lucky_draw.draw_create.cancel') }} </button>
            <button class="w-32 ml-5 shadow-md btn btn-primary" @click="save()"> {{ $t('lucky_draw.draw_create.save') }} </button>
        </div>


    </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from "vue-router";


import { create_campapign_lucky_draw, retrieve_campaign_lucky_draw, update_campaign_lucky_draw } from '@/api_v2/campaign_lucky_draw';
import { upload_animation, list_animation } from '@/api_v2/user_subscription';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import { useCampaignDetailStore } from "@/stores/lss-campaign-detail";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue, maxValue, minLength, integer } from "@vuelidate/validators";

import i18n from "@/locales/i18n"



const route = useRoute();
const router = useRouter();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const layoutStore = useLSSSellerLayoutStore()
const campaignDetailStore= useCampaignDetailStore()
const staticDir = import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR

const spinTimes = ref([ { value: 5, name: '5 secs' }, { value: 10, name: '10 secs' }, { value: 20, name: '20 secs' }, { value: 30, name: '30 secs' }, { value: 60, name: '60 secs' }]);
const drawTypes = ref([ { value: 'like', name: 'by like this post' }, { value: 'purchase', name: 'by purchased any product' }, { value: 'product', name: 'by purchased certain product' }, { value: 'keyword', name: 'by keyword' },
    { value: 'sharedpost', name: 'By shared the post' },
    { value: 'like_and_comment', name: 'By like and comment this post' },
 ]);


const computedPrizeList = computed(()=>{
    console.log(campaignDetailStore.campaignProducts)
    return campaignDetailStore.campaignProducts.filter(campaignProduct=>campaignProduct.type=='lucky_draw')
})

const animationList = ref([])

const luckyDrawData = ref({
    spin_time: 5,
    num_of_winner: 0,
    repeatable: false,
    type: 'like',
    comment: '',
    campaign_product: '',
    campaign_product_id:null,
    prize: '',
    title: '',
    animation: `${staticDir}lucky_draw1.svg`,
    // path: `${staticDir}lucky_draw1.svg`
})

const previewImage = ref(null)
const formData = new FormData()
// const type = ref('create')
const luckyDrawId = ref(0)
const productType = ref('')
const drawCondition = ref(false)
const amimation_validate = ref({
    "maximum_size": 10*1024*1024,
    "supported_type": "image"
})

const luckydrawRules = computed(()=> {
    return {
        prize: { required },
        num_of_winner: { required, integer, minValue: minValue(1), maxValue: maxValue(luckyDrawData.value.prize.qty_for_sale) },
    }
});
const validate = useVuelidate(luckydrawRules, luckyDrawData);

const computedType = computed(()=>{
    if(route.params.lucky_draw_id)return 'edit'
    return 'create'
})

onMounted(() => {
    getAnimations()
    if(computedType.value === 'edit'){
        retrieve_campaign_lucky_draw(route.params.lucky_draw_id, layoutStore.alert).then(res => {
            luckyDrawData.value = res.data
            luckyDrawData.value.campaign_product_id = res.data.campaign_product?.id || null
        })
    }
})

const getAnimations = () => {
    list_animation(layoutStore.alert).then(res => {
        animationList.value = res.data
    })
}

const save = () => {
    if (luckyDrawData.value.type === 'product' && typeof luckyDrawData.value.campaign_product_id == null) {
        drawCondition.value = true 
        return
    } else if (luckyDrawData.value.type === 'keyword' && luckyDrawData.value.comment === '') {
        drawCondition.value = true 
        return 
    } else {
        drawCondition.value = false 
    }

    validate.value.$touch();
    if (validate.value.$invalid) {
        layoutStore.alert.showMessageToast(i18n.global.t('lucky_draw.invalid_data'))
        return
    } 
    formData.append('data', JSON.stringify(luckyDrawData.value))

    if (computedType.value == 'create') {
        create_campapign_lucky_draw(route.params.campaign_id, formData, layoutStore.alert).then(res => {
            layoutStore.notification.showMessageToast(i18n.global.t('lucky_draw.create_successed'))
            routeToLuckyDrawList()
        })
    } else if (computedType.value == 'edit') {
        update_campaign_lucky_draw(route.params.lucky_draw_id, formData, layoutStore.alert).then(res => {
            layoutStore.notification.showMessageToast(i18n.global.t('lucky_draw.update_successed'))
            routeToLuckyDrawList()
        })
    }
};

const routeToLuckyDrawList = ()=>{
    router.push({ name: 'lucky-draw-list', params: { campaign_id: route.params.campaign_id}})
}

// const goDraw = () => {
//     formData.append('data', JSON.stringify(luckyDrawData.value))
//     create_campapign_lucky_draw(route.params.campaign_id, formData, layoutStore.alert).then(res => {
//         layoutStore.notification.showMessageToast(i18n.global.t('lucky_draw.create_successed'))
//         let routeData = router.resolve({ name: 'lucky-draw-flow', params: {lucky_draw_id: res.data.id} })
//         window.open(routeData.href, '_blank')
//     })
// }

const uploadAnimation = e => {
    const animation = e.target.files[0];
    if (!animation.type.includes(amimation_validate.value.supported_type)) {
        layoutStore.alert.showMessageToast(i18n.global.t('lucky_draw.animation_type_err'))
        return 
    }
    if (animation.size > amimation_validate.value.maximum_size) {
        layoutStore.alert.showMessageToast(i18n.global.t('lucky_draw.animation_size_err'))
        return 
    }
    
	formData.append('animation', animation)

	const reader = new FileReader();
	reader.readAsDataURL(animation);
	reader.onload = e =>{ previewImage.value = e.target.result; };
    
    upload_animation(formData, layoutStore.alert).then(res => {
        getAnimations()
    })
}

</script>