<template>
  <section id="main" class="flexbox justify-center align-center">
<!-- <svg viewBox="91.08 42.869 324.587 377.849" width="324.587" height="377.849">
  <path d="M 114.045 141.241 Q 114.045 130.225 125.813 141.241 L 396.484 394.602 Q 408.252 405.618 396.484 405.618 L 125.813 405.618 Q 114.045 405.618 114.045 394.602 Z" data-bx-shape="triangle 114.045 130.225 294.207 275.393 0 0.04 1@181eb554" transform="matrix(0.99822, 0.059636, 0.136271, 1.009924, -41.258934, -12.921089)"></path>
  <path d="M 426.438 79.354 Q 456.783 51.341 457.593 79.354 L 462.064 233.949 Q 462.874 261.962 431.718 261.962 L 259.775 261.962 Q 228.619 261.962 258.965 233.949 Z" style="stroke: white" data-bx-shape="triangle 228.619 51.341 234.255 210.621 0.974 0.133 1@880172e5" transform="matrix(0.820575, 0.571539, 0, 1.218658, -66.876572, -176.218323)"></path>
</svg> -->
    <svg viewBox="91.586 24.401 320.116 396.08" width="320.116" height="396.08">
      <path d="M 114.045 148.676 Q 114.045 130.225 133.757 148.676 L 388.54 387.167 Q 408.252 405.618 388.54 405.618 L 133.757 405.618 Q 114.045 405.618 114.045 387.167 Z" style="fill: #5352ed; stroke: #5352ed;"  data-bx-shape="triangle 114.045 130.225 294.207 275.393 0 0.067 1@33ec4b99" transform="matrix(0.99822, 0.059636, 0.136271, 1.009924, -41.258934, -12.921089)"></path>
      <path d="M 448.113 59.345 Q 456.783 51.341 457.015 59.345 L 462.643 253.958 Q 462.874 261.962 453.972 261.962 L 237.521 261.962 Q 228.619 261.962 237.289 253.958 Z" style="fill: #3742fa; stroke: #3742fa;" data-bx-shape="triangle 228.619 51.341 234.255 210.621 0.974 0.038 1@bbd911d4"  transform="matrix(0.820575, 0.571539, 0, 1.218658, -66.876572, -176.218323)"></path>
    </svg>
    <div>
      <h1 id="m">
        Emiliano Maccaferri
      </h1>
      <h3> a comprehensive introduction </h3>
    </div>
  </section>
  <section>
    <div class="inner flexbox align-center justify-between wrap">
      <div>
        <h1>
          i am
        </h1>
        <p>
          Emiliano Maccaferri ipsum dolor sit amet, consectetur adipiscing elit. <br>
          Quisque rhoncus velit et volutpat suscipit. <br>
          Suspendisse est lacus, euismod ut posuere in, maximus non nibh. Phasellus facilisis ultrices lorem eu pretium. Sed id orci feugiat, dignissim erat a, posuere urna. Vestibulum euismod porta ligula at luctus. Etiam enim ipsum, fermentum sit amet mollis varius, fringilla eget magna.<br>
        </p>
      </div>
      <div class="hello-1200" style="flex: 1; margin-left: 50px; height: 80vh; border-radius: 70px;">
        <img src="assets/me.jpg" style="object-fit: contain;" />
      </div>
    </div>
    <div 
      class="shape flexbox justify-center align-center gone-1200"
      style="height: 250px; width: 40%; right: -32%; background: blue; top: 20%; border-radius: 5px;"
    >
    <span style="display: block; position: absolute; left: -70px; transform: rotate(270deg); transform-origin: center; color: #fefefe; font-size: 1em; font-family: 'DM Sans';">
      click to see a pic of me
    </span>
  </div>
  </section>
  <section>
    <div class="inner flexbox justify-between align-center wrap">
      <div>
        <h1>
          i enjoy
        </h1>
        <p>
          making web apps, using Linux and creating useful tools ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus velit et volutpat suscipit. Suspendisse est lacus, euismod ut posuere in, maximus non nibh. Phasellus facilisis ultrices lorem eu pretium. Sed id orci feugiat, dignissim erat a, posuere urna. Vestibulum euismod porta ligula at luctus.       
        </p>
      </div>
      <div style="flex: 1; margin-left: 50px; max-width: 500px; height: 500px; background: blue;"></div>
    </div>
  </section>
  <section class="blue flexbox align-center justify-center">
      <div>
        <h1> hit me up! </h1>
        <div class="flexbox justify-center">
          <span class="tag">telegram</span>
          <span class="tag">instagram</span>
        </div>
        <div class="flexbox align-center" style="margin-top: 10px">
          <div class="line" style="flex: 1; margin-right: 10px;"></div>
          <span style="color: #fefefe; font-size: 1.5em;"><i>or</i></span>
          <div class="line" style="flex: 1; margin-left: 10px;"></div>
        </div>
        <p style="font-size: 1.1em; margin-top: 10px; text-align: center;">
          <i>inbox&mdash;at&mdash;emilianomaccaferri.com</i>
        </p>
      </div>
  </section>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Roboto+Flex:wght@200&display=swap');
  html{
    scroll-behavior: smooth;
  }
  span,h1,h2,h3{ font-family: 'DM Sans', sans-serif; }
  p{ font-family: 'Roboto Flex', sans-serif; max-width: 50vw; }
  body{
    margin: 0;
    background: #fefefe;
  }
  .line{
    height: 1px;
    background: #fefefe;
  }
  .tag{
    background: #fefefe;
    color: #3742fa;
    border-radius: 4px;
    padding: 5px;
    margin: 5px;
  }
  section{
    min-height: 100vh;
    width: 100%;
    position: relative;
    overflow-x: hidden;
    .shape{
      position: absolute;
    }
    .inner{
      position: relative;
      z-index: 2;
      padding: 40px;
    }
    h1:not(#m){
      top: 0;
      display: inline-block;
      padding: 5px;
      color: #3742fa;
      font-size: 4em;
      border-bottom: 2px solid#3742fa;
      font-weight: 500;
      margin: 0;
    }
    p{
      font-size: 1.5em;
      text-align: left;
      font-weight: lighter;
      line-height: 1.65em;
      letter-spacing: -.5px;
    }
    &.blue{
      background: #3742fa; 
      p, h1:not(#m){
        color: #fefefe;
      }
    }
  }
  #main{
    position: relative;
    overflow: hidden;
    height: 100vh;
    background: none;
    h1{
      font-weight: 500;
      mix-blend-mode: difference;
      color: yellow;
      font-size: 4em;
      text-align: center;
      margin: 0;
    }
    h3{
      font-size: 1.25em;
      text-align: center;
      font-weight: lighter;
      mix-blend-mode: difference;
      color: yellow;
      margin: 0;
      margin-top: 10px;
    }
  }
  svg{
    fill: #3742fa;
    top: -120px;
    left: 0;
    transform: scale(1.35) rotate(-15deg);
    opacity: 1;
    right: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    z-index: -1;
  }
  .flexbox{
    display: flex;
    &.align-center{
      align-items: center;
    }
    &.justify-center{
      justify-content: center;
    }
    &.justify-between{
      justify-content: space-between;
    }
    &.wrap{
      flex-wrap: wrap;
    }
  }
  .hello-1200{ display: none; }
  @media screen and (min-width: 1200px){
    .gone-1200{
      display: none;
    }
    .hello-1200{
      display: inherit;
    }
    #main{
      h1{
        font-size: 5.5em;
      }
      h3{
        font-size: 2em;
      }
    }
    section{
      .inner{
        padding: 100px;
      }
      h1:not(#m){
        font-size: 6.5em;
      }
      p{
        font-size: 2em;
      }
    }
  }
</style>