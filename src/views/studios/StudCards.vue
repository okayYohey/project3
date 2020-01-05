<template>
  <v-container class="pa-7 px-0 d-flex flex-column">
    <v-toolbar floating class="search-bar mx-auto mt-n4">
      <v-text-field
        hide-details
        prepend-icon="search"
        single-line
        v-model="query"
        class="search-input"
      ></v-text-field>
      <v-btn @click="searchCards" class="mx-2" color="primary">検索</v-btn>
    </v-toolbar>
    <div class="result" v-if="showResult">
      <h2>検索結果</h2>
      <v-text v-if="noresult">
        検索結果が見つかりませんでした。
        <br />掲載店舗を増やしていきますので、これからもご愛顧よろしくお願いします。
      </v-text>
      <v-flex class="d-flex flex-wrap flex-row">
        <stud-card
          v-for="searchedCard in searchedCards"
          v-bind:key="searchedCard.id"
          :ItemsFromCardList="searchedCard"
          class="mb-6"
        ></stud-card>
      </v-flex>
      <com-topview :imageURL="img" text="ピラティスで毎日を元気に！"></com-topview>
    </div>
    <h2>全店舗</h2>
    <v-flex class="d-flex flex-wrap flex-row">
      <stud-card
        v-for="readCard in readCards"
        v-bind:key="readCard.id"
        :ItemsFromCardList="readCard"
        class="mb-6"
      ></stud-card>
    </v-flex>
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
      console.log(searchResult.hits);
      this.searchedCards = searchResult.hits;
      console.log(this.searchedCards);
      this.showResult = true;
      if (this.searchedCards.length == 0) {
        this.noresult = true;
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