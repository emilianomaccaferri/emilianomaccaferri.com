<template>
    <teleport to="head">
        <meta name="description" :content="$route.meta.description">
        <meta NAME="ROBOTS" CONTENT="NOODP">
        <link rel="canonical" href="emilianomaccaferri.com" />
        <meta property="og:url" content="emilianomaccaferri.com">
        <meta property="og:description" :content="$route.meta.description">
        <meta property="og:title" :content="'Emiliano Maccaferri &mdash; ' + $route.meta.title">
        <meta property="og:site_name" :content="'Emiliano Maccaferri &mdash; ' + $route.meta.title">
        <meta property="og:see_also" content="https://emilianomaccaferri.com">
        <meta itemprop="name" :content="$route.meta.title">
        <meta itemprop="description" :content="$route.meta.description">
        <meta name="twitter:url" content="https://emilianomaccaferri.com">
        <meta name="twitter:title" :content="'Emiliano Maccaferri &mdash; ' + $route.meta.title">
        <meta name="twitter:description" :content="$route.meta.description">
    </teleport>
    <section>
        <div class="container">
            <Navbar />
            <router-view :key="$route.fullPath" />
        </div>
    </section>
</template>
<style lang="scss">
	@import './assets/scss/style.scss';
</style>

<script lang="ts">
import Navbar from './components/Navbar.vue';
import { defineComponent } from 'vue'

export default defineComponent({

    name: 'home',
    components: {

        Navbar

    },
})
</script>



