<template>
  <v-container class="manager-profile">
    <v-flex class="mx-4 d-inline-flex flex-wrap py-4">
      <h2 class="d-block">プロフィール</h2>
      <h3 class="d-block">{{ authEmail }}</h3>
      <v-btn
        color="secondary"
        class="mt-2 mx-4"
        v-show="!editingProfile"
        @click="editingProfile = true"
      >編集する</v-btn>
      <v-btn
        color="accent"
        class="mt-2 mx-4"
        v-show="editingProfile"
        @click="editingProfile=false; saveProfile();"
      >保存する</v-btn>
      <p class="mt-4 ml-4 d-inline">{{ informSaved }}</p>
    </v-flex>
    <v-card class="mx-auto card" width="800">
      <v-container class="group justify-center align-center px-auto">
        <v-avatar class="mx-auto" size="82">
          <v-img class="white--text align-end img" :src="profileImg"></v-img>
        </v-avatar>
      </v-container>
      <v-simple-table class="py-3 group">
        <tbody>
          <tr v-show="!editingProfile">
            <th>名前（会社）</th>
            <td>{{ studioName }}</td>
          </tr>
          <tr v-show="editingProfile">
            <th>名前（会社）</th>
            <td>
              <input type="text" v-model="studioName" required />
            </td>
          </tr>
          <tr v-show="editingProfile">
            <th>プロフィール写真</th>
            <td>
              <input type="text" v-model="profileImg" required />
            </td>
          </tr>
          <tr v-show="!editingProfile">
            <th>連絡用メールアドレス</th>
            <td>{{ contactEmail }}</td>
          </tr>
          <tr v-show="editingProfile">
            <th>メールアドレス</th>
            <td>
              <input type="email" v-model="contactEmail" required />
            </td>
          </tr>
          <tr v-show="!editingProfile">
            <th>住所</th>
            <td>{{ address }}</td>
          </tr>
          <tr v-show="editingProfile">
            <th>住所</th>
            <td>
              <input type="text" v-model="address" required />
            </td>
          </tr>
          <tr v-show="!editingProfile">
            <th>スタジオの数</th>
            <td>{{ howManyShops }}</td>
          </tr>
          <tr v-show="editingProfile">
            <th>スタジオの数</th>
            <td>
              <input type="number" v-model="howManyShops" placeholder="数字を入力" required />
            </td>
          </tr>
          <tr v-show="!editingProfile">
            <th>担当者名</th>
            <td>{{ contactName }}</td>
          </tr>
          <tr v-show="editingProfile">
            <th>担当者名</th>
            <td>
              <input type="text" v-model="contactName" />
            </td>
          </tr>
          <tr v-show="!editingProfile">
            <th>ビジネススタイル</th>
            <td>{{ radioTypes }}</td>
          </tr>
          <tr v-show="editingProfile">
            <th>ビジネススタイル</th>
            <td>
              <v-radio-group v-model="radioTypes">
                <v-radio label="法人" value="法人"></v-radio>
                <v-radio label="個人事業主" value="個人事業主"></v-radio>
                <v-radio label="その他" value="その他"></v-radio>
              </v-radio-group>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script>
import db from "@/firebase/firestore";
import firebase from "@/firebase/firebaseAuth";

export default {
  created() {
    this.authID = firebase.auth().currentUser.uid;
    this.authEmail = firebase.auth().currentUser.email;
    this.readProfile();
  },
  data() {
    return {
      profileImg: "",
      editingProfile: false,
      informSaved: "",
      saved: true,
      address: "",
      howManyShops: 0,
      contactName: "",
      radioTypes: "",
      studioName: "",
      authID: "",
      authEmail: "",
      contactEmail: ""
    };
  },
  methods: {
    saveProfile() {
      let self = this;
      const saveData = {
        profileImg: this.profileImg,
        email: this.authEmail,
        howManyShops: this.howManyShops,
        studioName: this.studioName,
        type: this.radioTypes,
        address: this.address,
        contactName: this.contactName,
        country: this.address,
        contactEmail: this.contactEmail
      };
      db.firestore()
        .collection("managers")
        .doc(this.authID)
        .set(saveData)
        .then(function() {
          console.log("Document successfully written!");
          self.informSaved = "保存できました";
          setTimeout(() => {
            self.informSaved = "";
          }, 3000);
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    readProfile() {
      let self = this;
      db.firestore()
        .collection("managers")
        .doc(this.authID)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            self.profileImg = doc.data().profileImg;
            self.howManyShops = doc.data().howManyShops;
            self.studioName = doc.data().studioName;
            self.radioTypes = doc.data().type;
            self.address = doc.data().address;
            self.contactName = doc.data().contactName;
            self.country = doc.data().country;
            self.contactEmail = doc.data().contactEmail;
          } else {
            console.log("No such document!");
          }
        });
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 350px;
  min-width: 250px;
}
.group {
  display: grid;
}
@media only screen and (min-width: 768px) {
  .card {
    display: grid;
    grid-template-columns: 180px auto;
    grid-column-gap: 1em;
    min-width: 730px;
  }
}
</style>