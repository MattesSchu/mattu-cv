<script setup lang="ts">
import TheCvContentItem from "./TheCvContentItem.vue";
import TheSettings from "./TheSettings.vue";
// Core
import { Category } from "@/components/TimelineItem";
// Stores
import { saveContent, loadContent, useContentStore } from "@/stores/content";
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
            content.personalInformation.profilePicture = e.target?.result as string;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function addItem(category: Category): void {
    const item: TimelineItem = {
        uuid: uuidv4(),
        idx: content.items.data.length,
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

function handleLoadFile(e: Event): void {
    const input = e.target as HTMLInputElement;
    console.log(input);

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            loadContent(e.target?.result as string);
        };
        reader.readAsText(input.files[0]);
    }
}
</script>
<template>
    <div class="cvContent">
        <div class="cvContentActionSection">
            <button @click="saveContent()">Speichern</button>
            <label for="loadContent" class="btnFileLabel">Laden</label>
            <input type="file" accept=".json" id="loadContent" name="content" @change="handleLoadFile" />
            <button @click="content.reset()">Reset</button>
        </div>
        <div class="cvContentSection">
            <h2>Einstellungen</h2>
            <!-- TODO: move settings to different container -->
            <TheSettings />
        </div>
        <div class="cvContentSection">
            <h2>Passfoto</h2>
            <div class="cvContentItemEntry">
                <label for="profilePictureInput" class="btnFileLabel">Profilbild</label>
                <input
                    type="file"
                    accept="image/*"
                    id="profilePictureInput"
                    name="profilePicture"
                    @change="handleFileChange"
                />
                <img
                    v-if="content.personalInformation.profilePicture"
                    :src="content.personalInformation.profilePicture"
                    height="40"
                />
            </div>
        </div>
        <div class="cvContentSection">
            <h2>Persönliche Informationen</h2>
            <div class="cvContentItemEntry">
                <label for="inputName">Name</label>
                <input type="text" id="inputName" v-model="content.personalInformation.name" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputStrasse">Strasse Hausnummer</label>
                <input type="text" id="inputStrasse" v-model="content.personalInformation.address" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputOrt">Ort Postleitzahl</label>
                <input type="text" id="inputOrt" v-model="content.personalInformation.postal" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputGeburtsdatum">Geburtsdatum</label>
                <input type="date" id="inputGeburtsdatum" v-model="content.personalInformation.birthday" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputGeburtsort">Geburtsort</label>
                <input type="text" id="inputGeburtsort" v-model="content.personalInformation.birthplace" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputFamilienstand">Familienstand</label>
                <input type="text" id="inputFamilienstand" v-model="content.personalInformation.family" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputTelefon">Telefon</label>
                <input type="text" id="inputTelefon" v-model="content.personalInformation.phone" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputEmail">E-Mail</label>
                <input type="email" id="inputEmail" v-model="content.personalInformation.mail" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputHomepage">Homepage</label>
                <input type="url" id="inputHomepage" v-model="content.personalInformation.homepage" />
            </div>
            <div class="cvContentItemEntry">
                <label for="inputXing">Xing</label>
                <input type="url" id="inputXing" v-model="content.personalInformation.xing" />
            </div>
        </div>
        <div class="cvContentSection">
            <h2>Werdegang</h2>
            <TransitionGroup name="list" tag="div">
                <TheCvContentItem
                    v-for="item in content.getCategoryItems(Category.WERDEGANG)"
                    v-bind:key="item.uuid"
                    :uuid="item.uuid"
                    :category="Category.WERDEGANG"
                />
            </TransitionGroup>
            <button @click="addItem(Category.WERDEGANG)">➕ Item</button>
        </div>
        <div class="cvContentSection">
            <h2>Erfahrung</h2>
            <TransitionGroup name="list" tag="div">
                <TheCvContentItem
                    v-for="item in content.getCategoryItems(Category.AUSBILDUNG)"
                    v-bind:key="item.uuid"
                    :uuid="item.uuid"
                    :category="Category.AUSBILDUNG"
                />
            </TransitionGroup>
            <button @click="addItem(Category.AUSBILDUNG)">➕ Item</button>
        </div>
        <div class="cvContentSection">
            <h2>Engagement</h2>
            <TransitionGroup name="list" tag="div">
                <TheCvContentItem
                    v-for="item in content.getCategoryItems(Category.ENGAGEMENT)"
                    v-bind:key="item.uuid"
                    :uuid="item.uuid"
                    :category="Category.ENGAGEMENT"
                />
            </TransitionGroup>
            <button @click="addItem(Category.ENGAGEMENT)">➕ Item</button>
        </div>
        <div class="cvContentSection">
            <h2>Sprache</h2>
            <TransitionGroup name="list" tag="div">
                <TheCvContentItem
                    v-for="item in content.getCategoryItems(Category.SPRACHE)"
                    v-bind:key="item.uuid"
                    :uuid="item.uuid"
                    :category="Category.SPRACHE"
                />
            </TransitionGroup>
            <button @click="addItem(Category.SPRACHE)">➕ Item</button>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import url("./style.scss");
.cvContent {
    width: 100%;
    height: 100vh;
    padding: 20px;

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

.cvContentActionSection {
    display: flex;
    gap: 10px;
    padding: 0px 0px 10px 0px;
    justify-content: center;
}
</style>
