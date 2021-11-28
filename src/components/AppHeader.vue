<template>
    <header class="relative z-10 flex justify-between items-center py-6 px-8 font-noto-sans font-medium bg-white">
        <h1>
            <router-link to="/" class="text-3xl">北科空教室</router-link>
        </h1>
        <div class="relative z-10 md:hidden" @click="toggleMenu">
            <div class="bar top-bar" :class="{ ['top-bar-active']: menuActive }">
            </div>
            <div class="bar middle-bar transition-all duration-300 delay-300" :class="{ ['middle-bar-active']: menuActive }"></div>
            <div class="bar bottom-bar" 
                :class="{ ['bottom-bar-active']: menuActive }">
            </div>
        </div>
        <nav class="bg-purple-500 md:bg-white fixed md:relative top-0 left-0 md:left-auto w-full md:w-auto h-screen md:h-auto flex flex-col md:flex-row pt-16 md:pt-0 transition-all duration-700 ease-out md:show-menu"
            :class="{
                ['hide-menu']: !menuActive,
                ['show-menu']: menuActive,
            }">
            <router-link to="/installation" class="navbar-link" @click="menuActive = false">手機版安裝</router-link>
            <router-link to="/bug" class="navbar-link" @click="menuActive = false">問題回報</router-link>
            <router-link to="/feedback" class="navbar-link" @click="menuActive = false">意見回饋</router-link>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
    name: 'Header',
    setup() {
        const menuActive = ref(false);

        const toggleMenu = () => menuActive.value = !menuActive.value;

        onMounted(() => {
            window.addEventListener('scroll', () => {
                const scrollPositionY = window.scrollY;
                const header = document.querySelector('header') as HTMLElement;
                header.style.transform = `translateY(${scrollPositionY}px)`;
            });
        });

        return {
            menuActive,
            toggleMenu,
        }
    },
})
</script>

<style lang="postcss">
    @tailwind utilities;

    .navbar-link {
        @apply text-base text-center text-white md:text-black px-1 py-4 md:py-0 transition-colors duration-300 hover:text-purple-500;
    }

    .bar {
        @apply absolute right-0.5 h-0.5 w-6 rounded-xl;
    }

    @layer utilities {
        .hide-menu {
            clip-path: circle(0px at 90% -10%);
            -webkit-clip-path: circle(0px at 90% -10%);
        }

        .show-menu {
            clip-path: circle(1000px at 90% -10%);
            -webkit-clip-path: circle(1000px at 90% -10%);
        }

        .top-bar {
            top: -15px;
            background-color: #000;
            transition-property: top, transform, background-color;
            transition-duration: 0.3s, 0.3s, 0.3s;
            transition-timing-function: ease, ease-out, ease;
            transition-delay:  0.4s, 0.1s;
        }

        .bottom-bar {
            top: 1px;
            background-color: #000;
            transition-property: top, transform, background-color;
            transition-duration: 0.3s, 0.3s, 0.3s;
            transition-timing-function: ease, ease-out, ease;
            transition-delay:  0.4s, 0.1s;
        }

        .middle-bar {
            top: -7px;
            background-color: #000;
            transition-timing-function: ease;
        }

        .top-bar-active {
            background-color: #fff;
            top: -7px;
            transform: rotate(45deg);
            transition-property: top, transform, background-color;
            transition-duration: 0.5s, 0.3s, 0.3s;
            transition-timing-function: ease, ease-out, ease;
            transition-delay:  0.1s, 0.6s;
        }

        .middle-bar-active {
            opacity: 0;
        }

        .bottom-bar-active {
            background-color: #fff;
            top: -7px;
            transform: rotate(-45deg);
            transition-property: top, transform, background-color;
            transition-duration: 0.5s, 0.3s, 0.3s;
            transition-timing-function: ease, ease-out, ease;
            transition-delay:  0.1s, 0.6s;
        }
    }
</style>