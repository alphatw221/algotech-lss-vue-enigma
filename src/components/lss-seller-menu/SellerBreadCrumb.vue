<template>
    <nav id="breadcrumb" aria-label="breadcrumb" class="h-[24px] text-[15px] mx-2 hidden sm:block">
        <ol class="breadcrumb breadcrumb-dark">
            <template v-for="crumb, index in breadCrumb.slice(0, -1)" :key="index">
                <li  class="breadcrumb-item"><a @click="router.push(crumb.path)">{{$t(`layout.bread_crumb.${crumb.name}`)}}</a></li>
            </template>
            <!-- <li v-if=" breadCrumb[breadCrumb.length - 2] " class="breadcrumb-item">
                <a @click="router.back()">{{breadCrumb[breadCrumb.length - 2 ]}}</a>
            </li> -->
            <li v-if="breadCrumb != ''" class="breadcrumb-item ">{{ $t(`layout.bread_crumb.${breadCrumb[breadCrumb.length - 1 ].name   }`)   }}</li>
            
        </ol>
    </nav>
    <nav  v-if="historyPath !== 0" aria-label="breadcrumb" class="h-[35px] text-[15px] mobileBack block sm:hidden">
        <ol class="breadcrumb breadcrumb-dark">
            <li @click="router.back()"><ChevronLeftIcon class="block mx-1 w-[35px] h-[35px] font-bold rounded-full" /></li>
        </ol>
    </nav>
</template>
<script setup>
import { computed, onMounted, provide, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
// import dom from "@left4code/tw-starter/dist/js/dom";

const route = useRoute();
const router = useRouter();
const historyPath = ref(0)
// const layoutStore = useLSSSellerLayoutStore();

const breadCrumb = ref([])


onMounted(()=>{
    resolvePath()
    historyPath.value = window.history.length
    console.log(historyPath.value)
})

watch(computed(()=>route.path),()=>{resolvePath()})

const resolvePath = ()=>{
    breadCrumb.value=[]
    const paramsDict = getParamsDict()
    const routerPath = route.path.split('/')
    const crumb = []
    let isParams = false
    
    for(let i=routerPath.length-1;i>=2;i--){
        if(routerPath[i] in paramsDict){
            isParams=true
            continue
        }
        crumb.push({
            name:routerPath[i],
            path:isParams?routerPath.slice(0,i+2).join('/') : routerPath.slice(0,i+1).join('/')
        })
        isParams = false
    }
    breadCrumb.value = crumb.reverse()
}

const getParamsDict = ()=>{
    const ret={}
    Object.values(route.params).forEach(value => {
        ret[value]=true
    });
    return ret
}



</script>

<style scoped>
.dark .side-nav{ 
  background-color: theme("colors.dark"); 
}

.breadcrumb-item a{
  color: #7c7c7c;
}

.mobileBack{
  position:absolute;
  top:6px;
  z-index: 50;
}
</style>