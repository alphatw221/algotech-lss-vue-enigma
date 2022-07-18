<template>
<div class="flex h-full overflow-auto bg-secondary">
      <!-- BEGIN: Side Menu -->
      <div class="top-[80px] z-[51] left-[12px] flex fixed my-3 ml-2 px-4 py-1 w-[70px] xl:w-[220px] rounded-xl cursor-pointer hover:bg-slate-100 creatCamp " 
        :class="{
                  'bg-slate-100': breadCrumb[breadCrumb.length-1] == 'create campaign',
                }"
        @click="router.push({name:'create-campaign'})"> 
        <button class="w-10 h-10 mr-3 btn btn-rounded-primary"
          ><span class="text-2xl">+</span></button> 
        <span class="hidden font-medium xl:block"
          :class="{
            'font-bold': breadCrumb[breadCrumb.length-1] == 'create campaign',
          }"
          >Create <br> New Campaign</span> 
      </div>

      <nav class="side-nav">
        <ul>
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
                :content="menu.title"
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
                  <component :is="menu.icon" />
                </div>
                <div class="side-menu__title">
                  {{ menu.title }}
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
                      :content="subMenu.title"
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
                        <ActivityIcon />
                      </div>
                      <div class="side-menu__title">
                        {{ subMenu.title }}
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
                            :content="lastSubMenu.title"
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
                              {{ lastSubMenu.title }}
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
          <button class="fixed mx-3 text-white rounded-lg btn btn-danger xl:m-5 bottom-5"
              @click="layoutStore.profileTab = 1; router.replace('/seller/profile')"
              ><font-awesome-icon icon="fa-solid fa-bolt-lightning" class="mr-0 xl:mx-2 h-5"/><span class="hidden text-lg xl:block 2xl:block">Upgrade </span>  </button>
          </nav>
      
      <!-- END: Side Menu -->
      <!-- BEGIN: Content -->
      <div class="lss-content">
        <SellerBreadCrumb/>
        <!-- <nav aria-label="breadcrumb" class="h-[24px] text-[15px] mx-2 hidden sm:block">
          <ol class="breadcrumb breadcrumb-dark">
            <template v-for="crumb in breadCrumb.slice(0, -2)" :key="crumb">
              <li v-if="crumb !== ''" class="breadcrumb-item"><a @click="pathName(crumb)">{{crumb}}</a></li>
            </template>
            <li v-if=" breadCrumb[breadCrumb.length - 2] " 
              class="breadcrumb-item"><a @click="router.back()">{{breadCrumb[breadCrumb.length - 2 ]}}</a></li>
            <li class="breadcrumb-item ">{{breadCrumb[breadCrumb.length - 1 ]}}</li>
          </ol>
        </nav>
        <nav aria-label="breadcrumb" class="h-[35px] text-[15px] mobileBack mx-2 block sm:hidden">
          <ol class="breadcrumb breadcrumb-dark">
            <li @click="router.back()"><ChevronLeftIcon class="block mx-1 w-[35px] h-[35px]  font-bold rounded-full" /></li>
          </ol>
        </nav> -->

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

const route = useRoute();
const router = useRouter();
const formattedMenu = ref([]);
const layoutStore = useLSSSellerLayoutStore();
const sideMenu = computed(() => nestedMenu(layoutStore.menu, route));
const rawPath = ref()
const dummy = ref()
const breadCrumb = ref([])

provide("forceActiveMenu", (pageName) => {
  
  route.forceActiveMenu = pageName;
  formattedMenu.value = $h.toRaw(sideMenu.value);
});

watch(
  computed(() => route.path),
  () => {
    delete route.forceActiveMenu;
    formattedMenu.value = $h.toRaw(sideMenu.value);
    sortPath(route.path)
  },
);

onMounted(() => {
  dom("body").removeClass("error-page").removeClass("login").addClass("main");
  formattedMenu.value = $h.toRaw(sideMenu.value);
  sortPath(route.path)
});

const sortPath=(path)=>{
  rawPath.value = path
  rawPath.value = rawPath.value.replace(/[0-9]/g, '')
  rawPath.value = rawPath.value.replace(/\s/g, '')
  breadCrumb.value = rawPath.value.substr(8).replace(/-/g, " ")
  breadCrumb.value = breadCrumb.value.split('/')
  if(breadCrumb.value[breadCrumb.value.length-1] === ''){
    breadCrumb.value.splice(-1,1)
  }
}

const pathName=(value)=>{
  const crumb = ref(value)
  router.push({name: crumb.value.replace(" ", "-")})
}

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

@media only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 768px) {
  .creatCamp{
    display: none;
  }
}

</style>