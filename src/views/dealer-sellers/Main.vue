<template>
    <!-- BEGIN OUTTER BOX -->
    <div class="flex items-center sm:px-20 lg:pt-5 mt-3 pb-4 intro-y">
        <h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium">
            Sellers
        </h2>
    </div>
    <div class="flex flex-col p-3 box sm:h-[95%] p-2 lg:gap-3 sm:px-8 h-fit lg:mx-20">
        <!-- BEGIN: commit box -->
        <div class="flex flex-row flex-wrap justify-center sm:justify-between mt-5 mx-0 gap-3 sm:gap-5">
            <div class="flex-none switch-toggle mx-auto sm:mx-0">
                <input id="off" name="state-d" type="radio" />
                <label for="off" @click="show_campaign('ongoing')"> All</label>
                <input id="on" name="state-d" type="radio" checked="checked" />
                <label for="on" @click="show_campaign('scheduled')">Current</label>
                <input id="na" name="state-d" type="radio" class="my-0" />
                <label for="na" @click="show_campaign('history')">History</label>
            </div>
        </div>
    </div>
    <!-- END OUTTER BOX -->
</template>

<script setup>
import { ref, watch, computed, getCurrentInstance, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLSSCampaignListStore } from "@/stores/lss-campaign-list";

</script>