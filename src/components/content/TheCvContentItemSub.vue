<script setup lang="ts">
import { useContentStore } from "@/stores/content";
import type { TimelineItem, TimelineItemSub } from "../TimelineItem";
interface Props {
    parent: string;
    uuid: string;
}

const props = defineProps<Props>();
const content = useContentStore();

function getTitle(): string {
    const item = content.getSubItem(props.parent, props.uuid);
    if (!item) {
        return "";
    }
    return item.title;
}

function changeTitle(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item = content.getSubItem(props.parent, props.uuid);
    if (!item) {
        return;
    }
    if (input && input.value) {
        item.title = input.value;
    }
    else {
        item.title = "";
    }
}

function getText(): string {
    const item = content.getSubItem(props.parent, props.uuid);
    if (!item || !item.text) {
        return "";
    }
    return item.text;
}

function changeText(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item = content.getSubItem(props.parent, props.uuid);
    if (!item || !input) {
        return;
    }
    if (input.value) {
        item.text = input.value;
    } else {
        item.text = "";
    }
}

function getSplit(): boolean {
    const item = content.getSubItem(props.parent, props.uuid);
    if (!item) {
        return false;
    }
    return item.split;
}

function changeSplit(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item = content.getSubItem(props.parent, props.uuid);
    if (input && input.value && item) {
        item.split = input.checked;
    }
}

</script>
<template>
    <div class="cvContentItemSub">
        <div class="cvContentItemHeader">
            <button @click="content.moveSubItemUp(props.parent, props.uuid)">⬆️ Up</button>
            <button @click="content.moveSubItemDown(props.parent, props.uuid)"> ⬇️ Down</button>
            <h3 class="cvContentItemSubSectionTitle">{{ getTitle() !== "" ? getTitle() : "Subitem" }}</h3>
        </div>
            <div class="cvContentItemEntry">
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
        </div>
        <div class="cvContentItemFooter">
            <button @click="content.deleteSubItem(props.parent, props.uuid)">❌ Delete</button>

        </div>
    </div>
</template>
<style scoped lang="scss">
@import url(style.scss);
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

</style>
