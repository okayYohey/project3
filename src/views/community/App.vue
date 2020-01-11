<template>
  <div class="community-page">
    <com-header></com-header>
    <com-topview h1="コミュニティ" h1Plus="ピラティスに関する情報をシェアしよう"></com-topview>
    <v-breadcrumbs :items="listsManual" divider=">"></v-breadcrumbs>
    <router-view />
    <com-footer></com-footer>
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
          text: "コミュニティ",
          href: "/community/board"
        }
      ]
    };
  },
  metaInfo: {
    title: "みんなのコミュニティでピラティス情報を共有しよう"
  }
};
</script>

<style>
</style>