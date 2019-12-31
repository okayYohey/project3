<template>
  <v-footer
  height="200"
  class='justify-center'
  >
  <v-container>
        <v-row>
            <h2>スタジオの方はこちら</h2>
        </v-row>
        <v-row class="mt-12 justify-center">
                <v-btn to="/studios/signup" class="mx-12" color="success" dark>
                    会員登録
                </v-btn>
                <v-btn to="/studios/signin" class="mx-12"  color="accent" dark>
                    ログイン
                </v-btn>
                <v-btn to="/manager/:manid" class="mx-12"  color="secondary" dark>
                    管理画面
                </v-btn>
        </v-row>
    </v-container>
  <span>&copy; 2019 YNU みんなのピラティス All Rights Reserved</span>
  </v-footer>
</template>

<script>
export default {
  name: 'com-header',
  props:{
    
  }
};
</script>
