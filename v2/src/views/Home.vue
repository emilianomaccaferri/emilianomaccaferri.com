<template>
  <div id="content">
    <div id="loading" class="flexbox align-center justify-center">
      <h1 class="flash"> loading... </h1>
    </div>
    <section class="whole flexbox align-center justify-center tagged" id="main">
    <div id="home-navbar-mobile">
        <nav style="display: inline-block; float: right;">
          <a href="#" @click="click('emilianomaccaferri')"> home </a>
          <a href="#" @click="click('about')"> about </a>
          <a href="https://static.emilianomaccaferri.com/cv.pdf"> <b>cv</b> </a>
        </nav>
    </div>
    <div id="me" class="me flexbox align-center justify-center">
      <div class="nopseudo">
        {{ current_name }}
      </div>
      <div id="home" class="emilianomaccaferri t"></div>
      <div id="about" class="about t" @click="animate('about')"></div>
      <div id="home-navbar">
        <nav>
          <a href="#" @click="click('emilianomaccaferri')"> home </a>
          <a href="#" @click="click('about')"> about </a>
          <a href="https://static.emilianomaccaferri.com/cv.pdf"> <b>cv</b> </a>
        </nav>
      </div>
    </div>
  </section>
  <section>
    <div class="container emilianomaccaferri t"></div>
    <div class="container about t">
      <p class="large">
        I'm a 21y/o freelance fullstack web developer from Italy mainly focused on backend but constantly striving to get the best UIs when working with clients.<br>
        When not working or wrapping my head around projects I often travel and/or buy unnecessarily expensive clothes.<br>
        I occasionally make music.<br>
        Hit me up if you need anything!<br>
        <a class="c" href="https://t.me/macca_ferri">telegram</a>&nbsp;
        <a class="c" href="https://github.com/emilianomaccaferri">github</a>&nbsp;
        <a class="c" href="https://fb.me/emiliano.maccaferri">facebook</a>&nbsp;
        <a class="c" href="https://instagram.com/emilianomaccaferri">instagram</a>&nbsp;
      </p>
    </div>
  </section>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import gsap, { Power2 } from 'gsap';
import CSSRulePlugin from "gsap/CSSRulePlugin";
gsap.registerPlugin(CSSRulePlugin);

export default defineComponent({
  data(){ 
    return {
      timelines: {
        home_tl: {} as gsap.core.Timeline,
        about_tl: {} as gsap.core.Timeline,

        current_active: {} as gsap.core.Timeline
      },
      current_name: 'emilianomaccaferri',
      animating: true,
      main_img: ''
    }
  },
  async mounted(){
    
    const img = await fetch('img/hello.jpg');
    const blob = await img.blob();
    const url = URL.createObjectURL(blob);
    const home = document.getElementById('home')!;
    this.main_img = url;
    home.style.background = ` url(${this.main_img}) no-repeat center center scroll`
    home.style.backgroundSize = 'cover';

    document.getElementById('loading')!.style.opacity = "0";
    document.getElementById('loading')!.style.pointerEvents = "none";

    const home_tl = gsap.timeline({ paused: true });
    const about_tl = gsap.timeline({ paused: true });
    
    this.generateTimeline(home_tl, '.emilianomaccaferri.t');
    this.generateTimeline(about_tl, '.about.t');

    home_tl.play();
    this.timelines.home_tl = home_tl;
    this.timelines.about_tl = about_tl;
    this.timelines.current_active = home_tl;
    this.animating = false;
    
  },
  methods: {

    async click(name: string){
      
      if(this.current_name === name || this.animating) return;

      if(window.innerWidth > 900) gsap.to('.nopseudo', { duration: .25, opacity: 0, pointerEvents: 'none', transform: 'translateX(-50px) rotate(270deg)', ease: Power2.easeInOut })
      await this.timelines.current_active.reverse();
      
      switch(name){

        case 'emilianomaccaferri':
          document.getElementById('home')!.style.zIndex = "2";
          document.getElementById('about')!.style.zIndex = "1";
          document.body.style.overflow = 'hidden';
          await this.timelines.home_tl.play();
          this.timelines.current_active = this.timelines.home_tl;
          this.current_name = 'emilianomaccaferri';
        break;

        case 'about':
          document.getElementById('home')!.style.zIndex = "1";
          document.getElementById('about')!.style.zIndex = "2";
          await this.timelines.about_tl.play();
          document.body.style.overflow = 'auto';
          this.timelines.current_active = this.timelines.about_tl;
          this.current_name = 'about';
        break;

      }

      await gsap.to('.nopseudo', { duration: .25, opacity: 1, pointerEvents: 'all', transform: 'translateX(0) rotate(270deg)', ease: Power2.easeInOut })

    },
    generateTimeline(item: gsap.core.Timeline, selector: string){
      
      item.to(selector, {
        duration: .5,
        opacity: 1,
        transform: 'translateY(0)',
        ease: Power2.easeInOut
      });
      item.to(`.container${selector}`, {
        duration: .5,
        opacity: 1,
        zIndex: 3,
        transform: 'translateY(0)',
        ease: Power2.easeInOut
      }, 0)

    }
  }
})
</script>
<style lang="scss" scoped>

  @import '@/assets/scss/style.scss';

  .me{
    .box{ opacity: 0; transform: translateY(100px); width: 25%; height: 100%; }
    #home{
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      opacity: 0;
      transform: translateY(50px);
      @include perfect-bg-unfixed('../assets/img/hello.jpg');
    }
    #about{
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      opacity: 0;
      transform: translateY(50px);
      @include perfect-bg-unfixed('../assets/img/about.jpg');
    }
  }
  
</style>