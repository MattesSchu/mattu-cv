<script setup lang="ts">
import { useContentStore } from "@/stores/content";
import { useSettingsStore } from "@/stores/settings";

const content = useContentStore();
const settings = useSettingsStore();

</script>
<template>
    <div class="cvPersonal">
        <div class="cvPersonalAnschriftTitle cvPersonalLeft cvMainBullitTitle">Anschrift</div>
        <div class="cvPersonalAnschriftItems cvPersonalRight cvMainSectionText">
            <div>{{ content.address }}</div>
            <div>{{ content.postal }}</div>
        </div>
        <div class="cvPersonalTelefonTitle cvPersonalLeft cvMainBullitTitle">Telefon</div>
        <div class="cvPersonalTelefonNumber cvPersonalRight cvMainSectionText">{{ content.phone }}</div>
        <div class="cvPersonalEMailTitle cvPersonalLeft cvMainBullitTitle">E-Mail</div>
        <div class="cvPersonalEMailText cvPersonalRight cvMainSectionText ">{{ content.mail }}</div>
        <div class="cvPersonalXingTitle cvPersonalLeft cvMainBullitTitle">Xing</div>
        <div class="cvPersonalXingUrl cvPersonalRight cvMainSectionText">{{ content.xing }}</div>
        <div class="cvPersonalFamilyTitle cvPersonalLeft cvMainBullitTitle">Familienstand</div>
        <div class="cvPersonalFamilyText cvPersonalRight cvMainSectionText">{{ content.family }}</div>
        <div class="cvPersonalBirthTitle cvPersonalLeft cvMainBullitTitle">Geburt</div>
        <div class="cvPersonalBirthText cvPersonalRight cvMainSectionText">{{ content.birthday }} in {{ content.birthplace }}</div>
    </div>
</template>
<style scoped lang="scss">
.cvPersonal {
    margin-top: 40px;
    margin-bottom: 20px;
    grid-column: r1 / -1;
    display: grid;
    grid-template-columns: [left] 1fr [right] 5fr;
    column-gap: 10px;
}

.cvPersonalLeft {
    justify-self: end;
}

.cvPersonalRight cvMainSectionText {
    justify-self: start;
}
</style>
