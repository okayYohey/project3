<template>
  <v-footer height="200" class="justify-center">
    <v-flex v-if="!isLoggedIn">
      <v-row>
        <h2>スタジオの方はこちら</h2>
      </v-row>
      <v-row class="justify-space-around flex-row my-4">
        <v-btn to="/studios/signup" class="mx-2 my-4" color="success" dark>会員登録</v-btn>
        <v-btn to="/studios/signin" class="mx-2 my-4" color="accent" dark>ログイン</v-btn>
      </v-row>
    </v-flex>
    <span>&copy; 2019 YNU みんなのピラティス All Rights Reserved</span>
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
  }
};
</script>
