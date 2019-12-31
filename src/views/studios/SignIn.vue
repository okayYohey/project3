<template>
<v-container>
<v-card class="form-signup" min-height="300px">
  <form-wizard
    @on-complete="signIn"
    shape="tab"
    color="#00bcd4"
    title="ログイン"
    subtitle="メールアドレスとパスワードを入力します"
    finishButtonText="完了！"
  >
  <tab-content title="メールアドレスとパスワードでログイン" >
    <v-container justify-center>
        <v-col class="col-6 mx-auto">
            <v-row class="mx-auto">
                <v-text-field v-model="email" label="メールアドレス" color='#00bcd4' loading></v-text-field>
            </v-row>
            <v-row class="mx-auto">
                <v-text-field v-model="password" label="パスワード" color='#00bcd4' loading></v-text-field>
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
    name:'stud-signin',
    components:{
        'form-wizard': FormWizard,
        'tab-content': TabContent
    },
    data(){
        return{
            email:null,
            password:null
        }
    },
    methods:{
      signIn() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {//eslint-disable-line
          let authEmail = firebase.auth().currentUser.email
          this.$router.push({ name: 'auth-email-dashboard', params: { id: authEmail } })
        },
        err =>{
          alert(err.message)
        },
        // たぶんwizardのでクリックイベントがとられてて上手くいってない
        // this.finised.preventDefault()
        )
      }
    }
}
</script>