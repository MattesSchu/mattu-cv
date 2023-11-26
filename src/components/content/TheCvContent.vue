<script setup lang="ts">
import TheCvContentItem from "./TheCvContentItem.vue";
import TheSettings from "./TheSettings.vue";
// Core
import { Category } from "@/components/TimelineItem";
// Stores
import { saveContent, useContentStore } from "@/stores/content";
import { useSettingsStore } from "@/stores/settings";
// Other
import type { TimelineItem } from "@/components/TimelineItem";
import { v4 as uuidv4 } from "uuid";

const content = useContentStore();
const settings = useSettingsStore();

function handleFileChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            content.profilePicture = e.target?.result as string;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function addItem(category: Category): void {
    const item: TimelineItem = {
        uuid: uuidv4(),
        title: "- Eintragen -",
        category: category,
        location: "",
        text: "",
        start: new Date(),
        showDates: true,
        showEnd: true,
        untilToday: false,
        subitems: [],
    };
    content.items.data.push(item);
}
</script>
<template>
    <div class="cvContent">
        <button @click="saveContent()">Speichern</button>
        <div class="cvContentSection">
            <h2>Einstellungen</h2>
            <!-- TODO: move settings to different container -->
            <TheSettings />
        </div>
        <div class="cvContentSection">
            <h2>Passfoto</h2>
            <div class="fileUpload">
                <input type="file" accept="image/*" id="myFile" name="filename" @change="handleFileChange" />
            </div>
            <img v-if="content.profilePicture" :src="content.profilePicture" width="20" />
        </div>
        <div class="cvContentSection">
            <h2>Persönliche Informationen</h2>
            <div class="cvContentItemEntry">
                <label for="inputName">Name</label>
                <input type="text" id="inputName" v-model="content.name" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputStrasse">Strasse Hausnummer</label>
                <input type="text" id="inputStrasse" v-model="content.address" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputOrt">Ort Postleitzahl</label>
                <input type="text" id="inputOrt" v-model="content.postal" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputGeburtsdatum">Geburtsdatum</label>
                <input type="date" id="inputGeburtsdatum" v-model="content.birthday" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputGeburtsort">Geburtsort</label>
                <input type="text" id="inputGeburtsort" v-model="content.birthplace" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputFamilienstand">Familienstand</label>
                <input type="text" id="inputFamilienstand" v-model="content.family" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputTelefon">Telefon</label>
                <input type="text" id="inputTelefon" v-model="content.phone" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputEmail">E-Mail</label>
                <input type="email" id="inputEmail" v-model="content.mail" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputHomepage">Homepage</label>
                <input type="url" id="inputHomepage" v-model="content.homepage" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputXing">Xing</label>
                <input type="url" id="inputXing" v-model="content.xing" />
            </div>
        </div>
        <div class="cvContentSection">
            <h2>Werdegang</h2>
            <TheCvContentItem v-for="(item, idx) in content.getItems(Category.WERDEGANG)" :uuid="item.uuid" />
            <button @click="addItem(Category.WERDEGANG)">Add Item</button>
        </div>
        <div class="cvContentSection">
            <h2>Erfahrung</h2>
            <TheCvContentItem v-for="(item, idx) in content.getItems(Category.AUSBILDUNG)" :uuid="item.uuid" />
            <button @click="addItem(Category.AUSBILDUNG)">Add Item</button>
        </div>
        <div class="cvContentSection">
            <h2>Engagement</h2>
            <TheCvContentItem v-for="(item, idx) in content.getItems(Category.ENGAGEMENT)" :uuid="item.uuid" />
            <button @click="addItem(Category.ENGAGEMENT)">Add Item</button>
        </div>
        <div class="cvContentSection">
            <h2>Sprache</h2>
            <TheCvContentItem v-for="(item, idx) in content.getItems(Category.SPRACHE)" :uuid="item.uuid" />
            <button @click="addItem(Category.SPRACHE)">Add Item</button>
        </div>
    </div>
</template>
<style scoped lang="scss">
 @import url("./style.scss");
.cvContent {
    width: 100%;
    height: 100vh;
    padding: 20px;

    border-right: 2px dashed black;

    display: v-bind("settings.printModeActive ? 'none' : 'block'");
    visibility: v-bind("settings.printModeActive ? 'hidden' : 'vsisble'");

    overflow: scroll;
}

.cvContentSection {
    display: grid;
    padding: 10px;
    grid-template-columns: 1fr;
    gap: 10px;
    border-top: 2px solid black;
}

@media print {
    .cvContent {
        display: none;
        visibility: hidden;
    }
}
</style>
