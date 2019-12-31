<template>
  <v-card
    class="mx-auto card"
  >
    <v-img
      class="white--text align-end img"
      height="200px" 
      :src="photoURL"
    >
      <v-card-title>{{ cardTitle }}</v-card-title>
    </v-img>
    <div class="group pt-4">
    <v-card-subtitle class="pb-0 location" v-show="location != null">{{ location }}</v-card-subtitle>
    <v-card-subtitle class="pb-0 tag" v-show="tag != null">{{ tag }}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{recommend}}</div>

    </v-card-text>

    <v-card-actions class="action">
      <v-container>
      <v-btn
        color="primary"
        class="ma-1"
        to="/details"
      >
        詳細を見てみる
      </v-btn>
      <v-btn class="ma-1" color="accent">初回1000円クーポンプレゼント！</v-btn>
      </v-container>
    </v-card-actions>
    
    </div>
  </v-card>
</template>

<script>
export default {
    name:'card',
    props:[
      'photoURL',
      'cardTitle',
      'location',
      'recommend',
      'tag',
    ],
}
</script>

<style scoped>
.card{
  max-width: 280px;
}
.location, .tag{
  display: inline;
}
@media only screen and ( min-width:768px ){
  .card{
    display: grid;
    grid-template-columns: 180px auto;
    grid-column-gap: 1em;
    min-width:730px;
  }
  .action{
    position: absolute;
    bottom: 10px;
  }
}
</style>