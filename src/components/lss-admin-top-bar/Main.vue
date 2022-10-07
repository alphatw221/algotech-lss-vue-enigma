<template>
  <!-- BEGIN: Top Bar -->
  <div
    class="lss-buyer-top-bar-boxed sticky top-0 border-b border-white/[0.08]
    h-[70px] z-[51] px-6 -mx-3 pt-4
    sm:-mx-8 sm:px-8
    md:h-[65px] md:-mx-0 md:border-b-0 md:fixed md:inset-x-0 md:px-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent
    dark:md:from-darkmode-700"
  >
    <div class="h-full w-full flex justify-between items-center">



      <!-- BEGIN: Hamburger -->
        <!-- <a @click="toggleMobileMenu()" >
          <AlignJustifyIcon
            class="w-7 h-7 text-white transform md:hidden intro-x ml-4 mb-1 hover:text-slate-300"
          />
        </a> -->
      <!-- END: Hamburger -->

      <!-- BEGIN: Logo -->
        <a href="" class="logo -intro-x block
          w-20
          sm:w-24
          md:mr-auto
          md:flex md:w-1/10 md:mx-0
          xl:ml-5
        ">
          <img
            alt="Enigma Tailwind HTML Admin Template"
            class="logo__image mb-1"
            src="@/assets/images/lss-logo/LSS_logo_words_white.png"
          />
          <!-- <span class="logo__text text-white text-lg ml-3 mt-2"> LiveShowSeller </span> -->
        </a>
      <!-- END: Logo -->

     


      <!-- BEGIN: Notifications -->
      <!-- <Dropdown class="intro-x mr-4 sm:mr-6 md:ml-auto">
        <DropdownToggle
          tag="div"
          role="button"
          class="notification notification--bullet cursor-pointer"
        >
          <BellIcon class="notification__icon dark:text-slate-500" />
        </DropdownToggle>
        <DropdownMenu class="notification-content pt-2">
          <DropdownContent tag="div" class="notification-content__box">
            <div class="notification-content__title">Notifications</div>
            <div
              v-for="(faker, fakerKey) in $_.take($f(), 5)"
              :key="fakerKey"
              class="cursor-pointer relative flex items-center"
              :class="{ 'mt-5': fakerKey }"
            >
              <div class="w-12 h-12 flex-none image-fit mr-1">
                <img
                  alt="Enigma Tailwind HTML Admin Template"
                  class="rounded-full"
                  :src="faker.photos[0]"
                />
                <div
                  class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"
                ></div>
              </div>
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="javascript:;" class="font-medium truncate mr-5">{{
                    faker.users[0].name
                  }}</a>
                  <div class="text-xs text-slate-400 ml-auto whitespace-nowrap">
                    {{ faker.times[0] }}
                  </div>
                </div>
                <div class="w-full truncate text-slate-500 mt-0.5">
                  {{ faker.news[0].shortContent }}
                </div>
              </div>
            </div>
          </DropdownContent>
        </DropdownMenu>
      </Dropdown> -->
      <!-- END: Notifications -->

      
      <div class="mr-5 ml-auto  flex md:mr-3">
        <!-- BEGIN: Account Menu -->
        <Dropdown class="intro-x w-10 h-10" >
          <DropdownToggle
          tag="div"
          role="button"
          class="w-10 h-10 rounded-full border-2 border-slate-200 overflow-hidden shadow-lg image-fit zoom-in scale-110"
        > 
            <!-- <img
              alt="Enigma Tailwind HTML Admin Template"
              :src="$f()[9].photos[0]"
            /> -->
            <img
              class="opacity-80"
              :src="userAvatar"
            />
          </DropdownToggle>
          <DropdownMenu class="w-56">
            <DropdownContent
              class="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white"
            >
              
              <DropdownHeader tag="div" class="!font-normal" >
                <div class="font-medium">
                  {{ layoutStore.userInfo.username }}
                </div>
                <div class="text-xs text-white/60 mt-0.5 dark:text-slate-500">
                  {{ layoutStore.userInfo.email }}
                </div>
              </DropdownHeader>
              <!-- <DropdownDivider class="border-white/[0.08]" /> -->
              <!-- <DropdownItem class="dropdown-item hover:bg-white/5">
                <UserIcon class="w-4 h-4 mr-2" /> Profile</DropdownItem
              >
              <DropdownItem class="dropdown-item hover:bg-white/5">
                <EditIcon class="w-4 h-4 mr-2" /> Add Account</DropdownItem
              >
              <DropdownItem class="dropdown-item hover:bg-white/5">
                <LockIcon class="w-4 h-4 mr-2" /> Reset Password</DropdownItem
              > -->

              <!-- <DropdownItem class="dropdown-item hover:bg-white/5 " @click="router.push('/buyer/orders');dom('.dropdown-menu').removeClass('show')">
                <ShoppingBagIcon class="w-4 h-4 mr-2" /> {{$t('layout.top_bar.order_history')}}</DropdownItem
              > -->
              <DropdownDivider class="border-white/[0.08]" />

              <!-- <DropdownItem class="dropdown-item hover:bg-white/5">
                <HelpCircleIcon class="w-4 h-4 mr-2" /> Help</DropdownItem
              >
              <DropdownDivider class="border-white/[0.08]" /> -->

              <DropdownItem class="dropdown-item hover:bg-white/5" @click="logout()" v-if="!isAnonymousUser">
                <ToggleRightIcon class="w-4 h-4 mr-2" /> {{$t('layout.top_bar.logout')}}</DropdownItem
              >
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
        <!-- END: Account Menu -->
      </div>
      
    </div>
  </div>
  <!-- END: Top Bar -->
</template>

<script setup>
import { ref, defineEmits, computed , watch} from "vue";
import { useLSSAdminLayoutStore } from "@/stores/lss-admin-layout";
import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import dom from "@left4code/tw-starter/dist/js/dom";

const route = useRoute();
const router = useRouter();
const { cookies } = useCookies()
const layoutStore = useLSSAdminLayoutStore();


const userAvatar = computed(() => {
  // if(cookies.get('login_with')=='facebook'){
  //   return buyerLayoutStore.userInfo.facebook_info.picture
  // }
  // if (cookies.get('login_with')=='google'){
  //   return buyerLayoutStore.userInfo.google_info.picture
  // }
  return import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR+'fake_head.jpeg'
});

const logout = () => {
  cookies.remove('access_token')
  cookies.remove('login_with')
  dom('.dropdown-menu').removeClass('show')
  router.go()
  
}

// const showLoginModal = ()=>{
//   buyerLayoutStore.showLoginModal=true
// }
// const searchDropdown = ref(false);
// const showSearchDropdown = () => {
//   searchDropdown.value = true;
// };
// const hideSearchDropdown = () => {
//   searchDropdown.value = false;
// };

// const toggleSideNav = ()=>{
//   emit('toggleSideNav')
// }
</script>

