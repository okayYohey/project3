<template>
  <div class="studios-page">
    <com-header></com-header>
    <com-topview h1="ピラティススタジオ紹介" h1Plus="一緒にあなたにぴったりなスタジオを探しましょう"></com-topview>
    <v-breadcrumbs :items="listsManual" divider=">"></v-breadcrumbs>
    <router-view :query="query" />
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
  name: "stud-app",
  components: {
    "com-header": ComHeader,
    "com-footer": ComFooter,
    "com-topview": ComTopView
  },
  data() {
    return {
      query: "",
      listsManual: [
        {
          text: "ホーム",
          href: "/"
        },
        {
          text: "スタジオ",
          href: "/studios/stud-cards"
        }
      ]
    };
  },
  metaInfo: {
    title: "ピラティススタジオの比較"
  }
};
</script>

<style>
</style>