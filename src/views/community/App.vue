<template>
  <div class="blog-page">
    <com-header></com-header>
    <com-topview h1="コミュニティ | ピラティスに関する情報をシェアしよう"></com-topview>
    <router-view />
    <v-footer>
      <com-footer></com-footer>
    </v-footer>
  </div>
</template>

<script>
import ComHeader from "@/components/ComHeader.vue";
import ComFooter from "@/components/ComFooter.vue";
import ComTopView from "@/components/ComTopView.vue";

export default {
  name: "blog-app",
  components: {
    "com-header": ComHeader,
    "com-footer": ComFooter,
    "com-topview": ComTopView
  }
};
</script>

<style>
</style>