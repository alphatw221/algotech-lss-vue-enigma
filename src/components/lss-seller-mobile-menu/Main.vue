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
          <div class="flex m-3 cursor-pointer text-white" @click="router.push({name:'create-campaign'})"> 
            <button class="w-10 h-10 mr-1 sm:ml-5"
            ><span class="text-2xl">+</span></button> 
            <span class="">{{$t(`layout.menu.create`)}} <br> {{$t(`layout.menu.new_campaign`)}}</span> 
          </div>
  
          <template v-for="(menu, menuKey) in formattedMenu">
            <li v-if="menu == 'devider'" :key="menu + menuKey" class="my-6 menu__devider"></li>
            <li v-else :key="menu + menuKey" class="my-2">
              <a href="javascript:;" class="menu" :class="{
                'menu--active': menu.active,
                'menu--open': menu.activeDropdown,
              }" @click="linkTo(menu, router)">
                <div class="menu__icon ml-1">
                  <MenuIcon :icon="menu.pageName" color="white" />
                </div>
                <div class="menu__title">
                  {{ $t(`layout.menu.${menu.title}`) }}
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
                        <MenuIcon :icon="subMenu.pageName" color="white" />
                      </div>
                      <div class="menu__title">
                        {{ $t(`layout.menu.${subMenu.title}`)}}
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
                              {{ $t(`layout.menu.${lastSubMenu.title}`)}}
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
          <button class="absolute m-0 text-white rounded-lg btn btn-danger top-[40px] right-[12px]"
              @click="sellerLayoutStore.profileTab = 1; router.replace('/seller/profile')"
          ><font-awesome-icon icon="fa-solid fa-bolt-lightning" class="mr-2 h-5"/><span class="text-[16px]">{{$t('layout.upgrade')}} </span>  </button>
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
    // linkTo,
    enter,
    leave,
  } from "./index";
  import { nestedMenu } from "@/layouts/side-menu";
  import MenuIcon from "../../global-components/lss-svg-icons/MenuIcon.vue";
  
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
  
  const linkTo = (menu, router) => {
    if (menu.subMenu) {
      menu.activeDropdown = !menu.activeDropdown;
    } else {
      activeMobileMenu.value = false;
      sellerLayoutStore.showMobileMenu=false
      router.push({
        name: menu.pageName,
      });
    }
  };
  
  
  </script>
  
  <style scoped>
  .lss-mobil-side-nav-show {
    left:12px;
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
    width: calc(100vw - 25px);
    border-radius: 0px 0px 30px 30px;
    /* top: 0; */
    z-index: 51;
    position: fixed;
  }
  
  </style>