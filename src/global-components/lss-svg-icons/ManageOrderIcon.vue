<template>

<svg
    v-if="icon == 'close_rate'"
    width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 15H17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" :stroke="props.color"/>
    <path d="M1 15V1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" :stroke="props.color"/>
    <rect x="4" y="5.66667" width="3" height="7.46667" rx="0.5" :fill="props.color"/>
    <rect x="8" y="6.6" width="3" height="6.53333" rx="0.5" :fill="props.color"/>
    <rect x="12" y="4.73333" width="3" height="8.4" rx="0.5" :fill="props.color"/>
    <path d="M4 3.33333L8.71724 4.59412C9.04236 4.68102 9.38938 4.59855 9.64065 4.37469L12.0966 2.18667C12.2797 2.0235 12.5165 1.93333 12.7618 1.93333H15" :stroke="props.color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<svg
    v-else-if="icon == 'unCheckout_rate'"
    width="19" height="19" :stroke="props.color" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1H3.27924C3.70967 1 4.09181 1.27543 4.22792 1.68377L4.77208 3.31623C4.90819 3.72457 5.29033 4 5.72076 4H16.6126C17.2951 4 17.7771 4.6687 17.5613 5.31623L15.2279 12.3162C15.0918 12.7246 14.7097 13 14.2792 13H6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="6.08839" cy="16.1704" rx="1" ry="1.15872" transform="rotate(15 6.08839 16.1704)" stroke-width="1.5"/>
    <ellipse cx="14.2659" cy="16.1704" rx="1" ry="1.15872" transform="rotate(15 14.2659 16.1704)" stroke-width="1.5"/>
    <path d="M6.5 7L2.5 10" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.5 7L6.5 10" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

<svg 
    v-else-if="icon == 'sales_rate'"
    width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 4V3C5 1.89543 5.89543 1 7 1V1C8.10457 1 9 1.89543 9 3V4" :stroke="props.color" stroke-width="1.5"/>
    <path d="M5 6.00003V7.00003C5 8.1046 5.89543 9.00003 7 9.00003V9.00003C8.10457 9.00003 9 8.1046 9 7.00003V6.00003" :stroke="props.color" stroke-width="1.5"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 3.25C1.48122 3.25 0.25 4.48122 0.25 6V13C0.25 14.5188 1.48122 15.75 3 15.75H8.17588C8.06136 15.3531 8 14.9337 8 14.5C8 14.4161 8.0023 14.3328 8.00683 14.25H3C2.30964 14.25 1.75 13.6904 1.75 13V6C1.75 5.30964 2.30964 4.75 3 4.75H11C11.6904 4.75 12.25 5.30964 12.25 6V10.0068C12.3328 10.0023 12.4161 10 12.5 10C12.9337 10 13.3531 10.0614 13.75 10.1759V6C13.75 4.48122 12.5188 3.25 11 3.25H3Z" :fill="props.color"/>
    <circle cx="12.5" cy="14.5" :stroke="props.color" r="4.5" stroke-width="1.5"/>
    <path d="M14 13L11 16"  :stroke="props.color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="11" cy="13" r="1" :fill="props.color"/>
    <circle cx="14" cy="16" r="1" :fill="props.color"/>
</svg>

