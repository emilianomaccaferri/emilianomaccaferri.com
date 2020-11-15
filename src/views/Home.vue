<template>
    <div class="flexbox justify-between align-top blockify" id="main" style="margin-top: 50px;">
                <div class="half unstickify responsive-center" style="position: sticky; top: 80px;">
                    <div class="over">
                        <div class="block"></div>
                        <div class="block"></div>
                        <div class="block"></div>
                        <div class="block"></div>
                    </div>
                    <img class="me" src="../assets/img/me.jpg" />
                </div>
                <div class="comeup later other padded">
                    <p>
                        I'm a 20y/o freelance fullstack web developer from Italy mainly focused on backend but constantly striving to get the best UIs when working with clients.<br><br>
                        When not working or wrapping my head around projects I often travel and/or buy unnecessarily expensive clothes.<br>
                        I occasionally <a href="https://youtube.com/c/MaccaBeats" target="_blank">make music</a>.<br>
                        <a href="mailto:inbox@emilianomaccaferri.com">Hit me up</a> if you need anything!
                    </p>
                    <div class="flexbox center-responsive wrap" style="margin-top: 50px;">
                        <a href="https://t.me/macca_ferri" target="_blank">
                            <fai :icon="['fab', 'telegram']" />
                        </a>
                        <a href="https://fb.me/emiliano.maccaferri" target="_blank">
                            <fai :icon="['fab', 'facebook']" />
                        </a>
                        <a href="https://github.com/emilianomaccaferri" target="_blank">
                            <fai :icon="['fab', 'github']" />
                        </a>
                        <a href="https://instagram.com/emilianomaccaferri" target="_blank">
                            <fai :icon="['fab', 'instagram']" />
                        </a>
                    </div>
                </div>
            </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import gsap, { Power2 } from 'gsap';
let timeline: GSAPTimeline;

export default defineComponent({

    name: 'home',
    mounted(){

        document.querySelectorAll('.spannerize')
            .forEach((element: Element) => {

                const replace = element.innerHTML.split(" ").map(string => `<span class="comeup ${element.classList.item(2)}">${string}</span>`).join(" ");                
                element.innerHTML = replace;

            })

        timeline = gsap.timeline();

        timeline.to('span.comeup:not(.later)', {
            stagger: .10,
            opacity: 1,
            transform: 'translateY(0)',
            ease: Power2.easeOut
        })
        .to('#main .block', {
            stagger: .05,
            duration: .75,
            transform: 'translateY(-100vh)',
            ease: Power2.easeInOut
        }).to('.comeup.later', {
            stagger: .10,
            opacity: 1,
            transform: 'translateY(0)',
            ease: Power2.easeOut
        }, 1.75)

        timeline.play();

    }
})

</script>
