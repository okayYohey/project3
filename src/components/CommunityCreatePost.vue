<template>
  <v-card class="card">
    <v-fade-transition>
      <v-form class="pa-4">
        <!-- <v-text-field color="accent" label="紹介文" type="text" v-model="postContent"></v-text-field> -->
        <v-textarea label="今日の気持ちを投稿しよう" v-model="ItemsFromPosts.postContent"></v-textarea>
      </v-form>
    </v-fade-transition>
    <div class="group pa-4 mb-2 d-flex justify-end">
      <p>{{ ItemsFromPosts.informSaved }}</p>
      <v-btn v-show="!isLoggdin" class="mx-4" @click="toLogin" color="primary" text>ログインする</v-btn>
      <v-btn :disabled="!isLoggdin" class="mx-4" @click="saveCard" color="primary">投稿する</v-btn>
    </div>
  </v-card>
</template>

<script>
import firebase from "@/firebase/firebaseAuth.js";
export default {
  name: "community-createcard",
  props: ["ItemsFromPosts"],
  created() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.isLoggdin = true;
    }
  },
  data() {
    return {
      postContent: null,
      isLoggdin: false
    };
  },
  methods: {
    saveCard() {
      this.$emit("pushedSave");
      console.log("pushed save btn");
    },
    toLogin() {
      this.$router.push("/signin");
    }
  }
};
</script>

<style scoped>
</style>