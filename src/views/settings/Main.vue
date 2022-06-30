<template>
    <!-- OUTTER BOX -->
    <div class="box p-5 flex flex-col gap-5">
        <!-- BEGIN: commit box -->
        <span class="text-lg mt-5"> Default Settings</span>
        <div class="switch-toggle">
            <input id="on" name="state-d" type="radio" checked="checked" @click="toggleTabs(1)"/>
            <label for="on">Notes</label>
            <input id="na" name="state-d" type="radio" class="my-0" @click="toggleTabs(2)" />
            <label for="na">Payment</label>
            <input id="off" name="state-d" type="radio" @click="toggleTabs(3)" />
            <label for="off">Delivery</label>
        </div>

        <div id="notes" :class="{ hidden: openTab !== 1, block: openTab === 1 }">
            <NotesSettings />
        </div>

        <div id="payment" :class="{ hidden: openTab !== 2, block: openTab === 2 }">
            <PaymentSettings />
        </div>

        <div id="delivery" :class="{ hidden: openTab !== 3, block: openTab === 3 }">
            <DeliverySettings />
        </div>
    </div>
</template>

<script>
import NotesSettings from './NotesSettings.vue';
import PaymentSettings from './payment-settings/Main.vue';
import DeliverySettings from './DeliverySettings.vue';

export default {
    components: {
        NotesSettings,
        PaymentSettings,
        DeliverySettings
    },
    data() {
        return {
            openTab: 1,
            range: 1,
        }
    },
    methods: {
        toggleTabs: function (tabNumber) {
            this.openTab = tabNumber;
        },
    },
}
</script>
