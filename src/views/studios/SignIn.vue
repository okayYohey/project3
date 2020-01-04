<template>
  <v-container>
    <v-card class="form-signup" min-height="300px">
      <v-container justify-center>
        <v-col class="col-6 mx-auto">
          <v-row class="mx-auto">
            <v-text-field v-model="form.email" label="メールアドレス" color="primary" loading type="name"></v-text-field>
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
</template>

<script>
import firebase from "@/firebase/firebaseAuth.js";

export default {
  name: "stud-signin",
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