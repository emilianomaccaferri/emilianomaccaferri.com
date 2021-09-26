<template>
    <section>
        <section class="flexbox justify-center align-center">
            <div class="me page">
                <div class="nopseudo"> portfolio </div>
            </div>
        </section>
        <div class="container">
            <p class="large page">
                Some of my works
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
    } // https://github.com/vuejs/vue-router-next/issues/454 porca troia
})
</script>

<style lang="scss" scoped>

    @import '@/assets/scss/style.scss';

    .me.page{     
        @include perfect-bg-unfixed('../assets/img/portfolio.jpg');
    }
</style>