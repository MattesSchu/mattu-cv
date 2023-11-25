<script setup lang="ts">
import { useContentStore } from "@/stores/content";
import type { TimelineItem } from "./TimelineItem";
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import TheCvContentItemSub from "./TheCvContentItemSub.vue";

interface Props {
    uuid: string;
}

const props = defineProps<Props>();
const content = useContentStore();

const hidden = ref(false);
const addEnd = ref(false);
const addImage = ref(false);

function changeTitle(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item = content.getItem(props.uuid);
    if (input && input.value && item) {
        item.title = input.value;
    }
}

function getSubtitle(): string {
    const item = content.getItem(props.uuid);
    if (!item || !item.subtitle) {
        return "";
    }
    return item.subtitle;
}

function changeSubtitle(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item = content.getItem(props.uuid);
    if (!item) {
        return;
    }
    if (input && input.value) {
        item.subtitle = input.value;
    } else {
        item.subtitle = "";
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
    if (!item) {
        return;
    }
    if (input && input.value) {
        item.text = input.value;
    } else {
        item.text = "";
    }
}

function getText(): string {
    const item = content.getItem(props.uuid);
    if (!item) {
        return "";
    }
    return item.text;
}

function changeLocation(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item = content.getItem(props.uuid);
    if (!item) {
        return;
    }
    if (input && input.value) {
        item.location = input.value;
    } else {
        item.location = "";
    }
}

function getLocation(): string {
    const item = content.getItem(props.uuid);
    if (!item) {
        return "";
    }
    return item.location;
}

function formatDate(date: Date): string {
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    let year = "" + date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return year + "-" + month + "-" + day;
}

function changeStart(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item = content.getItem(props.uuid);
    if (!item) {
        return;
    }
    if (input && input.value) {
        item.start = new Date(input.value);
    }
}

function getStart(): string {
    const item = content.getItem(props.uuid);
    if (!item || !item.start || !(item.start instanceof Date)) {
        return formatDate(new Date(Date.now()));
    }
    return formatDate(item.start);
}

function changeEnd(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item = content.getItem(props.uuid);
    if (!item) {
        return;
    }
    if (input && input.value) {
        item.end = new Date(input.value);
    }
    else {
        item.end = undefined;
    }
}

function getEnd(): string {
    const item = content.getItem(props.uuid);
    if (!item || !item.end || !(item.end instanceof Date)) {
        return formatDate(new Date(Date.now()));
    }
    return formatDate(item.end);
}

function changeImage(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item = content.getItem(props.uuid);
    if (!item) {
        return;
    }
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            item.image = e.target?.result as string;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function addSubItem(): void {
    const item = content.getItem(props.uuid);
    if (!item) {
        console.error("Unable to get item from uuid");
        return;
    }
    item.subitems.push({ uuid: uuidv4(), title: "", subtitle: "", split: false });
}
</script>
<template>
    <div class="cvContentItem">
        <h2 class="cvViewerItemSectionTitle">Item</h2>
        <div class="cvContentItemEntry">
            <label :for="'inputTitle_' + props.uuid">Titel</label>
            <input type="text" id="'inputTitle_' + props.id" @input="changeTitle" :value="getTitle()" />
        </div>
        <div class="cvContentItemEntry">
            <label :for="'inputSubtitle_' + props.uuid">Untertitel</label>
            <input type="text" id="'inputSubtitle_' + props.id" @input="changeSubtitle" :value="getSubtitle()" />
        </div>
        <div v-if="!hidden" class="cvContentItemEntry">
            <label :for="'inputText_' + props.uuid">Inhalt</label>
            <textarea type="text" id="'inputText_' + props.id" @input="changeText" :value="getText()"></textarea>
        </div>
        <div v-if="!hidden" class="cvContentItemEntry">
            <label :for="'inputLocation_' + props.uuid">Ort</label>
            <input type="text" id="'inputLocation_' + props.id" @input="changeLocation" :value="getLocation()" />
        </div>
        <div v-if="!hidden" class="cvContentItemEntry">
            <label :for="'inputStart_' + props.uuid">Start</label>
            <input type="date" id="'inputStart_' + props.id" @input="changeStart" :value="getStart()" />
        </div>
        <div v-if="!hidden" class="cvContentItemEntry">
            <label :for="'inputEndSwitch_' + props.uuid">Ende</label>
            <input type="checkbox" id="'inputEndSwitch_' + props.id" v-model="addEnd" />
            <label v-if="addEnd" :for="'inputEnd_' + props.uuid">Ende</label>
            <input v-if="addEnd" type="date" id="'inputEnd_' + props.id" @input="changeEnd" :value="getEnd()" />
        </div>
        <div v-if="!hidden" class="cvContentItemEntry">
            <label :for="'inputImageSwitch_' + props.uuid">Bild</label>
            <input type="checkbox" id="'inputImageSwitch_' + props.id" v-model="addImage" />
            <label v-if="addImage" :for="'inputImage_' + props.uuid">Bild</label>
            <input v-if="addImage" type="file" accept="image/*" id="'inputImage_' + props.id" @change="changeImage" />
        </div>
        <TheCvContentItemSub
            v-if="!hidden"
            v-for="(subitem, idx) in content.getItem(props.uuid)?.subitems"
            :parent="props.uuid"
            :uuid="subitem.uuid"
        />
        <button v-if="!hidden" class="cvContentItemAddSub" @click="addSubItem()">Add Subitem</button>
        <div class="cvContentItemFooter">
            <button @click="content.deleteItem(props.uuid)">Delete</button>
            <button @click="hidden = !hidden">{{ hidden ? "Show" : "Hide" }}</button>
            <button @click="content.moveItemUp(props.uuid)">Up</button>
            <button @click="content.moveItemDown(props.uuid)">Down</button>
        </div>
    </div>
</template>
<style scoped lang="scss">
.cvContentItem {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid black;
}

.cvViewerItemSectionTitle {
    text-align: center;
}

.cvContentItemEntry {
    display: grid;
    grid-template-columns: 1fr 5fr;
    column-gap: 10px;

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

.cvContentItemFooter {
    grid-template-columns: 1;
    grid-template-columns: span 2;
}
</style>
