<template>
  <v-footer height="200" class="mx-auto justify-center">
    <v-flex v-if="!isLoggedIn">
      <v-col>
        <v-row class="justify-center">
          <h2>会員登録やログインはこちらから</h2>
        </v-row>
        <v-row class="justify-space-around flex-row my-4">
          <v-btn to="/signup" class="mx-2 my-4" color="success" dark>会員登録</v-btn>
          <v-btn to="/signin" class="mx-2 my-4" color="accent" dark>ログイン</v-btn>
        </v-row>
        <v-row>
          <span>&copy; 2019 YNU みんなのピラティス All Rights Reserved</span>
        </v-row>
      </v-col>
    </v-flex>
  </v-footer>
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
      isLoggedIn: false
    };
  }
};
</script>
