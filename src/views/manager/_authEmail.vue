
<template>
  <div class="posted-card-id">
    this is variable page depending on manager id like
    {{ $route.params.authEmail }}
    <manager-profile></manager-profile>
    <manager-cards></manager-cards>
  </div>
</template>

<script>
import ManagerCards from "@/components/ManagerCards.vue";
import ManagerProfile from "../../components/ManagerProfile.vue";
import firebase from "@/firebase/firebaseAuth.js";

export default {
  name: "manager-dashboard",
  components: {
    "manager-cards": ManagerCards,
    "manager-profile": ManagerProfile
  },
  data() {
    return {};
  },
  created() {
    var user = firebase.auth().currentUser;
    if (!user) {
      this.$router.push("/studios/signin");
    }
  }
};
</script>

<style>
</style>