<template>
  <v-card class="card">
    <v-fade-transition>
      <v-form class="pa-4">
        <!-- <v-text-field color="accent" label="紹介文" type="text" v-model="postContent"></v-text-field> -->
        <v-textarea label="今日の気持ちを投稿しよう" v-model="postContent"></v-textarea>
      </v-form>
    </v-fade-transition>
    <div class="group pa-4 my-2 d-flex justify-end">
      <v-btn class="mx-4" @click="saveCard" color="primary">投稿する</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "community-createcard",
  data() {
    return {
      postContent: null
    };
  },
  methods: {
    saveCard() {
      this.$emit("pushedSave");
    }
  }
};
</script>

<style scoped>
</style>