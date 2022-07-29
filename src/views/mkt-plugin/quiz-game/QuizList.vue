<template>
    <div class="m-3 sm:m-5">
        <div class="flex justify-between flex-col lg:flex-row gap-5 mb-10">
            <div class="flex justify-start">
                <label class="form-label mr-10"> Campaign Title </label>
                <h2 class="w-42"> {{ props.campaignTitle }} </h2>
            </div>

            <div class="flex justify-between">
                <button class="btn btn-primary w-32 mr-0 sm:mr-3 h-[35px] sm:h-[42px]">
                    All Winner
                </button>
                <button 
                    class="btn btn-primary w-32 ml-auto h-[35px] sm:h-[42px]" 
                    @click="eventBus.emit('changePage')"
                >
                    Create
                </button>
            </div>
        </div>

        <div class="overflow-x-hidden sm:overflow-auto h-fit sm:h-[56vh]">
            <table class="table -mt-3 table-report min-h-[300px]">
                <thead>
                    <tr>
                        <th class="whitespace-normal xl:whitespace-nowrap text-center text-[16px]" v-for="column in tableColumns" :key="column.key">
                            <template v-if="column.key === 'edit' || column.key === 'button'">
                                {{ '' }}
                            </template>
                            <template v-else>
                                {{ column.key }}
                            </template>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="(quizgame, index_i) in props.quizgameList"
                        :key="index_i"
                        class="intro-x"
                    >
                        <template v-for="(column, index_j) in tableColumns" :key="index_j"> 
                            <td v-if="column.key === 'edit'"  class="w-24 table-report__action edit" >
                                <div class="place-content-center flex"> 
                                    <Dropdown placement="bottom-start">
                                        <DropdownToggle role="button" class="block w-5 h-5" href="javascript:;">
                                            <MoreHorizontalIcon class="w-5 h-5 text-slate-700" />
                                        </DropdownToggle>
                                        <DropdownMenu class="w-24 pt-2">
                                            <DropdownContent class="w-24 text-center">
                                                <DropdownItem 
                                                    class="w-20 text-center whitespace-nowrap text-[14px]"
                                                    @click="goEdit(quizgame.id)"
                                                > 
                                                    <EditIcon class="w-[20px] h-[20px] mx-1"/> Edit
                                                </DropdownItem>
                                                <DropdownItem 
                                                    class="w-20 text-center text-danger whitespace-nowrap text-[14px]"
                                                    @click="goDelete(quizgame.id)"
                                                > 
                                                    <Trash2Icon class="w-[20px] h-[20px] mx-1"/> Delete
                                                </DropdownItem>
                                            </DropdownContent>
                                        </DropdownMenu>
                                    </Dropdown> 
                                </div>
                            </td>

                            <td v-else-if="column.key === 'button'">
                                <button 
                                    class="btn btn-primary w-full lg:w-24 mt-auto h-[35px] sm:h-[42px] ml-auto" 
                                    @click="quizgameStart(quizgame.id)"
                                    v-if="emptyArr.includes(quizgame.start_at)"
                                > Start </button>
                                <button 
                                    class="btn btn-seconday w-full lg:w-24 mt-auto h-[35px] sm:h-[42px] ml-auto" 
                                    @click="quizgameStop(quizgame.id)"
                                    v-else
                                > Stop </button>
                                
                            </td>
                            
                            <td v-else class="w-full sm:w-fit" >
                                <div class="">{{quizgame[column.key]}}</div> 
                            </td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
   
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import { start_campaign_quiz_game, stop_campaign_quiz_game, delete_campaign_quiz_game } from '@/api_v2/campaign_quiz_game';


const route = useRoute()
const router = useRouter()
const layoutStore = useLSSSellerLayoutStore()
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus
const props = defineProps({
    campaignTitle: String,
    quizgameList: Object
})
const tableColumns = ref([
    { key: 'id' },
    { key: 'question' },
    { key: 'answer' },
    { key: 'num_of_winner' },
    { key: 'remark' },
    { key: 'repeatable' },
    { key: 'button' },
    { key: 'edit' }
])
const emptyArr = ref(['', null, undefined])


const hideDropDown = ()=>{
  dom('.dropdown-menu').removeClass('show')
}

const quizgameStart = (id) => {
    start_campaign_quiz_game(id).then(res => { 
        Object.values(props.quizgameList).forEach(quizgame => {
            if (quizgame.id === parseInt(id)) quizgame.start_at = res.data.start_at
        })
    })
}

const quizgameStop = (id) => {
    stop_campaign_quiz_game(id).then(res => { 
        Object.values(props.quizgameList).forEach(quizgame => {
            if (quizgame.id === parseInt(id)) quizgame.end_at = res.data.end_at
        })
    })
}

const goEdit = (id) => {
    eventBus.emit('changePage')
    eventBus.emit('editQuiz', { 'quizgame_id': id })
    hideDropDown()
}

const goDelete = (id) => {
    delete_campaign_quiz_game(id).then(res => {
        if (res.data.message === 'delete success') layoutStore.notification.showMessageToast('Delete success');
        eventBus.emit('listQuiz')
    })
    hideDropDown()
}

</script>