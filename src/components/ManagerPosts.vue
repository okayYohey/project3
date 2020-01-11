<template>
  <v-container class="profile card-list pa-7 d-flex flex-wrap flex-row px-0">
    <h2 class="d-block">投稿したカード一覧</h2>
    <v-flex class="d-flex flex-wrap flex-row">
      <manager-post
        v-for="readPost in readPosts"
        v-bind:key="readPost.id"
        :ItemsFromCardList="readPost"
        class="mb-6"
      ></manager-post>
    </v-flex>
  </v-container>
</template>

<script>
import ManagerPost from "@/components/ManagerChildren/ManagerPost.vue";
import db from "@/firebase/firestore";
import firebase from "@/firebase/firebaseAuth";

export default {
  name: "manager-cards",
  components: {
    "manager-post": ManagerPost
  },
  created() {
    this.authID = firebase.auth().currentUser.uid;
    this.authEmail = firebase.auth().currentUser.email;
    this.readAllCards();
    setTimeout(() => {
      this.cardNumber = this.readPosts.length;
      console.log("card num is:" + this.cardNumber);
    }, 3000);
    console.log("card num is::" + this.cardNumber);
  },
  data() {
    return {
      authEmail: null,
      authID: null,
      informSaved: "",
      cardNumber: 0,
      tempStore: {
        informSaved: "",
        authEmail: firebase.auth().currentUser.email,
        authID: firebase.auth().currentUser.uid,
        trash: false,
        published: false
      },
      readPosts: []
    };
  },
  methods: {
    readAllCards() {
      let self = this;
      let getStore = [];
      db.firestore()
        .collection("posts")
        .where("authID", "==", this.authID)
        .where("trash", "==", false)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            self.readPosts = doc.data();
            getStore.push(doc.data());
          });
          self.readPosts = getStore;
        })
        .catch(function(error) {
          console.error("Error getting documents: ", error);
        });
    }
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