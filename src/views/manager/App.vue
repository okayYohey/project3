<template>
  <div class="div">
    <manager-header></manager-header>

    <v-container class="mt-12 pt-12">
      <v-breadcrumbs :items="listsManual" divider=">"></v-breadcrumbs>
      <h1>ダッシュボード</h1>
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
  },
  data() {
    return {
      listsManual: [
        {
          text: "ホーム",
          href: "/"
        },
        {
          text: "ダッシュボード",
          href: "/community/board"
        }
      ]
    };
  }
};
</script>

<style>
</style>