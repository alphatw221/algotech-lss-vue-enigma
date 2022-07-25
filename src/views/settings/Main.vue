<template>
    <!-- OUTTER BOX -->
    <div class="flex flex-col p-2 font-medium text-sm sm:text-xl">
        <!-- BEGIN: commit box -->
 
        <div class="flex items-center sm:px-20 pb-4 intro-y">
            <h2 class="text-xl sm:text-2xl mx-auto sm:mx-0 font-medium"> {{$t('settings.default_settings')}}</h2>
        </div>
        <div class="flex flex-col gap-5 box lg:mx-20">
            <div class="switch-toggle mx-auto sm:ml-14 mt-6 sm:mt-10">
                <input id="on" name="state-d" type="radio" checked="checked" @click="toggleTabs(1)"/>
                <label for="on">{{$t('settings.notes.notes')}}</label>
                <input id="na" name="state-d" type="radio" class="" @click="toggleTabs(2)" />
                <label for="na">{{$t('settings.payment.payment')}}</label>
                <input id="off" name="state-d" type="radio" @click="toggleTabs(3)" />
                <label for="off">{{$t('settings.delivery.delivery')}}</label>
            </div>
            <div class="pb-10 px-3">
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
