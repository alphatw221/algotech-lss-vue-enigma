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
      <a href="" class="block w-20 logo -intro-x sm:w-24 mx-auto md:mr-auto md:flex md:w-1/10 xl:-ml-5 ">
        <img
          alt="Enigma Tailwind HTML Admin Template"
          class="self-center mb-1 logo__image"
          src="@/assets/images/lss-logo/LSS_logo_words_white.png"
        />
        <!-- <span class="mt-2 ml-3 text-lg text-white logo__text"> LiveShowSeller </span> -->
      </a>


      <!-- BEGIN: Search
      <div class="relative mr-3 intro-x sm:mr-6">
        <div class="hidden search sm:block">
          <input
            type="text"
            class="border-transparent search__input form-control"
            placeholder="Search..."
            @focus="showSearchDropdown"
            @blur="hideSearchDropdown"
          />
          <SearchIcon class="search__icon dark:text-slate-500" />
        </div>
        <a class="notification notification--light sm:hidden" href="">
          <SearchIcon class="notification__icon dark:text-slate-500" />
        </a>
        <div class="search-result" :class="{ show: searchDropdown }">
          <div class="search-result__content">
            <div class="search-result__content__title">Pages</div>
            <div class="mb-5">
              <a href="" class="flex items-center">
                <div
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-success/20 dark:bg-success/10 text-success"
                >
                  <InboxIcon class="w-4 h-4" />
                </div>
                <div class="ml-3">Mail Settings</div>
              </a>
              <a href="" class="flex items-center mt-2">
                <div
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-pending/10 text-pending"
                >
                  <UsersIcon class="w-4 h-4" />
                </div>
                <div class="ml-3">Users & Permissions</div>
              </a>
              <a href="" class="flex items-center mt-2">
                <div
                  class="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary/80"
                >
                  <CreditCardIcon class="w-4 h-4" />
                </div>
                <div class="ml-3">Transactions Report</div>
              </a>
            </div>
            <div class="search-result__content__title">Users</div>
            <div class="mb-5">
              <a
                v-for="(faker, fakerKey) in $_.take($f(), 4)"
                :key="fakerKey"
                href
                class="flex items-center mt-2"
              >
                <div class="w-8 h-8 image-fit">
                  <img
                    alt="Enigma Tailwind HTML Admin Template"
                    class="rounded-full"
                    :src="faker.photos[0]"
                  />
                </div>
                <div class="ml-3">{{ faker.users[0].name }}</div>
                <div
                  class="w-48 ml-auto text-xs text-right truncate text-slate-500"
                >
                  {{ faker.users[0].email }}
                </div>
              </a>
            </div>
            <div class="search-result__content__title">Products</div>
            <a
              v-for="(faker, fakerKey) in $_.take($f(), 4)"
              :key="fakerKey"
              href
              class="flex items-center mt-2"
            >
              <div class="w-8 h-8 image-fit">
                <img
                  alt="Enigma Tailwind HTML Admin Template"
                  class="rounded-full"
                  :src="faker.images[0]"
                />
              </div>
              <div class="ml-3">{{ faker.products[0].name }}</div>
              <div
                class="w-48 ml-auto text-xs text-right truncate text-slate-500"
              >
                {{ faker.products[0].category }}
              </div>
            </a>
          </div>
        </div>
      </div> -->
      <!-- END: Search -->
      <!-- BEGIN: Notifications -->
      <!-- <Dropdown class="mr-4 intro-x sm:mr-6">
        <DropdownToggle
          tag="div"
          role="button"
          class="cursor-pointer notification notification--bullet"
        >
          <BellIcon class="notification__icon dark:text-slate-500" />
        </DropdownToggle>
        <DropdownMenu class="pt-2 notification-content">
          <DropdownContent tag="div" class="notification-content__box">
            <div class="notification-content__title">Notifications</div>
            <div
              v-for="(faker, fakerKey) in $_.take($f(), 5)"
              :key="fakerKey"
              class="relative flex items-center cursor-pointer"
              :class="{ 'mt-5': fakerKey }"
            >
              <div class="flex-none w-12 h-12 mr-1 image-fit">
                <img
                  alt="Enigma Tailwind HTML Admin Template"
                  class="rounded-full"
                  :src="faker.photos[0]"
                />
                <div
                  class="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-success"
                ></div>
              </div>
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a href="javascript:;" class="mr-5 font-medium truncate">{{
                    faker.users[0].name
                  }}</a>
                  <div class="ml-auto text-xs text-slate-400 whitespace-nowrap">
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
    <!-- Mode button-->
    <!-- <button v-if="sellerLayoutStore.userInfo.user_subscription.status === sandboxMode" class="btn btn-warning test-mode h-fit my-0 sm:my-auto w-10 p-1 sm:w-28 z-[1] absolute right-[150px] xs:left-[80px]" 
        @click="showSwitchModeMessage=true"> 
      <p class="text-white text-[11px] leading-[11px] sm:text-sm" style="white-space:pre-wrap">{{$t('layout.test_mode')}}</p>
    </button> -->
    <!-- Language -->

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
      <Dropdown class="w-10 h-10 intro-x">
        <DropdownToggle
          tag="div"
          role="button"
          class="w-10 h-10 overflow-hidden scale-110 border-2 rounded-full shadow-lg border-slate-200 image-fit zoom-in bg-secondary flex flex-col justify-center"
        > 
            <h3 class="text-[20px] font-bold text-primary text-center"> {{computedNameFirstLetter}} </h3>
        </DropdownToggle>
        <DropdownMenu class="w-56">
          <DropdownContent
            class="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white"
          >
            <DropdownHeader tag="div" class="!font-normal">
              <div class="font-medium">
                {{ (sellerLayoutStore?.user?.first_name||'') + ' ' + (sellerLayoutStore?.user?.last_name||'') }}
              </div>
              <div class="text-xs text-white/60 mt-0.5 dark:text-slate-500">
                {{ sellerLayoutStore?.user?.email }}
              </div>
            </DropdownHeader>
            <DropdownDivider class="border-white/[0.08]" />
            <DropdownItem class="dropdown-item hover:bg-white/5 text-[#dcdee2]" @click="profile(1)">
              <UserIcon class="w-4 h-4 mr-2" /> {{$t(`layout.top_bar.profile`)}}</DropdownItem
            >
            <!-- <DropdownItem class="dropdown-item hover:bg-white/5 text-[#dcdee2]"  @click="profile(2)"> 
              <AwardIcon class="w-4 h-4 mr-2" /> {{$t(`layout.top_bar.subscription`)}}</DropdownItem
            > -->
            <DropdownItem class="dropdown-item hover:bg-white/5 text-[#dcdee2]" @click="profile(3)">
              <UnlockIcon class="w-4 h-4 mr-2" /> {{$t(`layout.top_bar.reset_password`)}}</DropdownItem
            >
            <!-- <DropdownItem class="dropdown-item hover:bg-white/5">
              <HelpCircleIcon class="w-4 h-4 mr-2" /> Help</DropdownItem
            > -->
            <DropdownDivider class="border-white/[0.08]" />
            <DropdownItem class="dropdown-item hover:bg-white/5 text-[#dcdee2]" @click="logout()">
              <ToggleRightIcon class="w-4 h-4 mr-2" /> {{$t(`layout.top_bar.logout`)}}</DropdownItem
            >
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
      <!-- END: Account Menu -->
    </div>
  </div>
  <!-- END: Top Bar -->
  <!-- Switch Mode Modal -->
  <!-- <Modal backdrop="static" :show="showSwitchModeMessage" @hidden="showSwitchModeMessage=false">
    <a
      @click="showSwitchModeMessage=false"
      class="absolute right-0 top-0 mt-3 mr-3"
      href="javascript:;"
    >
      <XIcon class="w-8 h-8 text-slate-400" />
    </a>
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <div class="text-xl mt-5">
          {{$t('layout.switch_mode_confirmation.message')}}
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button type="button" @click="switchToProductionMode()" class="btn btn-primary w-24">
          {{$t('layout.switch_mode_confirmation.switch')}}
        </button>
      </div>
    </ModalBody>
  </Modal> -->
