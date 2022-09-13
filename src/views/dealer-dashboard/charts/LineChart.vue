<template>
    <div class="flex justify-between"> 
        <h2 class="font-medium text-2xl mb-2 text-base mr-auto">Total Accounts</h2>
        <button class="btn btn-primary w-fit" @click="changePeriod()">{{$t(`dealer.dashboard.`+period)}}</button> 
    </div>
    <LoadingIcon v-if="fetchingData" icon="three-dots" color="1a202c" class="absolute w-[60px] h-[60px] top-1/2 right-1/2 translate-x-1/2"/>
    <Chart
    type="line"
    :height="400"
    :data="data"
    :options="options"
    />
    
  </template>
  
  <script setup>
  import { computed, ref, onMounted } from "vue";
  import { useDarkModeStore } from "@/stores/dark-mode";
  import { useColorSchemeStore } from "@/stores/color-scheme";
  import { colors } from "@/utils/colors";
  import { dealer_dashboard_members } from "@/api_v2/user_subscription";
  import i18n from "@/locales/i18n"

  const darkMode = computed(() => useDarkModeStore().darkMode);
  const colorScheme = computed(() => useColorSchemeStore().colorScheme);
  const newAccounts = ref([]) 
  const dataLabels = ref([])
  const dataValues = ref([])
  const period = ref('year')
  const fetchingData = ref(true)

  const getChartData = ()=>{
    dataLabels.value =[]
    dataValues.value =[]
    fetchingData.value = true
    dealer_dashboard_members(period.value).then(
      res=>{
        newAccounts.value = res.data
        for (const [xkey, xvalue] of Object.entries(newAccounts.value)) {
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

  onMounted(()=>{ getChartData() })

  const changePeriod =()=>{
    period.value = period.value == 'year'?'month':'year'
    getChartData()
  }
  
  const data = computed(() => {
    return {
      labels: dataLabels.value,
      datasets: [
        {
          label: `Subscribed This ${i18n.global.t(`dealer.dashboard.`+period.value+`_label`)}`,
          data: dataValues.value,
          borderWidth: 2,
          borderColor: colorScheme.value ? 'rgba(75, 192, 192, 0.9)' : "",
          backgroundColor: "transparent",
          pointBorderColor: "transparent",
          tension: 0.5,
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
          },
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 12,
            },
            color: colors.slate["500"](0.8),
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            font: {
              size: 12,
            },
            color: colors.slate["500"](0.8),
            callback: function (value) {
              return "" + value;
            },
          },
          grid: {
            color: darkMode.value
              ? colors.slate["500"](0.3)
              : colors.slate["300"](),
            borderDash: [2, 2],
            drawBorder: false,
          },
        },
      },
    };
  });
  </script>
  