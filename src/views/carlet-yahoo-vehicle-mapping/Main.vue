<template>
    <div class="flex flex-row overflow-x-auto">
        <CarletVehicleList :mappingResource="'yahoo'"/>
        <YahooVehicleList/>
    </div>
</template>

<script setup>
import {ref, onMounted, watch, computed} from "vue"
import { useRoute, useRouter } from "vue-router";

import CarletVehicleList from '../carlet-vehicle-list/Main.vue'
import YahooVehicleList from '../yahoo-vehicle-list/Main.vue'

</script>