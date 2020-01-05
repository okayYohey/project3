<template>
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
                    Do you accept the
                    <a href="javascript:;" @click.stop="terms = true">terms</a>
                    and
                    <a
                      href="javascript:;"
                      @click.stop="conditions = true"
                    >conditions?</a>
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
          <v-card-text v-for="n in 5" :key="n">{{ contentTerm }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="purple" @click="terms = false">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="conditions" width="70%">
        <v-card>
          <v-card-title class="title">Conditions</v-card-title>
          <v-card-text v-for="n in 5" :key="n">{{ contentConditions }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="purple" @click="conditions = false">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      password: null,
      terms: false
    });
    return {
      form: Object.assign({}, defaultForm),
      contentTerm: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.`,
      contentConditions: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.`,
      conditions: false,
      terms: false,
      defaultForm
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
      this.$router.push("/manager/:manid");
    }
  },
  methods: {
    createUser() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(function(error) {
          this.loading = false;
          alert(error.message);
          let authEmail = firebase.auth().currentUser.email;
          this.$router.push({
            name: "auth-email-dashboard",
            params: { id: authEmail }
          });
        });
    },
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    submit() {
      this.snackbar = true;
      this.resetForm();
    }
  }
};
</script>