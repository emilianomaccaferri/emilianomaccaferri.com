<template>
    <section class="full flexbox align-bottom">
        <ul id="navbar">
            <li @click="animate">home</li>
            <li>about</li>
            <li class="last">work</li>
        </ul>
    </section>
</template>
<script lang="ts">
import gsap, { Power2 } from 'gsap';
import { defineComponent } from 'vue'

export default defineComponent({
    inject: ['state'],
    emits: ['resizeNavbar'],
    methods: {
        animate(){
            switch((this as any).state){
                case 'first':

                    gsap.to('#navbar', {
                        duration: .5,
                        transform: 'scale(.5)',
                        transformOrigin: 'bottom left',
                        ease: Power2.easeInOut
                    })
                    this.$emit('resizeNavbar');

                break;
            }
        }
    }
})
</script>
