<template>
    <div class=" my-1 sm:mt-1 inline-block align-middle">
        <div class=" ml-auto sm:ml-1 mr-2 inline-block align-middle"> 
            <div class="relative inline-block"> 
                <input type="text" class="form-control w-40 lg:w-60 rounded-lg h-[35px] sm:h-[42px] pr-10"
                :placeholder="$t('manage_order.search_bar.search_product')" v-model="searchValue" @keydown.enter.prevent="search()"/>
                <SearchIcon class="absolute w-7 h-7 top-1 sm:top-2 right-2 z-10 text-slate-600" @click="search()"/>
            </div>
            <XIcon 
                v-if="searchValue"
                class="inline-block w-7 h-7 mt-2 text-slate-600 ml-2 " @click="search('reset')"/>
        </div>
    </div>
</template>
<script setup>
import { ref, provide, onMounted, onUnmounted, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const eventBus = getCurrentInstance().appContext.config.globalProperties.eventBus;
const searchValue = ref('')

const search = (type) =>{
    if(type== 'reset') searchValue.value = ''
    eventBus.emit('keywordforCart',searchValue.value)
}
</script>
