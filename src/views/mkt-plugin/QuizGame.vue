<template>
    <!-- OUTTER BOX -->
    <div class="flex flex-col h-full box text-lg overflow-y-auto p-10 pl-12 pr-20">
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
            <button class="btn btn-secondary mr-5" @click="$router.back()"> Cancel</button>
            <button class="btn btn-primary" @click="save"> Save</button>
        </div>

        <!-- Display Assigned Lucky Draw with For Loop -->
        <div class="box bg-secondary my-5 relative hover:border-2 border-slate-500/50">
            <div class="flex content-evenly h-fit">
                <span class="mr-10 ml-5 inline-block align-middle self-center"> Prize_name</span> 
                <div class="m-8 flex w-full justify-evenly">
                    <div class="text-left border-r-2 border-slate-700 flex flex-col w-60">
                        <span class="my-1"> happy </span>
                        <span class="text-sm text-slate-500 mr-5"> {{ currentSettings.comment }} </span>
                    </div>
                    <div class="text-left border-r-2 border-slate-700 flex flex-col w-40">
                        <span class="my-1"> {{ currentSettings.winners }} </span>
                        <div class="text-lg text-slate-500 mr-5"> winner</div>
                    </div> 
                    <div class="text-left border-r-2 flex flex-col w-40">
                        <span v-if="currentSettings.repeat === true" class="my-1"> Yes </span>
                        <span v-else class="my-1"> No </span>
                        <span class="text-lg text-slate-500 mr-5"> Winner Repeat</span>
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
                        <DropdownItem>Duplicate</DropdownItem>
                        <DropdownItem>Delete</DropdownItem>
                    </DropdownContent>
                </DropdownMenu>
            </Dropdown>
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