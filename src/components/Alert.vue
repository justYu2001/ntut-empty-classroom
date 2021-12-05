<template>
    <div class="fixed z-10 top-5 left-0 right-0 pointer-events-none">
        <div class="border-l-4 rounded py-3 pl-4 m-auto font-bold w-72 opacity-0"
             :class="{
                 ['bg-green-100 border-green-500']: type === 'success',
                 ['bg-red-100 border-red-500']: type === 'failed',
                 ['animate-fade']: isActive,
             }"
             @animationend="closeAlert">
                <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export interface AlertAPI {
    show: () => void,
}

export default defineComponent({
    name: 'Alert',
    props: {
        type: String,
    },
    setup(props, { expose }) {
        const isActive = ref(false);

        const showAlert = () => isActive.value = true;

        expose({ show: showAlert } as AlertAPI);

        const closeAlert = () => isActive.value = false;

        return {
            isActive,
            closeAlert,
        }
    },
})
</script>
