<template>
    <div class="fixed top-21 w-full pt-4 pb-7 bg-white">
        <label class="bg-gray-50 px-2.5 py-0.5 shadow-md rounded-full flex items-center w-4/5 m-auto group">
            <input type="text" 
                   class="text-base px-1 py-1.5 bg-transparent flex-grow focus:outline-none peer"
                   @input="updateKeyword"
                   >
            <SearchIcon class="w-6 h-6 fill-current text-gray-400 transition-colors duration-300 group-hover:text-purple-500 peer-focus:text-purple-500" />
        </label>
    </div>
</template>

<script lang="ts">
import SearchIcon from '@/assets/search.svg?component';

import { defineComponent } from 'vue';

export default defineComponent({
    components: {
         SearchIcon 
    },
    emits: ['updateKeyword'],
    setup(props, { emit }) {

        const updateKeyword = (event: Event) => {
            const targetElement = event.target as HTMLInputElement; 
            const keyword = targetElement.value;
            emit('updateKeyword', keyword);
        }

        return {
            updateKeyword,
        }
    },
})
</script>
