<script setup lang="ts">
import { useContentStore } from "@/stores/content";

interface Props {
    uuid: string;
}

const props = defineProps<Props>();

const content = useContentStore();

function changeTitle(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item = content.getItem(props.uuid);
    if (input && input.value && item) {
        item.title = input.value;
    }
}

function getTitle(): string {
    const item = content.getItem(props.uuid);
    if (!item) {
        return "";
    }
    return item.title;
}

function changeText(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item = content.getItem(props.uuid);
    if (input && input.value && item) {
        item.text = input.value;
    }
}

function getText(): string {
    const item = content.getItem(props.uuid);
    if (!item) {
        return "";
    }
    return item.text;
}
</script>
<template>
    <div class="cvContentItem">
        <label :for="'inputTitle_' + props.uuid">Titel</label>
        <input type="text" id="'inputTitle_' + props.id" @change="changeTitle" :value="getTitle()" />

        <label :for="'inputText_' + props.uuid">Inhalt</label>
        <input type="text" id="'inputText_' + props.id" @change="changeText" :value="getText()" />

        <button @click="content.deleteItem(props.uuid)">Delete</button>
    </div>
</template>
<style scoped lang="sass"></style>
