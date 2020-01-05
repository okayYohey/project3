<template>
  <div class="manager-card mx-auto my-4">
    <v-card class="card">
      <v-img
        class="white--text align-end img"
        height="200px"
        src="https://images.unsplash.com/photo-1550657636-67d6a3a05a5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      >
        <h2>新規作成</h2>
      </v-img>
      <v-btn v-show="!editingCard" class="my-4 ml-4" @click="editingCard = true">新規作成</v-btn>
      <v-btn v-show="editingCard" class="my-4 ml-4" @click="editingCard=false">閉じる</v-btn>

      <p class="d-inline">{{ ItemsFromCardList.informSaved }}</p>
      <v-fade-transition>
        <v-form v-show="editingCard" class="pa-4">
          <v-text-field
            color="accent"
            label="画像のURL"
            type="text"
            v-model="ItemsFromCardList.photoURL"
          ></v-text-field>
          <v-text-field
            color="accent"
            label="スタジオの名前"
            type="text"
            v-model="ItemsFromCardList.studioName"
          ></v-text-field>
          <!-- <v-text-field color="accent" label="ロケーション" type="text" v-model="ItemsFromCardList.location"></v-text-field> -->
          <v-text-field color="accent" label="住所" type="text" v-model="ItemsFromCardList.address"></v-text-field>
          <!-- <v-text-field color="accent" label="タグ" type="text" v-model="ItemsFromCardList.tag"></v-text-field> -->
          <v-text-field
            color="accent"
            label="紹介文"
            type="text"
            v-model="ItemsFromCardList.recommend"
          ></v-text-field>
          <v-text-field
            color="accent"
            label="ボタンの名前"
            type="text"
            v-model="ItemsFromCardList.btnNormal"
          ></v-text-field>
          <v-text-field
            color="accent"
            label="ボタンのリンク先のURL"
            type="text"
            v-model="ItemsFromCardList.btnNormalURL"
          ></v-text-field>
          <v-text-field
            color="accent"
            label="有料会員限定ボタン"
            v-show="premier"
            v-model="ItemsFromCardList.btnSpecial"
          ></v-text-field>
          <v-text-field
            color="accent"
            label="ボタンのリンク先のURL"
            v-show="premier"
            type="text"
            v-model="ItemsFromCardList.SpecialURL"
          ></v-text-field>
          <v-switch label="公開" v-model="ItemsFromCardList.published"></v-switch>
          <!-- <v-switch label="削除する" v-model="ItemsFromCardList.trash"></v-switch> -->
        </v-form>
      </v-fade-transition>
      <div v-if="editingCard" class="group pa-4 my-2 d-flex justify-end">
        <v-btn class="mx-4" @click="editingCard=false">閉じる</v-btn>
        <v-btn class="mx-4" @click="saveCard" color="primary">保存する</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "manager-createcard",
  props: ["ItemsFromCardList"],
  data() {
    return {
      editingCard: false,
      premier: false
    };
  },
  methods: {
    saveCard() {
      console.log("submit to parent");
      this.$emit("pushedSaveFirst");
      this.editingCard = false;
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 400px;
}
@media only screen and (min-width: 768px) {
  .card {
    min-width: 730px;
  }
}
.card {
  max-width: 350px;
}
</style>