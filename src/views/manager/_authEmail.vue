
<template>
  <div class="posted-card-id">
    <div class>{{ $route.params.authEmail}}---{{StudioMode}}</div>
    <manager-profile @show-mode="isStudioMode"></manager-profile>
    <manager-posts v-if="!StudioMode"></manager-posts>
    <manager-cards v-if="StudioMode"></manager-cards>
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
      StudioMode: false
    };
  },
  created() {
    var user = firebase.auth().currentUser;
    setTimeout(() => {
      if (!user) {
        this.$router.push("/signin");
      } else {
        let authEmail = user.email;
        this.$router.push({ path: `/manager/${authEmail}` });
      }
    }, 200);
  },
  methods: {
    isStudioMode(mode) {
      console.log("before function, mode is " + mode);
      this.StudioMode = mode;
      console.log("after function, studio mode is " + this.StudioMode);
    }
  }
};
</script>

<style>
</style>