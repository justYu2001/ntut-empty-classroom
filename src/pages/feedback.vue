<template>
    <main class="w-4/5 m-auto">
        <alert ref="alert" :type="alertType">
            {{ alertMessage }}
        </alert>
        <h2 class="text-center text-5xl font-medium font-noto-sans py-1">意見回饋</h2>
        <Form issueType="feedback" @submit="showAlert"/>
    </main>
</template>

<script lang="ts">
import { FormSubmitResult } from '@/types';
import { defineComponent, ref, Ref } from 'vue';

import { AlertAPI } from '@/components/Alert.vue';

export default defineComponent({
    name: 'Bug',
    setup() {
        const alert = ref() as Ref<AlertAPI>;
        const alertMessage = ref('');
        const alertType = ref('');

        const showAlert = (result: FormSubmitResult) => {
            alertMessage.value = result.message;
            alertType.value = result.type;
            alert.value.show();
        }
        
        return {
            alert,
            alertMessage,
            alertType,
            showAlert,
        }
    },
})
</script>
