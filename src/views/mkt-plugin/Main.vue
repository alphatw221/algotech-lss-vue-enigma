<template>
    <!-- OUTTER BOX -->
    <div class="flex flex-row flex-wrap justify-center h-full place-items-center box">
        <!-- BEGIN: commit box -->

    <div class="box w-60 h-60 m-5 p-5 -mt-20 dark:bg-dark cursor-pointer ring ring-slate-300 hover:border-2 border-slate-400"
        @click="router.push('/seller/mkt-plugin/lucky-draw')">
        <div class="flex flex-col justify-center text-center">
            <h1 class="mt-5">Lucky Draw</h1>
            <font-awesome-icon icon="fa-solid fa-puzzle-piece" class="h-28 m-6 mr-2" />
        </div>
    </div>
    <div class="box w-60 h-60 m-5 p-5 -mt-20 dark:bg-dark cursor-pointer ring ring-slate-300 hover:border-2 border-slate-400"
        @click="router.push('/seller/mkt-plugin/quiz-game')">
        <div class="flex flex-col justify-center text-center">
            <h1 class="mt-5">Quiz Game</h1>
            <font-awesome-icon icon="fa-solid fa-puzzle-piece" class="h-28 m-6 mr-10 -rotate-90"  />
        </div>
    </div>

    </div>
</template>

<script setup> 
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<style scoped>
</style> 