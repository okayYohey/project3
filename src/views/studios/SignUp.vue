<template>
<v-container>
<v-card class="form-signup" min-height="300px">
  <form-wizard
    @on-complete='createUser'
    shape="tab"
    color="#66bb6a"
    title="会員登録"
    subtitle="メールアドレスとパスワードを入力します"
    finishButtonText="完了！"
  >
  
  <tab-content title="パスワードの登録" >
    <v-container justify-center>
        <v-col class="col-6 mx-auto">
            <v-row class="mx-auto">
                <v-text-field v-model="email" label="メールアドレス" color="success" loading></v-text-field>
            </v-row>
            <v-row class="mx-auto">
                <v-text-field v-model="name" label="ユーザーネーム" color="success" loading></v-text-field>
            </v-row>
            <v-row class="mx-auto">
                <v-text-field password v-model="password" label="パスワード" color="success" loading></v-text-field>
            </v-row>
        </v-col>
    </v-container>
   </tab-content>
  </form-wizard>
</v-card>
</v-container>
</template>

<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

import firebase from '@/firebase/firebaseAuth.js'

export default {
    name:'stud-signup',
    components:{
        'form-wizard': FormWizard,
        'tab-content': TabContent
    },
    data(){
      return{
        email:null,
        password: null,
        name:null,
        loading:true
      }
    },
    methods:{
        createUser(){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
              this.loading = false
              alert(error.message);
              let authEmail = firebase.auth().currentUser.email
              this.$router.push({ name: 'auth-email-dashboard', params: { id: authEmail } })
            });
        }
    }
}
</script>