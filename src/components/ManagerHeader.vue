<template>
  <v-app-bar fixed app color="primary" dark>
    <v-toolbar-title class="font-weight-bold title" v-text="title" dark="true" />
    <v-spacer></v-spacer>
    <v-btn class="mx-1" to="/" color="white" text>ホーム</v-btn>
    <v-btn class="mx-1" to="/studios/stud-cards" color="white" text>スタジオ</v-btn>
    <v-btn class="mx-1" to="/blogs" color="white" text>ブログ</v-btn>
    <v-btn class="mx-1" to="/community/board" color="white" text>コミュニティ</v-btn>
    <manager-signout v-show="!show"></manager-signout>
  </v-app-bar>
</template>

<script>
import ManagerSignout from "@/components/ManagerChildren/ManagerSignout.vue";

export default {
  name: "manager-header",
  components: {
    "manager-signout": ManagerSignout
  },
  data() {
    return {
      title: "みんなのピラティス",
      show: false
    };
  }
};
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .mx-1 {
    display: none;
  }
}
</style>
