<template>
	<ClassroomInfoModal ref="classroomInfoModal" />
	<SearchBar @updateKeyword="updateKeyword" />
	<TabBar @updateTab="updateTab"/>
	<FiltersBar @updateCondition="updateFilters" />
	<ul class="w-4/5 m-auto pt-65">
		<li v-for="classroom in filteredClassroomList" :key="classroom.id"
			@click="openClassroomInfoModal(classroom)"
            class="px-2.5 py-1.5 font-bold border-t border-gray-300 cursor-pointer transition-colors duration-300 hover:text-purple-500">
			{{ classroom.abbreviation }}
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, Ref } from 'vue';
import { getDocs } from 'firebase/firestore/lite';

import { db } from '@/modules/db';
import { Classroom } from '@/types';
import { ClassroomInfoModalAPI } from '@/components/ClassroomInfoModal.vue';


export default defineComponent({
	name: 'Home',
	setup() {
		const filters = ref(['一教', '二教', '三教', '四教', '五教', '六教']);

		const updateFilters = (newFilters: string[]) => filters.value = newFilters;


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
			
			const emptyClassroomSnapshot = await getDocs(emptyClassroom);
			const emptyClassroomDocs = emptyClassroomSnapshot.docs;
			return emptyClassroomDocs
                       .map((doc) => doc.data())
                       .sort((a, b) => compareChineseNumber(a.abbreviation, b.abbreviation));
		}

		const classroomList = ref([]) as Ref<Classroom[]>;


		const filteredClassroomList = ref([]) as Ref<Classroom[]>;

		const keyword = ref("");

		const updateKeyword = (newKeyword: string) => keyword.value = newKeyword;

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

		const currentTab = ref('目前時段');

		const updateTab = (newTab: string) => currentTab.value = newTab;

        const searchByTime = () => {
			const currentTime = getDayString() + getPeriod();

			if(currentTab.value === '目前時段') {
				filteredClassroomList.value =
					classroomList.value.filter((classroom) => {
						return classroom.availableTime.includes(currentTime);
					});
			} else {
				filteredClassroomList.value = classroomList.value;
			}
		}

		const searchByCondition = () => {
			filteredClassroomList.value = 
				filteredClassroomList.value.filter((classroom) => {
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
			searchByTime();
			searchByCondition();
			if(keyword.value !== '') {
				searchByKeyword();
			}
		}

		onMounted(async () => {
			classroomList.value = await getClassroomList();
			searchClassroom();
			window.setInterval(() => {
				const currentTime = new Date();
				
				if(currentTime.getMinutes() === 0) {
					searchClassroom();
				}
			}, 60 * 1000);
		});

		watch(currentTab, searchClassroom);
		watch(filters, searchClassroom, { deep: true });
		watch(keyword, searchClassroom);

		const classroomInfoModal = ref() as Ref<ClassroomInfoModalAPI>;

		const openClassroomInfoModal = (classroom: Classroom) => {
			classroomInfoModal.value.openModal(classroom);
		}


		return {
			updateFilters,
			updateKeyword,
			filteredClassroomList,
			searchClassroom,
			classroomInfoModal,
			openClassroomInfoModal,
			updateTab,
		}
  }
})
</script>