<svg
v-else-if="icon == 'comments_rate'"
    width="20" height="19" viewBox="0 0 20 19" :fill="props.color" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.2499 7.25C18.2499 4.07436 15.6756 1.5 12.4999 1.5C10.2193 1.5 8.24875 2.82777 7.31919 4.75247C6.72074 
    4.7688 6.14249 4.86603 5.59497 5.0336C6.5315 2.1136 9.26888 0 12.4999 0C16.504 0 19.7499 3.24594 19.7499 7.25C19.7499 8.92336 19.1823 10.4654 18.2299 
    11.6923L19.5704 13.2632C19.7604 13.4857 19.8035 13.7984 19.681 14.0641C19.5584 14.3298 19.2925 14.5 18.9999 14.5H13.1303C13.4002 14.0335 13.6137 13.5304 
    13.7616 13H17.374L16.674 12.1797C16.4261 11.8892 16.4361 11.4588 16.6972 11.1801C17.6609 10.1514 18.2499 8.7703 18.2499 7.25Z"/>
    <path d="M2.75541 15.6929L3.32593 16.1797C3.57382 15.8892 3.56384 15.4588 3.30276 15.1801L2.75541 15.6929ZM1 17.75L0.429485 17.2632C0.239554 17.4857 
    0.196404 17.7984 0.31896 18.0641C0.441517 18.3298 0.707401 18.5 1 18.5L1 17.75ZM13.25 11.25C13.25 14.4256 10.6756 17 7.5 17V18.5C11.5041 18.5 14.75 
    15.2541 14.75 11.25H13.25ZM7.5 5.5C10.6756 5.5 13.25 8.07436 13.25 11.25H14.75C14.75 7.24594 11.5041 4 7.5 4V5.5ZM1.75 11.25C1.75 8.07436 4.32436 5.5 7.5 
    5.5V4C3.49594 4 0.25 7.24594 0.25 11.25H1.75ZM3.30276 15.1801C2.33903 14.1514 1.75 12.7703 1.75 11.25H0.25C0.25 13.1661 0.994279 14.9099 2.20806 
    16.2056L3.30276 15.1801ZM2.1849 15.206L0.429485 17.2632L1.57051 18.2368L3.32593 16.1797L2.1849 15.206ZM1 18.5H7.5V17H1V18.5Z"/>
    <path d="M8.5 11.25C8.5 11.8023 8.05228 12.25 7.5 12.25C6.94772 12.25 6.5 11.8023 6.5 11.25C6.5 10.6977 6.94772 10.25 7.5 10.25C8.05228 10.25 8.5 10.6977 8.5 11.25Z" />
    <path d="M11 11.25C11 11.8023 10.5523 12.25 10 12.25C9.44772 12.25 9 11.8023 9 11.25C9 10.6977 9.44772 10.25 10 10.25C10.5523 10.25 11 10.6977 11 11.25Z" />
    <path d="M6 11.25C6 11.8023 5.55228 12.25 5 12.25C4.44772 12.25 4 11.8023 4 11.25C4 10.6977 4.44772 10.25 5 10.25C5.55228 10.25 6 10.6977 6 11.25Z"/>
</svg>

<svg 
v-else-if="icon == 'sales_rate2'"
  width="20" height="20" viewBox="0 0 20 20" :stroke="props.color" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="16" width="18" height="3" rx="1" stroke-width="1.5"/>
  <path d="M3 16L3.96037 7.76824C4.07798 6.76016 4.93199 6 5.9469 6H14.0531C15.068 6 15.922 6.76017 16.0396 7.76824L17 16" stroke-width="1.5" stroke-linecap="round"/>
  <rect x="4" y="1" width="6" height="3" rx="1" stroke-width="1.5"/>
  <path d="M7 4V6" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M7 13.5H13" stroke-width="1.5" stroke-linecap="round"/>
</svg>

<svg 
v-else-if="icon == 'sales_rate3'"
  width="20" height="22" viewBox="0 0 20 22" :stroke="props.color" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="14" width="4" height="7" rx="1" stroke-width="1.5"/>
  <path d="M5 16H6.42857C6.74416 16 7 15.7442 7 15.4286V15.4286C7 14.6396 7.63959 14 8.42857 14H13.5C14.3284 14 15 14.6716 15 15.5V15.5C15 16.3284 14.3284 17 13.5 17H11" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M11 17H13.2984C13.7526 17 14.1932 16.8454 14.5478 16.5617L17.0463 14.5629C17.8337 13.9331 19 14.4936 19 15.5019V15.5019C19 15.8208 18.8733 16.1267 18.6478 16.3522L14.6797 20.3203C14.2501 20.7499 13.6485 20.9609 13.0446 20.8938L5 20" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="12" cy="6" r="5" stroke-width="1.5"/>
  <path d="M13.5 4H11.5C10.9477 4 10.5 4.44772 10.5 5V5C10.5 5.55228 10.9477 6 11.5 6H12.5C13.0523 6 13.5 6.44772 13.5 7V7C13.5 7.55228 13.0523 8 12.5 8H10.5" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 3V4" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 9V8" stroke-width="1.5" stroke-linecap="round"/>
  </svg>


</template>


<script setup>
    import { useDarkModeStore } from "@/stores/dark-mode";
    import { computed } from "vue";
    
    const props = defineProps({
      icon: {
        type: String,
        default: "",
      },
      color:{
        type: String,
        default: "black",
      }
    });
    
    const darkModeStore = useDarkModeStore();
    const iconColor = computed(() =>
      !darkModeStore.darkMode ? props.color : "#ffffff"
    );
</script>