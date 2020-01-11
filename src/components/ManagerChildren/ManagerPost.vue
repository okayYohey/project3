<template>
  <div class="manager-card mx-auto">
    <!-- <v-btn
      color="secondary"
      class="my-2 mr-2"
      v-show="!editingCard"
      @click="editingCard = true"
    >編集する</v-btn>
    <v-btn
      color="accent"
      class="my-2 mr-2"
      v-show="editingCard"
      @click="editingCard = false; saveCard();"
    >保存する</v-btn>
    <v-btn
      class="my-2 mr-2"
      v-show="!editingCard && ItemsFromCardList.published"
      @click="ItemsFromCardList.published = false; saveCard();"
    >非公開</v-btn>
    <v-btn
      class="my-2 mr-2"
      v-show="!editingCard && !ItemsFromCardList.published"
      @click="ItemsFromCardList.published = true; saveCard();"
    >公開</v-btn>
    <v-btn
      class="my-2 mr-2"
      v-show="!editingCard"
      @click="ItemsFromCardList.trash=true; saveCard()"
    >削除する</v-btn>
    <p class="my-auto">{{ informSaved }}</p>
    <v-form v-show="editingCard" class="px-3">
      <v-text-field color="accent" label="画像のURL" type="text" v-model="ItemsFromCardList.photoURL"></v-text-field>
      <v-text-field
        color="accent"
        label="スタジオの名前"
        type="text"
        v-model="ItemsFromCardList.studioName"
      ></v-text-field>
    </v-form>
    <v-card class="mx-auto" color="white" max-width="800" max-height="300">
      <v-card-title class="pt-2">
        <v-icon left>mdi-star</v-icon>
        <span class="font-weight-light">{{ ItemsFromPosts.address }}</span>
      </v-card-title>

      <v-card-text class="headline font-weight-bold py-2">{{ ItemsFromPosts.postContent }}</v-card-text>

      <v-card-actions class="pt-1 pb-2">
        <v-list-item>
          <v-hover v-slot:default="{ hover }" close-delay="200">
            <v-card class="icon" :elevation="hover ? 16 : 2" width="40" height="40">
              <v-img class="icon" width="40" height="40" :src="ItemsFromPosts.profileImg"></v-img>
            </v-card>
          </v-hover>
          <v-list-item-content>
            <v-list-item-title>{{ ItemsFromPosts.studioName }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>{{ ItemsFromPosts.date }}</v-list-item-title>
          </v-list-item-content>
          <v-row align="center" justify="end">
            <v-btn color="primary" :text="!isPushed" @click="isPushed= !isPushed">
              <v-icon class="mr-1">mdi-heart</v-icon>
              <span class="subheading mr-2">{{ ItemsFromPosts.likes }}</span>
            </v-btn>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>-->
  </div>
</template>

<script>
export default {
  name: "manager-profile-card",
  props: ["ItemsFromCardList", "ItemsFromPosts"],
  created() {
    this.isPublished = "#88f";
  },
  data() {
    return {
      informSaved: "",
      saved: true,
      editingCard: false,
      published: false,
      show: false,
      premier: false,
      isPublished: "secondary"
    };
  },
  methods: {
    saveCard() {
      console.log("submit to parent");
      this.$emit("pushedSave");
      this.editingCard = false;
    },
    removeTrash() {
      console.log("subnit to parent");
      this.$emit("pushedRemoveTrash");
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 350px;
}
.card-title {
  background-color: rgba(216, 27, 96, 0.5);
  display: block;
  width: 100%;
}
@media only screen and (min-width: 768px) {
  .card {
    display: grid;
    grid-template-columns: 180px auto;
    grid-column-gap: 1em;
    min-width: 730px;
  }
  .group {
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
  z-index: 4;
}
.unpublished {
  background: #333;
}
.ribbon17:before,
.ribbon17:after {
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
