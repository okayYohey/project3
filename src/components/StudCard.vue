<template>
  <div class="manager-card mx-auto">
    <p class="my-auto">{{ informSaved }}</p>
    <v-badge color="purple" overlap>
      <v-card class="card">
        <!-- <div class="ribbon17-content">
      <span v-show="isNew" class="ribbon17">New</span>
      <span v-show="sponsor" class="ribbon17 sponsor">編集者のおすすめ</span>
      <span v-show="popular" class="ribbon17 popular">みんなのおすすめ</span>
        </div>-->
        <v-img class="white--text align-end img" height="200px" :src="ItemsFromCardList.photoURL">
          <v-card-title class="card-title" v-show="!editingCard">{{ ItemsFromCardList.studioName }}</v-card-title>
        </v-img>
        <div class="group pt-4">
          <v-card-subtitle
            class="py-0 location"
            v-show="!editingCard"
          >{{ ItemsFromCardList.address }}</v-card-subtitle>
          <!-- <v-card-subtitle class="py-0 tag" v-show="!editingCard && ItemsFromCardList.tag!=null">{{ ItemsFromCardList.tag }}</v-card-subtitle> -->

          <v-card-text class="text--primary">
            <p v-show="!editingCard">{{ItemsFromCardList.recommend}}</p>
          </v-card-text>
          <v-card-actions class="action">
            <v-container class="pa-0">
              <v-btn
                color="primary"
                class="mx-1 my-1"
                :href="ItemsFromCardList.btnNormalURL"
                target="_blank"
                v-show="!editingCard && ItemsFromCardList.btnNormal!=''"
              >{{ ItemsFromCardList.btnNormal }}</v-btn>
              <v-btn
                class="mx-1 mt-1"
                color="accent"
                v-show="!editingCard && ItemsFromCardList.btnSpecial!=null"
              >{{ ItemsFromCardList.btnSpecial}}</v-btn>
              <v-spacer></v-spacer>
            </v-container>
          </v-card-actions>
        </div>
      </v-card>
    </v-badge>
  </div>
</template>


<script>
export default {
  name: "stud-card",
  props: ["ItemsFromCardList"],
  created() {},
  data() {
    return {
      informSaved: "",
      saved: true,
      editingCard: false,
      published: false,
      show: false,
      premier: false
    };
  }
};
</script>

<style scoped>
.card {
  max-width: 280px;
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
  .action {
    position: absolute;
    bottom: 10px;
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