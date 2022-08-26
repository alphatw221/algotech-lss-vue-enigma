<template>
  <div class="flex flex-col items-center sm:px-20 lg:pt-5 mt-3 pb-4 intro-y gap-10">
    <ReportCard />
    <Chart /> 
  </div>
</template>

<script setup>
import Chart from './Chart.vue'
import ReportCard from './ReportCard.vue'
</script>
