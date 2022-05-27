<template>
<div class="wrapper">
<div id="theme_picker" class="items-center justify-center box border shadow-md flex">
    <div class="mr-4 sm:block text-slate-600 dark:text-slate-200">
      Color Scheme
    </div> 
    <a
      @click="switchColorScheme('default')"
      class="block w-8 h-8 cursor-pointer bg-cyan-900 rounded-full border-4 mr-1 hover:border-slate-200"
      :class="{
        'border-slate-300 dark:border-darkmode-800/80':
          colorScheme == 'default',
        'border-white dark:border-darkmode-600': colorScheme != 'default',
      }"
    ></a>
    <a
      @click="switchColorScheme('theme-1')"
      class="block w-8 h-8 cursor-pointer bg-blue-800 rounded-full border-4 mr-1 hover:border-slate-200"
      :class="{
        'border-slate-300 dark:border-darkmode-800/80':
          colorScheme == 'theme-1',
        'border-white dark:border-darkmode-600': colorScheme != 'theme-1',
      }"
    ></a>
    <a
      @click="switchColorScheme('theme-2')"
      class="block w-8 h-8 cursor-pointer bg-blue-900 rounded-full border-4 mr-1 hover:border-slate-200"
      :class="{
        'border-slate-300 dark:border-darkmode-800/80':
          colorScheme == 'theme-2',
        'border-white dark:border-darkmode-600': colorScheme != 'theme-2',
      }"
    ></a>
    <a
      @click="switchColorScheme('theme-3')"
      class="block w-8 h-8 cursor-pointer bg-emerald-900 rounded-full border-4 mr-1 hover:border-slate-200"
      :class="{
        'border-slate-300 dark:border-darkmode-800/80':
          colorScheme == 'theme-3',
        'border-white dark:border-darkmode-600': colorScheme != 'theme-3',
      }"
    ></a>
    <a
      @click="switchColorScheme('theme-4')"
      class="block w-8 h-8 cursor-pointer bg-indigo-900 rounded-full border-4 hover:border-slate-200"
      :class="{
        'border-slate-300 dark:border-darkmode-800/80':
          colorScheme == 'theme-4',
        'border-white dark:border-darkmode-600': colorScheme != 'theme-4',
      }"
    ></a>

      <div class="dark-mode-switcher cursor-pointer box border items-center justify-center flex ml-4 h-full" @click="switchMode">
        <div class="mr-4 text-slate-600 dark:text-slate-200">Dark Mode</div>
        <div
          :class="{ 'dark-mode-switcher__toggle--active': darkMode }"
          class="dark-mode-switcher__toggle border"
        ></div>
      </div>

</div>


</div>

</template>

<script setup>
import { computed, ref } from "vue";
import { useDarkModeStore } from "@/stores/dark-mode";
import { useColorSchemeStore } from "@/stores/color-scheme";
import dom from "@left4code/tw-starter/dist/js/dom";

const darkModeStore = useDarkModeStore();
const darkMode = computed(() => darkModeStore.darkMode);
const colorSchemeStore = useColorSchemeStore();
const colorScheme = computed(() => colorSchemeStore.colorScheme);

const setColorSchemeClass = () => {
  dom("html")
    .attr("class", colorScheme.value)
    .addClass(darkMode.value ? "dark" : "");
};

const switchColorScheme = (colorScheme) => {
  colorSchemeStore.setColorScheme(colorScheme);
  setColorSchemeClass();
};



const setDarkModeClass = () => {
  darkMode.value
    ? dom("html").addClass("dark")
    : dom("html").removeClass("dark");
};

const switchMode = () => {
  darkModeStore.setDarkMode(!darkMode.value);
  setDarkModeClass();
};

setColorSchemeClass();
setDarkModeClass();
</script>


<style scoped>

.wrapper {
    position: fixed;
    overflow: hidden;
    z-index: 50;
    bottom: 0;
    right: 0;
    width: 25px;
    height: 50px; 
}

#slide {
    position: fixed;
    z-index: 50;
    right: -200px;
    width: 200px;
    height: 50px;
    /* background: blue; */
    transition: 1s;
}

#theme_picker {
    position: fixed;
    z-index: 50;
    right: -450px;
    width: 475px;
    height: 50px;
    /* background: blue; */
    border-radius: 15px 0px 0px 15px;
    transition: 1s;
}

#theme_picker_puller {
    position: fixed;
    z-index: 51;
    right: 0px;
    width: 25px;
    height: 50px;
    transition: 1s;
}


.wrapper:hover #theme_picker {
    transition: 1s;
    right: 0;
}

</style>