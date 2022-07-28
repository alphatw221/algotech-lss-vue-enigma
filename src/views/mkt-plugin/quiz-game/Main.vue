<template>
    <div class="flex flex-col h-[100%] text-lg py-3 sm:px-5" v-if="ready">
        <h1 class="text-center sm:text-left text-xl sm:text-2xl font-medium"> Quiz Game </h1>

        <div class="box p-3 sm:p-10 sm:m-5">
            <div :show="!isQuizList">
                <QuizGameCreate />
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, getCurrentInstance, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import QuizGameCreate from './QuizGameCreate.vue';


const ready = ref(true)
const isQuizList = ref(false)


</script>
    