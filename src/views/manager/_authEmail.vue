
<template>
  <div class="posted-card-id">
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