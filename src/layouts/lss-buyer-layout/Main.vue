<template>
  <div>
    <ThemeModeSwitcher />
    <LSSBuyerTopBar />
    <LSSBuyerMobileMenu />
    <div class="flex overflow-hidden">
      
      <LSSBuyerMenu />
      <!-- BEGIN: Content -->
      <div class="lss-content">
        <router-view />
      </div>
      <!-- END: Content -->
    </div>
  </div>
</template>

<script setup>
import ThemeModeSwitcher from "@/components/theme-mode-switcher/Main.vue"
import LSSBuyerTopBar from "@/components/lss-buyer-top-bar/Main.vue";
import LSSBuyerMobileMenu from "@/components/lss-buyer-mobile-menu2/Main.vue";
import LSSBuyerMenu from "@/components/lss-buyer-menu/Main.vue";


</script>
