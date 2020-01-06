<template>
  <div class="manager-card mx-auto">
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
            <v-btn>
              <v-icon class="mr-1">mdi-heart</v-icon>
              <span class="subheading mr-2">{{ ItemsFromPosts.likes }}</span>
            </v-btn>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
</template>


<script>
export default {
  name: "stud-card",
  props: ["ItemsFromPosts"],
  created() {},
  data() {
    return {
      informSaved: "",
      saved: true,
      editingCard: false,
      published: false,
      show: false,
      premier: false,
      hover: true,
      wrapper: true,
      value: true
    };
  },
  methods: {
    toProfile() {
      this.$router.push("/manager/:profile");
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 280px;
}
.card-title {
  background-color: rgba(216, 27, 96, 0.3);
  display: block;
  width: 100%;
}
.icon {
  border-radius: 20px;
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