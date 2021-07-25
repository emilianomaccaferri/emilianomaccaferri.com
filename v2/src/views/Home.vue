<template>
  <section class="full" style="width: 0;" @resize-navbar="theThing">
    
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  setup(props, context){

    const age = Math.trunc(((Date.now() - new Date("03-20-2000").setHours(23, 0)) / 1000) / 31536000);

    return { age }

  },
  provide(){
    return {
      age: this.age
    }
  },
  methods: {
    theThing(){
      alert("aiuuu")
    }
  }
});
</script>
