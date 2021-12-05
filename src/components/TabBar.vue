<template>
    <div class="fixed top-42 w-full bg-white">
        <div class="relative flex w-4/5 m-auto border-b-4 border-gray-100">
            <div v-for="(tab, index) in tabList" :key="tab"
                 @click="switchTab(tab)"
                 class="py-1 cursor-pointer"
                 :class="{
                     ['pr-3 pl-2']: index === 0,
                     ['px-3']: index > 0,
                     ['text-purple-500']: currentTab === tab
                 }"
                 >{{ tab }}</div>
            <div class="absolute -bottom-1 h-1 w-20 bg-purple-500 rounded-full transition duration-300"
                 :style="translatePosition"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
    name: 'TabBar',
    emits: ['updateTab'],
    setup(props, { emit }) {
        const tabList = ['目前時段', '全部時段'];
        const currentTab = ref('目前時段');

        const switchTab = (tab: string) => {
            currentTab.value = tab;
            emit('updateTab', tab);
        };

        const translatePosition = computed(() => {
            const tabIndex = tabList.indexOf(currentTab.value);
            const tabWidth = 88;
            return `transform: translateX(${tabIndex * tabWidth}px);`
        })

        return {
            currentTab,
            tabList,
            switchTab,
            translatePosition,
        }
    },
})
</script>
