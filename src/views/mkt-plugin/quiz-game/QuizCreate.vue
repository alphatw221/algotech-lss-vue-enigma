<template>
    <div class="px-5 sm:px-10">
        <div class="mt-5 flex justify-self-start font-medium">
            <label class="form-label mr-10">{{ $t('quiz_game.quiz_create.campaign_title') }} : </label>
            <h2 style="display: inline-block;">  {{ props.campaignTitle }} </h2>
        </div>
            
        <div class="flex flex-col">
            <div class="flex justify-between col-span-12 col-start-1 mt-5"> 
                <label for="regular-form-2" class="form-label my-auto"> {{ $t('quiz_game.quiz_create.question_title') }} </label>
                <button 
                    class="inline-block sm:rounded-lg sm:w-fit btn btn-primary ml-auto w-fit text-base h-[42px]" 
                    @click="addQuestion()"
                >
                    + {{ $t('quiz_game.quiz_create.add_question') }} 
                </button>
            </div>

            <div 
                class="flex flex-col flex-wrap gap-3 mt-5 sm:flex-row sm:mt-3"
                v-for="(question, index) in quizgameSettings.quiz_games" 
                :key="index"
            >
                <div class="lg:w-[65%]">
                    <input  
                        class="form-control w-full text-base"
                        :class="{'border-red-600': emptyQA}"
                        type="text" 
                        :placeholder="$t('quiz_game.quiz_create.question') "
                        v-model="question.question"
                    />
                </div>
                
                <div class="lg:w-[20%]">
                    <input  
                        class="form-control w-full text-base"
                        :class="{'border-red-600': emptyQA}"
                        type="text" 
                        :placeholder="$t('quiz_game.quiz_create.answer')"
                        v-model="question.answer"
                    />
                </div>
                
                <button 
                    class="inline-block w-full h-[42px] ml-auto text-base btn btn-danger sm:rounded-lg sm:w-24"
                    @click="deleteQuestion(index, question.id)" 
                >
                    {{ $t('quiz_game.quiz_create.delete') }} 
                </button>
            </div>

            <div class="lg:flex">
                <div class="lg:w-full flex flex-col mt-6">
                    <label class="form-label text-base"> {{ $t('quiz_game.quiz_create.remark') }}  </label>
                    <textarea 
                        class="w-full h-24 rounded-lg overflow-hidden whitespace-pre-line p-1"
                        :placeholder="$t('quiz_game.quiz_create.enter_remark')"
                        v-model="quizgameSettings.remark"
                    ></textarea>
                </div>
            </div>

            <div class="lg:flex">
                <div class="lg:w-[50%] flex flex-col lg:mr-5 mt-6">
                    <label class="form-label text-base"> {{ $t('quiz_game.quiz_create.number_of_winner') }}  </label>
                    <input 
                        class="form-control" 
                        type="text" 
                        v-model.trim="v.num_of_winner.$model" 
                    />
                    <template v-if="v.num_of_winner.$error">
                        <label class="text-danger text-[14px] leading-tight"> {{ $t('quiz_game.quiz_create.number_winner_warning') }} </label>
                    </template>
                </div>

                <div class="lg:w-[50%] flex flex-col mt-6">
                    <label class="form-label text-base"> {{ $t('quiz_game.quiz_create.prize') }} </label>
                    <select 
                        class="w-full form-select sm:form-select-lg rounded-lg"
                        v-model="v.prize.$model"
                    >
                        <template v-if="!prizeList.length">
                            <option class="w-40 text-danger" disabled> 
                                {{ $t('quiz_game.quiz_create.assign_prize_err') }} 
                            </option>
                        </template>
                        <template v-else> 
                            <option v-for="(prize, key) in prizeList" :key="key" :value="prize" class="w-40"> 
                                {{ prize.name }} 
                            </option>
                        </template>    
                    </select>
                    <template v-if="v.prize.$error">
                        <label class="text-danger text-[14px] leading-tight"> {{ $t('quiz_game.quiz_create.prize_err') }} </label>
                    </template>
                </div>
            </div>

            <div class="lg:flex">
                <div class="lg:w-[50%] flex-col mt-6 lg:mr-5">  
                    <div class="flex"> 
                        <label class="form-label text-base"> {{ $t('lucky_draw.draw_create.winner_repeat') }} </label> 
                        <Tippy 
                            class="rounded-full w-fit whitespace-wrap ml-1" 
                            data-tippy-allowHTML="true" 
                            data-tippy-placement="right" 
                            :content="$t('lucky_draw.draw_create.winner_repeat_tip')" 
                            theme='light'
                        > 
                            <HelpCircleIcon class="w-5 tippy-icon" />
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
                            <label class="form-check-label"> {{ $t('lucky_draw.draw_create.yes') }} </label>
                        </div>
                        <div class="form-check mr-5">
                            <input 
                                class="form-check-input" 
                                type="radio"
                                v-model="quizgameSettings.repeatable" 
                                :value="false"
                            />
                            <label class="form-check-label" > {{ $t('lucky_draw.draw_create.no') }} </label>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="flex justify-end my-10 text-base" >
            <button class="w-32 bg-white btn dark:border-darkmode-400" @click="goCancel()"> {{ $t('lucky_draw.draw_create.cancel') }} </button>
            <button class="w-32 ml-5 shadow-md btn btn-primary" @click="upsertQuizGame()"> {{ $t('lucky_draw.draw_create.save') }} </button>
        </div>

    </div>
