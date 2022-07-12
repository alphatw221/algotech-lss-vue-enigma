<template>
    <!-- OUTTER BOX -->
    <div class="flex flex-col p-2 text-xl font-medium">
        <!-- BEGIN: commit box -->
        <span class="mt-5 text-xl"> Default Settings</span>

        <div class="flex flex-col gap-5 p-5 box">
            <div class="switch-toggle">
                <input id="on" name="state-d" type="radio" checked="checked" @click="toggleTabs(1)"/>
                <label for="on">Notes</label>
                <input id="na" name="state-d" type="radio" class="" @click="toggleTabs(2)" />
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
