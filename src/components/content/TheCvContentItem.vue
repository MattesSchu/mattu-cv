<script setup lang="ts">
import TheCvContentItemSub from "./TheCvContentItemSub.vue";
// Stores
import { useContentStore } from "@/stores/content";
// Other
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import type { Category, TimelineItem } from "../TimelineItem";

interface Props {
    uuid: string;
    category: Category;
}

const props = defineProps<Props>();
const content = useContentStore();

const hidden = ref(false);
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
    } else {
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

function getShowEnd(): boolean {
    const item = content.getItem(props.uuid);
    if (!item) {
        return true;
    }
    return item.showEnd;
}

function changeShowEnd(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item = content.getItem(props.uuid);
    if (!item) {
        return;
    }
    if (input && input.value) {
        item.showEnd = input.checked;
    } else {
        item.showEnd = false;
    }
}

function getShowDates(): boolean {
    const item = content.getItem(props.uuid);
    if (!item) {
        return true;
    }
    return item.showDates;
}

function changeShowDates(e: Event): void {
    const input = e.target as HTMLInputElement;
    const item = content.getItem(props.uuid);
    if (!item) {
        return;
    }
    if (input && input.value) {
        item.showDates = input.checked;
    } else {
        item.showDates = false;
    }
}

function getUntilToday(): boolean {
    const item = content.getItem(props.uuid);
    if (!item) {
        return true;
    }
    return item.untilToday;
}

function changeUntilToday(e: Event) {
    const input = e.target as HTMLInputElement;
    const item = content.getItem(props.uuid);
    if (!item) {
        return;
    }
    if (input && input.value) {
        item.untilToday = input.checked;
    } else {
        item.untilToday = false;
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
        <div class="cvContentItemHeader">
            <button @click="hidden = !hidden">{{ hidden ? "👀 Show" : "🙈 Hide" }}</button>
            <button @click="content.moveItemUp(props.uuid)">⬆️ Up</button>
            <button @click="content.moveItemDown(props.uuid)">⬇️ Down</button>
            <h2 class="cvViewerItemSectionTitle">{{ getTitle() }}</h2>
        </div>
        <div v-if="!hidden">
            <div class="cvContentItemEntry">
                <label :for="'inputTitle_' + props.uuid">Titel</label>
                <input type="text" id="'inputTitle_' + props.id" @input="changeTitle" :value="getTitle()" />
            </div>
            <div class="cvContentItemEntry">
                <label :for="'inputSubtitle_' + props.uuid">Untertitel</label>
                <input type="text" id="'inputSubtitle_' + props.id" @input="changeSubtitle" :value="getSubtitle()" />
            </div>
            <div  class="cvContentItemEntry">
                <label :for="'inputText_' + props.uuid">Inhalt</label>
                <textarea type="text" id="'inputText_' + props.id" @input="changeText" :value="getText()"></textarea>
            </div>
            <div  class="cvContentItemEntry">
                <label :for="'inputLocation_' + props.uuid">Ort</label>
                <input type="text" id="'inputLocation_' + props.id" @input="changeLocation" :value="getLocation()" />
            </div>
            <div  class="cvContentItemEntry">
                <label :for="'inputShowDates_' + props.uuid">Datum anzeigen</label>
                <input
                    type="checkbox"
                    id="'inputShowDates_' + props.id"
                    @input="changeShowDates"
                    :value="getShowDates()"
                />
            </div>
            <div  class="cvContentItemEntry">
                <label :for="'inputStart_' + props.uuid">Start</label>
                <input
                    type="date"
                    id="'inputStart_' + props.id"
                    :disabled="!getShowDates()"
                    @input="changeStart"
                    :value="getStart()"
                />
            </div>
            <div  class="cvContentItemEntry">
                <label :for="'inputShowEnd_' + props.uuid">Zeige Ende an</label>
                <input
                    type="checkbox"
                    id="'inputShowEnd_' + props.id"
                    :disabled="!getShowDates()"
                    @input="changeShowEnd"
                    :value="getShowEnd()"
                />
                <label :for="'inputUntilToday_' + props.uuid">Bis Heute</label>
                <input
                    type="checkbox"
                    id="'inputUntilToday_' + props.id"
                    :disabled="!getShowDates() || !getShowEnd()"
                    @input="changeUntilToday"
                    :value="getUntilToday()"
                />
                <label :for="'inputEnd_' + props.uuid">Ende</label>
                <input
                    type="date"
                    id="'inputEnd_' + props.id"
                    :disabled="!getShowDates() || !getShowEnd()"
                    @input="changeEnd"
                    :value="getEnd()"
                />
            </div>
            <div  class="cvContentItemEntry">
                <label :for="'inputImageSwitch_' + props.uuid">Bild anzeigen</label>
                <input type="checkbox" id="'inputImageSwitch_' + props.id" v-model="addImage" />
                <label :for="'inputImage_' + props.uuid">Bild</label>
                <input
                    type="file"
                    accept="image/*"
                    id="'inputImage_' + props.id"
                    :disabled="!addImage"
                    @change="changeImage"
                />
            </div>
            <div >
                <transition-group name="list" tag="div">
                    <TheCvContentItemSub
                        v-for="subitem in (content.getItem(props.uuid) as TimelineItem).subitems"
                        :parent="props.uuid"
                        :uuid="subitem.uuid"
                        :key="subitem.uuid"
                    />
                </transition-group>
            </div>
            <div class="cvContentItemSubFooter">
                <button class="cvContentItemAddSub" @click="addSubItem()">➕ Subitem</button>
            </div>
        </div>
        <div class="cvContentItemFooter">
            <button @click="content.deleteItem(props.uuid)">❌ Delete</button>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import url("./style.scss");
.cvContentItemSubFooter {
    display: flex;
    justify-content: center;
}
</style>
