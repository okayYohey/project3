<template>
  <div class="manager-card mx-auto ">


    <v-btn color="secondary" class="my-2 mr-2" v-show="!editingCard" @click="editingCard = true">編集する</v-btn>
    <v-btn color="accent" class="my-2 mr-2" v-show="editingCard" @click="editingCard = false; saveCard();">保存する</v-btn>
    <v-btn class="my-2  mr-2" v-show="!editingCard && ItemsFromCardList.published" @click="ItemsFromCardList.published = false; saveCard();">非公開</v-btn>
    <v-btn class="my-2  mr-2" v-show="!editingCard && !ItemsFromCardList.published" @click="ItemsFromCardList.published = true; saveCard();">公開</v-btn>
    <v-btn class="my-2  mr-2" v-show="!editingCard" @click="ItemsFromCardList.trash=true; saveCard()">削除する</v-btn>
    <p class="my-auto">{{ informSaved }}</p>
    <v-card
      class="card"
    >
      <div class="ribbon17-content">
      <span v-if="ItemsFromCardList.published" class="ribbon17">公開中</span>
      <span v-if="!ItemsFromCardList.published" class="ribbon17 unpublished">非公開</span>
      </div>
      <v-img
        class="white--text align-end img"
        height="200px" 
        :src="ItemsFromCardList.photoURL"
      >
        <v-card-title v-show="!editingCard">{{ ItemsFromCardList.studioName }}</v-card-title>
      </v-img>
      <div class="group pt-4">
        <v-card-subtitle class="py-0 location" v-show="!editingCard">{{ ItemsFromCardList.location }}</v-card-subtitle>
        <v-card-subtitle class="py-0 tag" v-show="!editingCard && ItemsFromCardList.tag!=null">{{ ItemsFromCardList.tag }}</v-card-subtitle>

        <v-card-text class="text--primary">
          <p v-show="!editingCard">{{ItemsFromCardList.recommend}}</p>

        </v-card-text>
        <v-fade-transition>
          <v-form v-show="editingCard" class="px-3">
              <v-text-field color="accent" label="画像のURL" type="text" v-model="ItemsFromCardList.photoURL"></v-text-field>
              <v-text-field color="accent" label="スタジオの名前" type="text" v-model="ItemsFromCardList.studioName"></v-text-field>
              <v-text-field color="accent" label="ロケーション" type="text" v-model="ItemsFromCardList.location"></v-text-field>
              <v-text-field color="accent" label="住所" type="text" v-model="ItemsFromCardList.address"></v-text-field>
              <v-text-field color="accent" label="タグ" type="text" v-model="ItemsFromCardList.tag"></v-text-field>
              <v-text-field color="accent" label="紹介文" type="text" v-model="ItemsFromCardList.recommend"></v-text-field>
              <v-text-field color="accent" label="ボタンの名前" type="text" v-model="ItemsFromCardList.btnNormal"></v-text-field>
              <v-text-field color="accent" label="ボタンURL" v-model="ItemsFromCardList.btnNormalURL"></v-text-field>
              <v-text-field color="accent" label="有料会員限定ボタン" v-show="premier" v-model="ItemsFromCardList.btnSpecial"></v-text-field>
              <v-text-field color="accent" label="ボタンのリンク先のURL" v-show="premier" type="text" v-model="ItemsFromCardList.SpecialURL"></v-text-field>
              <v-switch v-if="!show" label="公開" v-model="ItemsFromCardList.published"></v-switch>
          </v-form>
        </v-fade-transition>
        <v-card-actions class="action">
          <v-container class="pa-0">
          <v-btn
            color="primary"
            class="mx-1  my-1"
            :href="ItemsFromCardList.btnNormalURL"
            target="_blank"
            v-show="!editingCard && ItemsFromCardList.btnNormal!=''"
          >
            {{ ItemsFromCardList.btnNormal }}
          </v-btn>
          <v-btn class="mx-1  mt-1"
           color="accent"
           v-show="!editingCard && ItemsFromCardList.btnSpecial!=null">{{ ItemsFromCardList.btnSpecial}}</v-btn>
          <v-spacer></v-spacer>
          </v-container>
        </v-card-actions>
      
      </div>
    </v-card>
    
    <v-btn color="accent" class="my-2 mr-2 justify-end" v-show="editingCard" @click="saveCard();">保存する</v-btn>
  </div>
</template>

<script>
export default {
    name:'manager-profile-card',
    props:[
    'ItemsFromCardList'
    ],
    created(){
        this.isPublished = '#88f'
    },
    data(){
      return{
        informSaved:'',
        saved:true,
        editingCard:false,
        published:false,
        show:false,
        premier:false,
        isPublished: 'secondary'
      }
    },
    methods:{
      saveCard(){
        console.log('submit to parent');
        this.$emit('pushedSave');
        this.editingCard = false; 
      },
      removeTrash(){
        console.log('subnit to parent');
        this.$emit('pushedRemoveTrash')
      },
    }
}
</script>

<style scoped>
.card{
  max-width: 350px;
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
  .group{
    display: grid;
  }
}


.ribbon17-content {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 89px;
  height: 91px;
  overflow: hidden;
  }

.ribbon17 {
  display: inline-block;
  position: absolute;
  padding: 7px 0;
  left: -23px;
  top: 22px;
  width: 160px;
  text-align: center;
  font-size: 18px;
  line-height: 16px;
  background: #ffa520;
  color: #fff;
  letter-spacing: 0.05em;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.unpublished{
  background:#333
}
.ribbon17:before, .ribbon17:after {
  position: absolute;
  content: "";
  border-top: 4px solid #b2751b;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  bottom: -4px;
}

.ribbon17:before {
  left: 14px;
}

.ribbon17:after {
  right: 18px;
}

</style>
