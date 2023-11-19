<template>
  <!-- BEGIN: Top Bar -->
  <div
    class="lss-buyer-top-bar-boxed sticky top-0 
    h-[70px] z-[51] px-6 pt-4
    sm:px-8
    md:h-[65px] md:mx-3 md:border-b-0 md:fixed md:inset-x-0 md:px-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent
    dark:md:from-darkmode-700"
  > 
    <div class="flex items-center justify-between w-full h-full">

      <!-- BEGIN: Hamburger -->
      <a @click="toggleMobileMenu()" class="w-16">
        <AlignJustifyIcon
          class="mb-1 text-white transform w-7 h-7 md:hidden intro-x hover:text-slate-300"
        />
      </a>
      <!-- END: Hamburger -->

      <!-- BEGIN: Logo -->
      <!-- <a href="" class="block w-20 logo -intro-x sm:w-24 mx-auto md:mr-auto md:flex md:w-1/10 xl:-ml-5 ">
        <img
          alt="Enigma Tailwind HTML Admin Template"
          class="self-center mb-1 logo__image"
          src="@/assets/images/lss-logo/LSS_logo_words_white.png"
        />
      </a> -->



      <!-- <Dropdown class="absolute right-[10px] sm:right-[30px] intro-x">
        <DropdownToggle
          tag="div"
          role="button"
          class="cursor-pointer notification"
        >
          <SimpleIcon icon="globle" color="#e6e9ed"/>
        </DropdownToggle>
        
          <DropdownMenu class="w-fit whitespace-nowrap">
            <DropdownContent class="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white" > 
              <template  v-for="(option,index) in languages" :key="index"> 
                <DropdownItem @click="changeLang(option.value)"> <span class="text-white"> {{option.text}} </span> </DropdownItem>
              </template>
            </DropdownContent>
          </DropdownMenu>
      </Dropdown> -->

      <!-- BEGIN: Account Menu -->
      <!-- <Dropdown class="w-10 h-10 intro-x">
        <DropdownToggle
          tag="div"
          role="button"
          class="w-10 h-10 overflow-hidden scale-110 border-2 rounded-full shadow-lg border-slate-200 image-fit zoom-in"
        > 
            <img
            :src="userAvatar"
            class="rounded-full"
          />
        </DropdownToggle>
        <DropdownMenu class="w-56">
          <DropdownContent
            class="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white"
          >
            <DropdownHeader tag="div" class="!font-normal">
              <div class="font-medium">
                {{ sellerLayoutStore.userInfo.name }}
              </div>
              <div class="text-xs text-white/60 mt-0.5 dark:text-slate-500">
                {{ sellerLayoutStore.userInfo.email }}
              </div>
            </DropdownHeader>
            <DropdownDivider class="border-white/[0.08]" />
            <DropdownItem class="dropdown-item hover:bg-white/5 text-[#dcdee2]" @click="profile(1)">
              <UserIcon class="w-4 h-4 mr-2" /> {{$t(`layout.top_bar.profile`)}}</DropdownItem
            >
            <DropdownItem class="dropdown-item hover:bg-white/5 text-[#dcdee2]" @click="profile(3)">
              <UnlockIcon class="w-4 h-4 mr-2" /> {{$t(`layout.top_bar.reset_password`)}}</DropdownItem
            >
            <DropdownDivider class="border-white/[0.08]" />
            <DropdownItem class="dropdown-item hover:bg-white/5 text-[#dcdee2]" @click="logout()">
              <ToggleRightIcon class="w-4 h-4 mr-2" /> {{$t(`layout.top_bar.logout`)}}</DropdownItem
            >
          </DropdownContent>
        </DropdownMenu>
      </Dropdown> -->
      <!-- END: Account Menu -->
    </div>
  </div>
  <!-- END: Top Bar -->

</template>

<script setup>
import { ref, defineEmits, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import dom from "@left4code/tw-starter/dist/js/dom";


const route = useRoute();
const router = useRouter();
const { cookies } = useCookies()

const toggleMobileMenu = ()=>{

}


const userAvatar = import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR+'fake_head.jpeg'
const data = ref({currency:'USD', lang:'en'})

const languages = ref([
    {value:'en',text:'English'},
    {value:'zh_hant',text:'繁體中文'},
    {value:'zh_hans',text:'简体中文'},
    {value:'vi',text:'Tiếng Việt'}
])

const logout = () => {
  cookies.remove('access_token')
  cookies.remove('login_with')
  hideDropDown()
  router.go()
  
}


const searchDropdown = ref(false);
const showSearchDropdown = () => {
  searchDropdown.value = true;
};
const hideSearchDropdown = () => {
  searchDropdown.value = false;
};

const hideDropDown = ()=>{
  dom('.dropdown-menu').removeClass('show')
}


</script>
