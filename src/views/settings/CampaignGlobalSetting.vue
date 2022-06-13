<template>
    <!-- OUTTER BOX -->
    <div class="w-full h-full">
        <!-- BEGIN: commit box -->
        <div class="box p-2 intro-y grid grid-cols-12 gap-5 p-2">
            <span class="text-lg col-start-1 col-span-12"> Default Settings</span>
            <div class="switch-toggle switch-3 switch-candy col-start-1 m-2 align-middle">
                <input id="on" name="state-d" type="radio" checked="checked" @click="toggleTabs(1)"/>
                <label for="on" style="width: 100px; font-size:14px;" class="align-middle">Notes</label>
                <input id="na" name="state-d" type="radio" class="my-0" @click="toggleTabs(2)" />
                <label for="na" style="width: 100px; font-size:14px;" class="align-middle">Payment</label>
                <input id="off" name="state-d" type="radio" @click="toggleTabs(3)" />
                <label for="off" style="width: 100px; font-size:14px;" class="align-middle">Delivery</label>
            </div>
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
import PaymentSettings from './PaymentSettings.vue';
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

<style scoped>
.switch-toggle {
    overflow: visible;
    float: left;
    height: 42px;
    width: 300px;
    background: theme("colors.secondary");
    border-radius: 42px 42px;
    letter-spacing: 0.7px;
    box-shadow: inset -4px -4px 8px rgba(255, 255, 255, 0.185),
        inset 8px 8px 16px rgba(0, 0, 0, 0.1);
}

.dark .switch-toggle {
    box-shadow: inset -4px -4px 8px rgba(22, 22, 22, 0.596),
        inset 8px 8px 16px rgba(0, 0, 0, 0.1);
    --color-secondary: theme("colors.rgb.blueGray.800");
}

.switch-toggle input {
    position: absolute;
    opacity: 0;
}

.switch-toggle input+label {
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 15px;
    padding-right: 15px;
    float: left;
    text-align: center;
    color: rgb(56, 56, 56);
    cursor: pointer;
}

.dark .switch-toggle input+label {
    color: rgb(255, 255, 255);
}

.switch-toggle input:checked+label {
    background: theme("colors.primary");
    height: 42px;
    width: 100px;
    border-radius: 42px 42px;
    font-weight: 500;
    color: aliceblue;
}
</style> 