<template>
<v-container class="profile card-list pa-7 d-flex flex-wrap flex-row px-0">
  <h2 class="d-block">スタジオカード</h2>
    <stud-card 
    v-for="readCard in readCards" 
    v-bind:key="readCard.id"
    :ItemsFromCardList = "readCard"
    class="mb-6"
    >
    </stud-card>
</v-container>
</template>

<script>
import StudCard from '@/components/StudCard.vue'
import db from '@/firebase/firestore'
import algoliasearch from 'algoliasearch';

export default {
    name: 'manager-cards',
    created(){
        this.readAllCards();
        this.index = this.searchClient.initIndex('posts')
    },
    components:{
    'stud-card': StudCard,
    },
    data(){
      return{
            readCards:[],
            search_text: '',
            users: [],
            searchClient: algoliasearch(  // クライアント
                'APP_ID',
                'SECRET_KEY'
            ),
            index: null
        }
    },
    methods:{
      readAllCards(){
          let self = this
          let getStore =[]
          db.firestore().collection("posts").where('published', '==', true)
          .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  console.log(doc.id, " => ", doc.data());
                  self.readCards = doc.data()
                  getStore.push(doc.data())
              })
              self.readCards = getStore
          })
          .catch(function(error) {
              console.error("Error getting documents: ", error);
          });
      },
      searchUser: function () {
        var self = this;

        // ここでAlgoliaのAPIへ検索リクエストを投げています
        // searchメソッドの第一引数が検索文字列です。
        // 試しに "art" で検索してみます
            self.index.search("art", (err, { hits } = {}) => {
                // 検索結果をデータバインドしているusersに格納
                self.users = hits;
            });
        }
    }
}
</script>