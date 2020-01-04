<template>
  <v-card class="mx-auto" color="white" max-width="800" max-height="200">
    <v-card-title class="pt-2">
      <v-icon left>mdi-twitter</v-icon>
      <span class="font-weight-light">{{ platform }}</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold py-2">{{ postContent }}</v-card-text>

    <v-card-actions class="py-0">
      <v-list-item>
        <v-list-item-avatar>
          <v-img class="elevation-6" :src="iconImg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ postUser }}</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <v-btn>
            <v-icon class="mr-1">mdi-heart</v-icon>
            <span class="subheading mr-2">{{ likes }}</span>
          </v-btn>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "card-posted",
  props: ["postUser", "platform", "postContent", "likes", "iconImg"]
};
</script>