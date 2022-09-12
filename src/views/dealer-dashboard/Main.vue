<template>
  <div class="flex flex-col items-center sm:px-20 lg:pt-5 mt-3 pb-4 intro-y gap-10">
    <ReportCard />
    <div class="intro-y grid grid-cols-12 gap-6 w-full">
        <div class="col-span-12 lg:col-span-6 p-5 box">
            <LineChart />
        </div>
        <div class="col-span-12 lg:col-span-6 p-5 box">
            <PieChart />
        </div>
    </div>
  </div>
</template>

<script setup>
import LineChart from './charts/LineChart.vue'
import PieChart from './charts/PieChart.vue'
import ReportCard from './ReportCard.vue'
</script>
