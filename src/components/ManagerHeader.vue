<template>
  <v-app-bar
      fixed
      app
      color="primary"
      dark
    >
        <v-toolbar-title class="font-weight-bold title" v-text="title" dark='true'/>
        <v-spacer></v-spacer>
        <v-btn class="mx-1" to="/" color="primary" dark>ホーム</v-btn>
        <v-btn class="mx-1" to="/studios/stud-cards" color="primary">スタジオ</v-btn>
        <v-btn class="mx-1" to="/blogs/index" color="primary">ブログ</v-btn>
        <v-btn class="mx-1" to="/community/index" color="primary">コミュニティ</v-btn>
        <manager-signout v-show="!show"></manager-signout>
    </v-app-bar>
</template>

<script>
import ManagerSignout from '@/components/ManagerChildren/ManagerSignout.vue'

export default {
  name: 'manager-header',
  components:{
  'manager-signout': ManagerSignout
  },
  data(){
    return{
      title:'みんなのピラティス',
      show:false
    }
  }
}
</script>
