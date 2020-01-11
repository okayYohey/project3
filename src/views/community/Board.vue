<template>
  <div class="board-page">
    <v-container class="justify-center">
      <community-post
        v-for="readPost in readPosts.slice().reverse()"
        v-bind:key="readPost.IDforAll"
        :ItemsFromPosts="readPost"
        class="mb-4"
      ></community-post>
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
    <community-createPost
      class="create-card"
      v-if="createPost"
      @pushedSave="onPost"
      :ItemsFromPosts="tempStore"
    ></community-createPost>
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
    "community-post": CommunityPost,
    "community-createPost": CommunityCreatePost
  },
  created() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.authEmail = user.email;
      this.tempStore.authEmail = user.email;
      this.tempStore.authID = user.uid;
    }

    this.readMyPosts();
    this.readAllPosts();
    this.getProfile();
    this.sortedItemsByIDforAll();
  },
  data() {
    return {
      readPosts: [],
      readMyPost: [],
      readProfiles: [],
      createPost: false,
      authEmail: null,
      postNumber: 0,
      sortOrder: 1,

      tempStore: {
        informSaved: "",
        authEmail: null,
        authID: null,
        trash: false,
        published: true,
        postContent: null,
        IDforAll: 0,
        IDforMe: 0,
        profileImg: "",
        profileUrl: "",
        date: String
      }
    };
  },
  methods: {
    onPost() {
      let self = this;
      self.readMyPosts();
      self.postNumber = self.readMyPost.length;
      self.tempStore.IDforMe = self.postNumber;
      self.readAllPosts();
      self.tempStore.IDforAll = this.readPosts.length;
      self.getProfile();
      self.tempStore.profileImg = self.readProfiles.profileImg;
      self.tempStore.profileUrl = self.readProfiles.profileUrl;
      let now = new Date();
      self.tempStore.date =
        now.getDate() +
        1 +
        ":" +
        now.getHours() +
        ":" +
        now.getMinutes() +
        ":" +
        now.getSeconds();
      console.log("the number of card is :" + this.postNumber);
      db.firestore()
        .collection("posts")
        .doc(":" + this.postNumber + ":" + this.authEmail)
        .set(self.tempStore)
        .then(function() {
          self.tempStore.informSaved = "投稿できました";

          //reset
          setTimeout(() => {
            self.tempStore.informSaved = "";
            self.createPost = false;
            self.tempStore.postContent = " ";
          }, 100);
          self.readAllPosts();
        })
        .catch(function(error) {
          console.error("here:::::::" + error);
        });
    },
    readAllPosts() {
      let self = this;
      let getStore = [];
      db.firestore()
        .collection("posts")
        .where("published", "==", true)
        .orderBy("IDforAll")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            getStore.push(doc.data());
          });
          self.readPosts = getStore;
        })
        .catch(function(error) {
          console.error("Error getting documents: ", error);
        });
    },
    readMyPosts() {
      let self = this;
      let getStore = [];
      db.firestore()
        .collection("posts")
        .where("authEmail", "==", self.authEmail)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            getStore.push(doc.id);
          });
          self.readMyPost = getStore;
        })
        .catch(function(error) {
          console.error("Error getting documents: ", error);
        });
    },
    getProfile() {
      let self = this;
      let getStore = [];
      db.firestore()
        .collection("managers")
        .where("authEmail", "==", self.authEmail)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // getStore.push(doc.data());
            getStore = doc.data();
          });
          self.readProfiles = getStore;
        });
    },
    sortedItemsByIDforAll() {
      return this.readPosts.sort((a, b) => {
        return a.IDforAll < b.IDforAll
          ? -this.sortOrder
          : a.IDforAll > b.IDforAll
          ? this.sortOrder
          : 0;
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
  z-index: 2;
}
@media only screen and (min-width: 768px) {
  .card {
    display: grid;
    grid-column-gap: 1em;
    min-width: 730px;
  }
}
</style>