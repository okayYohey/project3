<template>
  <v-bottom-navigation
    v-model="bottomNav"
    hide-on-scroll
    fixed
    bottom
    color="primary accent-4"
    grow
    class="bottom pt-2"
  >
    <v-btn value="home" to="/">
      <span>ホーム</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn value="sutudios" to="/studios/stud-cards">
      <span>スタジオ</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
    <v-btn value="blogs" to="/blogs">
      <span>ブログ</span>
      <v-icon>mdi-pen</v-icon>
    </v-btn>
    <v-btn value="community" to="/community/board">
      <span>コミュニティ</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn value="manager" v-show="isLoggedIn" to="/manager/:manid">
      <span>管理画面</span>
      <v-icon>mdi-settings</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import firebase from "@/firebase/firebaseAuth.js";

export default {
  name: "com-bottom",
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
    }
  },
  data() {
    return {
      isLoggedIn: false,
      bottomNav: ""
    };
  }
};
</script>

<style>
.bottom {
  display: none;
}
@media only screen and (max-width: 768px) {
  .bottom {
    display: block;
  }
}
</style>