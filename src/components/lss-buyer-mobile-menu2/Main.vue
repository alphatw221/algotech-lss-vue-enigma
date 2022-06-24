<template>
      <div id="lss-mobil-side-nav" class=" lss-mobil-side-nav-close ml-3 mr-5 absolute z-50 top-14 h-full dark:bg-darkmode-500 bg-primary overflow-hidden md:hidden">

      <!-- BEGIN: Mobile Menu -->
  <div class="mobile-menu">
    <!-- <div class="mobile-menu-bar">
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
      <ul
        class="border-t border-white/[0.08] py-5 pt-7 mt-5" v-if="!isAnonymousUser"
      >
        <!-- BEGIN: First Child -->
        <template v-for="(menu, menuKey) in formattedMenu">
          <li
            v-if="menu == 'devider'"
            :key="menu + menuKey"
            class="menu__devider my-6"
          ></li>
          <li v-else :key="menu + menuKey" 
            class="my-2"
            >
            <a
              href="javascript:;"
              class="menu"
              :class="{
                'menu--active': menu.active,
                'menu--open': menu.activeDropdown,
              }"
              @click="linkTo(menu, router)"
            >
              <div class="menu__icon">
                <component :is="menu.icon" />
              </div>
              <div class="menu__title">
                {{ menu.title }}
                <div
                  v-if="menu.subMenu"
                  class="menu__sub-icon"
                  :class="{ 'transform rotate-180': menu.activeDropdown }"
                >
                  <ChevronDownIcon />
                </div>
              </div>
            </a>
            <!-- BEGIN: Second Child -->
            <transition @enter="enter" @leave="leave">
              <ul v-if="menu.subMenu && menu.activeDropdown">
                <li
                  v-for="(subMenu, subMenuKey) in menu.subMenu"
                  :key="subMenuKey"
                >
                  <a
                    href="javascript:;"
                    class="menu"
                    :class="{ 'menu--active': subMenu.active }"
                    @click="linkTo(subMenu, router)"
                  >
                    <div class="menu__icon">
                      <ActivityIcon />
                    </div>
                    <div class="menu__title">
                      {{ subMenu.title }}
                      <div
                        v-if="subMenu.subMenu"
                        class="menu__sub-icon"
                        :class="{
                          'transform rotate-180': subMenu.activeDropdown,
                        }"
                      >
                        <ChevronDownIcon />
                      </div>
                    </div>
                  </a>
                  <!-- BEGIN: Third Child -->
                  <transition @enter="enter" @leave="leave">
                    <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                      <li
                        v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu"
                        :key="lastSubMenuKey"
                      >
                        <a
                          href="javascript:;"
                          class="menu"
                          :class="{ 'menu--active': lastSubMenu.active }"
                          @click="linkTo(lastSubMenu, router)"
                        >
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
            <!-- <div class="w-full border-t border-slate-200/60 border-dashed"></div> -->
          </li>
        </template>
        <!-- END: First Child -->
      </ul>
    <!-- </transition> -->
  </div>
  <div v-if="isAnonymousUser" class="flex items-center align-center w-full h-full" 
    @click="buyerLayoutStore.showLoginModal=true"> 
    <u class="text-center text-neutral-200 text-[18px] underline-offset-2 leading-6 w-full cursor-pointer -mt-60"> Login to save or retrive <br/>your order history </u>
  </div>
  <!-- END: Mobile Menu -->
</div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { helper as $h } from "@/utils/helper";
import { useSideMenuStore } from "@/stores/side-menu";
import { useLSSBuyerLayoutStore } from "@/stores/lss-buyer-layout"
import {
  activeMobileMenu,
  toggleMobileMenu,
  // linkTo,
  enter,
  leave,
} from "./index";
import { nestedMenu } from "@/layouts/side-menu";
import { useCookies } from "vue3-cookies"
const { cookies } = useCookies();
const route = useRoute();
const router = useRouter();
const formattedMenu = ref([]);
const buyerLayoutStore = useLSSBuyerLayoutStore();
const mobileMenu = computed(() => nestedMenu(buyerLayoutStore.menu, route));

const isAnonymousUser = cookies.get('login_with')=='anonymousUser'

const linkTo = (menu, router) => {
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown;
  } else {
    activeMobileMenu.value = false;
    buyerLayoutStore.showMobileMenu=false   //only add this line
    router.push({
      name: menu.pageName,
    });
  }
};

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
  computed(()=>buyerLayoutStore.showMobileMenu),
  (currentValue, oldValue) => {
    if(currentValue){
      dom('#lss-mobil-side-nav').removeClass("lss-mobil-side-nav-close").addClass("lss-mobil-side-nav-show")
    }else{
      dom('#lss-mobil-side-nav').removeClass("lss-mobil-side-nav-show").addClass("lss-mobil-side-nav-close")
    }
  }
)
</script>

<style scoped>
.lss-mobil-side-nav-show{
  /* left:11px; */
  height: 100vh;
  transition: 1s;
}

.lss-mobil-side-nav-close{
  /* left: -100%; */
  height: 0%;
  transition: 1s;
}

#lss-mobil-side-nav{
  left: 0%;
  width: calc(100vw - 24px);
  border-radius: 0px 0px 30px 30px;
}


</style>