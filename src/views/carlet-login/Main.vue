<template>
  <div>
    <DarkModeSwitcher />
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
         
          <!-- <div class="my-auto">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="-intro-x w-1/2 -mt-16"
              src="@/assets/images/illustration.svg"
            />
            <div
              class="-intro-x text-white font-medium text-4xl leading-tight mt-10"
            >
              A few more clicks to <br />
              sign in to your account.
            </div>
            <div
              class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400"
            >
              Manage all your e-commerce accounts in one place
            </div>
          </div> -->
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
            >
              登入
            </h2>
            <!-- <div class="intro-x mt-2 text-slate-400 xl:hidden text-center">
              A few more clicks to sign in to your account. Manage all your
              e-commerce accounts in one place
            </div> -->
            <div class="intro-x mt-8">
              <input
                type="text"
                class="intro-x login__input form-control py-3 px-4 block"
                placeholder="使用者名稱"
                v-model="username"
              />
              <input
                type="password"
                class="intro-x login__input form-control py-3 px-4 block mt-4"
                placeholder="密碼"
                v-model="password"
              />
            </div>
            <!-- <div
              class="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4"
            >
              <div class="flex items-center mr-auto">
                <input
                  id="remember-me"
                  type="checkbox"
                  class="form-check-input border mr-2"
                />
                <label class="cursor-pointer select-none" for="remember-me"
                  >Remember me</label
                >
              </div>
              <a href="">Forgot Password?</a>
            </div> -->
            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button
                class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                @click="login()"
              >
                登入
              </button>
              <!-- <button
                class="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
              >
                Register
              </button> -->
            </div>
            <!-- <div
              class="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left"
            >
              By signin up, you agree to our
              <a class="text-primary dark:text-slate-200" href=""
                >Terms and Conditions</a
              >
              &
              <a class="text-primary dark:text-slate-200" href=""
                >Privacy Policy</a
              >
            </div> -->
          </div>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import dom from "@left4code/tw-starter/dist/js/dom";
import {useRoute, useRouter} from 'vue-router'

import { user_login } from "../../api_carlet/user.js"

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const route = useRoute()
const router = useRouter()

const username = ref('')
const password = ref('')

const login = ()=>{
  user_login(username.value, password.value).then(res=>{
    console.log(res.data)
    cookies.set("access_token", res?.data?.access_token)
    router.push({name:'carlet-auto-data-vehicle-mapping'})

  })
}

onMounted(() => {
  dom("body").removeClass("main").removeClass("error-page").addClass("login");
});
</script>
