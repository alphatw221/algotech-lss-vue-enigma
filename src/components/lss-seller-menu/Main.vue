<template>
<div class="flex outterContainer overflow-auto bg-secondary">
      <!-- BEGIN: Side Menu -->
      <div class="sidebar_container absolute z-[52] top-[110px] hidden xl:block" 
        :class="[{'left-[106px]' : closeSidebar},{'left-[260px]' : !closeSidebar}]" @click="closeSidebar = !closeSidebar">
        <ChevronRightIcon class="sidebar_icon" :class="{'hidden' : !closeSidebar}" /> 
        <ChevronLeftIcon class="sidebar_icon" :class="{'hidden' : closeSidebar}" /> 
      </div>
      <nav class="side-nav relative" :class="{'side-nav--simple' : closeSidebar }" >
        <!-- <MenuIcon class="absolute z-[52] top-[60px] left-[225px] h-6 w-6" icon="sidebar" color="#333333" />  -->
        <!-- <div class="sidebar_container absolute z-[52] top-[60px] hidden lg:block" 
          :class="[{'left-[35px]' : closeSidebar},{'change left-[220px]' : !closeSidebar}]" @click="closeSidebar = !closeSidebar">
          <div class="bar1"></div><div class="bar2"></div><div class="bar3"></div>
        </div> -->
        <ul :class="{'notSimple' : !closeSidebar }">
          <div v-if="role !== 'supplier'" class="z-[51] px-3 flex relative my-3 mx-auto py-1 w-fit rounded-xl cursor-pointer hover:bg-slate-100 creatCamp" 
            :class="[{'bg-slate-100': isCreateCampaign},{'xl:w-[220px]': !closeSidebar}]"
            @click="router.push({name:'create-campaign'})"> 
            <button class="w-10 h-10 xl:mr-3 btn btn-rounded-warning border-[2px] border-slate-100 shadow-lg"
              ><span class="text-2xl text-white">+</span></button> 
            <span class="hidden font-medium my-auto flex flex-wrap w-24"
              :class="{'xl:block': !closeSidebar}"
              > {{$t(`layout.menu.create`)}}<div class="w-24">{{$t(`layout.menu.new_campaign`)}}</div></span> 
          </div>
          <!-- BEGIN: First Child -->
          <template v-for="(menu, menuKey) in formattedMenu">
            <li
              v-if="menu == 'devider'"
              :key="menu + menuKey"
              class="my-6 side-nav__devider"
            ></li>
            <li v-else :key="menu + menuKey"> 
              <SideMenuTooltip
                tag="a"
                :content="$t(`layout.menu.${menu.title}`)"
                :href="
                  menu.subMenu
                    ? 'javascript:;'
                    : router.resolve({ name: menu.pageName }).path
                "
                class="side-menu"
                :class="{
                  'side-menu--active': menu.active,
                  'side-menu--open': menu.activeDropdown,
                }"
                @click="linkTo(menu, router, $event)"
              >
                <div class="side-menu__icon">
                  <!-- <component :is="menu.icon" /> -->
                  <MenuIcon :icon="menu.icon" color="#334155" width="20" /> 
                </div>
                <div class="side-menu__title">
                  {{ $t(`layout.menu.${menu.title}`) }}
                  <div
                    v-if="menu.subMenu"
                    class="side-menu__sub-icon"
                    :class="{ 'transform rotate-180': menu.activeDropdown }"
                  >
                    <ChevronDownIcon />
                  </div>
                </div>
              </SideMenuTooltip>
              <!-- BEGIN: Second Child -->
              <transition @enter="enter" @leave="leave">
                <ul v-if="menu.subMenu && menu.activeDropdown">
                  <li
                    v-for="(subMenu, subMenuKey) in menu.subMenu"
                    :key="subMenuKey"
                  >
                    <SideMenuTooltip
                      tag="a"
                      :content="$t(`layout.menu.${subMenu.title}`)"
                      :href="
                        subMenu.subMenu
                          ? 'javascript:;'
                          : router.resolve({ name: subMenu.pageName }).path
                      "
                      class="side-menu"
                      :class="{ 'side-menu--active': subMenu.active }"
                      @click="linkTo(subMenu, router, $event)"
                    >
                      <div class="side-menu__icon">
                        <MenuIcon :icon="subMenu.pageName" color="#334155" />
                      </div>
                      <div class="side-menu__title">
                        {{ $t(`layout.menu.${subMenu.title}`) }}
                        <div
                          v-if="subMenu.subMenu"
                          class="side-menu__sub-icon"
                          :class="{
                            'transform rotate-180': subMenu.activeDropdown,
                          }"
                        >
                          <ChevronDownIcon />
                        </div>
                      </div>
                    </SideMenuTooltip>
                    <!-- BEGIN: Third Child -->
                    <transition @enter="enter" @leave="leave">
                      <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                        <li
                          v-for="(
                            lastSubMenu, lastSubMenuKey
                          ) in subMenu.subMenu"
                          :key="lastSubMenuKey"
                        >
                          <SideMenuTooltip
                            tag="a"
                            :content="$t(`layout.menu.${lastSubMenu.title}`)"
                            :href="
                              lastSubMenu.subMenu
                                ? 'javascript:;'
                                : router.resolve({
                                    name: lastSubMenu.pageName,
                                  }).path
                            "
                            class="side-menu"
                            :class="{
                              'side-menu--active': lastSubMenu.active,
                            }"
                            @click="linkTo(lastSubMenu, router, $event)"
                          >
                            <div class="side-menu__icon">
                              <ZapIcon />
                            </div>
                            <div class="side-menu__title">
                              {{ $t(`layout.menu.${lastSubMenu.title}`) }}
                            </div>
                          </SideMenuTooltip >
                        </li>
                      </ul>
                    </transition>
                    <!-- END: Third Child -->
                  </li>
                </ul>
              </transition>
              <!-- END: Second Child -->
            </li>
          </template>
          <!-- END: First Child -->
        </ul> 
          <button class="fixed ml-2 text-white rounded-lg btn btn-danger bottom-5 border-0 border-red-900 shadow-lg"
              @click="router.push('/seller/change-plan')"
              :disabled="role == 'kol' || role == 'supplier'"
              >
              <font-awesome-icon icon="fa-solid fa-bolt-lightning" class="mr-0 h-5 m-1" :class="{'xl:mx-2': !closeSidebar}"/>
              <span class="hidden text-lg"
              :class="{'xl:block': !closeSidebar}">{{$t('layout.upgrade')}}  </span>  </button>
          </nav>
      
      <!-- END: Side Menu -->
      <!-- BEGIN: Content -->
      <div class="lss-content" id="lss-content">
        <div class="absolute -z-50 top-0 invisible" id="topPoint"></div>
        <SellerBreadCrumb/>
        <router-view />
      </div>
      
      <!-- END: Content -->
    </div>
