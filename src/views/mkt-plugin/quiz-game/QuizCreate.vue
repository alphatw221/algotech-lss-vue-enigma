<template>
    <div>
        <div class="mt-5 flex justify-self-start">
            <label class="form-label mr-10">{{ $t('lucky_draw.draw_create.campaign_title') }} : </label>
            <h2 style="display: inline-block;"> campaign name </h2>
        </div>
            
        <div class="flex flex-col">
            <div class="lg:flex">
                <div class="lg:w-[50%] flex flex-col lg:mr-5 mt-6">
                    <label class="form-label"> Question </label>
                    <textarea 
                        class="w-full h-20 rounded-lg overflow-hidden p-1"
                        placeholder="Enter Quiz Game Question..."
                        v-model.trim="v.question.$model"
                    ></textarea>
                    <template v-if="v.question.$error">
                        <label class="text-danger text-[14px] leading-tight"> please enter quiz game question. </label>
                    </template>
                </div>

                <div class="lg:w-[50%] flex flex-col lg:mr-5 mt-6">
                    <label class="form-label"> Answer </label>
                    <textarea 
                        class="w-full h-20 rounded-lg overflow-hidden p-1"
                        placeholder="Enter Quiz Game Answer..."
                        v-model.trim="v.answer.$model"
                    ></textarea>
                    <template v-if="v.answer.$error">
                        <label class="text-danger text-[14px] leading-tight"> please enter quiz game answer. </label>
                    </template>
                </div>            
            </div>

            <div class="lg:flex">
                <div class="lg:w-full flex flex-col lg:mr-5 mt-6">
                    <label class="form-label "> Remark </label>
                    <textarea 
                        class="w-full h-24 rounded-lg overflow-hidden whitespace-pre-line p-1"
                        placeholder=" Enter your Remark..."
                        v-model="quizgameSettings.remark"
                    ></textarea>
                </div>
            </div>

            <div class="lg:flex">
                <div class="lg:w-[50%] flex flex-col lg:mr-5 mt-6">
                    <label class="form-label"> No. of Winners</label>
                    <input 
                        class="form-control" 
                        type="text" 
                        v-model.trim="v.num_of_winner.$model" 
                    />
                    <template v-if="v.num_of_winner.$error">
                        <label class="text-danger text-[14px] leading-tight"> please enter between 1 to prizr quantity. </label>
                    </template>
                </div>

                <div class="lg:w-[50%] flex flex-col lg:mr-5 mt-6">
                    <label class="form-label"> Prize </label>
                    <select 
                        class="w-full form-select sm:form-select-lg rounded-lg"
                        v-model="quizgameSettings.prize"
                    >
                        <template v-if="!prizeList.length">
                            <option class="w-40" disabled> 
                                Please assign prize into your campaign
                            </option>
                        </template>
                        <template v-else> 
                            <option v-for="(prize, key) in prizeList" :key="key" :value="prize" class="w-40"> 
                                {{ prize.name }} 
                            </option>
                        </template>    
                    </select>
                </div>
            </div>

            <div class="lg:flex">
                <div class="lg:w-[50%] flex-col mt-6 lg:mr-5">  
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
                    <div class="flex sm:flex-row mt-2">
                        <div class="form-check mr-5">
                            <input 
                                class="form-check-input" 
                                type="radio" 
                                v-model="quizgameSettings.repeatable"
                                :value="true"
                            />
                            <label class="form-check-label"> Yes </label>
                        </div>
                        <div class="form-check mr-5">
                            <input 
                                class="form-check-input" 
                                type="radio"
                                v-model="quizgameSettings.repeatable" 
                                :value="false"
                            />
                            <label class="form-check-label" > No </label>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="flex justify-end my-10 mr-5" >
            <button class="btn w-32 dark:border-darkmode-400" @click="goCancel()"> Cancel </button>
            <button class="btn btn-primary w-32 shadow-md ml-5" @click="upsertQuizGame()"> Save </button>
        </div>

    </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import { list_campaign_product } from '@/api/campaign_product';
import { create_campaign_quiz_game, update_campaign_quiz_game, retrieve_campaign_quiz_game } from '@/api_v2/campaign_quiz_game';
import { useVuelidate } from "@vuelidate/core";
import { required, maxValue, minLength, integer, minValue } from "@vuelidate/validators";


const route = useRoute();
const router = useRouter();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus
const layoutStore = useLSSSellerLayoutStore()
const prizeList = ref([])
const quizgameSettings = ref({
    question: '',
    answer: '',
    remark: '',
    num_of_winner: 0,
    prize: '',
    repeatable: false
})
const quizgameRules = computed(() => {
    return {
        question: { required },
        answer: { required },
        num_of_winner: { required, integer, minValue: minValue(1) },
    }
})
const v = useVuelidate(quizgameRules, quizgameSettings);
const pageType = ref('create')
const quizgameId = ref(0)

onMounted(() => {
    listCampaignProduct()

    eventBus.on('editQuiz', (payload) => {
        retrieve_campaign_quiz_game(payload.quizgame_id).then(res => {
            quizgameSettings.value = res.data
        })
        pageType.value = 'edit'
        quizgameId.value = payload.quizgame_id
    })
})

onUnmounted(() => {
    eventBus.off('editQuiz')
})

const listCampaignProduct = () => {
    list_campaign_product(route.params.campaign_id).then(res => {
        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].type === "lucky_draw") prizeList.value.push(res.data[i])
        }
    })
}

const upsertQuizGame = () => {
    v.value.$touch();
    if (v.value.$invalid || typeof quizgameSettings.value.prize === 'string') {
        layoutStore.alert.showMessageToast('Invalid Submission')
        return
    } 

    if (pageType.value === 'create') {
        create_campaign_quiz_game(route.params.campaign_id, quizgameSettings.value).then(res => {
            eventBus.emit('listQuiz')
        })
    } else if (pageType.value === 'edit') {
        update_campaign_quiz_game(quizgameId.value, quizgameSettings.value).then(res => {
            eventBus.emit('changePage')
            eventBus.emit('listQuiz')
        })
    }
}

const goCancel =() => {
    if (pageType.value === 'create') router.back()
    else if (pageType.value === 'edit') eventBus.emit('changePage')
    
}

</script>