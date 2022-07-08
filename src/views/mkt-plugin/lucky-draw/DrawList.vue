<template>
    <div>
        <div v-for="(luckydraw, index) in props.luckydrawList" :key="index">     
            <div class="box bg-secondary my-5 relative hover:border-2 border-slate-500/50">
                <div class="flex content-evenly">
                    <img class="m-3 self-center" :src="storageUrl + luckydraw.animation" style="width:120px" />
                    <span class="mr-10 ml-5 inline-block align-middle self-center">{{ luckydraw.prize.name }}</span>

                    <div class="m-8 flex w-full justify-evenly">
                        <div class="text-left border-r-2 border-slate-700 flex flex-col w-60">
                            <span class="my-1" v-if="luckydraw.type == 'product'"> {{ luckydraw.campaign_product.name }} </span>
                            <span class="my-1" v-else-if="luckydraw.type == 'keyword'"> {{ luckydraw.comment }} </span>
                            <span class="my-4" v-else> </span>

                            <span class="text-lg text-slate-500 mr-5"> {{ drawTitleMap[luckydraw.type] }} </span>
                        </div>
                        <div class="text-left border-r-2 border-slate-700 flex flex-col w-40">
                            <span class="my-1"> {{ luckydraw.num_of_winner }} </span>
                            <div class="text-lg text-slate-500 mr-5"> Winners </div>
                        </div>
                        <div class="text-left flex flex-col w-40">
                            <span v-if="luckydraw.repeatable === true" class="my-1"> Yes </span>
                            <span v-if="luckydraw.repeatable === false" class="my-1"> No </span>
                            <span class="text-lg text-slate-500 mr-5"> Winner Repeat</span>
                        </div>
                        <div class="text-left flex flex-col w-40">
                            <button class="btn btn-primary w-32 mt-auto" @click="goDraw(luckydraw.id)">
                                Start
                            </button>
                        </div>
                    </div>
                </div>
                <Dropdown class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white p-1 ">
                    <DropdownToggle>
                        <MoreHorizontalIcon class="w-6 h-6" />
                    </DropdownToggle>
                    <DropdownMenu class="w-30">
                        <DropdownContent>
                            <DropdownItem>Edit</DropdownItem>
                            <DropdownItem>Delete</DropdownItem>
                        </DropdownContent>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
    luckydrawList: Object
})
const route = useRoute();
const router = useRouter();
const storageUrl = import.meta.env.VITE_GOOGLE_STORAGEL_URL
const drawTitleMap = ref({
    like: "Draw Like",
    purchase: "Draw Purchased",
    product: "Draw Product",
    keyword: "Draw Keyword" 
})


const goDraw = (lucky_draw_id) => {
    let routeData = router.resolve({ name: 'lucky-draw-flow', params: {lucky_draw_id: lucky_draw_id} })
    window.open(routeData.href, '_blank')
}

onMounted(() => {
    console.log(props.luckydrawList)
})

</script>