<template>
	<SearchBar @updateKeyword="updateKeyword" />
	<FiltersBar @updateCondition="updateFilters" />
	<ul class="w-4/5 m-auto">
		<li v-for="classroom in filteredClassroomList" :key="classroom.id"
            class="px-2.5 py-1.5 font-bold border-b border-gray-300 cursor-pointer transition-colors duration-300 hover:text-purple-500">
			{{ classroom.abbreviation }}
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, Ref } from 'vue';
import { query, where, getDocs } from 'firebase/firestore/lite';

import { db } from '@/modules/db';
import { Classroom } from '@/types';


export default defineComponent({
	name: 'Home',
	setup() {

		const filters = ref(['一教', '二教', '三教', '四教', '五教', '六教']);

		const updateFilters = (newFilters: string[]) => filters.value = newFilters;

		const getPeriod = () => {
			const today = new Date();
			const hour = today.getHours();
			if(hour < 8 && hour > 22) {
				return 'not schooltime';
			} else {
				return (hour - 8).toString();
			}
		}

		const getDayString = () => {
			const today = new Date();
			return today.getDay().toString();
		}

		const compareChineseNumber = (a: string, b: string) => {
			const orderOfChineseNumber = new Map([
				['一', 0], 
				['二', 1],
				['三', 2],
				['四', 3],
				['五', 4],
				['六', 5],
			]);

			const firstWordOfA = a[0];
			const firstWordOfB = b[0];

			if(!orderOfChineseNumber.has(firstWordOfA)) {
				return 1;
			} else if(!orderOfChineseNumber.has(firstWordOfB)) {
				return -1;
			} else {
				const orderOfA = orderOfChineseNumber.get(firstWordOfA) as number;
				const orderOfB = orderOfChineseNumber.get(firstWordOfB) as number;
				return orderOfA - orderOfB;
			}
		}
    
		const getClassroomList = async () => {
			const emptyClassroom = db.emptyClassroom;

			const currentTime = getDayString() + getPeriod();
			
			const queryCondition = where('availableTime', 'array-contains', currentTime);
			const queryRef = query(emptyClassroom, queryCondition);
			const emptyClassroomSnapshot = await getDocs(queryRef);
			const emptyClassroomDocs = emptyClassroomSnapshot.docs;
			return emptyClassroomDocs
                       .map((doc) => doc.data())
                       .sort((a, b) => compareChineseNumber(a.abbreviation, b.abbreviation));
		}

		const classroomList = ref([]) as Ref<Classroom[]>;


		const filteredClassroomList = ref([]) as Ref<Classroom[]>;

		const keyword = ref("");

		const updateKeyword = (newKeyword: string) => keyword.value = newKeyword;

		const searchByCondition = () => {
			filteredClassroomList.value = 
				classroomList.value.filter((classroom) => {
					for (const condition of filters.value) {
						if(classroom.abbreviation.includes(condition)) {
							return true;
						}
					}
					return false;
				});
		}

		const searchByKeyword = () => {
			let data = [] as Classroom[];
			if(filters.value.length === 6) {
				data = classroomList.value;
			} else {
				data = filteredClassroomList.value;
			}

			filteredClassroomList.value =
				data.filter((classroom) => {
					return classroom.abbreviation.includes(keyword.value);
				});
		}

		const searchClassroom = () => {
			searchByCondition();
			if(keyword.value !== '') {
				searchByKeyword();
			}
		}

		onMounted(async () => {
			classroomList.value = await getClassroomList();
			searchClassroom();
		});

		watch(filters, searchClassroom, { deep: true });
		watch(keyword, searchClassroom);

		return {
			updateFilters,
			updateKeyword,
			filteredClassroomList,
			searchClassroom,
		}
  }
})
</script>
