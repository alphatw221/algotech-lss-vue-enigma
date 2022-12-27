<template>
    <div class="flex flex-col sm:h-fit">
        <div class="flex-col flex gap-3 my-3 flex-wrap sm:flex-row justify-center sm:justify-between">
            <div class="flex items-center mx-auto sm:mx-20 lg:pt-5 intro-y">
                <h2 class="text-xl sm:text-2xl sm:mx-0 font-medium">{{ $t('auto_reply.title') }}</h2>
                <Tippy 
                    class="rounded-full w-fit whitespace-wrap ml-1 my-auto tippy-mobile" 
                    data-tippy-allowHTML="true" 
                    data-tippy-placement="right" 
                    :content="$t('tooltips.auto_reply.title')" 
                    > 
                    <HelpCircleIcon class="w-5 tippy-icon tippy-mobile" />
                </Tippy> 
            </div>
            <button class="w-40 h-[35px] sm:h-[42px] text-white btn btn-warning btn-rounded mx-auto sm:mx-0 lg:mx-20 lg:mt-5 sm:mt-0 lg:mb-0 mb-3 border-[2px] border-slate-100 shadow-lg"
                @click="eventBus.emit('showCreateAutoreply', action)">
                <span class="font-bold mr-1 text-[16px]">+</span> {{ $t('auto_reply.create') }}
            </button>
        </div>
        <div class="flex flex-col gap-3 p-2 sm:gap-5 box sm:p-10 sm:h-[80vh] lg:mx-20">
            <AutoReplyTable :columns="tableColumns" />
        </div>
    </div>
    <CreateEditModalVue />
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import AutoReplyTable from "./AutoReplyTable.vue";
import CreateEditModalVue from './CreateEditModal.vue';

const internalInstance = getCurrentInstance();
const eventBus = internalInstance.appContext.config.globalProperties.eventBus;

const tableColumns = ref([
    { name: "check", key: "check"},
    { name: "#", key: 'id' },
    { name: "keyword_detect", key: "input_msg" },
    { name: "set_auto_reply", key: "output_msg" },
    { name: "remark", key: "description" },
    { name: "assign_to", key: "page" },
    { name: "", key: "edit" },
])

</script>

