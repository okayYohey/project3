<template>
  <v-container pa-0 mb-1 fluid>
    <v-parallax dark :src="imageURL" height="250">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="mt-12 display-1 font-weight-bold card-title">{{ h1 }}</h1>
        </v-col>
      </v-row>
    </v-parallax>
  </v-container>
</template>

<script>
export default {
  name: "com-topview",
  props: {
    imageURL: {
      default:
        "https://images.unsplash.com/photo-1570591310108-4f34c28ab007?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    },
    h1: {
      default: "みんなのピラティス"
    }
  }
};
</script>
