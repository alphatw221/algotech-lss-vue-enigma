<template>
<div class="relative">
   <div id="lss-mobil-side-nav"
    class="absolute z-50  mr-5 overflow-hidden lss-mobil-side-nav-close top-14 dark:bg-darkmode-500 bg-primary md:hidden">

    <!-- BEGIN: Mobile Menu -->
    <div class="mobile-menu">
      <!-- <div class="py-2 mobile-menu-bar">
      <a href="" class="flex mr-auto">
        <img
          alt="Enigma Tailwind HTML Admin Template"
          class="w-6"
          src="@/assets/images/logo.svg"
        />
      </a>
      <BarChart2Icon
        class="w-8 h-8 text-white transform -rotate-90"
        @click="toggleMobileMenu"
      />
    </div> -->
      <!-- <transition @enter="enter" @leave="leave"> -->
      <ul class="border-t border-white/[0.08] py-5 pt-7 mt-5">
        <!-- BEGIN: First Child -->
        <template v-for="(menu, menuKey) in formattedMenu">
          <li v-if="menu == 'devider'" :key="menu + menuKey" class="my-6 menu__devider"></li>
          <li v-else :key="menu + menuKey" class="my-2">
            <a href="javascript:;" class="menu" :class="{
              'menu--active': menu.active,
              'menu--open': menu.activeDropdown,
            }" @click="linkTo(menu, router)">
              <div class="menu__icon">
                <component :is="menu.icon" />
              </div>
              <div class="menu__title">
                {{ menu.title }}
                <div v-if="menu.subMenu" class="menu__sub-icon"
                  :class="{ 'transform rotate-180': menu.activeDropdown }">
                  <ChevronDownIcon />
                </div>
              </div>
            </a>
            <!-- BEGIN: Second Child -->
            <transition @enter="enter" @leave="leave">
              <ul v-if="menu.subMenu && menu.activeDropdown">
                <li v-for="(subMenu, subMenuKey) in menu.subMenu" :key="subMenuKey">
                  <a href="javascript:;" class="menu" :class="{ 'menu--active': subMenu.active }"
                    @click="linkTo(subMenu, router)">
                    <div class="menu__icon">
                      <ActivityIcon />
                    </div>
                    <div class="menu__title">
                      {{ subMenu.title }}
                      <div v-if="subMenu.subMenu" class="menu__sub-icon" :class="{
                        'transform rotate-180': subMenu.activeDropdown,
                      }">
                        <ChevronDownIcon />
                      </div>
                    </div>
                  </a>
                  <!-- BEGIN: Third Child -->
                  <transition @enter="enter" @leave="leave">
                    <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                      <li v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu" :key="lastSubMenuKey">
                        <a href="javascript:;" class="menu" :class="{ 'menu--active': lastSubMenu.active }"
                          @click="linkTo(lastSubMenu, router)">
                          <div class="menu__icon">
                            <ZapIcon />
                          </div>
                          <div class="menu__title">
                            {{ lastSubMenu.title }}
                          </div>
                        </a>

                      </li>

                    </ul>
                  </transition>
                  <!-- END: Third Child -->
                </li>
              </ul>
            </transition>
            <!-- END: Second Child -->
            <!-- <div class="w-full border-t border-dashed border-slate-200/60"></div> -->
          </li>
        </template>
        <!-- END: First Child -->
      </ul>
      <!-- </transition> -->
    </div>
    <!-- END: Mobile Menu -->
  </div>
</div>
 
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { helper as $h } from "@/utils/helper";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout"
import {
  activeMobileMenu,
  toggleMobileMenu,
  linkTo,
  enter,
  leave,
} from "./index";
import { nestedMenu } from "@/layouts/side-menu";

const route = useRoute();
const router = useRouter();
const formattedMenu = ref([]);
const sellerLayoutStore = useLSSSellerLayoutStore();
const mobileMenu = computed(() => nestedMenu(sellerLayoutStore.menu, route));

watch(
  computed(() => route.path),
  () => {
    formattedMenu.value = $h.toRaw(mobileMenu.value);
    dom('#lss-mobil-side-nav').removeClass("lss-mobil-side-nav-show").addClass("lss-mobil-side-nav-close")
  }
);

onMounted(() => {
  formattedMenu.value = $h.toRaw(mobileMenu.value);
});

watch(
  computed(() => sellerLayoutStore.showMobileMenu),
  (currentValue, oldValue) => {
    if (currentValue) {
      dom('#lss-mobil-side-nav').removeClass("lss-mobil-side-nav-close").addClass("lss-mobil-side-nav-show")
    } else {
      dom('#lss-mobil-side-nav').removeClass("lss-mobil-side-nav-show").addClass("lss-mobil-side-nav-close")
    }
  }
)
</script>

<style scoped>
.lss-mobil-side-nav-show {
  left:13px;
  height: 100vh;
  transition: 1s;
}

.lss-mobil-side-nav-close {
  /* left: -100%; */
  height: 0%;
  transition: 1s;
}

#lss-mobil-side-nav {
  /* left: 14px; */
  width: calc(100vw - 26px);
  border-radius: 0px 0px 30px 30px;
  /* top: 0; */
  z-index: 51;
  position: fixed;
}

</style>