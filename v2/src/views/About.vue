<template>
    <section>
        <section class="whole flexbox justify-center align-center">
            <div class="me">
                <div class="nopseudo"> about </div>
                <div class="fake-bg"></div>
            </div>
        </section>
        <div class="container">
            <p class="pre large">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lobortis, dolor vitae venenatis dapibus, lacus risus luctus ipsum, et sodales orci mauris ac lectus. Vivamus commodo massa elit, ut ultricies nulla scelerisque quis. Phasellus a mi nec mi efficitur vulputate sit amet sed tortor. Pellentesque eu eros non ex consectetur ultricies. Aenean dapibus lobortis orci in interdum. Duis pellentesque quis quam non dapibus. Nulla malesuada nunc sit amet sapien efficitur iaculis sed eget mauris. Maecenas tincidunt, dolor vitae auctor finibus, lacus nisi mattis ipsum, efficitur efficitur erat ipsum a arcu. Duis id nibh vitae nibh hendrerit euismod eget vitae ex. Curabitur condimentum eget odio eget molestie.
            </p>
        </div>
    </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import gsap, { Power2 } from 'gsap';

export default defineComponent({
    data(){
        return {
            timelines: {
                text_tl: {} as gsap.core.Timeline
            }
        }
    },
    mounted(){

        const text_tl = gsap.timeline({ paused: true });
        text_tl.to('p', {
            duration: .75,
            opacity: 1,
            transform: 'translateY(0)',
            ease: Power2.easeInOut
        })
        this.timelines.text_tl = text_tl;
        text_tl.play();

    }
})
</script>

<style lang="scss" scoped>

    @import '@/assets/scss/style.scss';

    .me{      
        @include perfect-bg-unfixed('../assets/img/about.jpg');
    }
    p{
        transform: translateY(150px);
        opacity: 0;
    }
</style>