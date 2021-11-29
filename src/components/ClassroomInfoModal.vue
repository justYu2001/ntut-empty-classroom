<template>
    <div class="fixed inset-0 flex justify-center items-center transition-all duration-300 z-20"
         :class="{
             ['opacity-0 pointer-events-none']: !isShowModal,
             ['opacity-100']: isShowModal,
         }"
        >
        <div class="absolute inset-0 bg-black/50"
             @click="closeModal">
        </div>
        <div class="relative z-10 bg-white px-5 py-4 rounded transition-all duration-300"
            :class="{
                ['scale-0']: !isShowModal,
                ['scale-100']: isShowModal
            }">
            <h2 class="mb-2">
                {{ classroomData.abbreviation }}
                <small class="block font-bold">{{ classroomData.name }}</small>
            </h2>
            <table>
                <thead>
                    <tr class="text-md tracking-wide bg-purple-500 border-gray-500 text-white">
                        <td class="px-4 py-1 font-bold"></td>
                        <td class="px-4 py-1 font-bold">一</td>
                        <td class="px-4 py-1 font-bold">二</td>
                        <td class="px-4 py-1 font-bold">三</td>
                        <td class="px-4 py-1 font-bold">四</td>
                        <td class="px-4 py-1 font-bold">五</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="period in 14" :key="period">
                        <td class="text-white bg-purple-500 py-1 px-2 text-center">{{ periodStrings[period - 1] }}</td>
                        <td v-for="day in 5" :key="day" class="border relative p-2.5">
                            <div class="absolute top-2 left-4 w-4 h-4 rounded-full bg-purple-500"
                                 v-if="isEmptyClassroom(day, period - 1)"
                            >
                                <CheckIcon class="w-3 h-3 fill-current text-white" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import CheckIcon from '@/assets/check.svg?component';

import { Classroom } from '@/types';
import { defineComponent, computed, ComputedRef } from 'vue';

export default defineComponent({
    name: 'ClassroomInfoModal',
    components: { CheckIcon },
    props: {
        'classroom': Object,
        'isShow': Boolean,
    },
    emits: ['closeModal'],
    setup(props, { emit }) {
        const isShowModal = computed(() => props.isShow);

        const classroomData = computed(() => props.classroom) as ComputedRef<Classroom>;

        const isEmptyClassroom = (day: number, period: number) => {
            const time = day.toString() + period.toString();
            return classroomData.value.availableTime.includes(time);
        }

        const closeModal = () => emit('closeModal');

        const periodStrings = ['1', '2', '3', '4', '中午', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D'];

        return {
            isShowModal,
            classroomData,
            isEmptyClassroom,
            closeModal,
            periodStrings,
        }
    },
})
</script>
