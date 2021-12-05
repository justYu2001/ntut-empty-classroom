<template>
    <h3 class="py-1">
        <label for="title" class="text-2xl font-medium font-noto-sans cursor-pointer block">標題</label>
    </h3>
    <input id="title" 
           class="border-2 border-gray-300 rounded focus:outline-none w-full p-1 transition duration-300 focus:border-purple-500" 
           type="text"
           @keydown.prevent.enter="focusTextarea"
           v-model="title"
           enterkeyhint="next"
    >
    <h3 class="py-1 cursor-pointer">
        <label for="content" class="text-2xl font-medium font-noto-sans cursor-pointer block">內容</label>
    </h3>
    <textarea id="content" 
              class="border-2 border-gray-300 rounded focus:outline-none w-full p-1 h-40 transition duration-300 resize-none focus:border-purple-500" 
              @keydown.prevent.enter="submitGithubIssueData"
              ref="textarea"
              v-model="content"
              enterkeyhint="send">
    </textarea>
    <div class="flex justify-end py-2">
        <button class="bg-purple-500 rounded py-1 px-3 mb-1 text-white font-bold disabled:opacity-75"
                ref="button"
                @click="submitGithubIssueData"
                >送出
        </button>
    </div>
</template>

<script lang="ts">
import { FormSubmitResult, GithubIssue } from '@/types';
import { defineComponent, ref, computed, Ref } from 'vue';

export default defineComponent({
    props: {
        issueType: String,
    },
    emits: ['submit'],
    setup(props, { emit }) {
        const title = ref('');
        const content = ref('');
        const issueType = computed(() => props.issueType);

        const textarea = ref() as Ref<HTMLTextAreaElement>;

        const focusTextarea = () => textarea.value.focus();

        const button = ref() as Ref<HTMLButtonElement>;

        const issueAPIURLPrefix = "https://ntut-empty-classroom-github-api-36k5mn2mna-de.a.run.app/";
        const issueAPIURL = issueAPIURLPrefix + issueType.value;

        const submitGithubIssueData = async () => {
            textarea.value.blur();
            button.value.disabled = true;

            const formData: GithubIssue = {
                title: title.value,
                body: content.value,
            };
            
            const response = await fetch(issueAPIURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            button.value.disabled = false;

            const submitResult: FormSubmitResult = {
                type: '',
                message: '',
            };
            
            if(response.status === 200) {
                if(issueType.value === 'bug') {
                    submitResult.message = '提交成功！感謝回報';
                } else {
                    submitResult.message = '提交成功！感謝回饋';
                }
                submitResult.type = 'success';
                title.value = '';
                content.value = '';
            } else {
                submitResult.type = 'failed';
                submitResult.message = '提交失敗！請稍後再試';
            }

            emit('submit', submitResult);

        }

        return {
            title,
            content,
            submitGithubIssueData,
            button,
            textarea,
            focusTextarea,
        }
    },
})
</script>
