<template>
    <div>
    <div id="menu">
        <section class="full-height">
            <div class="container">
                <h1 class="title"> Navigation </h1>
                <ul>
                    <li> 
                        <a href="https://static.emilianomaccaferri.com/cv.pdf"> Résumé </a>
                    </li>
                     <li> 
                        Nothing more haha 
                    </li>
                </ul>
            </div>
        </section>
    </div>
    <div id="navbar" class="flexbox justify-between align-center">
        <div> 
            <h1 class="title"> 
                <span class="comeup">Emiliano </span> <span class="comeup"> Maccaferri</span>
            </h1>
            <h2 class="spannerize not-later subtitle">Yet another fullstack web developer</h2>
        </div>
        <div id="menu-icon" class="flexbox align-center justify-center column" @click="toggleMenu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue'
    import gsap, { Power2 } from 'gsap';

    let timeline: GSAPTimeline;

    export default defineComponent({
        name: 'navbar',
        mounted(){

            timeline = gsap.timeline()

            timeline.to('#menu', {
                duration: 1,
                left: 0,
                ease: Power2.easeInOut
            })
            timeline.reversed(true);

        },
        methods: {
            toggleMenu(){
                document.querySelectorAll('#menu-icon .bar')
                    .forEach((element: Element) => {
                        element.classList.toggle('clicked')
                    })

                if(timeline.reversed()) timeline.play();
                else timeline.reverse();
                document.body.classList.toggle('stopped');

            }
        }
    })
</script>