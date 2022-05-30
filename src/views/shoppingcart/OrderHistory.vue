<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center ">
            <div class="intro-x lg:text-center flex items-center lg:mt-0 lg:block flex-1 z-10">
            <button
                @click="toggleTabs(1)" v-bind:class="{'text-neutral-600 bg-white': openTab !== 1, 'text-white bg-black': openTab === 1}"
                class="w-12 h-12 rounded-full shadow-lg btn text-slate-500 dark:bg-darkmode-400 dark:border-darkmode-400 ">
                <ShoppingCartIcon />
            </button>
            <div class="lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400" v-bind:class="{'text-neutral-600': openTab !== 1, 'text-white': openTab === 1}">
                Shopping Cart
                </div>
            </div>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <div class="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <button
                    @click="toggleTabs(2)" v-bind:class="{'text-neutral-600 bg-white': openTab !== 2, 'text-white bg-neutral-600': openTab === 2}"
                    class="w-12 h-12 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">
                    <TruckIcon />
                </button>
                <div class="lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400">
                    Delivery
                </div>
            </div>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <div class="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
                <button
                @click="toggleTabs(3)" v-bind:class="{'text-neutral-600 bg-white': openTab !== 3, 'text-white bg-neutral-600': openTab === 3}"
                    class="w-12 h-12 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400">
                    <CreditCardIcon />
                </button>
                <div class="lg:w-32 text-base lg:mt-1 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400">
                    Payment
                </div>
            </div>
        </li>
      </ul>
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div class="px-4 py-5 flex-auto">
          <div class="tab-content tab-space">
            <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
              <p>
                Collaboratively administrate empowered markets via
                plug-and-play networks. Dynamically procrastinate B2C users
                after installed base benefits.
                <br />
                <br />
                Dramatically visualize customer directed convergence
                without revolutionary ROI.
              </p>
            </div>
            <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
              <p>
                Completely synergize resource taxing relationships via
                premier niche markets. Professionally cultivate one-to-one
                customer service with robust ideas.
                <br />
                <br />
                Dynamically innovate resource-leveling customer service for
                state of the art customer service.
              </p>
            </div>
            <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
              <p>
                Efficiently unleash cross-media information without
                cross-media value. Quickly maximize timely deliverables for
                real-time schemas.
                <br />
                <br />
                Dramatically maintain clicks-and-mortar solutions
                without functional solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openTab: 1
    }
  },
  methods: {
    toggleTabs: function(tabNumber){
      this.openTab = tabNumber
    }
  }
}
</script>