
<template>
  <div class="posted-card-id">
    <v-switch v-model="isStudioMode" label="スタジオ管理者モード"></v-switch>
    <div class>{{ $route.params.authEmail}}</div>
    <manager-profile></manager-profile>
    <manager-posts></manager-posts>
    <manager-cards v-if="isStudioMode"></manager-cards>
  </div>
</template>

<script>
import ManagerCards from "@/components/ManagerCards.vue";
import ManagerPosts from "@/components/ManagerPosts.vue";
import ManagerProfile from "../../components/ManagerProfile.vue";
import firebase from "@/firebase/firebaseAuth.js";

export default {
  name: "auth-dashboard",
  components: {
    "manager-cards": ManagerCards,
    "manager-posts": ManagerPosts,
    "manager-profile": ManagerProfile
  },
  data() {
    return {
      isStudioMode: false
    };
  },
  created() {
    var user = firebase.auth().currentUser;
    setTimeout(() => {
      if (!user) {
        this.$router.push("/signin");
      }
    }, 200);
  }
};
</script>

<style>
</style>