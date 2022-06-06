<template>
<Notification refKey="store.notSaveAlertToggle" :options="{
        duration: 5000,
    }" class="flex flex-col sm:flex-row">
        <div class="font-medium">Modefiy is not saved</div>
</Notification>
</template>

<script setup>
import {alertStore} from "@/stores/lss-alert"; 

const store = alertStore(); 
</script>



