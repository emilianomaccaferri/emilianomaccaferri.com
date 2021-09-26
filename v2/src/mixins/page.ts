import { defineComponent } from "vue";
import gsap, { Power2 } from 'gsap';

export default defineComponent({
    
    data(){
        return {
            timelines: {
                text_tl: {} as gsap.core.Timeline
            } as { [key: string]: gsap.core.Timeline }
        }
    },
    mounted(){
        gsap.to('.nopseudo', { duration: .25, opacity: 1, pointerEvents: 'all', transform: 'translateX(0) rotate(270deg)', ease: Power2.easeInOut })
        const text_tl = gsap.timeline({ paused: true });
        text_tl.to('p', {
            duration: .75,
            opacity: 1,
            transform: 'translateY(0)',
            ease: Power2.easeInOut
        })
        this.timelines.text_tl = text_tl;
        text_tl.play();

    },
    beforeRouteLeave(to, from, next){
        console.log("leaving...");
    }
    
})