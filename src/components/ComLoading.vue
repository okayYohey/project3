<template>
  <div class="d-flex flex-wrap flex-column">
    <img :src="loadingGif" />
    <p v-text="text"></p>
  </div>
</template>

<script>
export default {
  name: "com-loading",
  props: {
    text: {
      default: "ロード中...",
      type: String
    },
    loading: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      loadingGif: "https://i.gifer.com/VZvx.gif"
    };
  }
};
</script>

<style>
</style>