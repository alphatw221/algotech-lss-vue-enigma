<template>
    <div class="flex flex-row overflow-x-auto">
        <CarletVehicleList :mappingResource="'tire_rack'"/>
        <TireRackVehicleList/>
    </div>
</template>

<script setup>
import {ref, onMounted, watch, computed} from "vue"
import { useRoute, useRouter } from "vue-router";

import CarletVehicleList from '../carlet-vehicle-list/Main.vue'
import TireRackVehicleList from '../tire-rack-vehicle-list/Main.vue'

</script>