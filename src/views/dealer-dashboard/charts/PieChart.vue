<template>
  <h2 class="font-medium text-2xl mb-2 text-base mr-auto">Revenue</h2>
  <Chart
    type="pie"
    :height="400"
    :data="data"
    :options="options"
  />
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useDarkModeStore } from "@/stores/dark-mode";
import { useColorSchemeStore } from "@/stores/color-scheme";
import { dealer_period_revenue } from "@/api_v2/user_subscription";
import { colors } from "@/utils/colors";

const darkMode = computed(() => useDarkModeStore().darkMode);
const colorScheme = computed(() => useColorSchemeStore().colorScheme);

const props = defineProps({
  width: {
    type: [Number, String],
    default: "auto",
  },
  height: {
    type: [Number, String],
    default: "auto",
  },
});

const period = ref('month')
const country_code = ref('SG')
const revenue = ref([])
const getChartData = ()=>{
    dealer_period_revenue(period.value,country_code.value).then(
      res=>{
        revenue.value = res.data
        console.log('xxx',res)
      }
    )
  }

onMounted(()=>{ getChartData() })

const chartData = [35, 14, 45, 30];
const chartColors = () => [
  colors.info(0.9),
  'rgba(75, 192, 192, 0.9)',
  'rgba(153, 102, 255, 0.9)',
  'rgba(255, 159, 64, 0.9)'
];

const data = computed(() => {
  return {
    labels: ["Q1", "Q2", "Q3","Q4"],
    datasets: [
      {
        data: chartData,
        backgroundColor: colorScheme.value ? chartColors() : "",
        hoverBackgroundColor: colorScheme.value ? chartColors() : "",
        borderWidth: 5,
        borderColor: darkMode.value ? colors.darkmode[700]() : colors.white,
        hoverOffset: 4
      },
    ],
  };
});

const options = computed(() => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: colors.slate["500"](0.8),
          font: {
            size: 15
          }
        },
      },
    },
  };
});

</script>