</template>

<script setup>
import { ref, defineEmits, computed, onMounted } from "vue";
import { useLSSSellerLayoutStore } from "@/stores/lss-seller-layout";
// import { seller_update_subscription,  } from '@/api_v2/user_subscription'
import { useRoute, useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
import dom from "@left4code/tw-starter/dist/js/dom";
import i18n from '@/locales/i18n';

const route = useRoute();
const router = useRouter();
const { cookies } = useCookies()
const sellerLayoutStore = useLSSSellerLayoutStore();
const sandboxMode = ref("test")
const showSwitchModeMessage = ref(false)
const toggleMobileMenu = ()=>{
  sellerLayoutStore.showMobileMenu = !sellerLayoutStore.showMobileMenu
}

// const userAvatar = computed(() => {
//   if(cookies.get('login_with')=='facebook'){
//     return sellerLayoutStore.userInfo.facebook_info.picture
//   }
//   if (cookies.get('login_with')=='google'){
//     return sellerLayoutStore.userInfo.google_info.picture
//   }
//   if(sellerLayoutStore.userInfo.facebook_info.picture){
//     return sellerLayoutStore.userInfo.facebook_info.picture
//   }
//   if(sellerLayoutStore.userInfo.google_info.picture){
//     return sellerLayoutStore.userInfo.google_info.picture
//   }
//   return import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR+'fake_head.jpeg'
// });

const userAvatar = import.meta.env.VITE_GOOGLE_STORAGE_STATIC_DIR+'fake_head.jpeg'
const data = ref({currency:'USD', lang:'en'})

const languages = ref([
    {value:'en',text:'English'},
    {value:'zh_hant',text:'繁體中文'},
    {value:'zh_hans',text:'简体中文'},
    {value:'vi',text:'Tiếng Việt'}
])

onMounted(()=>{
    if(!sellerLayoutStore.userInfo.user_subscription) return
    data.value.lang = sellerLayoutStore.userInfo.lang
})

const changeLang = (selectLang)=>{
  data.value.lang = selectLang
  // seller_update_subscription(data.value, sellerLayoutStore.alert).then(res=>{
  //     // console.log(res)
  //     sellerLayoutStore.userInfo = res.data
  //     i18n.global.locale.value = res.data.lang
  // })
  hideDropDown()
}

const logout = () => {
  cookies.remove('access_token')
  cookies.remove('login_with')
  hideDropDown()
  router.go()
  
}

const profile =(page)=>{
  sellerLayoutStore.profileTab = page
  router.push({name:'seller-profile'})
  hideDropDown()
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

const switchToProductionMode = () => {
  // seller_switch_subscription_mode({"status": "production"}, sellerLayoutStore.alert).then(res=>{
  //     sellerLayoutStore.userInfo = res.data
  //     showSwitchModeMessage.value = false
  // })
}


const computedNameFirstLetter = computed(()=>{
  var _words = (sellerLayoutStore.user?.last_name||'').split(' ')
  if (_words.length<=1) return _words[0].split('')[0]
  return _words[_words.length-1].split('')[0]
})

</script>
