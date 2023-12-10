<script setup lang="ts">
// Stores
import { useContentStore } from "@/stores/content";
import { getFormattedDateStr } from "@/components/formatDate";

const content = useContentStore();

function getBirthDayString(): string {
    const birthday = content.personalInformation.birthday;
    if (!(birthday instanceof Date)) {
        console.error("Unable to get real Date type from store.");
        return getFormattedDateStr(new Date(Date.now()));
    }
    return getFormattedDateStr(birthday);
}
</script>
<template>
    <div class="cvPersonal">
        <div class="cvPersonalAnschriftTitle cvPersonalLeft cvMainBullitTitle">Anschrift</div>
        <div class="cvPersonalAnschriftItems cvPersonalRight cvMainSectionText">
            <div>{{ content.personalInformation.address }}</div>
            <div>{{ content.personalInformation.postal }}</div>
        </div>
        <div class="cvPersonalTelefonTitle cvPersonalLeft cvMainBullitTitle">Telefon</div>
        <div class="cvPersonalTelefonNumber cvPersonalRight cvMainSectionText">
            {{ content.personalInformation.phone }}
        </div>
        <div class="cvPersonalEMailTitle cvPersonalLeft cvMainBullitTitle">E-Mail</div>
        <div class="cvPersonalEMailText cvPersonalRight cvMainSectionText">{{ content.personalInformation.mail }}</div>
        <div class="cvPersonalXingTitle cvPersonalLeft cvMainBullitTitle">Xing</div>
        <div class="cvPersonalXingUrl cvPersonalRight cvMainSectionText">{{ content.personalInformation.xing }}</div>
        <div class="cvPersonalFamilyTitle cvPersonalLeft cvMainBullitTitle">Familienstand</div>
        <div class="cvPersonalFamilyText cvPersonalRight cvMainSectionText">
            {{ content.personalInformation.family }}
        </div>
        <div class="cvPersonalBirthTitle cvPersonalLeft cvMainBullitTitle">Geburt</div>
        <div class="cvPersonalBirthText cvPersonalRight cvMainSectionText">
            {{ getBirthDayString() }} in {{ content.personalInformation.birthplace }}
        </div>
    </div>
</template>
<style scoped lang="scss">
.cvPersonal {
    margin-top: 4mm;
    margin-bottom: 4mm;
    grid-column: r1 / -1;
    display: grid;
    grid-template-columns: [left] 1fr [right] 5fr;
    column-gap: 2mm;
    row-gap: 1mm;
}

.cvPersonalLeft {
    justify-self: end;
}

.cvPersonalRight cvMainSectionText {
    justify-self: start;
}
</style>
