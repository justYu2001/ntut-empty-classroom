<template>
    <div class="fixed z-10 top-42 w-full transition-all"
         :class="{
             ['opacity-0 duration-100']: menuActive,
             ['opacity-100 delay-200 duration-100 ease-in']: !menuActive,
         }">
        <div class="border-t-4 border-gray-100 pb-2.5 w-4/5 m-auto bg-white">
            <ul class="flex flex-shrink-0 flex-grow-0 overflow-x-scroll overflow-y-hidden scrolling-touch no-scrollbar py-3 px-2 lg:px-0">
                <li v-for="tab in filterTabs" :key="tab"
                    :class="{
                                unfocus: !filters.includes(tab),
                                focus: filters.includes(tab),
                            }"
                    class="py-1 px-5 box-content mr-2.5 text-sm lg:text-base font-bold cursor-pointer rounded-full min-w-max"
                    @click="updateFilters(tab)"
                    >{{ tab }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMenuStore } from '@/store/menu';
import { storeToRefs } from 'pinia';


export default defineComponent({
    name: 'FiltersBar',
    emits: ['updateCondition'],
    setup(props, { emit }) {
        const filterTabs = ['全部', '一教', '二教', '三教', '四教', '五教', '六教'];

        const filters = ref(['全部']);
        const updateFilters = (condition: string) => {
            if(filters.value[0] === '全部') {
                filters.value = [];
            }
            if(condition === '全部') {
                filters.value = [];
            } else if(filters.value.includes(condition)) {
                const conditionIndex = filters.value.indexOf(condition);
                filters.value.splice(conditionIndex, 1);
            } else {
                filters.value.push(condition);
            }
            if(filters.value[0] === '全部' || filters.value.length % 6 === 0) {
                filters.value = ['全部'];
                const allCondition = ['一教', '二教', '三教', '四教', '五教', '六教']
                emit('updateCondition', allCondition);
            } else {
                emit('updateCondition', filters.value);
            }
        };

        const menu = useMenuStore();
        const { menuActive } = storeToRefs(menu);

        return {
            filterTabs,
            filters,
            updateFilters,
            menuActive,
        }
    },
})
</script>

<style lang="postcss">
   .focus {
        @apply bg-purple-500 text-white
    }

    .unfocus {
        @apply bg-gray-100 text-gray-400
    }
</style>