<template>
    <div class="intro-y grid grid-cols-12 gap-6 w-full">
        <div class="col-span-12 lg:col-span-6 p-5 box">
            <h2 class="font-medium text-2xl mb-2 text-base mr-auto">New Accounts</h2>
            <LineChart :height="400" />
        </div>
        <div class="col-span-12 lg:col-span-6 p-5 box">
            <h2 class="font-medium text-2xl mb-2 text-base mr-auto">Total Accounts</h2>
            <PieChart :height="400" />
        </div>
    </div>
</template>

<script setup>
import LineChart from "@/components/line-chart/Main.vue";
import PieChart from "@/components/pie-chart/Main.vue";
</script>
