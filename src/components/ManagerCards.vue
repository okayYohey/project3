<template>
  <v-container class="profile card-list pa-7 d-flex flex-wrap flex-row px-0">
    <h2 class="d-block">スタジオカード</h2>
    <v-flex class="d-flex flex-wrap flex-row">
      <manager-createcard
        class="d-block"
        :ItemsFromCardList="tempStore"
        @pushedSaveFirst="saveFirst"
      ></manager-createcard>
      <manager-card
        v-for="readCard in readCards"
        v-bind:key="readCard.id"
        :ItemsFromCardList="readCard"
        class="mb-6"
        @pushedSave="saveAgain"
      ></manager-card>
    </v-flex>
  </v-container>
</template>

<script>
import ManagerCard from "@/components/ManagerChildren/ManagerCard.vue";
import db from "@/firebase/firestore";
import firebase from "@/firebase/firebaseAuth";
import ManagerCreatecard from "@/components/ManagerChildren/ManagerCreatecard.vue";

export default {
  name: "manager-cards",
  components: {
    "manager-card": ManagerCard,
    "manager-createcard": ManagerCreatecard
  },
  created() {
    this.authID = firebase.auth().currentUser.uid;
    this.authEmail = firebase.auth().currentUser.email;
    this.readAllCards();
    setTimeout(() => {
      this.cardNumber = this.readCards.length;
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
      readCards: []
    };
  },
  methods: {
    saveFirst() {
      console.log("func savefirst");
      let self = this;

      db.firestore()
        .collection("users")
        .doc("authID")
        .collection("cards")
        .doc(":" + this.cardNumber + ":" + this.authEmail)
        .set(this.tempStore)
        .then(function() {
          console.log("Document successfully written!");
          self.tempStore.informSaved = "保存できました";
          setTimeout(() => {
            self.tempStore.informSaved = "";
            self.tempStore = null;
          }, 3000);
          self.readCards.push(self.tempStore);
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    saveAgain() {
      this.readAllCards();
      let self = this;
      console.log("save again func");
      for (let i = 0; i < this.cardNumber; i++) {
        console.log("I:" + i);
        console.log("reading:" + this.readCards[i].published);
        db.firestore()
          .collection("users")
          .doc("authID")
          .collection("cards")
          .doc(":" + i + ":" + this.authEmail)
          .set(this.readCards[i])
          .then(function() {
            console.log("Document successfully written Again!");
          })
          .catch(function(error) {
            console.error(error);
            // this.$router.push({ name: 'auth-dashboard', params: { id: this.authEmail } })
          })
          .then(function() {
            self.tempStore.informSaved = "フタタビ保存しました";
            setTimeout(() => {
              self.tempStore.informSaved = "";
            }, 3000);
          });
      }
    },
    readAllCards() {
      let self = this;
      let getStore = [];
      db.firestore()
        .collection("users")
        .doc("authID")
        .collection("cards")
        .where("authID", "==", this.authID)
        .where("trash", "==", false)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            self.readCards = doc.data();
            getStore.push(doc.data());
          });
          self.readCards = getStore;
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