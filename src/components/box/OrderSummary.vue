<template>
  <div class="box p-5 m-3 border-2 border-secondary">
    <div>
      <div class="flex mb-4 dark:border-darkmode-400">
        <span class="text-lg">Order Summary</span>
      </div>
      <div class="flex">
        <div class="mr-auto">Subtotal</div>
        <div class="font-medium">$250</div>
      </div>
      <div class="flex mt-4">
        <div class="mr-auto">Discount</div>
        <div class="font-medium text-danger">-$20</div>
      </div>
      <div class="flex mt-4">
        <div class="mr-auto">Tax</div>
        <div class="font-medium">15%</div>
      </div>
      <div
        class="
          flex
          mt-4
          pt-4
          border-t border-slate-200/60
          dark:border-darkmode-400
        "
      >
        <div class="mr-auto font-medium text-base">Total Charge</div>
        <div class="font-medium text-base">$220</div>
      </div>
    </div>
    <div class="flex mt-5" v-if="page_type === 'step1'">
      <button
        class="
          btn
          w-32
          border-slate-300
          dark:border-darkmode-400
          text-slate-500
        "
        @click="addItem"
      >
        + Add more items
      </button>
      <button class="btn btn-primary w-32 shadow-md ml-auto">Checkout</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    page_type: String,
    orderSummary: Object
  },
  mounted() {
  },
  methods: {
    addItem() {
      this.eventBus.emit("addPoint");
    },
  },
};
</script>
 