<template>
            <!-- Display Assigned Lucky Draw with For Loop -->
        <div class="box bg-secondary my-5 relative hover:border-2 border-slate-500/50">
            <div class="flex content-evenly h-fit">
                <img class="h-40 m-3 self-center" :src="currentSettings.prize.src" />
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
                    <div class="text-left flex flex-col w-40">
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
</template>

<script setup>
import { ref } from 'vue';

const currentSettings = ref({
    campaign_id: '',
    prize: {
        name: '', 
        src: ''
    },
    spinTime: 5,
    winners: 0,
    repeat: false,
    type: 'like',
    comment: '',
})

</script>