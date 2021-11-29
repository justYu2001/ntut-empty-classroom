import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        menuActive: false,
    }),
    actions: {
        toggleMenu() {
            this.menuActive = !this.menuActive;
        },
        closeMenu() {
            this.menuActive = false;
        },
    },
});