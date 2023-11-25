<script setup lang="ts">
import { useContentStore } from "@/stores/content";
import TheCvContentItem from "./TheCvContentItem.vue";
import { Category } from "./TimelineItem";
import type { TimelineItem } from "./TimelineItem";
import { v4 as uuidv4 } from "uuid";
import TheSettings from "./TheSettings.vue";
import { useSettingsStore } from "@/stores/settings";

const content = useContentStore();
const settings = useSettingsStore();

function handleFileChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0])
    {
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
        subitems: [],
    }
    content.items.data.push(item);
}
</script>
<template>
    <div class="cvContent">
        <div class="cvContentSection">
            <h2>Einstellungen</h2>
            <!-- TODO: move settings to different container -->
            <TheSettings />
        </div>
        <div class="cvContentSection">
            <h2>Passfoto</h2>
            <div class="fileUpload">
                <input type="file" accept="image/*" id="myFile" name="filename" @change="handleFileChange"/>
            </div>
            <img v-if="content.profilePicture" :src="content.profilePicture" width="20" />
        </div>
        <div class="cvContentSection">
            <h2>Persönliche Informationen</h2>
            <div class="inputFieldList">
                <label for="inputName">Name</label>
                <input type="text" id="inputName" v-model="content.name" />

                <label for="inputStrasse">Strasse Hausnummer</label>
                <input type="text" id="inputStrasse" v-model="content.address" />

                <label for="inputOrt">Ort Postleitzahl</label>
                <input type="text" id="inputOrt" v-model="content.postal" />

                <label for="inputGeburtsdatum">Geburtsdatum</label>
                <input type="date" id="inputGeburtsdatum" v-model="content.birthday" />

                <label for="inputGeburtsort">Geburtsort</label>
                <input type="text" id="inputGeburtsort" v-model="content.birthplace" />

                <label for="inputFamilienstand">Familienstand</label>
                <input type="text" id="inputFamilienstand" v-model="content.family" />

                <label for="inputTelefon">Telefon</label>
                <input type="text" id="inputTelefon" v-model="content.phone" />

                <label for="inputEmail">E-Mail</label>
                <input type="email" id="inputEmail" v-model="content.mail" />

                <label for="inputHomepage">Homepage</label>
                <input type="url" id="inputHomepage" v-model="content.homepage" />

                <label for="inputXing">Xing</label>
                <input type="url" id="inputXing" v-model="content.xing" />
            </div>
        </div>
        <div class="cvContentSection">
            <h2>Werdegang</h2>
            <TheCvContentItem v-for="(item, idx) in content.getItems(Category.WERDEGANG)" :uuid="item.uuid"/>
            <button @click="addItem(Category.WERDEGANG)">Add Item</button>
        </div>
        <div class="cvContentSection">
            <h2>Erfahrung</h2>
            <TheCvContentItem v-for="(item, idx) in content.getItems(Category.AUSBILDUNG)" :uuid="item.uuid"/>
            <button @click="addItem(Category.AUSBILDUNG)">Add Item</button>
        </div>
        <div class="cvContentSection">
            <h2>Engagement</h2>
            <TheCvContentItem v-for="(item, idx) in content.getItems(Category.ENGAGEMENT)" :uuid="item.uuid"/>
            <button @click="addItem(Category.ENGAGEMENT)">Add Item</button>
        </div>
    </div>
</template>
<style scoped lang="scss">
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
    grid-template-columns: 1fr;
    gap: 10px;
}

.inputFieldList {
    display: grid;
    grid-template-columns: 1fr 1fr;

    label {
        text-align: right;
        margin-right: 10px;
    }
}

@media print {
    .cvContent {
        display: none;
        visibility: hidden;
    }
}
</style>
