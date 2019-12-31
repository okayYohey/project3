
<template>
  <div class="posted-card-id">
      this is variable page depending on manager id like
      {{ $route.params.authEmail }}
      <manager-profile></manager-profile>
      <manager-cards></manager-cards>
  </div>
</template>

<script>
import ManagerCards from '@/components/ManagerCards.vue'
import ManagerProfile from '../../components/ManagerProfile.vue'
export default {
  name:'manager-dashboard',
  components:{
    'manager-cards': ManagerCards,
    'manager-profile': ManagerProfile
  },
  data(){
    return{
    }
  }
}
</script>

<style>

</style>