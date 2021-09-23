<template>
  <div id="content">
    <section class="whole flexbox align-center justify-center" id="main">
    <div id="home-navbar-mobile">
        <nav style="display: inline-block; float: right;">
          <a href="#" @mouseover="hover('home')"> home </a>
          <a href="#" @mouseover="hover('about')"> about </a>
          <a href="#" @mouseover="hover('portfolio')"> portfolio </a>
          <a href="#"> <b>cv</b> </a>
        </nav>
    </div>
    <div id="me" class="me flexbox align-center justify-center">
      <div class="nopseudo">
        emiliano maccaferri
      </div>
      <div id="home" class="flexbox">
        <div class="box home"></div>
        <div class="box home"></div>
        <div class="box home"></div>
        <div class="box home"></div>
      </div>
      <div id="about" class="flexbox" @click="animate('about')">
        <div class="box about"></div>
        <div class="box about"></div>
        <div class="box about"></div>
        <div class="box about"></div>
      </div>
      <div id="portfolio" class="flexbox">
        <div class="box portfolio"></div>
        <div class="box portfolio"></div>
        <div class="box portfolio"></div>
        <div class="box portfolio"></div>
      </div>
      <div id="home-navbar">
        <nav>
          <a href="#" @mouseover="hover('home')"> home </a>
          <a href="#" @mouseover="hover('about')"> about </a>
          <a href="#" @mouseover="hover('portfolio')"> portfolio </a>
          <a href="#"> <b>cv</b> </a>
        </nav>
      </div>
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
        portfolio_tl: {} as gsap.core.Timeline,
        blog_tl: {} as gsap.core.Timeline,
        current_active: {} as gsap.core.Timeline
      },
      current_name: 'home'
    }
  },
  mounted(){
    const home_tl = gsap.timeline({ paused: true });
    const about_tl = gsap.timeline({ paused: true });
    const portfolio_tl = gsap.timeline({ paused: true });
    
    this.generateTimeline(home_tl, '.home.box');
    this.generateTimeline(about_tl, '.about.box');
    this.generateTimeline(portfolio_tl, '.portfolio.box');

    home_tl.play();
    this.timelines.home_tl = home_tl;
    this.timelines.about_tl = about_tl;
    this.timelines.portfolio_tl = portfolio_tl;
    this.timelines.current_active = home_tl;
    
  },
  methods: {
    async animate(name: string){

      gsap.to('.nopseudo', { duration: .25, opacity: 0, pointerEvents: 'none', transform: 'translateX(-50px) rotate(270deg)', ease: Power2.easeInOut })
      await gsap.to('#home-navbar', { duration: .5, opacity: 0, pointerEvents: 'none', transform: 'translateY(-50px)', ease: Power2.easeInOut });
      this.$router.push(`/${name}`);

    },
    async hover(name: string){
      
      if(this.current_name === name) return;
      await this.timelines.current_active.reverse();
      switch(name){

        case 'home':
          document.getElementById('home')!.style.zIndex = "2";
          document.getElementById('about')!.style.zIndex = "1";
          document.getElementById('portfolio')!.style.zIndex = "1";
          this.timelines.home_tl.play();
          this.timelines.current_active = this.timelines.home_tl;
          this.current_name = 'home';
        break;

        case 'about':
          document.getElementById('home')!.style.zIndex = "1";
          document.getElementById('about')!.style.zIndex = "2";
          document.getElementById('portfolio')!.style.zIndex = "1";
          this.timelines.about_tl.play();
          this.timelines.current_active = this.timelines.about_tl;
          this.current_name = 'about';
        break;

        case 'portfolio':
          document.getElementById('home')!.style.zIndex = "1";
          document.getElementById('about')!.style.zIndex = "1";
          document.getElementById('portfolio')!.style.zIndex = "2";
          this.timelines.portfolio_tl.play();
          this.timelines.current_active = this.timelines.portfolio_tl;
          this.current_name = 'portfolio';
        break;

      }

    },
    generateTimeline(item: gsap.core.Timeline, selector: string){
      
      item.to(selector, {
        duration: .5,
        stagger: .1,
        opacity: 1,
        transform: 'translateY(0)',
        ease: Power2.easeInOut
      })

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
      z-index: 1;
      width: 100%;
      height: 100%;
      .home{
        @include perfect-bg('../assets/img/hello.jpg');
      }
    }
    #about{
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      .about{
        @include perfect-bg('../assets/img/about.jpg');
      }
    }
    #portfolio{
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      .portfolio{
        @include perfect-bg('../assets/img/portfolio.jpg');
      }
    }
  }
  
</style>