<template>
  <div class="home">
    <com-header></com-header>
    <com-topview></com-topview>
    <v-container>
      <v-col>
        <v-row>
          <img alt="Vue logo" src="../assets/logo.png">
        </v-row>
        <v-row>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati fugit exercitationem repellat beatae maxime dolores officiis neque, quam laborum aliquid pariatur? Autem cupiditate laudantium eveniet magnam molestiae reiciendis! Mollitia, quia.
          </p>
        </v-row>
      </v-col>
      
    </v-container>
    <v-footer>
      <com-footer></com-footer>
    </v-footer>
  </div>
</template>

<script>
import ComHeader from '@/components/ComHeader.vue'
import ComTopView from '@/components/ComTopView.vue'
import ComFooter from '@/components/ComFooter.vue'

export default {
  name: 'home',
  components: {
    'com-header':ComHeader,
    'com-footer':ComFooter,
    'com-topview':ComTopView
  }
}
</script>
