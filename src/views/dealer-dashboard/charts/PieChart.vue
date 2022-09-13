<template>
  <div class="flex justify-between"> 
        <h2 class="font-medium text-2xl mb-2 text-base mr-auto">Revenue</h2>
        <button class="btn btn-primary w-fit" @click="changePeriod()">{{$t(`dealer.dashboard.`+period)}}</button> 
    </div>
    <LoadingIcon v-if="fetchingData" icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] top-1/2 right-1/2 translate-x-1/2"/>
    <Chart
      type="doughnut"
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
import { useLSSDealerLayoutStore } from "@/stores/lss-dealer-layout";

const darkMode = computed(() => useDarkModeStore().darkMode);
const colorScheme = computed(() => useColorSchemeStore().colorScheme);
const layoutStore = useLSSDealerLayoutStore()

const period = ref('year')
const country_code = layoutStore.userInfo.user_subscription.country
const revenue = ref([])
const dataLabels = ref([])
const dataValues = ref([])
const fetchingData = ref(true)

const changePeriod =()=>{
  period.value = period.value == 'year'?'quarter':'year'
  getChartData()
}

const getChartData = ()=>{
  dataLabels.value =[]
  dataValues.value =[]
  fetchingData.value = true
  dealer_period_revenue(period.value,country_code).then(
    res=>{
      revenue.value = res.data
      for (const [xkey, xvalue] of Object.entries(revenue.value)) {
          for (const [key, value] of Object.entries(xvalue)) {
              dataLabels.value.push(key)
              dataValues.value.push(value)
          }
      }
      dataValues.value =  dataValues.value.reverse()
      dataLabels.value = dataLabels.value.reverse()
      fetchingData.value = false
    }
    )
  }

onMounted(()=>{ 
  getChartData() })

const chartColors = () => [
  colors.info(0.9),
  '#FFA54F','#FFEA4F','#D36430','#3fa7c4',
  '#fc6060','#EE799F','#D1D1D1','#C6E2FF',
  '#AEBB51','#A68064','#8F8FBC','#7FFFD4'];

const data = computed(() => {
  return {
    labels: dataLabels.value,
    datasets: [
      {
        data: dataValues.value,
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
      tooltip: {
        callbacks: {
            label: function(context) {
                let label = context.dataset.label || '';

                if (context.label !== null) {
                    label += context.label;
                }
                if (label) {
                    label += ': $';
                }
                if (context.formattedValue !== null) {
                  label += context.formattedValue;
                }
                return label;
            }
        }
      }
    },
  }
});

</script>
