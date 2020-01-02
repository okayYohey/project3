<template>
  <v-app-bar
      fixed
      app
      color="primary"
      dark 
    >
        <v-toolbar-title class="font-weight-bold title" color="primary" v-text="title"/>
        <v-spacer></v-spacer>
        <v-btn class="mx-1" to="/" color="primary" dark>ホーム</v-btn>
        <v-btn class="mx-1" to="/studios/stud-cards" color="primary" dark>スタジオ</v-btn>
        <v-btn class="mx-1" to="/blogs/index" color="primary">ブログ</v-btn>
        <v-btn class="mx-1" to="/community/index" color="primary">コミュニティ</v-btn>
        <v-btn class="mx-1" v-show="isLoggedIn" to="/manager/:manid">管理画面</v-btn>
    </v-app-bar>
</template>

<script>
import firebase from '@/firebase/firebaseAuth.js'

export default {
  name: 'com-header',
  created(){
    if(firebase.auth().currentUser){
      this.isLoggedIn = true
    }
  },
  data(){
    return{
      title:'みんなのピラティス',
      isLoggedIn:false
    }
  },
}
</script>
