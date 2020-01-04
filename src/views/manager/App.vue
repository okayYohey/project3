<template>
  <div class="div">
    <manager-header></manager-header>
    <v-container class="mt-12 pt-12">
      <h1>管理者画面</h1>
    </v-container>
    <router-view />
    <com-footer></com-footer>
  </div>
</template>

<script>
import ManagerHeader from "@/components/ManagerHeader.vue";
import ComFooter from "@/components/ComFooter.vue";

export default {
  name: "manager-app",
  components: {
    "manager-header": ManagerHeader,
    "com-footer": ComFooter
  }
};
</script>

<style>
</style>