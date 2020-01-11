<template>
  <v-app-bar fixed app color="primary" dark hide-on-scroll>
    <v-toolbar-title class="font-weight-bold title" color="primary" v-text="title" />
    <v-spacer></v-spacer>
    <v-btn class="mx-1" to="/" color="white" text>ホーム</v-btn>
    <v-btn class="mx-1" to="/studios/stud-cards" color="white" text>スタジオ</v-btn>
    <v-btn class="mx-1" to="/blogs" color="white" text>ブログ</v-btn>
    <v-btn class="mx-1" to="/community/board" color="white" text>コミュニティ</v-btn>
    <v-btn class="mx-1" v-show="isLoggedIn" to="/manager/:authEmail" color="secondary">管理画面</v-btn>
  </v-app-bar>
</template>

<script>
import firebase from "@/firebase/firebaseAuth.js";

export default {
  name: "com-header",
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
    }
  },
  data() {
    return {
      title: "みんなのピラティス",
      isLoggedIn: false
    };
  }
};
</script>
<style scoped>
/* max に注意！ */
@media only screen and (max-width: 768px) {
  .mx-1 {
    display: none;
  }
}
</style>