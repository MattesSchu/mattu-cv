<script setup lang="ts">
import { useContentStore } from "@/stores/content";
import type { TimelineItem, TimelineItemSub } from "../TimelineItem";
interface Props {
    parent: string;
    uuid: string;
}

const props = defineProps<Props>();
const content = useContentStore();

function getSubItems(): TimelineItemSub[] {
    const item = content.getItem(props.parent, content.items.data) as TimelineItem;
    return item.subitems;
}

function getItem(): TimelineItemSub {
    const item = content.getItem(props.parent, content.items.data) as TimelineItem;
    const subItem = content.getItem(props.uuid, item.subitems) as TimelineItemSub;
    return subItem;
}

function getTitle(): string {
    const item = getItem();
    if (!item) {
        return "";
    }
    return item.title;
}

function changeTitle(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item =  getItem();
    if (input && input.value && item) {
        item.title = input.value;
    }
}

function getText(): string {
    const item = getItem();
    if (!item || !item.text) {
        return "";
    }
    return item.text;
}

function changeText(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item = getItem();
    if (input && input.value && item) {
        item.text = input.value;
    }
}

function getSplit(): boolean {
    const item = getItem();
    if (!item) {
        return false;
    }
    return item.split;
}

function changeSplit(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item = getItem();
    if (input && input.value && item) {
        item.split = input.checked;
    }
}

</script>
<template>
    <div class="cvContentItemSub cvContentItemEntry">
        <h3 class="cvContentItemSubSectionTitle">Subitem</h3>
        <label :for="'inputSubItemTitle_' + props.uuid">Titel</label>
        <input type="text" id="'inputSubItemTitle_' + props.id" @input="changeTitle" :value="getTitle()" />
        <label :for="'inputSubItemText_' + props.uuid">Text</label>
        <textarea type="text" id="'inputSubItemText_' + props.id" @input="changeText" :value="getText()" ></textarea>
        <label :for="'inputSubItemSplit_' + props.uuid">Split</label>
        <input
            type="checkbox"
            id="'inputSubItemSplit_' + props.id"
            @input="changeSplit"
            :value="getSplit()"
        />
        <div class="cvContentItemSubFooter">
            <button @click="content.deleteItem(props.uuid, getSubItems())">Delete</button>
            <button @click="content.moveItemUp(props.uuid, getSubItems())">Up</button>
            <button @click="content.moveItemDown(props.uuid, getSubItems())">Down</button>
        </div>
    </div>
</template>
<style scoped lang="scss">
.cvContentItemSub {
    margin: 10px 80px;
    padding: 10px 0px;
    border-top: 1px solid;
    border-bottom: 1px solid;

    textarea,
    input[type="text"] {
        width: 100%;
    }

    textarea,
    input[type="checkbox"],
    input[type="text"] {
        justify-self: start;
    }

    label {
        justify-self: end;
    }
}
.cvContentItemSubSectionTitle {
    text-align: center;
    grid-column-start: 1;
    grid-column-end: span 2;
}

.cvContentItemSubFooter {
    grid-column-start: 1;
    grid-column-end: span 2;
}
</style>
