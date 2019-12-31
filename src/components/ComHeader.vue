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
    </v-app-bar>
</template>

<script>
export default {
  name: 'com-header',
  data(){
    return{
      title:'みんなのピラティス',
    }
  },
}
</script>
