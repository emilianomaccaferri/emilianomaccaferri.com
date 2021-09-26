<template>
    <section>
        <section class="flexbox justify-center align-center">
            <div class="me" id="h">
                <div class="nopseudo"> about </div>
            </div>
        </section>
        <div class="container">
            <p class="large">
                I'm a 21y/o freelance fullstack web developer from Italy mainly focused on backend but constantly striving to get the best UIs when working with clients.<br>
                When not working or wrapping my head around projects I often travel and/or buy unnecessarily expensive clothes.<br>
                I occasionally make music.<br>
                Hit me up if you need anything!<br>
            </p>
        </div>
    </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import gsap, { Power2 } from 'gsap';
import page from '@/mixins/page';

export default defineComponent({
    mixins: [page],
    async beforeRouteLeave(to, from, next){
        this.timelines.text_tl.reverse();
        await gsap.to('.nopseudo', { duration: .25, opacity: 0, pointerEvents: 'all', transform: 'translateX(-50px) rotate(270deg)', ease: Power2.easeInOut })
        await gsap.to('.me', { duration: .25, opacity: 0, transform: 'translateY(-100px)' })
        next();
    }
})
</script>

<style lang="scss" scoped>

    @import '@/assets/scss/style.scss';

    .me{     
        @include perfect-bg-unfixed('../assets/img/about.jpg');
        position: relative;
        margin-top: 80px;
        height: 45vh;
        .nopseudo{
            transform: translateX(-50px) rotate(270deg);
            opacity: 0;
        }
    }
    p{
        transform: translateY(150px);
        opacity: 0;
    }
</style>