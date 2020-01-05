<template>
  <v-btn @click="signout" text>ログアウト</v-btn>
</template>

<script>
import firebase from "@/firebase/firestore.js";
export default {
  name: "manager-signout",
  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then(this.$router.push("/studios/stud-cards"));
    }
  }
};
</script>