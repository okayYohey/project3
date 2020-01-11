<template>
  <div class="studios-page">
    <com-header></com-header>
    <com-topview h1="会員登録"></com-topview>
    <v-breadcrumbs :items="listsManual" divider=">"></v-breadcrumbs>
    <v-container>
      <v-card class="form-signup" min-height="300px">
        <v-container justify-center>
          <v-layout>
            <v-col class="col-6 mx-auto">
              <v-row class="mb-4">
                <h1>会員登録</h1>
              </v-row>
              <v-row class="mx-auto">
                <v-text-field
                  v-model="form.email"
                  label="メールアドレス"
                  color="secondary"
                  loading
                  type="name"
                ></v-text-field>
              </v-row>
              <v-row class="mx-auto">
                <v-text-field
                  v-model="form.password"
                  label="パスワード"
                  color="secondary"
                  loading
                  type="password"
                ></v-text-field>
              </v-row>

              <v-row>
                <v-checkbox v-model="form.terms" color="secondary">
                  <template v-slot:label>
                    <div @click.stop>
                      <a href="javascript:;" @click.stop="terms = true">利用規約</a>
                      と
                      <a
                        href="javascript:;"
                        @click.stop="conditions = true"
                      >プライバシーポリシー</a>
                      に同意しますか？
                    </div>
                  </template>
                </v-checkbox>
              </v-row>
            </v-col>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!formIsValid"
            color="primary"
            type="submit"
            @click="createUser"
            class="mx-4 px-4"
          >会員登録</v-btn>
        </v-card-actions>
        <v-dialog v-model="terms" width="70%">
          <v-card>
            <v-card-title class="title">Terms</v-card-title>
            <v-card-text>{{ readTerms[0].contentTerm }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="purple" @click="terms = false">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="conditions" width="70%">
          <v-card>
            <v-card-title class="title">Privacy</v-card-title>
            <v-card-text>{{ readTerms[0].contentPrivacy }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="purple" @click="conditions = false">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-container>
    <com-footer></com-footer>
  </div>
</template>

<script>
import firebase from "@/firebase/firebaseAuth.js";
import db from "@/firebase/firestore";
import ComHeader from "@/components/ComHeader.vue";
import ComFooter from "@/components/ComFooter.vue";
import ComTopView from "@/components/ComTopView.vue";

export default {
  name: "stud-signin",
  components: {
    "com-header": ComHeader,
    "com-footer": ComFooter,
    "com-topview": ComTopView
  },
  data() {
    const defaultForm = Object.freeze({
      email: null,
      password: null,
      terms: false
    });
    return {
      form: Object.assign({}, defaultForm),
      conditions: false,
      terms: false,
      readTerms: [],
      defaultForm,
      listsManual: [
        {
          text: "ホーム",
          href: "/"
        },
        {
          text: "会員登録",
          href: "/signup"
        }
      ]
    };
  },
  computed: {
    formIsValid() {
      return this.form.email && this.form.password && this.form.terms;
    }
  },
  created() {
    var user = firebase.auth().currentUser;
    if (user) {
      let authEmail = user.email;
      this.$router.push({ path: `/manager/${authEmail}` });
    } else {
      this.getTerms();
      console.log("getTerms");
    }
  },
  methods: {
    createUser() {
      const self = this;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(
          function() {
            let authEmail = self.form.email;
            self.$router.push({ path: `/manager/${authEmail}` });
          },
          function(err) {
            alert(err.message);
          }
          // たぶんwizardのでクリックイベントがとられてて上手くいってない
          // this.finised.preventDefault()
        );
    },
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    submit() {
      this.snackbar = true;
      this.resetForm();
    },
    getTerms() {
      let self = this;
      let getStore = [];
      db.firestore()
        .collection("terms")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            getStore.push(doc.data());
            console.log(getStore);
          });
          self.readTerms = getStore;
        })
        .catch(function(error) {
          console.error("Error getting documents: ", error);
        });
    }
  }
};
</script>