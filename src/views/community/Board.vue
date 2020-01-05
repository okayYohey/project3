<template>
  <div class="board-page">
    <v-container class="justify-center">
      <community-Post
        v-for="readPost in readPosts"
        v-bind:key="readPost.id"
        :ItemsFromPosts="readPost"
        class="mb-4"
      ></community-Post>
    </v-container>
    <v-btn
      @click="createPost = !createPost"
      color="primary"
      fab
      dark
      large
      fixed
      right
      bottom
      class="mb-12 mr-4"
    >
      <v-icon v-if="!createPost">mdi-pencil</v-icon>
      <v-icon v-if="createPost">mdi-close</v-icon>
    </v-btn>
    <community-createPost class="create-card" v-if="createPost" :pushedSave="onPost"></community-createPost>
  </div>
</template>

<script>
import CommunityPost from "@/components/CommunityPost.vue";
import CommunityCreatePost from "@/components/CommunityCreatePost.vue";
import firebase from "@/firebase/firebaseAuth";
import db from "@/firebase/firestore";

export default {
  name: "community-board",
  components: {
    "community-Post": CommunityPost,
    "community-createPost": CommunityCreatePost
  },
  created() {
    this.authEmail = firebase.auth().currentUser.email;
    let self = this;
    let getStore = [];
    db.firestore()
      .collection("posts")
      .where("published", "==", true)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          self.readPosts = doc.data();
          getStore.push(doc.data());
        });
        self.readPosts = getStore;
      })
      .catch(function(error) {
        console.error("Error getting documents: ", error);
      });
  },
  data() {
    return {
      readPosts: [],
      createPost: false,
      authEmail: null,
      tempStore: null
    };
  },
  methods: {
    onPost() {
      this.createPost = false;
      console.log("func savefirst");
      let self = this;

      db.firestore()
        .collection("posts")
        .doc(":" + this.cardNumber + ":" + this.authEmail)
        .set(this.tempStore)
        .then(function() {
          console.log("Document successfully written!");
          self.tempStore.informSaved = "保存できました";
          setTimeout(() => {
            self.tempStore.informSaved = "";
          }, 3000);
          self.readCards.push(self.tempStore);
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.my-2 {
  z-index: 3;
}
.create-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 280px;
}
@media only screen and (min-width: 768px) {
  .card {
    display: grid;
    grid-column-gap: 1em;
    min-width: 730px;
  }
}
</style>