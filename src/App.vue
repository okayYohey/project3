<template>
  <v-app id="app">

    <v-switch class="switch ma-3 mt-12 pt-6" :label="`Dark Theme`" @change="$vuetify.theme.dark = !$vuetify.theme.dark"></v-switch>
    <transition>
        <router-view class="route"/>
    </transition>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      goDark:false
    }
  },
  methods:{
    darken(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
};
</script>

<style>
.v-enter-active, .v-leave-active {
  transition: opacity .8s;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
.switch{
  position: absolute;
  z-index: 2;
}
.route{
  position: absolute;
  width: 100%
}
</style>
