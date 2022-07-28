<template>
    <!-- OUTTER BOX -->
    <div class="flex flex-col h-full box text-lg p-10 pl-12 pr-20">
        <!-- BEGIN: commit box -->
        <h1 class="text-center"> Quiz Game Settings</h1>

        <form class="flex flex-col">
            <div class="mt-3">
                <label for="update-profile-form-2" class="form-label">Campaign Title</label>
                <TomSelect id="update-profile-form-2" v-model="currentSettings.campaign">
                    <!-- Show Ongoing/Scheduled Campaign List -->
                    <option v-for="(campaign, key) in campaignList" :key="key" value="campaign_id">campaign_name</option>
                </TomSelect>
            </div>
            
            <div class="mt-6 flex flex-col">
                <label for="update-profile-form-2" class="form-label "> Question</label>
                <input type="text" class="rounded-lg w-full"/>
            </div>
            <div class="mt-6 flex flex-col">
                <label for="update-profile-form-2" class="form-label "> Answer</label>
                <input type="text" class="rounded-lg w-full"/>
            </div>
            
            <div class="mt-6 w-full flex flex-col mr-5">
                <label for="update-profile-form-2" class="form-label "> Remark</label>
                <textarea class="w-full h-32 rounded-lg overflow-hidden whitespace-pre-line p-1"
                    v-model="currentSettings.comment" placeholder=" Enter your Remark...">
                </textarea>
            </div>
            <div class="mt-6 flex">
                <div class="w-[50%] flex flex-col">
                    <label for="update-profile-form-2" class="form-label"> No. of Winners</label>
                    <input id="form-2" type="text" class="form-control" v-model="currentSettings.winners" />
                    <div class="w-full flex flex-col mt-6">
                        <label for="update-profile-form-2" class="form-label"> Prize</label>
                        <select class="w-full form-select-lg rounded-lg" v-model="currentSettings.prize">
                            <option v-for="(prize, key) in prizeList" :key="key" :value="prize.value"> {{ prize.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="w-[50%] flex flex-col ml-20">
                    <label for="update-profile-form-2" class="form-label "> Winner Repeat</label>
                    <div class="flex flex-row mt-2">
                        <div class="form-check mr-5">
                            <input id="radio-switch-yes" class="form-check-input" type="radio"
                                v-model="currentSettings.repeat" :value="true" />
                            <label class="form-check-label" for="radio-switch-yes">Yes</label>
                        </div>
                        <div class="form-check mr-5 mt-2 sm:mt-0">
                            <input id="radio-switch-no" class="form-check-input" type="radio"
                                v-model="currentSettings.repeat" :value="false" />
                            <label class="form-check-label" for="radio-switch-no">No</label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="flex justify-end my-8">
            <button class="btn w-32 dark:border-darkmode-400" @click="$router.back()"> Cancel</button>
            <button class="btn btn-primary w-32 shadow-md ml-5" @click="save"> Save</button>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch, onMounted } from 'vue';
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"

const route = useRoute();
const router = useRouter();
const layoutStore = useLSSSellerLayoutStore()

const currentSettings = ref({
    campaign: '',
    question: '',
    answer: '',
    Remark: '',
    winners: 0,
    follower: false,
    prize: '',
})
const prizeList = ref([]);
const campaignList = ref([]);

const save = () => {

}


</script>

<style scoped>
</style> 