</template>

<script setup>
import SellerBreadCrumb from "./SellerBreadCrumb.vue"
import { computed, onMounted, provide, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { helper as $h } from "@/utils/helper";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
import SideMenuTooltip from "@/components/side-menu-tooltip/Main.vue";
import { linkTo, nestedMenu, enter, leave } from "./index";
import dom from "@left4code/tw-starter/dist/js/dom";
import MenuIcon from "@/global-components/lss-svg-icons/MenuIcon.vue";

const route = useRoute();
const router = useRouter();
const formattedMenu = ref([]);
const layoutStore = useLSSSellerLayoutStore();
const closeSidebar = ref(false)
const role = layoutStore.userInfo.user_subscription.type
const sideMenu = computed(() =>role == 'kol'? nestedMenu(layoutStore.kol_menu, route): role == 'supplier'? nestedMenu(layoutStore.supplier_menu, route):nestedMenu(layoutStore.menu, route) )

provide("forceActiveMenu", (pageName) => {
  route.forceActiveMenu = pageName;
  formattedMenu.value = $h.toRaw(sideMenu.value);
});

watch(
  computed(() => route.path),
  () => {
    delete route.forceActiveMenu;
    formattedMenu.value = $h.toRaw(sideMenu.value); 
  },
);

onMounted(() => {
  dom("body").removeClass("error-page").removeClass("login").addClass("main");
  formattedMenu.value = $h.toRaw(sideMenu.value);
});


const isCreateCampaign = computed(()=>{
  var path = route.path
  if (path.match('create-campaign')) return true
  else return false
})





</script>


<style scoped>
.dark .side-nav{ 
  background-color: theme("colors.dark"); 
}

.breadcrumb-item a{
  color: #7c7c7c;
}

.mobileBack{
  position:absolute;
  top:10px;
  z-index: 50;
}

.outterContainer{
  height: 100vh;
}

.sidebar_container {
  cursor: pointer;
  height: 70px;
  width: 20px;
  border-radius: 0px 12px 12px 0px;
  background-color: white;
}

.sidebar_icon{
  position: absolute;
  width: 30px;
  height: 30px;
  top: 20px;
  right: -4px;
  transition: 0.4s;
}

@media only screen and (max-width: 760px),
(min-device-width: 769px) and (max-device-width: 769px) {
  .outterContainer{
  /* height: calc(100vh - 70px); */
  height:90vh;
  background-color: rgb(241,245,249);
  }
}

</style>