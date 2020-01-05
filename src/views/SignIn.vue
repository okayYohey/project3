<template>
  <div class="studios-page">
    <com-header></com-header>
    <com-topview h1="ログイン"></com-topview>

    <v-container>
      <v-card class="form-signup" min-height="300px">
        <v-container justify-center>
          <v-col class="col-6 mx-auto">
            <v-row class="mx-auto">
              <v-text-field
                v-model="form.email"
                label="メールアドレス"
                color="primary"
                loading
                type="name"
              ></v-text-field>
            </v-row>
            <v-row class="mx-auto">
              <v-text-field
                :rules="[rules.required, rules.min]"
                v-model="form.password"
                label="パスワード"
                color="primary"
                loading
                type="password"
              ></v-text-field>
            </v-row>
          </v-col>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!formIsValid"
            color="primary"
            type="submit"
            @click="signIn"
            class="mx-4"
          >ログイン</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-footer>
      <com-footer></com-footer>
    </v-footer>
  </div>
</template>

<script>
import firebase from "@/firebase/firebaseAuth.js";
import ComHeader from "@/components/ComHeader.vue";
import ComFooter from "@/components/ComFooter.vue";
import ComTopView from "@/components/ComTopView.vue";

export default {
  name: "signin",
  components: {
    "com-header": ComHeader,
    "com-footer": ComFooter,
    "com-topview": ComTopView
  },
  data() {
    const defaultForm = Object.freeze({
      email: null,
      password: null
    });
    return {
      form: Object.assign({}, defaultForm),
      terms: false,
      defaultForm,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "6文字以上です",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  computed: {
    formIsValid() {
      return this.form.email && this.form.password;
    }
  },
  created() {
    var user = firebase.auth().currentUser;
    if (user) {
      this.$router.push("/manager/:manid");
    }
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(
          function() {
            //eslint-disable-line
            let authEmail = firebase.auth().currentUser.email;
            this.$router.push({
              name: "auth-email-dashboard",
              params: { id: authEmail }
            });
          },
          function(err) {
            alert(err.message);
          }
          // たぶんwizardのでクリックイベントがとられてて上手くいってない
          // this.finised.preventDefault()
        );
    }
  }
};
</script>