</template>

<script setup>
import { ref, watch, onMounted, getCurrentInstance, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import { useVuelidate } from "@vuelidate/core";
import { required, maxValue, minLength, integer, minValue } from "@vuelidate/validators";

import { seller_list_campaign_product } from '@/api_v2/campaign_product'
import { create_campaign_quiz_game, update_campaign_quiz_game, delete_campaign_quiz_game, retrieve_campaign_quiz_game } from '@/api_v2/campaign_quiz_game';
import i18n from "@/locales/i18n"

const props = defineProps({
    campaignTitle: String
})
const route = useRoute()
const router = useRouter()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus
const layoutStore = useLSSSellerLayoutStore()
const ready = ref(true)
const prizeList = ref([])
const quizgameSettings = ref({
    quiz_games: [{ question: null, answer: null }],
    remark: '',
    num_of_winner: 0,
    prize: '',
    repeatable: false
})
const questionObj = ref({ question: null, answer: null })
const quizgameEmptySettings = ref({ quiz_games: [{ question: null, answer: null }], remark: '', num_of_winner: 0, prize: '', repeatable: false })
const quizgameRules = computed(() => {
    return {
        num_of_winner: { required, integer, minValue: minValue(1)},
        prize: { required },
    }
})
const v = useVuelidate(quizgameRules, quizgameSettings);
const pageType = ref('create')
const quizgameBundleId = ref(0)
const emptyQA = ref(false)


onMounted(() => {
    listCampaignProduct()

    eventBus.on('editQuiz', (payload) => {
        quizgameBundleId.value = payload.quizgameBundleId
        retrieve_campaign_quiz_game(quizgameBundleId.value, layoutStore.alert).then(res => {
            quizgameSettings.value = res.data
        })
        pageType.value = 'edit'
    })
})

const listCampaignProduct = () => {
    seller_list_campaign_product(route.params.campaign_id, 'lucky_draw', layoutStore.alert).then(res => {
        // for (let i = 0; i < res.data.length; i++) {
        //     if (res.data[i].type === "lucky_draw") prizeList.value.push(res.data[i])
        // }
        prizeList.value = res.data
    })
}

const addQuestion = () => {
    quizgameSettings.value.quiz_games.unshift(Object.assign({}, questionObj.value))
}

const deleteQuestion = (index, id) => {
    if (![undefined, null, ''].includes(id)) {
        delete_campaign_quiz_game(id, layoutStore.alert).then(res => {
            layoutStore.notification.showMessageToast(i18n.global.t('quiz_game.delete_succeed'))
        })
    }

    quizgameSettings.value.quiz_games.splice(index, 1)
}

const upsertQuizGame = () => {
    // console.log(quizgameSettings.value)
    v.value.$touch();
    if (v.value.$invalid) {
        layoutStore.alert.showMessageToast(i18n.global.t('quiz_game.invalid_data'))
        return
    } 
    quizgameSettings.value.quiz_games.forEach(val => {
        if ([undefined, null, ''].includes(val.question) || [undefined, null, ''].includes(val.answer)) {
            emptyQA.value = true
            return
        }
    })

    if (pageType.value === 'create') {
        create_campaign_quiz_game(route.params.campaign_id, quizgameSettings.value, layoutStore.alert).then(res => {
            layoutStore.notification.showMessageToast(i18n.global.t('quiz_game.create_succeed'))
            emptyQA.value = false
            eventBus.emit('listQuiz')
            quizgameSettings.value = quizgameEmptySettings.value
        })
    } else if (pageType.value === 'edit') {
        update_campaign_quiz_game(quizgameBundleId.value, quizgameSettings.value, layoutStore.alert).then(res => {
            layoutStore.notification.showMessageToast(i18n.global.t('quiz_game.update_succeed'))
            emptyQA.value = false
            eventBus.emit('changePage')
            eventBus.emit('listQuiz')
            pageType.value = 'create'
            quizgameSettings.value = quizgameEmptySettings.value
        })
    }
}

const goCancel = () => {
    if (pageType.value === 'edit') {
        layoutStore.notification.showMessageToast(i18n.global.t('quiz_game.not_saved'))
        eventBus.emit('listQuiz')
        pageType.value = 'create'
        quizgameSettings.value = quizgameEmptySettings.value
    }
    eventBus.emit('changePage')
}

</script>

<style scope>

@media only screen and (max-width: 760px),
(min-device-width: 769px) and (max-device-width: 769px) {
    .add_btn {
        width: 100%;
        margin-top: 10px;
    }
}

</style>