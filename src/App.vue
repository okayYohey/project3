<template>
  <v-app id="app">
    <com-loading v-if="showLoading" class="loading"></com-loading>
    <v-switch
      class="switch ma-3 mt-12 pt-6"
      :label="`Dark Theme`"
      @change="$vuetify.theme.dark = !$vuetify.theme.dark"
    ></v-switch>
    <transition>
      <router-view class="route" />
    </transition>
    <com-bottom></com-bottom>
  </v-app>
</template>

<script>
import ComLoading from "@/components/ComLoading.vue";
import ComBottom from "@/components/ComBottom.vue";
import routes from "@/router/index.js";
import Vue from "vue";
import VueMeta from "vue-meta";

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
});
export default {
  name: "App",
  components: {
    "com-loading": ComLoading,
    "com-bottom": ComBottom
  },
  mounted() {
    setTimeout(() => {
      this.showLoading = false;
    }, 800);
  },
  props: {
    routes
  },
  data() {
    return {
      initialized: false,
      goDark: false,
      showLoading: true,
      breadcrumbList: []
    };
  },
  watch: {},
  methods: {
    darken() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },
  metaInfo() {
    return {
      title: "ピラティススタジオの比較から最新情報まで！",
      titleTemplate: "%s | みんなのピラティス",
      htmlAttrs: {
        lang: "ja",
        amp: true
      }
    };
  }
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.switch {
  position: absolute;

  z-index: 2;
}
.route {
  position: absolute;
  width: 100%;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 2;
}
</style>
