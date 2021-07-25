<template>
  <div style="display: flex;">
    <Navbar />
    <router-view/>
  </div>
</template>
<script lang="ts">
import gsap from 'gsap';
import Navbar from '@/components/Navbar.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: { Navbar },
  setup(props, context){
    
    const state = ref('first');

    return { state }

  },
  provide(){
    return {
      state: this.state
    }
  }
})
</script>

<style lang="scss">
  @import '@/assets/scss/style.scss';
</style>
