<script setup lang="ts">
import { useContentStore } from "@/stores/content";
import type { TimelineItem } from "./TimelineItem";
import { ref } from "vue";

interface Props {
    uuid: string;
}

const props = defineProps<Props>();
const content = useContentStore();

const hidden = ref(false)
const addEnd = ref(false);
const addImage = ref(false);

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

function changeLocation(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item = content.getItem(props.uuid);
    if (input && input.value && item) {
        item.location = input.value;
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
    console.log(date);
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
    if (input && input.value && item) {
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
    if (input && input.value && item) {
        item.end = new Date(input.value);
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

</script>
<template>
    <div class="cvContentItem">
        <div class="cvContentItemEntry">
            <label :for="'inputTitle_' + props.uuid">Titel</label>
            <input type="text" id="'inputTitle_' + props.id" @change="changeTitle" :value="getTitle()" />
        </div>
        <div v-if="!hidden" class="cvContentItemEntry">
            <label :for="'inputText_' + props.uuid">Inhalt</label>
            <textarea type="text" id="'inputText_' + props.id" @change="changeText" :value="getText()"></textarea>
        </div>
        <div v-if="!hidden" class="cvContentItemEntry">
            <label :for="'inputLocation_' + props.uuid">Ort</label>
            <input type="text" id="'inputLocation_' + props.id" @change="changeLocation" :value="getLocation()" />
        </div>
        <div v-if="!hidden" class="cvContentItemEntry">
            <label :for="'inputStart_' + props.uuid">Start</label>
            <input type="date" id="'inputStart_' + props.id" @change="changeStart" :value="getStart()" />
        </div>
        <div v-if="!hidden" class="cvContentItemEntry">
            <label :for="'inputEndSwitch_' + props.uuid">Ende</label>
            <input type="checkbox" id="'inputEndSwitch_' + props.id" v-model="addEnd" />
            <label v-if="addEnd" :for="'inputEnd_' + props.uuid">Ende</label>
            <input v-if="addEnd" type="date" id="'inputEnd_' + props.id" @change="changeEnd" :value="getEnd()" />
        </div>
        <div v-if="!hidden" class="cvContentItemEntry">
            <label :for="'inputImageSwitch_' + props.uuid">Bild</label>
            <input type="checkbox" id="'inputImageSwitch_' + props.id" v-model="addImage" />
            <label v-if="addImage" :for="'inputImage_' + props.uuid">Bild</label>
            <input v-if="addImage" type="file" accept="image/*" id="'inputImage_' + props.id" @change="changeImage" />
        </div>
    </div>
    <div class="cvContentItemFooter">
        <button @click="content.deleteItem(props.uuid)">Delete</button>
        <button @click="hidden = !hidden">{{ hidden ? "Show" : "Hide" }}</button>
    </div>
</template>
<style scoped lang="scss">
.cvContentItem {
    width: 100%;

    textarea {
        overflow-y: auto;
        resize: none;
    }
}
</style>
