<template>
  <div class="blog-page">
    <com-header></com-header>
    <com-topview h1="ブログ" h1Plus="ピラティスに関するニュースと知識をお届け"></com-topview>
    <v-breadcrumbs :items="listsManual" divider=">"></v-breadcrumbs>
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
  },
  data() {
    return {
      listsManual: [
        {
          text: "ホーム",
          href: "/"
        },
        {
          text: "ブログ",
          href: "/blogs/index"
        }
      ]
    };
  },
  metaInfo: {
    title: "ピラティス専門トレーナーがによるブログ"
  }
};
</script>

<style>
</style>