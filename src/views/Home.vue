<template>
  <div class="home">
    <com-header></com-header>
    <com-topview></com-topview>
    <v-breadcrumbs :items="listsManual" divider=">"></v-breadcrumbs>
    <v-container>
      <v-col>
        <v-row>
          <h2 @click="toStudios">おすすめのピラティススタジオ</h2>
          <v-sheet class="mx-auto my-8 ml-n8" max-width="1000" min-width="300">
            <v-slide-group class="pa-4" show-arrows>
              <v-slide-item
                v-for="recomendCard in recomendCards"
                v-bind:key="recomendCard.id"
                class="mb-6 card"
              >
                <stud-card
                  :small="smallCard"
                  :action="action"
                  class="mb-6 mr-8 card"
                  :ItemsFromCardList="recomendCard"
                ></stud-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-row>
        <v-row>
          <v-img
            src="https://firebasestorage.googleapis.com/v0/b/min-nano-pilates-project2.appspot.com/o/logo.jpg?alt=media&token=eef5063b-c271-42fe-a1ae-1a0612a8dabd"
            aspect-ratio="2.5"
          ></v-img>
        </v-row>
        <v-row>
          <h2>新着ブログ記事</h2>
          <!-- <v-sheet class="mx-auto ml-n8" max-width="1000" min-width="300">
            <blog-card v-for="newBlog in newBlogs" :key="newBlog.id"></blog-card>
          </v-sheet>-->
          <v-sheet class="mx-auto my-8 ml-n8" max-width="1000" min-width="300">
            <v-slide-group class="pa-4" show-arrows>
              <v-slide-item
                v-for="recomendCard in recomendCards"
                v-bind:key="recomendCard.id"
                class="mb-6 card"
              >
                <stud-card
                  :small="smallCard"
                  :action="action"
                  class="mb-6 mr-8 card"
                  :ItemsFromCardList="recomendCard"
                ></stud-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-row>
        <v-row>
          <com-topview
            imageURL="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            h1
          ></com-topview>
        </v-row>
        <v-row>
          <h2 @click="toCommunity">注目の投稿</h2>
          <v-sheet class="mx-auto ml-n8 py-8 my-8 lovedPosts">
            <community-post
              v-for="lovedPost in lovedPosts"
              v-bind:key="lovedPost.IDforAll"
              :ItemsFromPosts="lovedPost"
              class="my-4"
            ></community-post>
          </v-sheet>
        </v-row>
        <v-row>
          <com-topview
            imageURL="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"
            text="広告募集中"
          ></com-topview>
        </v-row>
      </v-col>
    </v-container>
    <v-footer>
      <com-footer></com-footer>
    </v-footer>
  </div>
</template>

<script>
import ComHeader from "@/components/ComHeader.vue";
import ComTopView from "@/components/ComTopView.vue";
import ComFooter from "@/components/ComFooter.vue";
import StudCard from "@/components/StudCard.vue";
import CommunityPost from "@/components/CommunityPost.vue";
import db from "@/firebase/firestore";

export default {
  name: "home",
  components: {
    "com-header": ComHeader,
    "com-footer": ComFooter,
    "com-topview": ComTopView,
    "stud-card": StudCard,
    "community-post": CommunityPost
  },
  created() {
    this.readAllCards();
    this.readLovedPosts();
  },
  data() {
    return {
      recomendCards: [],
      smallCard:
        "min-width:250px; width:300px; display:grid; grid-template-columns:1fr",
      action: "position: relative;",
      newBlogs: [],
      lovedPosts: [],
      listsManual: [
        {
          text: "ホーム",
          disabled: false,
          href: "/"
        }
      ]
    };
  },
  methods: {
    toStudios() {
      this.$router.push("/studios/stud-cards");
    },
    toCommunity() {
      this.$router.push("/community/board");
    },
    readAllCards() {
      let self = this;
      let getStore = [];
      db.firestore()
        .collection("cards")
        .where("published", "==", true)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            self.recomendCards = doc.data();
            getStore.push(doc.data());
          });
          self.recomendCards = getStore;
        })
        .catch(function(error) {
          console.error("Error getting documents: ", error);
        });
    },
    readLovedPosts() {
      let self = this;
      let getStore = [];
      db.firestore()
        .collection("posts")
        .where("published", "==", true)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            getStore.push(doc.data());
          });
          self.lovedPosts = getStore;
          //LIKE順に並べ替えたい
          self.lovedPosts.splice(7);
        })
        .catch(function(error) {
          console.error("Error getting documents: ", error);
        });
    }
  }
};
</script>

<style scoped>
.card {
  width: 250px;
  min-width: 250px;
}
.lovedPosts {
  width: 100%;
}
</style>