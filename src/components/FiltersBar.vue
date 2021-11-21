<template>
    <div ref="filter" class="border-t-4 border-gray-100 pt-3 pb-2.5 w-4/5 m-auto bg-white">
        <ul class="flex flex-wrap px-2 lg:px-0">
            <li v-for="tab in filterTabs" :key="tab" 
                :class="{
                            unfocus: !filters.includes(tab),
                            focus: filters.includes(tab), 
                        }"
                class="py-1 px-5 lg:px-4 text-sm font-bold cursor-pointer rounded-full mr-2.5 mb-2.5 min-w-max"
                @click="updateFilters(tab)"
                >{{ tab }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref } from 'vue';

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

        const filter = ref<HTMLDivElement>() as Ref<HTMLDivElement>;

        onMounted(() => {
            window.addEventListener('scroll', () => {
                const scrollPositionY = window.scrollY;
                filter.value.style.transform = `translateY(${scrollPositionY}px)`;
            });
        });
        

        return {
            filterTabs,
            filters,
            updateFilters,
            filter,
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