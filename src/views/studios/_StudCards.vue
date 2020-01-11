<template>
  <v-container class="pa-7 px-0 d-flex flex-column">
    <v-toolbar floating class="search-bar mx-auto mt-n4 mb-8">
      <v-text-field
        hide-details
        prepend-icon="search"
        single-line
        v-model="query"
        class="search-input"
      ></v-text-field>
      <v-btn @click="searchCards" class="mx-2" color="primary">検索</v-btn>
    </v-toolbar>
    <div class="searched" v-if="isSearched">
      <h2>検索結果</h2>
      <h3>{{query}}</h3>
      <v-flex class="d-flex flex-wrap flex-row">
        <stud-card
          v-for="searchedCard in searchedCards"
          v-bind:key="searchedCard.id"
          :ItemsFromCardList="searchedCard"
          class="mb-6"
        ></stud-card>
      </v-flex>
    </div>
    <div class="all" v-else>
      <h2>全店舗</h2>
      <h3>{{query}}</h3>
      <v-flex class="d-flex flex-wrap flex-row">
        <stud-card
          v-for="readCard in readCards"
          v-bind:key="readCard.id"
          :ItemsFromCardList="readCard"
          class="mb-6"
        ></stud-card>
      </v-flex>
    </div>
    <com-topview :imageURL="img" text="ピラティスで毎日を元気に！"></com-topview>
    <com-topview
      imageURL="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"
      text="広告募集中"
    ></com-topview>
  </v-container>
</template>

<script>
import StudCard from "@/components/StudCard.vue";
import ComTopView from "@/components/ComTopView.vue";
import db from "@/firebase/firestore";

const algoliasearch = require("algoliasearch");
const client = algoliasearch("36GB9RYJMY", "484bcaee9c92de885013f00df843c0f7");
const index = client.initIndex("cards");

export default {
  name: "manager-cards",
  created() {
    this.readAllCards();
  },
  components: {
    "stud-card": StudCard,
    "com-topview": ComTopView
  },
  data() {
    return {
      isSearched: false,
      readCards: [],
      query: "",
      noresult: false,
      searchedCards: [],
      showResult: false,
      img:
        "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    };
  },
  methods: {
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
            self.readCards = doc.data();
            getStore.push(doc.data());
          });
          self.readCards = getStore;
        })
        .catch(function(error) {
          console.error("Error getting documents: ", error);
        });
    },
    async searchCards() {
      let searchResult = await index.search({
        query: this.query,
        filters: `published=1`
      });
      this.searchedCards = searchResult.hits;
      console.log(this.searchedCards);
      this.isSearched = true;
      if (this.searchedCards == null) {
        this.noresult = true;
      } else {
        this.noresult = false;
      }
    }
  }
};
</script>

<style scoped>
.search-input {
  min-width: 150px;
}
.search-bar {
  margin: 0 auto;
}
@media only screen and (min-width: 768px) {
  .search-input {
    min-width: 500px;
  }
}
</style>